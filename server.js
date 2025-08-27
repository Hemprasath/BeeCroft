// require("dotenv").config();

// const express = require('express');
// const mongoose = require('mongoose');
// const path = require("path");
// const cors = require('cors');
// const cookieParser = require('cookie-parser');
// const jwt = require('jsonwebtoken');
// const mime = require('mime-types');
// const Admin = require('./models/admin.js');
// const FormData = require('./models/formData');
// const User = require('./models/users.js')
// const multer = require("multer");
// const formFieldConfig = require("./config/formFieldConfig");
// const axios = require("axios");
// const fs = require("fs");


// const storage = multer.diskStorage({
//   destination: "uploads/",
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage });

// const app = express();
// const PORT = 5000;
// const JWT_SECRET = process.env.JWT_SECRET;

// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// const allowedOrigins = [
//   'http://localhost:5500',
//   'http://127.0.0.1:5500',
//   'http://localhost:5501',
//   'http://127.0.0.1:5501',
//   'http://127.0.0.1:5502',
//   'https://beecroft.messagly.com',
//   'https://api-beecroft.messagly.com'
// ];

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('CORS not allowed from this origin'));
//     }
//   },
//   credentials: true,
//   methods: ['GET', 'PUT', 'POST'],

// }));


// app.use(express.json());
// app.use(cookieParser());
// app.use(express.static('public'));



// mongoose.connect(process.env.MONGO_URI)
//   .then(async () => {
//     console.log('Connected to MongoDB');
//     await createDefaultAdmin();

//     app.listen(PORT, () => {
//       console.log(`Server running at http://localhost:${PORT}`);
//     });
//   })
//   .catch(err => console.error('MongoDB connection error:', err));


// const createDefaultAdmin = async () => {
//   const existingAdmin = await Admin.findOne({ username: 'admin' });
//   if (existingAdmin) {
//     return;
//   }

//   const newAdmin = new Admin({
//     username: 'admin',
//     password: 'Admin@123'
//   });

//   await newAdmin.save();
// };

// const uploadFields = upload.fields([
//   { name: "Medication_Document", maxCount: 4 },
//   { name: "Payment_Deposit_info_Document", maxCount: 4 },
//   { name: "uploadedFiles", maxCount: 4 }
// ]);

// app.post('/login', async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const user = await Admin.findOne({ username });
//     if (!user || !(await user.comparePassword(password))) {
//       return res.status(401).json({ message: 'Invalid username or password' });
//     }

//     const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, {
//       expiresIn: '1d'
//     });

//     res.cookie('token', token, {
//       httpOnly: true,
//       secure: true,
//       sameSite: 'None',
//       domain: '.messagly.com',
//       maxAge: 24 * 60 * 60 * 1000
//     });

//     res.status(200).json({ message: 'Login successful' });
//   } catch (err) {
//     res.status(500).json({ message: 'Login failed', error: err.message });
//   }
// });

// app.get('/me', (req, res) => {
//   const token = req.cookies.token;
//   if (!token) return res.status(401).json({ message: 'Not authenticated' });

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     res.json({ username: decoded.username });
//   } catch {
//     res.status(401).json({ message: 'Invalid token' });
//   }
// });


// //  Logout route
// app.post('/logout', (req, res) => {
//   res.clearCookie('token');
//   res.status(200).json({ message: 'Logged out' });
// });

// // Get all form data
// app.get('/formdatas', async (req, res) => {
//   try {
//     const data = await FormData.find({});
//     res.json(data);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching form data', error });
//   }
// });

// //  Delete all form data
// app.delete('/formdatas', async (req, res) => {
//   try {
//     await FormData.deleteMany({});
//     res.json({ message: 'All form data deleted successfully.' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error deleting form data', error });
//   }
// });

// //users

// app.post('/api/users', async (req, res) => {
//   try {
//     const { username, phone, email, role } = req.body;

//     if (!username || !phone || !email || !role) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     const existingUser = await User.findOne({
//       $or: [{ phone }, { email }]
//     });

//     if (existingUser) {
//       return res.status(400).json({ message: "User with same email or phone already exists." });
//     }

