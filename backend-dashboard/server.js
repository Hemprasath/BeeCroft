const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const axios = require("axios");
const fs = require("fs");
const mime = require("mime-types");
const FormData = require("./models/formData");
const formFieldConfig = require("./config/formFieldConfig");
require("dotenv").config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err.stack);
  res.status(500).send("Internal Server Error");
});

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const uploadFields = upload.fields([
  { name: "Medication_Document", maxCount: 4 },
  { name: "Payment_Deposit_info_Document", maxCount: 4 }
]);

let alreadySaved = false;

app.post("/submit-form", uploadFields, async (req, res) => {
  try {


    let attachments = [];
    let alreadySaved = false;

    if (
      req.files &&
      req.files.Payment_Deposit_info_Document &&
      req.files.Payment_Deposit_info_Document.length > 0
    ) {
      const file = req.files.Payment_Deposit_info_Document[0];
      const fileContent = fs.readFileSync(file.path);
      const mimeType = mime.lookup(file.originalname) || "application/octet-stream";

      attachments.push({
        type: mimeType,
        name: file.originalname,
        content: fileContent.toString("base64")
      });

      req.body.Payment_Deposit_info_Document = "Attached Document Below";
    }


    if (
      req.files &&
      req.files.Medication_Document &&
      req.files.Medication_Document.length > 0
    ) {
      req.files.Medication_Document.forEach((file) => {
        const fileContent = fs.readFileSync(file.path);
        const mimeType = mime.lookup(file.originalname) || "application/octet-stream";

        attachments.push({
          type: mimeType,
          name: file.originalname,
          content: fileContent.toString("base64")
        });
      });

      req.body.Medication_Document = "Attached Document Below";
    }

    const uploadedFiles = [];

    if (req.files?.Payment_Deposit_info_Document?.length > 0) {
      const file = req.files.Payment_Deposit_info_Document[0];
      const fileContent = fs.readFileSync(file.path);
      const mimeType = mime.lookup(file.originalname) || "application/octet-stream";

      uploadedFiles.push({
        name: file.originalname,
        type: mimeType,
        content: fileContent
      });
    }

    if (req.files?.Medication_Document?.length > 0) {
      req.files.Medication_Document.forEach((file) => {
        const fileContent = fs.readFileSync(file.path);
        const mimeType = mime.lookup(file.originalname) || "application/octet-stream";

        uploadedFiles.push({
          name: file.originalname,
          type: mimeType,
          content: fileContent
        });
      });
    }

    const { formType, Phone_Number } = req.body;
    if (formType === "new_appointment") {
      const {
        Species,
        Pet_Name,
        Owner_Name,
        Primary_Veterinary,
        Departments,
        Preferred_Date,
        Time_Slot,
        Concern_Brief
      } = req.body;

      const existing = await FormData.findOne({
        formType: "new_appointment",
        Pet_Name: new RegExp(`^${Pet_Name}$`, "i"),
        Owner_Name: new RegExp(`^${Owner_Name}$`, "i"),
        Phone_Number,
        Preferred_Date,
        Time_Slot
      });

      if (existing) {
        return res.status(400).json({
          error: "An appointment already exists for this pet, owner, phone, date, and time slot."
        });
      }

      await FormData.create({
        formType,
        Species,
        Pet_Name,
        Owner_Name,
        Phone_Number,
        Primary_Veterinary,
        Departments,
        Preferred_Date,
        Time_Slot,
        Concern_Brief,
      });

      alreadySaved = true;
    }

    if (formType === "reschedule") {
      const {
        Pet_Name,
        Owner_Name,
        Phone_Number,
        Existing_Appt_Date,
        Preferred_Date,
        Time_Slot,
        Reason_For_Reschedule
      } = req.body;

      const appointments = await FormData.find({
        formType: { $in: ["new", "new_appointment"] },
        Pet_Name,
        Owner_Name,
        Phone_Number
      });

      const existingDateStr = new Date(Existing_Appt_Date).toISOString().split("T")[0];

      const existingAppointment = appointments.find(appt => {
        const storedDateStr = new Date(appt.Preferred_Date).toISOString().split("T")[0];
        return storedDateStr === existingDateStr;
      });

      if (!existingAppointment) {
        return res.status(404).json({
          error: "No existing appointment found with the provided details."
        });
      }

      const newDateStr = new Date(Preferred_Date).toISOString().split("T")[0];
      const existingDateMatch = new Date(existingAppointment.Preferred_Date).toISOString().split("T")[0];

      if (
        existingDateMatch === newDateStr &&
        existingAppointment.Time_Slot === Time_Slot
      ) {
        return res.status(400).json({
          error: "The new preferred date and time slot cannot be the same as the existing one."
        });
      }

      await FormData.create({
        formType: "reschedule",
        Pet_Name,
        Owner_Name,
        Phone_Number,
        Preferred_Date,
        Existing_Appt_Date,
        Time_Slot,
        Reason_For_Reschedule,

      });

      await FormData.findByIdAndDelete(existingAppointment._id);
      alreadySaved = true;
    }

    if (formType === "cancel") {
      const {
        Pet_Name,
        Owner_Name,
        Phone_Number,
        Existing_Appt_Date,
        Reason_For_Cancel
      } = req.body;

      const appointments = await FormData.find({
        formType: { $in: ["new_appointment", "reschedule"] },
        Pet_Name,
        Owner_Name,
        Phone_Number
      });

      const existingDateStr = new Date(Existing_Appt_Date).toISOString().split("T")[0];

      const appointmentToCancel = appointments.find(appt => {
        const storedDateStr = new Date(appt.Preferred_Date).toISOString().split("T")[0];
        return storedDateStr === existingDateStr;
      });

      if (!appointmentToCancel) {
        return res.status(404).json({
          error: "No matching appointment found to cancel."
        });
      }

      await FormData.deleteOne({ _id: appointmentToCancel._id });

      await FormData.create({
        formType: "cancel",
        Pet_Name,
        Owner_Name,
        Phone_Number,
        Existing_Appt_Date,
        Reason_For_Cancel,
      });

      alreadySaved = true;
    }

   
    if (!alreadySaved) {
      const newEntry = new FormData({
        ...req.body,
        uploadedFiles
      });
      await newEntry.save();
    }



    const config = formFieldConfig[formType];
    if (!config) {
      return res.status(400).json({ error: "Unknown form type." });
    }

    const phoneRequired = !["billing", "deposit"].includes(formType);
    if (phoneRequired && !Phone_Number) {
      return res.status(400).json({ error: "Phone number missing." });
    }

    const vars = config.fields.map((field) => ({
      name: field,
      content: req.body[field] || ""
    }));

    const emailPayload = {
      key: process.env.MANDRILL_API_KEY,
      template_name: config.template,
      template_content: [],
      message: {
        from_email: "no-reply@stratautomate.com",
        to: [{ email: "munthamahendrasai@gmail.com", type: "to" }],
        subject: `New Submission: ${formType.replace(/_/g, " ")}`,
        merge_vars: [{ rcpt: "munthamahendrasai@gmail.com", vars }],
        attachments
      }
    };


    await axios.post(
      "https://mandrillapp.com/api/1.0/messages/send-template.json",
      emailPayload
    );

    let whatsappSuccess = false;

    if (phoneRequired && Phone_Number) {
      const phone = Phone_Number.replace(/\D/g, "");
      const payload = {
        countryCode: "+65",
        phoneNumber: phone,
        callbackData: "Form submission success",
        type: "Template",
        template: {
          name: "thank_you_message",
          languageCode: "en"
        }
      };

      const token = process.env.WHATSAPP_API_TOKEN;

      console.log("sending whatsapp message")

      const whatsappRes = await fetch("https://api.whatsappbiz.com/v1/public/message/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Basic ${token}`
        },
        body: JSON.stringify(payload)
      });


      console.log("WhatsApp response status:", whatsappRes.status, whatsappRes.statusText);

      const whatsappData = await whatsappRes.json();
      whatsappSuccess = whatsappRes.ok;
    }

    res.status(200).json({
      message: "Form submitted and email sent successfully!",
      whatsappSent: whatsappSuccess
    });

  } catch (err) {
    console.error("Error handling form submission:", err);
    res.status(500).json({ error: "Failed to submit form." });
  }
});


app.delete("/formdatas", async (req, res) => {
  try {
    await FormData.deleteMany({});
    res.json({ message: "All form data deleted." });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete", error: err });
  }
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});




