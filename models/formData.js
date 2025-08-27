

const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  name: String,
  type: String,
  content: Buffer
});

const formSchema = new mongoose.Schema({
  formType: {
    type: String,
    enum: [
      'new_appointment', 'reschedule', 'cancel', 'admitted', 'medication', 
      'avian', 'cardiology', 'internal', 'imaging', 'neurology', 
      'surgery', 'rehabilitation', 'billing', 'callback', 'deposit', 'refund'
    ]
  },
  Pet_Name: String,
  Owner_Name: String,
  Phone_Number: String,
  Species: String,
  Primary_Veterinary: String,
  Departments: String,
  Preferred_Date: Date,
  Time_Slot: String,
  Concern_Brief: String,
  Existing_Appt_Date: Date,
  Reason_For_Reschedule: String,
  Reason_For_Cancel: String,
  help: String,
  Refill_Request: String,
  Medication_In_Use: String,
  Medication_Document: [String],
  Primary_Care_Clinic: String,
  Medical_Concern: String,
  Main_Concern_List: String,
  Your_Name: String,
  Reason_For_Call: String,
  Invoice_Number: String,
  Deposit_Query: String,
  Email_Address: String,
  Payment_Deposit_info_Document: [String],
  Amount_Paid: String,
  Paynow_Name: String,
  Refund_Reason: String,
  Visit_Date: String,
  Billing_Query: String,
  uploadedFiles: [fileSchema],
  createdAt: { type: Date, default: Date.now }
}, { strict: false }); // allow extra fields if needed

module.exports = mongoose.model('FormData', formSchema, 'formdatas');