//     const user = new User({ username, phone, email, role });
//     await user.save();

//     res.status(201).json({ message: 'User created successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'User creation failed', error: err.message });
//   }
// });

// // Get all users
// app.get('/api/users', async (req, res) => {
//   try {
//     const users = await User.find({});
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching users', error: err.message });
//   }
// });

// app.put('/api/users/:id', async (req, res) => {
//   try {
//     const userId = req.params.id;
//     const { username, phone, email, role } = req.body;

//     if (!username || !phone || !email || !role) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     // Check for duplicate phone or email on a *different* user
//     const duplicateUser = await User.findOne({
//       _id: { $ne: userId },
//       $or: [{ phone }, { email }]
//     });

//     if (duplicateUser) {
//       return res.status(400).json({
//         message: 'Another user with the same phone or email already exists.'
//       });
//     }

//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       { username, phone, email, role },
//       { new: true }
//     );

//     if (!updatedUser) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.json({ message: 'User updated successfully' });
//   } catch (err) {
//     res.status(500).json({ message: 'Error updating user', error: err.message });
//   }
// });

// app.delete('/api/users/:id', async (req, res) => {
//   try {
//     const userId = req.params.id;
//     const deletedUser = await User.findByIdAndDelete(userId);

//     if (!deletedUser) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.json({ message: 'User deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ message: 'Error deleting user', error: err.message });
//   }
// });


// app.get('/view-file/:id/:filename', async (req, res) => {
//   try {
//     const { id, filename } = req.params;


//     // Fetch form data by ID
//     const record = await FormData.findById(id);

//     if (!record) {
//       console.log("No record found");
//       return res.status(404).send('Record not found');
//     }

//     if (!record.uploadedFiles || record.uploadedFiles.length === 0) {
//       console.log("No uploadedFiles array");
//       return res.status(404).send('No files uploaded');
//     }

//     // Find matching file by name (exact match)
//     const file = record.uploadedFiles.find(
//       f => decodeURIComponent(f.name) === decodeURIComponent(filename)
//     );

//     if (!file) {
//       console.log("Matching file not found");
//       return res.status(404).send('File not found');
//     }

//     const mimeType = mime.lookup(file.name) || 'application/octet-stream';
//     res.setHeader('Content-Type', mimeType);
//     res.setHeader('Content-Disposition', `inline; filename="${file.name}"`);

//     // Check if content is already Buffer or Binary
//     const buffer = Buffer.isBuffer(file.content)
//       ? file.content
//       : Buffer.from(file.content.buffer);

//     res.send(buffer);
//   } catch (err) {
//     console.error('Error in /view-file route:', err.message);
//     res.status(500).send('Server error');
//   }
// });


// app.post("/submit-form", uploadFields, async (req, res) => {
//   try {


//     let attachments = [];
//     let alreadySaved = false;

//     if (
//       req.files &&
//       req.files.Payment_Deposit_info_Document &&
//       req.files.Payment_Deposit_info_Document.length > 0
//     ) {
//       const file = req.files.Payment_Deposit_info_Document[0];
//       const fileContent = fs.readFileSync(file.path);
//       const mimeType = mime.lookup(file.originalname) || "application/octet-stream";

//       attachments.push({
//         type: mimeType,
//         name: file.originalname,
//         content: fileContent.toString("base64")
//       });

//       req.body.Payment_Deposit_info_Document = "Attached Document Below";
//     }


//     if (
//       req.files &&
//       req.files.Medication_Document &&
//       req.files.Medication_Document.length > 0
//     ) {
//       req.files.Medication_Document.forEach((file) => {
//         const fileContent = fs.readFileSync(file.path);
//         const mimeType = mime.lookup(file.originalname) || "application/octet-stream";

//         attachments.push({
//           type: mimeType,
//           name: file.originalname,
//           content: fileContent.toString("base64")
//         });
//       });

//       req.body.Medication_Document = "Attached Document Below";
//     }

//     const uploadedFiles = [];

