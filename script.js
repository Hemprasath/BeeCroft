// function showSection(type) {
//   const allSections = [
//     document.getElementById("new-appointment"),
//     document.getElementById("reschedule-appointment"),
//     document.getElementById("cancel-appointment"),
//     document.querySelector(".callback"),
//     document.querySelector(".deposit"),
//     document.querySelector(".refund"),
//     document.getElementById("admitted-form"),
//     document.getElementById("medication-enquiries-form"),
//     document.getElementById("avian-exotics-form"),
//     document.getElementById("cardiology-form"),
//     document.getElementById("internal-form"),
//     document.getElementById("imaging-form"),
//     document.getElementById("billing-form"),
//     document.getElementById("neurology-form"),
//     document.getElementById("surgery-form"),
//     document.getElementById("rehabilitation-form"),
//   ];

//   document.addEventListener("DOMContentLoaded", () => {
//     document.querySelectorAll('input[type="file"]').forEach((fileInput) => {
//       fileInput.addEventListener("change", function () {
//         const file = this.files[0];
//         const msgDiv = this.parentElement.querySelector(".messages");
//         msgDiv.innerHTML = "";
//         this.classList.remove("is-invalid", "is-valid");

//         const maxSize = Number(this.dataset.maxSize) || 5000000; // Base-10 5MB

//         if (file && file.size > maxSize) {
//           this.classList.add("is-invalid");
//           msgDiv.innerHTML = `<div class="text-danger small">File must be less than 5MB. Selected: ${(
//             file.size /
//             1024 /
//             1024
//           ).toFixed(2)}MB</div>`;
//           this.value = "";
//         } else if (file) {
//           this.classList.add("is-valid");
//         }
//       });
//     });
//   });

//   const submitBtn = document.querySelector(".btn-submit");

//   // Hide all sections first
//   allSections.forEach((section) => {
//     if (section) section.style.display = "none";
//   });

//   const messageBox = document.getElementById("formMessage");
//   if (messageBox) {
//     messageBox.textContent = "";
//     messageBox.style.color = "";
//   }

//   // Show relevant section
//   if (type === "new_appointment") {
//     document.getElementById("new-appointment").style.display = "block";
//     window.currentFormType = "new_appointment";
//     document.getElementById("formType-new").value = "new_appointment";
//     submitBtn.textContent = "Request Appointment";
//   } else if (type === "reschedule") {
//     document.getElementById("reschedule-appointment").style.display = "block";
//     window.currentFormType = "reschedule";
//     submitBtn.textContent = "Reschedule Now";
//   } else if (type === "cancel") {
//     document.getElementById("cancel-appointment").style.display = "block";
//     window.currentFormType = "cancel";
//     submitBtn.textContent = "Cancel Appointment";
//   } else if (type === "callback") {
//     document.querySelector(".callback").style.display = "block";
//     window.currentFormType = "callback";
//     submitBtn.textContent = "Submit";
//   } else if (type === "deposit") {
//     document.querySelector(".deposit").style.display = "block";
//     window.currentFormType = "deposit";
//     submitBtn.textContent = "Submit";
//   } else if (type === "refund") {
//     document.querySelector(".refund").style.display = "block";
//     window.currentFormType = "refund";
//     submitBtn.textContent = "Submit";
//   } else if (type === "admitted") {
//     document.getElementById("admitted-form").style.display = "block";
//     window.currentFormType = "admitted";
//     submitBtn.textContent = "Submit";
//   } else if (type === "medication") {
//     document.getElementById("medication-enquiries-form").style.display =
//       "block";
//     window.currentFormType = "medication";
//     submitBtn.textContent = "Submit";
//   } else if (type === "avian") {
//     document.getElementById("avian-exotics-form").style.display = "block";
//     window.currentFormType = "avian";
//     submitBtn.textContent = "Submit";
//   } else if (type === "cardiology") {
//     document.getElementById("cardiology-form").style.display = "block";
//     window.currentFormType = "cardiology";
//     submitBtn.textContent = "Submit";
//   } else if (type === "internal") {
//     document.getElementById("internal-form").style.display = "block";
//     window.currentFormType = "internal";
//     submitBtn.textContent = "Submit";
//   } else if (type === "imaging") {
//     document.getElementById("imaging-form").style.display = "block";
//     window.currentFormType = "imaging";
//     submitBtn.textContent = "Submit";
//   } else if (type === "billing") {
//     document.getElementById("billing-form").style.display = "block";
//     window.currentFormType = "billing";
//     submitBtn.textContent = "Submit";
//   } else if (type === "neurology") {
//     document.getElementById("neurology-form").style.display = "block";
//     window.currentFormType = "neurology";
//     submitBtn.textContent = "Submit";
//   } else if (type === "surgery") {
//     document.getElementById("surgery-form").style.display = "block";
//     window.currentFormType = "surgery";
//     submitBtn.textContent = "Submit";
//   } else if (type === "rehabilitation") {
//     document.getElementById("rehabilitation-form").style.display = "block";
//     window.currentFormType = "rehabilitation";
//     submitBtn.textContent = "Submit";
//   }
// }

