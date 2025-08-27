
const fs = require("fs");
const path = require("path");
const mime = require("mime-types");
const FormDataModel = require("../models/formData");
const formFieldConfig = require("../config/formFieldConfig");
const { sendMandrillEmail } = require("../services/mandrilinService");
const { sendWhatsAppMessage } = require("../services/whatsappService");


 // GET /formdatas

exports.getForms = async (req, res) => {
  try {
    const data = await FormDataModel.find({});
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching form data", error: error.message });
  }
};


//  DELETE /formdatas

exports.deleteForms = async (req, res) => {
  try {
    await FormDataModel.deleteMany({});
    res.json({ message: "All form data deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting form data", error: error.message });
  }
};

/**
 * GET /view-file/:id/:filename
 * Streams a stored uploaded file inline
 */
exports.viewFile = async (req, res) => {
  try {
    const { id, filename } = req.params;

    const record = await FormDataModel.findById(id);
    if (!record) return res.status(404).send("Record not found");

    if (!record.uploadedFiles || record.uploadedFiles.length === 0) {
      return res.status(404).send("No files uploaded");
    }

    const file = record.uploadedFiles.find(
      (f) => decodeURIComponent(f.name) === decodeURIComponent(filename)
    );
    if (!file) return res.status(404).send("File not found");

    const mimeType = file.type || mime.lookup(file.name) || "application/octet-stream";
    res.setHeader("Content-Type", mimeType);
    res.setHeader("Content-Disposition", `inline; filename="${file.name}"`);

    let buffer;
    // Handle cases where content may be Buffer, or a Mongo Binary-like object
    if (Buffer.isBuffer(file.content)) {
      buffer = file.content;
    } else if (file.content?.buffer) {
      buffer = Buffer.from(file.content.buffer);
    } else if (Array.isArray(file.content)) {
      buffer = Buffer.from(file.content);
    } else {
      return res.status(500).send("Stored file format not supported");
    }

    return res.send(buffer);
  } catch (err) {
    console.error("Error in /view-file route:", err.message);
    res.status(500).send("Server error");
  }
};