//     if (req.files?.Payment_Deposit_info_Document?.length > 0) {
//       const file = req.files.Payment_Deposit_info_Document[0];
//       const fileContent = fs.readFileSync(file.path);
//       const mimeType = mime.lookup(file.originalname) || "application/octet-stream";

//       uploadedFiles.push({
//         name: file.originalname,
//         type: mimeType,
//         content: fileContent
//       });
//     }

//     if (req.files?.Medication_Document?.length > 0) {
//       req.files.Medication_Document.forEach((file) => {
//         const fileContent = fs.readFileSync(file.path);
//         const mimeType = mime.lookup(file.originalname) || "application/octet-stream";

//         uploadedFiles.push({
//           name: file.originalname,
//           type: mimeType,
//           content: fileContent
//         });
//       });
//     }

//     const { formType, Phone_Number } = req.body;
//     if (formType === "new_appointment") {
//       const {
//         Species,
//         Pet_Name,
//         Owner_Name,
//         Primary_Veterinary,
//         Departments,
//         Preferred_Date,
//         Time_Slot,
//         Concern_Brief
//       } = req.body;

//       const existing = await FormData.findOne({
//         formType: "new_appointment",
//         Pet_Name: new RegExp(`^${Pet_Name}$`, "i"),
//         Owner_Name: new RegExp(`^${Owner_Name}$`, "i"),
//         Phone_Number,
//         Preferred_Date,
//         Time_Slot
//       });

//       if (existing) {
//         return res.status(400).json({
//           error: "An appointment already exists for this pet, owner, phone, date, and time slot."
//         });
//       }

//       await FormData.create({
//         formType,
//         Species,
//         Pet_Name,
//         Owner_Name,
//         Phone_Number,
//         Primary_Veterinary,
//         Departments,
//         Preferred_Date,
//         Time_Slot,
//         Concern_Brief,
//       });

//       alreadySaved = true;
//     }

//     if (formType === "reschedule") {
//       const {
//         Pet_Name,
//         Owner_Name,
//         Phone_Number,
//         Existing_Appt_Date,
//         Preferred_Date,
//         Time_Slot,
//         Reason_For_Reschedule
//       } = req.body;

//       const appointments = await FormData.find({
//         formType: { $in: ["new", "new_appointment"] },
//         Pet_Name,
//         Owner_Name,
//         Phone_Number
//       });

//       const existingDateStr = new Date(Existing_Appt_Date).toISOString().split("T")[0];

//       const existingAppointment = appointments.find(appt => {
//         const storedDateStr = new Date(appt.Preferred_Date).toISOString().split("T")[0];
//         return storedDateStr === existingDateStr;
//       });

//       if (!existingAppointment) {
//         return res.status(404).json({
//           error: "No existing appointment found with the provided details."
//         });
//       }

//       const newDateStr = new Date(Preferred_Date).toISOString().split("T")[0];
//       const existingDateMatch = new Date(existingAppointment.Preferred_Date).toISOString().split("T")[0];

//       if (
//         existingDateMatch === newDateStr &&
//         existingAppointment.Time_Slot === Time_Slot
//       ) {
//         return res.status(400).json({
//           error: "The new preferred date and time slot cannot be the same as the existing one."
//         });
//       }

//       await FormData.create({
//         formType: "reschedule",
//         Pet_Name,
//         Owner_Name,
//         Phone_Number,
//         Preferred_Date,
//         Existing_Appt_Date,
//         Time_Slot,
//         Reason_For_Reschedule,

//       });

//       await FormData.findByIdAndDelete(existingAppointment._id);
//       alreadySaved = true;
//     }

//     if (formType === "cancel") {
//       const {
//         Pet_Name,
//         Owner_Name,
//         Phone_Number,
//         Existing_Appt_Date,
//         Reason_For_Cancel
//       } = req.body;

//       const appointments = await FormData.find({
//         formType: { $in: ["new_appointment", "reschedule"] },
//         Pet_Name,
//         Owner_Name,
//         Phone_Number
//       });

//       const existingDateStr = new Date(Existing_Appt_Date).toISOString().split("T")[0];

//       const appointmentToCancel = appointments.find(appt => {
//         const storedDateStr = new Date(appt.Preferred_Date).toISOString().split("T")[0];
//         return storedDateStr === existingDateStr;
//       });