// function detectFormFromHash() {
//   const hash = window.location.hash.toLowerCase();
//   let sectionType = "";

//   switch (hash) {
//     case "#/new-appointment": sectionType = "new_appointment"; break;
//     case "#/reschedule-appointment": sectionType = "reschedule"; break;
//     case "#/cancel-appointment": sectionType = "cancel"; break;
//     case "#/request-callback": sectionType = "callback"; break;
//     case "#/payment-deposit-enquiries": sectionType = "deposit"; break;
//     case "#/refund-enquiry": sectionType = "refund"; break;
//     case "#/medication-enquiries": sectionType = "medication"; break;
//     case "#/avian-and-exotics": sectionType = "avian"; break;
//     case "#/admitted": sectionType = "admitted"; break;
//     case "#/cardiology": sectionType = "cardiology"; break;
//     case "#/internal-medicine": sectionType = "internal"; break;
//     case "#/outpatient-imaging": sectionType = "imaging"; break;
//     case "#/billing-enquiries": sectionType = "billing"; break;
//     case "#/neurology": sectionType = "neurology"; break;
//     case "#/surgery": sectionType = "surgery"; break;
//     case "#/veterinary-and-rehabilitation": sectionType = "rehabilitation"; break;
//     default: sectionType = "new_appointment";
//   }

//   showSection(sectionType);
// }

// document.addEventListener("DOMContentLoaded", detectFormFromHash);
// window.addEventListener("hashchange", detectFormFromHash);

// const idToHashMap = {
//   "new-appointment": "new-appointment",
//   "reschedule-appointment": "reschedule-appointment",
//   "cancel-appointment": "cancel-appointment",
//   "admitted-form": "admitted",
//   "medication-enquiries-form": "medication-enquiries",
//   "avian-exotics-form": "avian-exotics",
//   "cardiology-form": "cardiology",
//   "internal-form": "internal",
//   "imaging-form": "imaging",
//   "billing-form": "billing",
//   "neurology-form": "neurology",
//   "surgery-form": "surgery",
//   "rehabilitation-form": "rehabilitation"
// };

// const classSelectors = {
//   "callback": "callback",
//   "deposit": "deposit",
//   "refund": "refund"
// };

// const baseURL = "https://beecroft.messagly.com/form.html#";

// // IDs
// Object.entries(idToHashMap).forEach(([id, hash]) => {
//   const element = document.getElementById(id);
//   if (element) {
//     element.addEventListener("click", () => {
//       window.location.href = `${baseURL}${hash}`;
//     });
//   }
// });

// // Class selectors
// Object.entries(classSelectors).forEach(([className, hash]) => {
//   const element = document.querySelector(`.${className}`);
//   if (element) {
//     element.addEventListener("click", () => {
//       window.location.href = `${baseURL}${hash}`;
//     });
//   }
// });

// Allow only letters and space

// const BASE_URL = "https://api-beecroft.messagly.com";
const BASE_URL =  "http://localhost:5000";

document.querySelectorAll(".letters-only").forEach((el) =>
  el.addEventListener("keypress", (e) => {
    if (!/[A-Za-z ]/.test(e.key)) e.preventDefault();
  })
);

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".digits-only").forEach((el) =>
    el.addEventListener("keypress", (e) => {
      if (!/[0-9]/.test(e.key)) e.preventDefault();
    })
  );
});


function showThankYouMessage() {
  const formWrapper = document.getElementById("form-wrapper");
  const messageDiv = document.getElementById("messageDiv");

  if (!formWrapper || !messageDiv) {
    console.error("Missing #form-wrapper or #thank-you-message in HTML.");
    return;
  }

  formWrapper.classList.add("d-none");
  messageDiv.classList.remove("d-none");
}