exports.submitForm = async (req, res) => {
  try {
    // Collect email attachments (base64) & uploadedFiles (raw buffer) for DB
    const attachments = [];
    const uploadedFiles = [];

    // Helper to push an uploaded file to both attachments and uploadedFiles arrays
    const pushFile = (file) => {
      const filePath = file.path; // actual disk path set by multer
      const originalName = file.originalname;
      const mimeType = mime.lookup(originalName) || "application/octet-stream";

      // Read raw buffer from disk
      const fileContentBuffer = fs.readFileSync(filePath);

      // For email: base64 string
      attachments.push({
        type: mimeType,
        name: originalName,
        content: fileContentBuffer.toString("base64"),
      });

      // For DB: store raw buffer + metadata
      uploadedFiles.push({
        name: originalName,
        type: mimeType,
        content: fileContentBuffer,
      });
    };

    // Collect specific fields if present
    if (req.files?.Payment_Deposit_info_Document?.length > 0) {
      // Typically only one deposit doc expected
      req.files.Payment_Deposit_info_Document.forEach(pushFile);
      // Optional: set friendly flag in body so email template shows placeholder
      req.body.Payment_Deposit_info_Document = "Attached Document Below";
    }

    if (req.files?.Medication_Document?.length > 0) {
      req.files.Medication_Document.forEach(pushFile);
      req.body.Medication_Document = "Attached Document Below";
    }

    // If you also support a generic "uploadedFiles" field, capture those too
    if (req.files?.uploadedFiles?.length > 0) {
      req.files.uploadedFiles.forEach(pushFile);
    }

    // Extract common fields
    const { formType } = req.body;
    let { Phone_Number } = req.body;

    if (!formType) {
      return res.status(400).json({ error: "formType is required." });
    }

    // Some form types don't require phone
    const phoneRequired = !["billing", "deposit"].includes(formType);
    if (phoneRequired && !Phone_Number) {
      return res.status(400).json({ error: "Phone number missing." });
    }

    // Normalize phone for WhatsApp (digits only)
    if (Phone_Number) {
      Phone_Number = Phone_Number.toString();
    }

   
    let alreadySaved = false;

    if (formType === "new_appointment") {
      const {
        Species,
        Pet_Name,
        Owner_Name,
        Phone_Number: PhoneForNew,
        Primary_Veterinary,
        Departments,
        Preferred_Date,
        Time_Slot,
        Concern_Brief,
      } = req.body;

      // Dedupe rule: same pet/owner/phone/date/time slot
      const existing = await FormDataModel.findOne({
        formType: "new_appointment",
        Pet_Name: new RegExp(`^${Pet_Name}$`, "i"),
        Owner_Name: new RegExp(`^${Owner_Name}$`, "i"),
        Phone_Number: PhoneForNew,
        Preferred_Date,
        Time_Slot,
      });

      if (existing) {
        return res.status(400).json({
          error:
            "An appointment already exists for this pet, owner, phone, date, and time slot.",
        });
      }

      await FormDataModel.create({
        formType,
        Species,
        Pet_Name,
        Owner_Name,
        Phone_Number: PhoneForNew,
        Primary_Veterinary,
        Departments,
        Preferred_Date,
        Time_Slot,
        Concern_Brief,
        uploadedFiles,
      });

      alreadySaved = true;
    }

    if (formType === "reschedule") {
      const {
        Pet_Name,
        Owner_Name,
        Phone_Number: PhoneForReschedule,
        Existing_Appt_Date,
        Preferred_Date,
        Time_Slot,
        Reason_For_Reschedule,
      } = req.body;

      const appointments = await FormDataModel.find({
        formType: { $in: ["new", "new_appointment"] },
        Pet_Name,
        Owner_Name,
        Phone_Number: PhoneForReschedule,
      });

      const existingDateStr = new Date(Existing_Appt_Date).toISOString().split("T")[0];

      const existingAppointment = appointments.find((appt) => {
        const storedDateStr = new Date(appt.Preferred_Date).toISOString().split("T")[0];
        return storedDateStr === existingDateStr;
      });

      if (!existingAppointment) {
        return res.status(404).json({
          error: "No existing appointment found with the provided details.",
        });
      }

      const newDateStr = new Date(Preferred_Date).toISOString().split("T")[0];
      const existingDateMatch = new Date(
        existingAppointment.Preferred_Date
      )
        .toISOString()
        .split("T")[0];

      if (existingDateMatch === newDateStr && existingAppointment.Time_Slot === Time_Slot) {
        return res.status(400).json({
          error:
            "The new preferred date and time slot cannot be the same as the existing one.",
        });
      }

      await FormDataModel.create({
        formType: "reschedule",
        Pet_Name,
        Owner_Name,
        Phone_Number: PhoneForReschedule,
        Preferred_Date,
        Existing_Appt_Date,
        Time_Slot,
        Reason_For_Reschedule,
        uploadedFiles,
      });

      // Remove the old appointment
      await FormDataModel.findByIdAndDelete(existingAppointment._id);
      alreadySaved = true;
    }

    if (formType === "cancel") {
      const {
        Pet_Name,
        Owner_Name,
        Phone_Number: PhoneForCancel,
        Existing_Appt_Date,
        Reason_For_Cancel,
      } = req.body;

      const appointments = await FormDataModel.find({
        formType: { $in: ["new_appointment", "reschedule"] },
        Pet_Name,
        Owner_Name,
        Phone_Number: PhoneForCancel,
      });

      const existingDateStr = new Date(Existing_Appt_Date).toISOString().split("T")[0];

      const appointmentToCancel = appointments.find((appt) => {
        const storedDateStr = new Date(appt.Preferred_Date).toISOString().split("T")[0];
        return storedDateStr === existingDateStr;
      });

      if (!appointmentToCancel) {
        return res.status(404).json({
          error: "No matching appointment found to cancel.",
        });
      }

      // Delete the appointment and record a cancel entry
      await FormDataModel.deleteOne({ _id: appointmentToCancel._id });

      await FormDataModel.create({
        formType: "cancel",
        Pet_Name,
        Owner_Name,
        Phone_Number: PhoneForCancel,
        Existing_Appt_Date,
        Reason_For_Cancel,
        uploadedFiles,
      });

      alreadySaved = true;
    }

    // If none of the special flows saved yet, save generic submission
    if (!alreadySaved) {
      const newEntry = new FormDataModel({
        ...req.body,
        uploadedFiles,
      });
      await newEntry.save();
    }

    // Build Mandrill merge variables
    const config = formFieldConfig[formType];
    if (!config) {
      return res.status(400).json({ error: "Unknown form type." });
    }

    const vars = config.fields.map((field) => ({
      name: field,
      content: req.body[field] ?? "",
    }));

    // Send Mandrill email (attachments are base64 objects)
    await sendMandrillEmail({
      templateName: config.template,
      vars,
      subject: `New Submission: ${formType.replace(/_/g, " ")}`,
      attachments,
    });

    // Optionally send WhatsApp notification to the submitter
    let whatsappSent = false;
    if (phoneRequired && Phone_Number) {
      try {
        whatsappSent = await sendWhatsAppMessage(Phone_Number);
      } catch (e) {
        whatsappSent = false;
      }
    }

    return res.status(200).json({
      message: "Form submitted and email sent successfully!",
      whatsappSent,
    });
  } catch (err) {
    console.error("Error handling form submission:", err);
    return res.status(500).json({ error: "Failed to submit form." });
  } 
};
