const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  name: String,
  type: String,
  content: Buffer
});

const formSchema = new mongoose.Schema({
  formType: {
    type: String,
    enum: ['new_appointment', 'reschedule', 'cancel', 'admitted', 'medication', 'avian', 'cardiology', 'internal', 'imaging', 'neurology', 'surgery', 'rehabilitation', 'billing', 'callback', 'deposit', 'refund']
  },

  // Common
  Pet_Name: String,
  Owner_Name: String,
  Phone_Number: String,

  // new_appointment
  Species: String,
  Primary_Veterinary: String,
  Departments: String,
  Preferred_Date: Date,
  Time_Slot: String,
  Concern_Brief: String,

  // reschedule
  Existing_Appt_Date: Date,
  Reason_For_Reschedule: String,

  // cancel
  Reason_For_Cancel: String,

  // admitted
  help: String,

  // medication_enquiries
  Refill_Request: String,
  Medication_In_Use: String,
  Medication_Document: {
    type: [String],
    required: false
  },

  // avian_exotics
  Primary_Care_Clinic: String,
  Medical_Concern: String,
  Main_Concern_List: String,

  // Callback
  Your_Name: String,
  Reason_For_Call: String,

  // deposit
  Invoice_Number: String,
  Deposit_Query: String,
  Email_Address: String,
  Payment_Deposit_info_Document: {
    type: String,
    required: false
  },


  Amount_Paid: String,
  Paynow_Name: String,
  Refund_Reason: String,
  Visit_Date: String,


  Billing_Query: String,

  uploadedFiles: [fileSchema],

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.models.FormData || mongoose.model('FormData', formSchema);
