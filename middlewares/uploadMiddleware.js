const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

const uploadFields = upload.fields([
  { name: "Medication_Document", maxCount: 4 },
  { name: "Payment_Deposit_info_Document", maxCount: 4 },
  { name: "uploadedFiles", maxCount: 4 }
]);

module.exports = uploadFields;
