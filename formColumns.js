// formColumns.js (separate file)
export const formColumns = {
  new_appointment: [
    { header: "Created Date", field: "createdAt", isDate: true },
    { header: "Created Time", field: "createdAt", isTime: true },
    { header: "Species", field: "Species" },
    { header: "Pet Name", field: "Pet_Name" },
    { header: "Pet Owner Name", field: "Owner_Name" },
    { header: "Phone Number", field: "Phone_Number", prefix: "61" },
    { header: "Primary Veterinary", field: "Primary_Veterinary" },
    { header: "Departments", field: "Departments" },
    { header: "Preferred Date", field: "Preferred_Date", isDate: true },
    { header: "Preferred Time Slot", field: "Time_Slot" },
    { header: "Brief Description", field: "Concern_Brief" }
  ],
  reschedule: [
    { header: "Created Date", field: "createdAt", isDate: true },
    { header: "Created Time", field: "createdAt", isTime: true },
    { header: "Pet Name", field: "Pet_Name" },
    { header: "Owner Name", field: "Owner_Name" },
    { header: "Phone Number", field: "Phone_Number", prefix: "61" },
    { header: "Previous Date", field: "Existing_Appt_Date", isDate: true },
    { header: "Rescheduled Date", field: "Preferred_Date", isDate: true },
    { header: "Preferred Time Slot", field: "Time_Slot" },
    { header: "Reason For Reschedule", field: "Reason_For_Reschedule" }
  ],
  cancel: [
    { header: "Created Date", field: "createdAt", isDate: true },
    { header: "Created Time", field: "createdAt", isTime: true },
    { header: "Pet Name", field: "Pet_Name" },
    { header: "Owner Name", field: "Owner_Name" },
    { header: "Phone Number", field: "Phone_Number", prefix: "61" },
    { header: "Scheduled Date", field: "Existing_Appt_Date", isDate: true },
    { header: "Reason For Cancel", field: "Reason_For_Cancel" }
  ],
  admitted: [
  { header: "Created Date", field: "createdAt", isDate: true },
  { header: "Created Time", field: "createdAt", isTime: true },
  { header: "Registered Pet Name", field: "Pet_Name" },
  { header: "Registered Pet Owner Name", field: "Owner_Name" },
  { header: "Registered Phone Number", field: "Phone_Number", prefix: "61" },
  { header: "How can we help?", field: "help" }
],
  avian: [
    { header: "Created Date", field: "createdAt", isDate: true },
    { header: "Created Time", field: "createdAt", isTime: true },
    { header: "Pet Name", field: "Pet_Name" },
    { header: "Owner Name", field: "Owner_Name" },
    { header: "Phone Number", field: "Phone_Number", prefix: "61" },
    { header: "Primary Care Clinic", field: "Primary_Care_Clinic" },
    { header: "Medical Concern", field: "Medical_Concern" }
  ],
   cardiology: [
    { header: "Created Date", field: "createdAt", isDate: true },
    { header: "Created Time", field: "createdAt", isTime: true },
    { header: "Owner Name", field: "Owner_Name" },
    { header: "Pet Name", field: "Pet_Name" },
    { header: "Phone Number", field: "Phone_Number", prefix: "61" },
    { header: "Medical Concern", field: "Medical_Concern" }
  ],
    internal: [
    { header: "Created Date", field: "createdAt", isDate: true },
    { header: "Created Time", field: "createdAt", isTime: true },
    { header: "Owner Name", field: "Owner_Name" },
    { header: "Pet Name", field: "Pet_Name" },
    { header: "Phone Number", field: "Phone_Number", prefix: "61" },
    { header: "Medical Concern", field: "Medical_Concern" }
  ],
    imaging: [
    { header: "Created Date", field: "createdAt", isDate: true },
    { header: "Created Time", field: "createdAt", isTime: true },
    { header: "Pet Name", field: "Pet_Name" },
    { header: "Owner Name", field: "Owner_Name" },
    { header: "Phone Number", field: "Phone_Number", prefix: "61" }
  ],
    neurology: [
    { header: "Created Date", field: "createdAt", isDate: true },
    { header: "Created Time", field: "createdAt", isTime: true },
    { header: "Pet Name", field: "Pet_Name" },
    { header: "Owner Name", field: "Owner_Name" },
    { header: "Phone Number", field: "Phone_Number", prefix: "61" }
  ],
  
  surgery: [
    { header: "Created Date", field: "createdAt", isDate: true },
    { header: "Created Time", field: "createdAt", isTime: true },
    { header: "Pet Name", field: "Pet_Name" },
    { header: "Owner Name", field: "Owner_Name" },
    { header: "Phone Number", field: "Phone_Number", prefix: "61" }
  ],
    rehabilitation: [
    { header: "Created Date", field: "createdAt", isDate: true },
    { header: "Created Time", field: "createdAt", isTime: true },
    { header: "Owner Name", field: "Owner_Name" },
    { header: "Phone Number", field: "Phone_Number", prefix: "61" },
    { header: "Pet Name", field: "Pet_Name" },
    { header: "Created At", field: "createdAt", isDate:true }
  ],
  
  callback: [
    { header: "Created Date", field: "createdAt", isDate: true },
    { header: "Created Time", field: "createdAt", isTime: true },
    { header: "Your Name", field: "Your_Name" },
    { header: "Phone Number", field: "Phone_Number", prefix: "61" },
    { header: "Pet Name", field: "Pet_Name" },
    { header: "Departments", field: "Departments" },
    { header: "Preferred Date", field: "Preferred_Date", isDate: true },
    { header: "Preferred Time", field: "Time_Slot" },
    { header: "Reason for Call", field: "Reason_For_Call" },
  ],
    refund: [
    { header: "Created Date", field: "createdAt", isDate: true },
    { header: "Created Time", field: "createdAt", isTime: true },
    { header: "Pet Name", field: "Pet_Name" },
    { header: "Owner Name", field: "Owner_Name" },
    { header: "Phone Number", field: "Phone_Number", prefix: "61" },
    { header: "Visit Date", field: "Visit_Date",isDate:true },
    { header: "Amount Paid", field: "Amount_Paid" },
    { header: "Paynow Name", field: "Paynow_Name" },
    { header: "Refund Reason", field: "Refund_Reason" }
  ],
    billing: [
    { header: "Created Date", field: "createdAt", isDate: true },
    { header: "Created Time", field: "createdAt", isTime: true },
    { header: "Pet Name", field: "Pet_Name" },
    { header: "Owner Name", field: "Owner_Name" },
    { header: "Invoice Number", field: "Invoice_Number" },
    { header: "Billing Query", field: "Billing_Query" }
  ],
};