async function submitVisibleForm(e) {
  e?.preventDefault();

  let formId = "";

  switch (window.currentFormType) {
    case "new_appointment":
      formId = "new-form";
      break;
    case "reschedule":
      formId = "reschedule-form";
      break;
    case "cancel":
      formId = "cancel-form";
      break;
    case "callback":
      formId = "callback-form";
      break;
    case "deposit":
      formId = "deposit-form";
      break;
    case "refund":
      formId = "refund-form";
      break;
    case "admitted":
      formId = "admitted-form";
      break;
    case "medication":
      formId = "medication-enquiries-form";
      break;
    case "avian":
      formId = "avian-exotics-form";
      break;
    case "cardiology":
      formId = "cardiology-form";
      break;
    case "internal":
      formId = "internal-form";
      break;
    case "imaging":
      formId = "imaging-form";
      break;
    case "billing":
      formId = "billing-form";
      break;
    case "neurology":
      formId = "neurology-form";
      break;
    case "surgery":
      formId = "surgery-form";
      break;
    case "rehabilitation":
      formId = "rehabilitation-form";
      break;
    default:
      console.log("Unknown form type.");
      return;
  }

  const form = document.getElementById(formId);
  if (!form) {
    console.log("No form found.");
    return;
  }

  // Bootstrap validation UI
  form.classList.add("was-validated");
  if (!form.checkValidity()) {
    document.getElementById("formSuccess")?.classList.add("d-none");
    return;
  }

  // Success alert (optional UI feedback)
  const successAlert = document.getElementById("formSuccess");
  successAlert?.classList.remove("d-none");
  setTimeout(() => {
    successAlert?.classList.add("d-none");
  }, 10000);

  const isFileUpload = ["medication", "deposit"].includes(window.currentFormType);
  let options;

  if (isFileUpload) {
    const formData = new FormData(form);
    formData.append("formType", window.currentFormType);

    if (window.currentFormType === "deposit" && typeof depositSelectedFiles !== "undefined") {
      depositSelectedFiles.forEach((file) => {
        formData.append("Payment_Deposit_info_Document", file);
      });
    }

    if (window.currentFormType === "medication" && typeof medicationSelectedFiles !== "undefined") {
      medicationSelectedFiles.forEach((file) => {
        formData.append("Medication_Document", file);
      });
    }

    options = {
      method: "POST",
      body: formData,
    };
  } else {
    const formData = new FormData(form);
    formData.append("formType", window.currentFormType);

    const data = Object.fromEntries(formData.entries());

    options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
  }

  try {
    const response = await fetch(`${BASE_URL}/submit-form`, options);
    let result;
    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      result = await response.json();
    } else {
      const text = await response.text();
      result = { raw: text };
    }

    const messageBox = document.getElementById("formMessage");

    if (response.ok) {
      showThankYouMessage();

      messageBox.textContent = result.message || "Form submitted successfully.";
      messageBox.style.color = "green";

      setTimeout(() => {
        messageBox.textContent = "";
        messageBox.style.color = "";
      }, 10000);

      if (result.whatsappSent) {
        console.log("WhatsApp thank you message sent.");
      }
    } else {
      messageBox.textContent = result.error || "Submission failed.";
      messageBox.style.color = "red";
      setTimeout(() => {
        messageBox.textContent = "";
        messageBox.style.color = "";
      }, 10000);
    }

  } catch (err) {
    console.log("Error submitting form: " + err.message);
  }
}

// time slot change
document.addEventListener("DOMContentLoaded", function () {
  const today = new Date().toISOString().split("T")[0];
  document.querySelectorAll(".min-today").forEach((input) => {
    input.setAttribute("min", today);
  });
});

let depositSelectedFiles = [];
let medicationSelectedFiles = [];

// DEPOSIT FILES
function handleDepositFileSelect(input) {
  const maxFiles = 4;
  const maxTotalSize = 20971520; // 20MB
  const newFiles = Array.from(input.files);
  const messagesDiv = input.closest(".col-12").querySelector(".messages");
  const fileList = document.getElementById("deposit-file-list");

  messagesDiv.innerHTML = "";

  let combinedFiles = [...depositSelectedFiles];

  for (let file of newFiles) {
    if (combinedFiles.length >= maxFiles) break;
    combinedFiles.push(file);
  }

  combinedFiles = combinedFiles.filter(
    (file, index, self) =>
      index === self.findIndex(f => f.name === file.name && f.size === file.size)
  );

  if (combinedFiles.length > maxFiles) {
    messagesDiv.innerHTML = `<div class="text-danger">You can upload a maximum of ${maxFiles} files.</div>`;
    return;
  }

  const totalSize = combinedFiles.reduce((sum, file) => sum + file.size, 0);
  if (totalSize > maxTotalSize) {
    const totalMB = (totalSize / (1024 * 1024)).toFixed(2);
    messagesDiv.innerHTML = `<div class="text-danger">Total file size (${totalMB} MB) exceeds 20MB limit.</div>`;
    return;
  }

  depositSelectedFiles = combinedFiles;
  fileList.innerHTML = "";

  depositSelectedFiles.forEach((file, i) => {
    const wrapper = document.createElement("div");
    wrapper.className = "d-flex justify-content-between align-items-center bg-light p-2 rounded mb-1";
    wrapper.innerHTML = `
<span class="text-truncate" style="max-width: 80%;">${file.name} (${(file.size / 1024).toFixed(1)} KB)</span>
<button type="button" class="btn btn-sm btn-danger" onclick="removeDepositFile(${i})">✖</button>
    `;
    fileList.appendChild(wrapper);
  });

  input.value = "";
}