//       if (!appointmentToCancel) {
//         return res.status(404).json({
//           error: "No matching appointment found to cancel."
//         });
//       }

//       await FormData.deleteOne({ _id: appointmentToCancel._id });

//       await FormData.create({
//         formType: "cancel",
//         Pet_Name,
//         Owner_Name,
//         Phone_Number,
//         Existing_Appt_Date,
//         Reason_For_Cancel,
//       });

//       alreadySaved = true;
//     }


//     if (!alreadySaved) {
//       const newEntry = new FormData({
//         ...req.body,
//         uploadedFiles
//       });
//       await newEntry.save();
//     }



//     const config = formFieldConfig[formType];
//     if (!config) {
//       return res.status(400).json({ error: "Unknown form type." });
//     }

//     const phoneRequired = !["billing", "deposit"].includes(formType);
//     if (phoneRequired && !Phone_Number) {
//       return res.status(400).json({ error: "Phone number missing." });
//     }

//     const vars = config.fields.map((field) => ({
//       name: field,
//       content: req.body[field] || ""
//     }));

//     const emailPayload = {
//       key: process.env.MANDRILL_API_KEY,
//       template_name: config.template,
//       template_content: [],
//       message: {
//         from_email: "no-reply@stratautomate.com",
//         to: [{ email: "munthamahendrasai@gmail.com", type: "to" }],
//         subject: `New Submission: ${formType.replace(/_/g, " ")}`,
//         merge_vars: [{ rcpt: "munthamahendrasai@gmail.com", vars }],
//         attachments
//       }
//     };


//     await axios.post(
//       "https://mandrillapp.com/api/1.0/messages/send-template.json",
//       emailPayload
//     );

//     let whatsappSuccess = false;

//     if (phoneRequired && Phone_Number) {
//       const phone = Phone_Number.replace(/\D/g, "");
//       const payload = {
//         countryCode: "+65",
//         phoneNumber: phone,
//         callbackData: "Form submission success",
//         type: "Template",
//         template: {
//           name: "thank_you_message",
//           languageCode: "en"
//         }
//       };

//       const token = process.env.WHATSAPP_API_TOKEN;

//       console.log("sending whatsapp message")

    //   const whatsappRes = await fetch("https://api.whatsappbiz.com/v1/public/message/", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       "Authorization": `Basic ${token}`
    //     },
    //     body: JSON.stringify(payload)
    //   });


    //   console.log("WhatsApp response status:", whatsappRes.status, whatsappRes.statusText);

    //   const whatsappData = await whatsappRes.json();
    //   whatsappSuccess = whatsappRes.ok;
    // }

    // res.status(200).json({
    //   message: "Form submitted and email sent successfully!",
    //   whatsappSent: whatsappSuccess
    // });

//   } catch (err) {
//     console.error("Error handling form submission:", err);
//     res.status(500).json({ error: "Failed to submit form." });
//   }
// });

// app.delete("/formdatas", async (req, res) => {
//   try {
//     await FormData.deleteMany({});
//     res.json({ message: "All form data deleted." });
//   } catch (err) {
//     res.status(500).json({ message: "Failed to delete", error: err });
//   }
// })


require("dotenv").config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

const connectDB = require('./config/db');
const corsOptions = require('./config/corsOptions');

// Routes
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const formRoutes = require('./routes/formRoutes');
const Admin = require("./models/admin");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API routes
app.use('/', adminRoutes);
app.use('/api/users', userRoutes);
app.use('/', formRoutes);



const createDefaultAdmin = async () => {
  const existingAdmin = await Admin.findOne({ username: process.env.ADMIN_USERNAME });
  if (existingAdmin) return;

  const newAdmin = new Admin({
    username: process.env.ADMIN_USERNAME,
    password: process.env.ADMIN_PASSWORD
  });

  await newAdmin.save();
};


// Connect to DB and start server 
connectDB().then(async () => {
  await createDefaultAdmin();
  app.listen(PORT, () => console.log(` Server running on http://localhost:${PORT}`));
});


