const formFieldConfig = {
    new_appointment: {
        template: "BeeCroft New Appointment",
        fields: [
            "Species",
            "Pet_Name",
            "Owner_Name",
            "Phone_Number",
            "Primary_Veterinary",
            "Departments",
            "Preferred_Date",
            "Time_Slot",
            "Concern_Brief"
        ]
    } ,
    reschedule: {
        template: "BeeCroft Reschedule Appointment",
        fields: [
            "Pet_Name",
            "Owner_Name",
            "Phone_Number",
            "Existing_Appt_Date",
            "Preferred_Date",
            "Time_Slot",
            "Reason_For_Reschedule"
        ]
    },
    cancel: {
        template: "BeeCroft Cancel Appointment",
        fields: [
            "Pet_Name",
            "Owner_Name",
            "Phone_Number",
            "Existing_Appt_Date",
            "Reason_For_Cancel"
        ]
    },
    admitted: {
        template: "BeeCroft Admitted",
        fields: [
            "Pet_Name",
            "Owner_Name",
            "Phone_Number",
            "help"
        ]
    },
    medication: {
        template: "BeeCroft Medication Enquiries",
        fields: [
            "Pet_Name",
            "Owner_Name",
            "Phone_Number",
            "Medication_In_Use",
            "Refill_Request",
            "Medication_Document"
        ]
    },
    avian: {
        template: "BeeCroft Avian and Exotics",
        fields: [
            "Pet_Name",
            "Owner_Name",
            "Phone_Number",
            "Primary_Care_Clinic",
            "Medical_Concern",
        ]
    },
    cardiology: {
        template: "BeeCroft Cardiology",
        fields: [
            "Pet_Name",
            "Owner_Name",
            "Phone_Number",
            "Primary_Care_Clinic",
            "Medical_Concern",
        ]
    },
    internal: {
        template: "BeeCroft Internal Medicine",
        fields: [
            "Pet_Name",
            "Owner_Name",
            "Phone_Number",
            "Primary_Care_Clinic",
            "Medical_Concern"
        ]
    },
    imaging: {
        template: "BeeCroft Outpatient Imaging (MRI/CT)",
        fields: [
            "Pet_Name",
            "Owner_Name",
            "Phone_Number",
            "Primary_Care_Clinic",
            "Medical_Concern"
        ]
    },
    neurology: {
        template: "BeeCroft Neurology",
        fields: [
            "Pet_Name",
            "Owner_Name",
            "Phone_Number",
            "Primary_Care_Clinic",
            "Medical_Concern"
        ]
    },
    surgery: {
        template: "BeeCroft Surgery",
        fields: [
            "Pet_Name",
            "Owner_Name",
            "Phone_Number",
            "Primary_Care_Clinic",
            "Medical_Concern"
        ]
    },
    rehabilitation: {
        template: "BeeCroft Rehab & Hydrotherapy",
        fields: [
            "Pet_Name",
            "Owner_Name",
            "Phone_Number",
            "Primary_Care_Clinic",
            "Medical_Concern"
        ]
    },
    billing: {
        template: "Beecroft Billing Enquiries",
        fields: [
            "Pet_Name",
            "Owner_Name",
            "Invoice_Number",
            "Billing_Query"
        ]
    },
    callback: {
        template: "BeeCroft Request a Callback",
        fields: [
            "Pet_Name",
            "Your_Name",
            "Phone_Number",
            "Departments",
            "Preferred_Date",
            "Time_Slot",
            "Reason_For_Call"
        ]
    },
    deposit: {
        template: "BeeCroft Payment Deposit Info",
        fields: [
            "Pet_Name",
            "Owner_Name",
            "Invoice_Number",
            "Deposit_Query",
            "Email_Address",
            "Payment_Deposit_info_Document"
        ]
    },
    refund: {
        template: "BeeCroft Refund Enquiries",
        fields: [
            "Pet_Name",
            "Owner_Name",
            "Phone_Number",
            "Visit_Date",
            "Amount_Paid",
            "Paynow_Name",
            "Refund_Reason"
        ]
    }
}

module.exports = formFieldConfig;