function removeDepositFile(index) {
  depositSelectedFiles.splice(index, 1);
  const listContainer = document.getElementById("deposit-file-list");
  listContainer.innerHTML = "";
  depositSelectedFiles.forEach((file, i) => {
    const wrapper = document.createElement("div");
    wrapper.className = "d-flex justify-content-between align-items-center bg-light p-2 rounded mb-1";
    wrapper.innerHTML = `
<span class="text-truncate" style="max-width: 80%;">${file.name}</span>
<button type="button" class="btn btn-sm btn-danger" onclick="removeDepositFile(${i})">✖</button>
    `;
    listContainer.appendChild(wrapper);
  });
}

// MEDICATION FILES
function handleMedicationFileSelect(input) {
  const maxFiles = 4;
  const maxTotalSize = 20971520; // 20MB
  const newFiles = Array.from(input.files);
  const messagesDiv = input.closest(".col-12").querySelector(".messages");
  const fileList = document.getElementById("medication-file-list");

  messagesDiv.innerHTML = "";

  let combinedFiles = [...medicationSelectedFiles];

  for (let file of newFiles) {
    if (combinedFiles.length >= maxFiles) break;
    combinedFiles.push(file);
  }

  combinedFiles = combinedFiles.filter(
    (file, index, self) =>
      index === self.findIndex(f => f.name === file.name && f.size === file.size)
  );

  if (combinedFiles.length > maxFiles) {
    messagesDiv.innerHTML = `<div class="text-danger">You can upload a maximum of ${maxFiles} files.</div>`;
    return;
  }

  const totalSize = combinedFiles.reduce((sum, file) => sum + file.size, 0);
  if (totalSize > maxTotalSize) {
    const totalMB = (totalSize / (1024 * 1024)).toFixed(2);
    messagesDiv.innerHTML = `<div class="text-danger">Total file size (${totalMB} MB) exceeds 20MB limit.</div>`;
    return;
  }

  medicationSelectedFiles = combinedFiles;
  fileList.innerHTML = "";

  medicationSelectedFiles.forEach((file, i) => {
    const wrapper = document.createElement("div");
    wrapper.className = "d-flex justify-content-between align-items-center bg-light p-2 rounded mb-1";
    wrapper.innerHTML = `
<span class="text-truncate" style="max-width: 80%;">${file.name} (${(file.size / 1024).toFixed(1)} KB)</span>
<button type="button" class="btn btn-sm btn-danger" onclick="removeMedicationFile(${i})">✖</button>
    `;
    fileList.appendChild(wrapper);
  });

  input.value = "";
}

function removeMedicationFile(index) {
  medicationSelectedFiles.splice(index, 1);
  const listContainer = document.getElementById("medication-file-list");
  listContainer.innerHTML = "";
  medicationSelectedFiles.forEach((file, i) => {
    const wrapper = document.createElement("div");
    wrapper.className = "d-flex justify-content-between align-items-center bg-light p-2 rounded mb-1";
    wrapper.innerHTML = `
<span class="text-truncate" style="max-width: 80%;">${file.name}</span>
<button type="button" class="btn btn-sm btn-danger" onclick="removeMedicationFile(${i})">✖</button>
    `;
    listContainer.appendChild(wrapper);
  });
}

document.querySelectorAll('.custom-date').forEach(input => {
  // Show native date picker on focus if supported
  input.addEventListener('focus', function () {
    if (this.showPicker) this.showPicker();
  });

  // Handle change event for AM/PM logic
  input.addEventListener('change', function () {
    const selectedDate = new Date(this.value);
    const today = new Date();

    const isToday = selectedDate.toDateString() === today.toDateString();
    const currentHour = today.getHours();

    const form = this.closest("form");
    const amRadio = form.querySelector('input[type="radio"][value="AM"]');

    if (amRadio) {
      const shouldDisable = isToday && currentHour >= 12;

      amRadio.disabled = shouldDisable;

      if (shouldDisable && amRadio.checked) {
        amRadio.checked = false;
      }
    }
  });
});
