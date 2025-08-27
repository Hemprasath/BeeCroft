
// const menu = [
//   { title: "Appointments", icon: "fa-calendar", submenu: ["New Appointment", "Reschedule Appointment", "Cancel Appointment"] },
//   { title: "Hospitalization", icon: "fa-hospital", submenu: ["Admitted"] },
//   { title: "Medication Enquiries", icon: "fa-pills", submenu: ["Medication Enquiries"] },
//   { title: "Department Enquiries", icon: "fa-building", submenu: ["Avian and Exotics", "Cardiology", "Internal Medicine", "Outpatient Imaging (MRI/CT/Ultrasound scan etc.)", "Neurology", "Surgery", "Veterinary Rehabilitation & Hydrotherapy"] },
//   { title: "Request a Callback", icon: "fa-phone", submenu: ["Request a Callback"] },
//   { title: "Pay Deposit", icon: "fa-credit-card", submenu: ["Payment Deposit Enquiries", "Refund Enquiries", "Billing Enquiries"] },
//   { title: "Users", icon: "fa-users", submenu: [] },
//   { title: "Log Out", icon: "fa-right-from-bracket", submenu: [] }
// ];


// // const BASE_URL = "https://api-beecroft.messagly.com";
// const BASE_URL = "http://localhost:5000";

// const sidebar = document.getElementById('sidebar');
// const content = document.getElementById('content');
// const toggleBtn = document.getElementById('menu-toggle');


// toggleBtn.addEventListener('click', () => {
//   sidebar.classList.toggle('open');
// });


// menu.forEach(item => {
//   const hasSubmenu = item.submenu && item.submenu.length > 0 && item.title !== "Users";
//   const menuItem = document.createElement("div");
//   menuItem.classList.add("menu-item");
//   const contentDiv = document.createElement("div");
//   contentDiv.classList.add("menu-item-content");
//   contentDiv.innerHTML = `
//         <i class="fa-solid ${item.icon}"></i>
//         <span class="label">${item.title}</span>
//       `;
//   menuItem.appendChild(contentDiv);

//   let arrow = null;
//   if (hasSubmenu) {
//     arrow = document.createElement("span");
//     arrow.classList.add("arrow");
//     arrow.innerHTML = "&#9662;";
//     menuItem.appendChild(arrow);
//   }
//   sidebar.appendChild(menuItem);


//   if (item.title === "Users") {
//     menuItem.addEventListener("click", (e) => {
//       e.stopPropagation();
//       closeAllSubmenus();
//       setActiveMenu(menuItem);
//       content.innerHTML = Users();
//       setTimeout(() => {
//         const form = document.getElementById("createUserForm");
//         const tableBody = document.getElementById("usersTableBody");

//          setupPasswordToggle("toggleUserPassword", "userPassword");

//         let currentDeleteId = null;

//         function showToast(message, type = 'success') {
//           const toastBox = new bootstrap.Toast(document.getElementById('toastBox'));
//           const toastMsg = document.getElementById('toastMessage');
//           const toastElement = document.getElementById('toastBox');

//           toastElement.classList.remove('bg-success', 'bg-danger');
//           toastElement.classList.add(`bg-${type}`);
//           toastMsg.textContent = message;
//           toastBox.show();
//         }


//         async function loadUsers() {
//           try {
//             const response = await fetch(`${BASE_URL}/api/users`);
//             const users = await response.json();

//             tableBody.innerHTML = "";
//             users.forEach(user => {
//               const row = `
//               <tr data-id="${user._id}">
//                 <td>${user.username}</td>
//                 <td>61${user.phone}</td>
//                 <td>${user.email}</td>
//                 <td>${user.createdBy || 'Admin'}</td>
//                 <td>${user.role}</td>
//                 <td>
//                   <button class="btn btn-sm btn-primary mb-2 mb-md-0  edit-user">Edit</button>
//                   <button class="btn btn-sm btn-danger delete-user">Delete</button>
//                 </td>
//               </tr>`;
//               tableBody.insertAdjacentHTML('beforeend', row);
//             });
//           } catch (error) {
//             console.error("Error loading users:", error);
//           }
//         }


//         form.addEventListener("submit", async function (e) {
//           e.preventDefault();

//           const userData = {
//             username: form.username.value.trim(),
//             phone: form.phone.value.trim(),
//             email: form.email.value.trim(),
//             role: form.role.value,
//             password: document.getElementById("userPassword").value.trim()

//           };

//           const emailError = document.getElementById('emailError');
//           // Regex: allow .com, .in, .co.in, .org.in
//           const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in|co\.in|org\.in)$/i;

//           if (!regex.test(userData.email)) {
//             e.preventDefault(); // stop form submission
//             emailError.textContent = "Invalid email. Must end with .com, .in, .co.in, or .org.in";
//             setTimeout(() => {
//               emailError.textContent=""
//             })

//           } else {
//             emailError.textContent = "";
//           }

//           const passwordError = document.getElementById('passwordError')
//           const passwordRegex = /^[A-Z][A-Za-z0-9]*[!@#$%^&*(),.?":{}|<>][A-Za-z0-9!@#$%^&*(),.?":{}|<>]{3,}$/;
//           if (!passwordRegex.test(userData.password)) {
//             e.preventDefault(); // stop form submission
//             passwordError.textContent = "Start with capital, 8+ chars, include number & symbol.";

//           } else {
//             passwordError.textContent = "";
//           }

//           try {
//             const response = await fetch(`${BASE_URL}/api/users`, {
//               method: "POST",
//               headers: { "Content-Type": "application/json" },
//               credentials: "include",
//               body: JSON.stringify(userData)
//             });

//             const result = await response.json();

//             if (response.ok) {
//               form.reset();
//               bootstrap.Modal.getInstance(document.getElementById("createUserModal")).hide();
//               showToast("User created successfully");
//               loadUsers();
//             } else {
//               e.preventDefault()
//               const formError = document.getElementById('formError')
//               formError.textContent = result.message
//               setTimeout(() => {
//                 formError.textContent = "";
//               }, 5000);

//             }
//           } catch (error) {
//             console.error("Error saving user:", error);
//             const formError = document.getElementById('formError')
//             formError.textContent = "Failed to Create User"
//           }
//         });


//         tableBody.addEventListener("click", (e) => {
//           if (e.target.classList.contains("edit-user")) {
//             const row = e.target.closest("tr");
//             const id = row.dataset.id;
//             document.getElementById("editUserId").value = id;
//             document.getElementById("editUserName").value = row.children[0].textContent;
//             document.getElementById("editUserPhone").value = row.children[1].textContent;
//             document.getElementById("editUserEmail").value = row.children[2].textContent;
//             document.getElementById("editUserRole").value = row.children[4].textContent;

//             const modal = new bootstrap.Modal(document.getElementById("editUserModal"));
//             modal.show();
//           }
//         });


//         document.getElementById("editUserForm").addEventListener("submit", async (e) => {
//           e.preventDefault();
//           const id = document.getElementById("editUserId").value;

//           const updatedUser = {
//             username: document.getElementById("editUserName").value.trim(),
//             phone: document.getElementById("editUserPhone").value.trim(),
//             email: document.getElementById("editUserEmail").value.trim(),
//             role: document.getElementById("editUserRole").value,
//             password: document.getElementById("userPassword").value.trim()
//           };

//           try {
//             const response = await fetch(`${BASE_URL}/api/users/${id}`, {
//               method: "PUT",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify(updatedUser)
//             });

//             const result = await response.json();

//             if (response.ok) {
//               bootstrap.Modal.getInstance(document.getElementById("editUserModal")).hide();
//               showToast("User updated successfully");
//               loadUsers();
//             } else {
//               showToast(result.message || "Failed to update", "danger");
//             }
//           } catch (err) {
//             console.error("Update error:", err);
//             showToast("Server error while updating", "danger");
//           }
//         });


//         tableBody.addEventListener("click", (e) => {
//           if (e.target.classList.contains("delete-user")) {
//             currentDeleteId = e.target.closest("tr").dataset.id;
//             const modal = new bootstrap.Modal(document.getElementById("deleteUserModal"));
//             modal.show();
//           }
//         });

//         document.getElementById("confirmDeleteBtn").addEventListener("click", async () => {
//           if (!currentDeleteId) return;
//           try {
//             const response = await fetch(`${BASE_URL}/api/users/${currentDeleteId}`, {
//               method: "DELETE"
//             });

//             const result = await response.json();

//             if (response.ok) {
//               bootstrap.Modal.getInstance(document.getElementById("deleteUserModal")).hide();
//               showToast("User deleted successfully");
//               loadUsers();
//             } else {
//               showToast(result.message || "Failed to delete user", "danger");
//             }
//           } catch (err) {
//             console.error("Delete error:", err);
//             showToast("Server error while deleting", "danger");
//           }
//         });

//         loadUsers();
//       }, 0);
//     });
//     return;
//   }

//   if (item.title === "Log Out") {
//     menuItem.addEventListener("click", () => {
//       showLogoutPopup();
//     });
//     return;
//   }

//   if (hasSubmenu) {
//     const submenu = document.createElement("ul");
//     submenu.classList.add("submenu");

//     item.submenu.forEach(sub => {
//       const li = document.createElement("li");
//       li.textContent = sub;

//       li.addEventListener("click", (e) => {
//         e.stopPropagation();
//         if (window.innerWidth <= 768) {
//           sidebar.classList.remove('open');
//         }

//         setActiveMenu(menuItem, li);
//         const noBackgroundSections = [
//           "New Appointment",
//           "Reschedule Appointment",
//           "Cancel Appointment",
//           "Admitted",
//           "Medication Enquiries",
//           "Avian and Exotics",
//           "Cardiology",
//           "Internal Medicine",
//           "Neurology",
//           "Surgery",
//           "Veterinary Rehabilitation & Hydrotherapy",
//           "Request a Callback",
//           "Payment Deposit Enquiries",
//           "Refund Enquiries",
//           "Billing Enquiries",
//           "Outpatient Imaging (MRI/CT/Ultrasound scan etc.)"
//         ];

//         if (noBackgroundSections.includes(sub)) {
//           content.classList.remove("with-bg");
//         } else {
//           content.classList.add("with-bg");
//         }


//         if (sub === "New Appointment") {
//           renderNewAppointment();
//         }
//         else if (sub === "Reschedule Appointment") {
//           renderRescheduleAppointment();
//         }
//         else if (sub === "Cancel Appointment") {
//           renderCancelAppointment();
//         }

//         else if (sub === "Admitted") {
//           renderAdmitted();
//         }
//         else if (sub === "Medication Enquiries") {
//           renderMedicationEnquiry();
//         } else if (sub === "Avian and Exotics") {
//           renderAvianandExotics();
//         } else if (sub === "Cardiology") {
//           renderCardiology();
//         } else if (sub === "Internal Medicine") {
//           renderInternalMedicine()
//         } else if (item.title === "Department Enquiries" && sub === "Outpatient Imaging (MRI/CT/Ultrasound scan etc.)") {
//           renderOutpatientImaging();
//         }
//         else if (sub === "Neurology") {
//           renderNeurology()
//         } else if (sub === "Surgery") {
//           renderSurgery()
//         } else if (sub === "Veterinary Rehabilitation & Hydrotherapy") {
//           renderVeterinaryRehabilitationHydrotherapy()
//         } else if (sub === "Request a Callback") {
//           renderRequestaCallback()
//         } else if (sub === "Payment Deposit Enquiries") {
//           renderPaymentDepositEnquiries()
//         } else if (sub === "Refund Enquiries") {
//           renderRefundEnquiries()
//         } else if (sub === "Billing Enquiries") {
//           renderBillingEnquiries()
//         } else {
//           content.innerHTML = `<h1>${item.title}</h1><p>You selected <b>${sub}</b></p>`;
//         }
//       });
//       submenu.appendChild(li);
//     });

//     sidebar.appendChild(submenu);
//     menuItem.addEventListener("click", () => {
//       const isVisible = submenu.classList.contains("show");
//       document.querySelectorAll(".submenu").forEach(sm => sm.classList.remove("show"));
//       document.querySelectorAll(".arrow").forEach(a => a.classList.remove("rotate"));
//       if (!isVisible) {
//         submenu.classList.add("show");
//         if (arrow) arrow.classList.add("rotate");
//       }
//     });
//   }
// });
// function setActiveMenu(menuItem, subItem = null) {
//   document.querySelectorAll(".menu-item, .submenu li").forEach(el => el.classList.remove("active"));
//   menuItem.classList.add("active");
//   if (subItem) subItem.classList.add("active");
// }
// function closeAllSubmenus() {
//   document.querySelectorAll(".submenu").forEach(sm => sm.classList.remove("show"));
//   document.querySelectorAll(".arrow").forEach(a => a.classList.remove("rotate"));
//   document.querySelectorAll(".menu-item, .submenu li").forEach(el => el.classList.remove("active"));
// }



// let allData = [];

// async function fetchAllData() {
//   try {
//     const response = await fetch(`${BASE_URL}/formdatas`);
//     if (!response.ok) {
//       throw new Error("Failed to fetch data");
//     }

//     allData = await response.json();
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// }

// let currentRenderFunction = null;


// function formatTime(dateString) {
//   const date = new Date(dateString);
//   return date.toLocaleTimeString('en-IN', {
//     hour: '2-digit',
//     minute: '2-digit',
//     hour12: true
//   });
// }

// function formatDate(dateString) {
//   if (!dateString) return "";
//   const date = new Date(dateString);
//   return date.toLocaleDateString("en-GB");
// }



// window.onload = fetchAllData;

// function isToday(dateStr) {
//   if (!dateStr) return false;
//   const today = new Date();
//   const date = new Date(dateStr);
//   return (
//     date.getFullYear() === today.getFullYear() &&
//     date.getMonth() === today.getMonth() &&
//     date.getDate() === today.getDate()
//   );
// }

// function renderTodayTables() {
//   const content = document.getElementById("content");

//   // filter for today
//   const createdTodayData = allData.filter(
//     (item) => item.formType === "new_appointment" && isToday(item.createdAt)
//   );

//   const preferredTodayData = allData.filter(
//     (item) => item.formType === "new_appointment" && isToday(item.Preferred_Date)
//   );

//   function generateTable(title, data, tableId) {
//     if (data.length === 0) {
//       return `
//       <div class="card shadow-sm mb-4 p-4 bg-light">
//         <h4 class="mb-2">${title}</h4>
//         <p class="text-muted">No records found</p>
//       </div>
//     `;
//     }

//     let rows = data
//       .map(
//         (item) => `
//       <tr>
//         <td>${formatDate(item.createdAt) || "-"}</td>
//         <td>${item.Owner_Name || "-"}</td>
//         <td>61${item.Phone_Number || "-"}</td>
//         <td>${formatDate(item.Preferred_Date) || "-"}</td>
//       </tr>
//     `
//       )
//       .join("");

//     return `
//     <div class="card shadow-sm mb-5 p-4">
//       <h4 class="mb-3">${title}</h4>
//       <div class="table-responsive">
//         <table id="${tableId}" class="table table-hover table-bordered text-center align-middle display nowrap table-striped" style="width:100%">
//           <thead>
//             <tr>
//               <th>Created Date</th>
//               <th>Owner Name</th>
//               <th>Phone Number</th>
//               <th>Preferred Date</th>
//             </tr>
//           </thead>
//           <tbody>${rows}</tbody>
//         </table>
//       </div>
//     </div>
//   `;
//   }

//   content.innerHTML = `
//     ${generateTable("Appointments Created Today", createdTodayData, "createdTodayTable")}
//     ${generateTable("Appointments Scheduled for Today", preferredTodayData, "preferredTodayTable")}
//   `;

//   setTimeout(() => {
//     $("#createdTodayTable").DataTable({ scrollX: true });
//     $("#preferredTodayTable").DataTable({ scrollX: true });
//   }, 0);
// }

// async function initTodayAppointments() {
//   await fetchAllData();
//   renderTodayTables();
// }

// initTodayAppointments();


// function NewAppointment(range = "week", from = null, to = null) {
//   let filteredData = allData.filter(
//     (item) => item.formType === "new_appointment"
//   );

//   filteredData = filterByDateRange(filteredData, "createdAt", range, from, to);

//   if (filteredData.length === 0) {
//     return `<p>No New Appointment found</p>`;
//   }

//   let rows = "";
//   filteredData.forEach((item) => {
//     rows += `
//       <tr id="${item._id}">
//         <td>${formatDate(item.createdAt) || ""}</td>
//         <td>${formatTime(item.createdAt) || ""}</td>
//         <td>${item.Species || ""}</td>
//         <td>${item.Pet_Name || ""}</td>
//         <td>${item.Owner_Name || ""}</td>
//         <td>61${item.Phone_Number || ""}</td>
//         <td>${item.Primary_Veterinary || ""}</td>
//         <td>${item.Departments || ""}</td>
//         <td>${formatDate(item.Preferred_Date) || ""}</td>
//         <td>${item.Time_Slot || ""}</td>
//         <td>${item.Concern_Brief || ""}</td>
//       </tr>
//     `;
//   });

//   return `
// <div class="datatable-container">
//   <div class="table-responsive-custom">
//     <table id="newappointmentTable" class="table table-bordered table-striped table-hover text-center align-middle display">
//       <thead>
//         <tr>
//           <th>Created Date</th>
//           <th>Created Time</th>
//           <th>Species</th>
//           <th>Pet Name</th>
//           <th>Pet Owner Name</th>
//           <th>Phone Number</th>
//           <th>Primary Veterinary</th>
//           <th>Departments</th>
//           <th>Preferred Date</th>
//           <th>Preferred Time Slot</th>
//           <th>Brief Description</th>
//         </tr>
//       </thead>
//       <tbody>
//         ${rows}
//       </tbody>
//     </table>
//   </div>
// </div>
//   `;
// }


// function RescheduleAppointment(range = "week", from = null, to = null) {
//   let filteredData = allData.filter(item => item.formType === "reschedule");


//   filteredData = filterByDateRange(filteredData, "createdAt", range, from, to);


//   if (filteredData.length === 0) {
//     return `<p>No reschedule appointments found.</p>`;
//   }

//   const rows = filteredData.map((item) => `
//     <tr>
//       <td>${formatDate(item.createdAt) || ''}</td>
//       <td>${formatTime(item.createdAt) || ''}</td>
//       <td>${item.Pet_Name || "-"}</td>
//       <td>${item.Owner_Name || "-"}</td>
//       <td>61${item.Phone_Number || "-"}</td>
//       <td>${formatDate(item.Existing_Appt_Date) || "-"}</td>
//       <td>${formatDate(item.Preferred_Date) || "-"}</td>
//       <td>${item.Time_Slot || "-"}</td>
//       <td>${item.Reason_For_Reschedule || "-"}</td>
//     </tr>
//   `).join("");

//   return `

//       <div class="datatable-container">
//   <div class="table-responsive-custom">
//       <table id="rescheduleappointmentTable" class="table table-bordered table-striped table-hover text-center align-middle display">
//         <thead class="bg">
//           <tr>
//             <th>Created Date</th>
//             <th>Created Time</th>
//             <th>Pet Name</th>
//             <th>Owner Name</th>
//             <th>Phone Number</th>
//             <th>Previous Date</th>
//             <th>Rescheduled Date</th>
//             <th>Preferred Time Slot</th>
//             <th>Reason For Reschedule</th>
//           </tr>
//         </thead>
//         <tbody>
//           ${rows}
//         </tbody>
//       </table>
//     </div>
//     </div>
//   `;
// }


// function CancelAppointment(range = "week", from = null, to = null) {
//   let filteredData = allData.filter(item => item.formType === "cancel");


//   filteredData = filterByDateRange(filteredData, "createdAt", range, from, to);

//   if (filteredData.length === 0) {
//     return `<p>No cancel appointments found.</p>`;
//   }

//   const rows = filteredData.map((item) => `
//     <tr id="${item._id}">
//       <td>${formatDate(item.createdAt) || ''}</td>
//       <td>${formatTime(item.createdAt) || ''}</td>
//       <td>${item.Pet_Name || "-"}</td>
//       <td>${item.Owner_Name || "-"}</td>
//       <td>61${item.Phone_Number || "-"}</td>
//       <td>${formatDate(item.Existing_Appt_Date) || "-"}</td>
//       <td>${item.Reason_For_Cancel || "-"}</td>
//     </tr>
//   `).join("");

//   return `


//    <div class="datatable-container" style="overflow-x: auto;">
//   <table id="cancelappointmentTable" class="table table-bordered table-striped nowrap" style="width:100%">
//     <thead>
//       <tr>
//         <th>Created Date</th>
//         <th>Created Time</th>
//         <th>Pet Name</th>
//         <th>Owner Name</th>
//         <th>Phone Number</th>
//         <th>scheduled Date</th>
//         <th>Reason For Cancel</th>
//       </tr>
//     </thead>
//     <tbody>
//       ${rows}
//     </tbody>
//   </table>
// </div>

//   `;
// }


// function Admitted(range = "week", from = null, to = null) {
//   let filteredData = allData.filter(item => item.formType === "admitted");


//   filteredData = filterByDateRange(filteredData, "createdAt", range, from, to);

//   if (filteredData.length === 0) {
//     return `<p>No admitted records found.</p>`;
//   }

//   const rows = filteredData.map(item => `
//     <tr id="${item._id}">
//       <td>${formatDate(item.createdAt) || ''}</td>
//       <td>${formatTime(item.createdAt) || ''}</td>
//       <td>${item.Pet_Name || '-'}</td>
//       <td>${item.Owner_Name || '-'}</td>
//       <td>61${item.Phone_Number || '-'}</td>
//       <td>${item.help || '-'}</td>
//     </tr>
//   `).join("");

//   return `

//     <div class="datatable-container" >
//       <table id="AdmittedTable" class="table table-bordered table-striped">
//         <thead>
//           <tr>
//             <th>Created Date</th>
//             <th>Created Time</th>
//             <th>Registered Pet Name</th>
//             <th>Registered Pet Owner Name</th>
//             <th>Registered Phone Number</th>
//             <th>How can we help?</th>
//           </tr>
//         </thead>
//         <tbody>
//           ${rows}
//         </tbody>
//       </table>
//     </div>
//   `;
// }

// function showImage(photoPath) {
//   document.getElementById("modalImage").src = photoPath;
// }


// function loadMedicationPhotos(photos) {
//   const container = document.getElementById("modalImageContainer");
//   container.innerHTML = "";

//   if (!photos || photos.length === 0) {
//     container.innerHTML = "<p>No image to preview.</p>";
//     return;
//   }

//   photos.forEach(photo => {
//     const img = document.createElement("img");
//     img.src = photo;
//     img.alt = "Preview";
//     img.className = "img-fluid mb-3";
//     container.appendChild(img);
//   });
// }


// function MedicationEnquiry(range = "week", from = null, to = null) {
//   let filteredData = allData.filter(item => item.formType === "medication");

//   filteredData = filterByDateRange(filteredData, "createdAt", range, from, to);

//   if (filteredData.length === 0) {
//     return `<p>No medication enquiry records found.</p>`;
//   }


//   const rows = filteredData.map(item => {


//     const fileLinks = (item.uploadedFiles && item.uploadedFiles.length > 0)
//       ? item.uploadedFiles.map(file => {
//         const fileUrl = `${BASE_URL}/view-file/${item._id}/${encodeURIComponent(file.name)}`;
//         if (file.type?.startsWith("image/")) {
//           return `<button class="btn btn-sm btn-secondary mb-2 me-1" onclick="showImagePreview('${fileUrl}')">View Image</button>`;
//         } else {
//           return `<a class="btn btn-sm btn-secondary mb-2" href="${fileUrl}" target="_blank">View File</a>`;
//         }
//       }).join("<br>")
//       : '-';


//     return `
//       <tr id="${item._id}">
//         <td>${formatDate(item.createdAt) || ''}</td>
//         <td>${formatTime(item.createdAt) || ''}</td>
//         <td>${item.Pet_Name || '-'}</td>
//         <td>${item.Owner_Name || '-'}</td>
//         <td>61${item.Phone_Number || '-'}</td>
//         <td>${item.Refill_Request || '-'}</td>
//         <td>${item.Medication_In_Use || '-'}</td>
//         <td>${fileLinks}</td>
//       </tr>
//     `;
//   }).join("");

//   return `
//     <div class="datatable-container">
//       <table id="MedicationEnquiryTable" class="table table-bordered table-striped">
//         <thead>
//           <tr>
//             <th>Created Date</th>
//             <th>Created Time</th>
//             <th>Pet Name</th>
//             <th>Owner Name</th>
//             <th>Phone Number</th>
//             <th>Refill Request</th>
//             <th>Medication In Use</th>
//             <th>Uploaded Files</th>
//           </tr>
//         </thead>
//         <tbody>
//           ${rows}
//         </tbody>
//       </table>
//     </div>
//   `;
// }



// function AvianandExotics(range = "week", from = null, to = null) {
//   let filteredData = allData.filter(item => item.formType === "avian");


//   filteredData = filterByDateRange(filteredData, "createdAt", range, from, to);

//   if (filteredData.length === 0) {
//     return `<p>No avian and exotics records found.</p>`;
//   }

//   const rows = filteredData.map(item => `
//     <tr id="${item._id}">
//       <td>${formatDate(item.createdAt) || ''}</td>
//       <td>${formatTime(item.createdAt) || ''}</td>
//       <td>${item.Pet_Name || '-'}</td>
//       <td>${item.Owner_Name || '-'}</td>
//       <td>61${item.Phone_Number || '-'}</td>
//       <td>${item.Primary_Care_Clinic || '-'}</td>
//       <td>${item.Medical_Concern || '-'}</td>
//     </tr>
//   `).join("");

//   return `
//     <div class="datatable-container">
//       <table id="AvianTable" class="table table-bordered table-striped">
//         <thead>
//           <tr>
//             <th>Created Date</th>
//             <th>Created Time</th>
//             <th>Pet Name</th>
//             <th>Owner Name</th>
//             <th>Phone Number</th>
//             <th>Primary Care Clinic</th>
//             <th>Medical Concern</th>
//           </tr>
//         </thead>
//         <tbody>
//           ${rows}
//         </tbody>
//       </table>
//     </div>
//   `;
// }



// function Cardiology(range = "week", from = null, to = null) {
//   let filteredData = allData.filter(item => item.formType === "cardiology");


//   filteredData = filterByDateRange(filteredData, "createdAt", range, from, to);

//   if (filteredData.length === 0) {
//     return `<p>No Cardiology records found.</p>`;
//   }

//   let rows = "";
//   filteredData.forEach((item) => {
//     rows += `
//       <tr id="${item._id}">
//         <td>${formatDate(item.createdAt) || ''}</td>
//         <td>${formatTime(item.createdAt) || ''}</td>
//         <td>${item.Owner_Name || ""}</td>
//         <td>${item.Pet_Name || ""}</td>
//         <td>61${item.Phone_Number || ""}</td>
//         <td>${item.Medical_Concern || ""}</td>
//       </tr>
//     `;
//   });

//   return `
//     <div>
//       <div class="datatable-container" >
//         <table id="CardiologyTable" class="display nowrap table-bordered table-striped">
//           <thead>
//             <tr>
//               <th>Created Date</th>
//               <th>Created Time</th>
//               <th>Owner Name</th>
//               <th>Pet Name</th>
//               <th>Phone Number</th>
//               <th>Medical Concern</th>
//             </tr>
//           </thead>
//           <tbody>
//             ${rows}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   `;
// }




// function InternalMedicine(range = "week", from = null, to = null) {
//   let filteredData = allData.filter(item => item.formType === "internal");


//   filteredData = filterByDateRange(filteredData, "createdAt", range, from, to);

//   if (filteredData.length === 0) {
//     return `<p>No InternalMedicine records found.</p>`;
//   }

//   let rows = "";
//   filteredData.forEach((item, index) => {
//     rows += `
//       <tr id="${item._id}">
//         <td>${formatDate(item.createdAt) || ''}</td>
//         <td>${formatTime(item.createdAt) || ''}</td>
//         <td>${item.Owner_Name || ""}</td>
//         <td>${item.Pet_Name || ""}</td>
//         <td>61${item.Phone_Number || ""}</td>
//         <td>${item.Medical_Concern || ""}</td>
//       </tr>
//     `;
//   });

//   return `
//     <div class="datatable-container">
//       <table id="InternalMedicineTable" class="display nowrap table-bordered table-striped">
//         <thead>
//           <tr>
//             <th>Created Date</th>
//             <th>Created Time</th>
//             <th>Owner Name</th>
//             <th>Pet Name</th>
//             <th>Phone Number</th>
//             <th>Medical Concern</th>
//           </tr>
//         </thead>
//         <tbody>
//           ${rows}
//         </tbody>
//       </table>
//     </div>
//   `;
// }



// function OutpatientImaging(range = "week", from = null, to = null) {
//   let filteredData = allData.filter(item => item.formType === "imaging");


//   filteredData = filterByDateRange(filteredData, "createdAt", range, from, to);

//   if (filteredData.length === 0) {
//     return `<p>No OutpatientImaging records found.</p>`;
//   }

//   let rows = "";
//   filteredData.forEach(item => {
//     rows += `
//       <tr id="${item._id}">
//         <td>${formatDate(item.createdAt) || ''}</td>
//         <td>${formatTime(item.createdAt) || ''}</td>
//         <td>${item.Pet_Name || ''}</td>
//         <td>${item.Owner_Name || ''}</td>
//         <td>61${item.Phone_Number || ''}</td>
//       </tr>
//     `;
//   });

//   return `

//     <div class="datatable-container">
//       <table id="OutpatientImagingTable" class="display nowrap table-bordered table-striped">
//         <thead>
//           <tr>
//             <th>Created Date</th>
//             <th>Created Time</th>
//             <th>Pet Name</th>
//             <th>Owner Name</th>
//             <th>Phone Number</th>
//           </tr>
//         </thead>
//         <tbody>
//           ${rows}
//         </tbody>
//       </table>
//     </div>
//   `;
// }






// function Neurology(range = "week", from = null, to = null) {
//   let filteredData = allData.filter(item => item.formType === "neurology");

//   // Use the global date filter
//   filteredData = filterByDateRange(filteredData, "createdAt", range, from, to);

//   if (filteredData.length === 0) {
//     return `<p>No Neurology records found.</p>`;
//   }

//   let rows = "";
//   filteredData.forEach(item => {
//     rows += `
//       <tr id="${item._id}">
//         <td>${formatDate(item.createdAt) || ''}</td>
//         <td>${formatTime(item.createdAt) || ''}</td>
//         <td>${item.Pet_Name || ''}</td>
//         <td>${item.Owner_Name || ''}</td>
//         <td>61${item.Phone_Number || ''}</td>
//       </tr>
//     `;
//   });

//   return `
//     <div>



//       <div class="datatable-container">
//         <table id="NeurologyTable" class="display nowrap table-bordered table-striped">
//           <thead>
//             <tr>
//             <th>Created Date</th>
//             <th>Created Time</th>
//               <th>Pet Name</th>
//               <th>Owner Name</th>
//               <th>Phone Number</th>
//             </tr>
//           </thead>
//           <tbody>
//             ${rows}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   `;
// }





// // 

// function Surgery(range = "week", from = null, to = null) {
//   let filteredData = allData.filter(item => item.formType === "surgery");

//   // Use the global date filter
//   filteredData = filterByDateRange(filteredData, "createdAt", range, from, to);

//   if (filteredData.length === 0) {
//     return `<p>No Surgery records found.</p>`;
//   }

//   let rows = "";
//   filteredData.forEach(item => {
//     rows += `
//       <tr>
//         <td>${formatDate(item.createdAt) || ''}</td>
//         <td>${formatTime(item.createdAt) || ''}</td>
//         <td>${item.Pet_Name || ''}</td>
//         <td>${item.Owner_Name || ''}</td>
//         <td>61${item.Phone_Number || ''}</td>
//       </tr>
//     `;
//   });

//   return `
//     <div class="datatable-container">
//       <table id="SurgeryTable" class="display nowrap table-bordered table-striped">
//         <thead>
//           <tr>
//             <th>Created Date</th>
//             <th>Created Time</th>
//             <th>Pet Name</th>
//             <th>Owner Name</th>
//             <th>Phone Number</th>
//           </tr>
//         </thead>
//         <tbody>
//           ${rows}
//         </tbody>
//       </table>
//     </div>
//   `;
// }



// function VeterinaryRehabilitationHydrotherapy(range = "week", from = null, to = null) {
//   let filteredData = allData.filter(item => item.formType === "rehabilitation");

//   // Use the global date filter
//   filteredData = filterByDateRange(filteredData, "createdAt", range, from, to);


//   if (filteredData.length === 0) {
//     return `<p>No Veterinary Rehabilitation Hydrotherapy records found.</p>`;
//   }


//   let rows = "";
//   filteredData.forEach(item => {
//     rows += `
//       <tr id="${item._id}">
//         <td>${formatDate(item.createdAt) || ''}</td>
//         <td>${formatTime(item.createdAt) || ''}</td>
//         <td>${item.Owner_Name || ''}</td>
//         <td>61${item.Phone_Number || ''}</td>
//         <td>${item.Pet_Name || ''}</td>
//         <td>${new Date(item.createdAt).toLocaleDateString()}</td>
//       </tr>
//     `;
//   });

//   return `
//     <div class="datatable-container">
//       <table id="VeterinaryRehabilitationHydrotherapyTable" class="display nowrap table-bordered table-striped">
//         <thead>
//           <tr>
//             <th>Created Date</th>
//             <th>Created Time</th>
//             <th>Owner Name</th>
//             <th>Phone Number</th>
//             <th>Pet Name</th>
//             <th>Created At</th>
//           </tr>
//         </thead>
//         <tbody>
//           ${rows}
//         </tbody>
//       </table>
//     </div>
//   `;
// }


// function RequestaCallback(range = "week", from = null, to = null) {
//   let filteredData = allData.filter(item => item.formType === "callback");

//   // Use the global date filter
//   filteredData = filterByDateRange(filteredData, "createdAt", range, from, to);
//   if (filteredData.length === 0) {
//     return `<p>No Request a Callback records found.</p>`;
//   }

//   let rows = "";
//   filteredData.forEach(item => {
//     rows += `
//       <tr id="${item._id}">
//         <td>${formatDate(item.createdAt) || ''}</td>
//         <td>${formatTime(item.createdAt) || ''}</td>
//         <td>${item.Your_Name || ''}</td>
//         <td>61${item.Phone_Number || ''}</td>
//         <td>${item.Pet_Name || ''}</td>
//         <td>${item.Departments || ''}</td>
//         <td>${formatDate(item.Preferred_Date) || "-"}</td>
//         <td>${item.Time_Slot || ''}</td>
//         <td>${item.Reason_For_Call || ''}</td>
//       </tr>
//     `;
//   });

//   return `
//     <div>
//       <div class="datatable-container">
//         <table id="RequestaCallbackTable" class="display nowrap table-bordered table-striped">
//           <thead>
//             <tr>
//               <th>Created Date</th>
//               <th>Created Time</th>
//               <th>Your Name</th>
//               <th>Phone Number</th>
//               <th>Pet Name</th>
//               <th>Departments</th>
//               <th>Preferred Date</th>
//               <th>Preferred Time</th>
//               <th>Reason for Call</th>
//             </tr>
//           </thead>
//           <tbody>
//             ${rows}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   `;
// }


// function PaymentDepositEnquiries(range = "week", from = null, to = null) {
//   let filteredData = allData.filter(item => item.formType === "deposit");

//   // Use the global date filter
//   filteredData = filterByDateRange(filteredData, "createdAt", range, from, to);

//   if (filteredData.length === 0) {
//     return `<p>No Payment Deposit Enquiries records found.</p>`;
//   }

//   const rows = filteredData.map(item => {
//     const fileLinks = (item.uploadedFiles && item.uploadedFiles.length > 0)
//       ? item.uploadedFiles.map(file => {
//         const fileUrl = `${BASE_URL}/view-file/${item._id}/${encodeURIComponent(file.name)}`;
//         if (file.type?.startsWith("image/")) {
//           return `<button class="btn btn-sm btn-secondary mb-2 me-1" onclick="showImagePreview('${fileUrl}')">View Image</button>`;
//         } else {
//           return `<a class="btn btn-sm btn-secondary mb-2" href="${fileUrl}" target="_blank">View File</a>`;
//         }
//       }).join("<br>")
//       : '-';

//     return `
//       <tr id="${item._id}">
//         <td>${formatDate(item.createdAt) || ''}</td>
//         <td>${formatTime(item.createdAt) || ''}</td>
//         <td>${item.Pet_Name || ''}</td>
//         <td>${item.Owner_Name || ''}</td>
//         <td>${item.Invoice_Number || ''}</td>
//         <td>${item.Deposit_Query || ''}</td>
//         <td>${fileLinks}</td>
//       </tr>
//     `;
//   }).join("");

//   return `
//     <div class="datatable-container" >
//       <table id="PaymentDepositEnquiriesTable" class="display nowrap table-bordered table-striped">
//         <thead>
//           <tr>
//             <th>Created Date</th>
//             <th>Created Time</th>
//             <th>Pet Name</th>
//             <th>Owner Name</th>
//             <th>Invoice Number</th>
//             <th>Deposit Query</th>
//             <th>Uploaded files</th>
//           </tr>
//         </thead>
//         <tbody>
//           ${rows}
//         </tbody>
//       </table>
//     </div>
//   `;
// }


// function RefundEnquiries(range = "week", from = null, to = null) {
//   let filteredData = allData.filter(item => item.formType === "refund");

//   // Use the global date filter
//   filteredData = filterByDateRange(filteredData, "createdAt", range, from, to);

//   if (filteredData.length === 0) {
//     return `<p>No Refund Enquiries records found.</p>`;
//   }

//   let rows = "";
//   filteredData.forEach(item => {
//     rows += `
//       <tr id="${item._id}">
//         <td>${formatDate(item.createdAt) || ''}</td>
//         <td>${formatTime(item.createdAt) || ''}</td>
//         <td>${item.Pet_Name || ''}</td>
//         <td>${item.Owner_Name || ''}</td>
//         <td>61${item.Phone_Number || ''}</td>
//         <td>${item.Visit_Date || ''}</td>
//         <td>${item.Amount_Paid || ''}</td>
//         <td>${item.Paynow_Name || ''}</td>
//         <td>${item.Refund_Reason || ''}</td>
//       </tr>
//     `;
//   });

//   return `
//     <div class="datatable-container">
//       <table id="RefundEnquiriesTable" class="display nowrap table-bordered table-striped">
//         <thead>
//           <tr>
//             <th>Created Date</th>
//             <th>Created Time</th>
//             <th>Pet Name</th>
//             <th>Owner Name</th>
//             <th>Phone Number</th>
//             <th>Visit Date</th>
//             <th>Amount Paid</th>
//             <th>Paynow Name</th>
//             <th>Refund Reason</th>
//           </tr>
//         </thead>
//         <tbody>
//           ${rows}
//         </tbody>
//       </table>
//     </div>
//   `;
// }



// function BillingEnquiries(range = "week", from = null, to = null) {
//   let filteredData = allData.filter(item => item.formType === "billing");

//   // Use the global date filter
//   filteredData = filterByDateRange(filteredData, "createdAt", range, from, to);

//   if (filteredData.length === 0) {
//     return `<p>No Refund Enquiries records found.</p>`;
//   }


//   let rows = "";
//   filteredData.forEach(item => {
//     rows += `
//       <tr id="${item._id}">
//         <td>${formatDate(item.createdAt) || ''}</td>
//         <td>${formatTime(item.createdAt) || ''}</td>
//         <td>${item.Pet_Name || ''}</td>
//         <td>${item.Owner_Name || ''}</td>
//         <td>${item.Invoice_Number || ''}</td>
//         <td>${item.Billing_Query || ''}</td>
//       </tr>
//     `;
//   });

//   return `
//     <div>

//       <div class="datatable-container">
//         <table id="BillingEnquiriesTable" class="display nowrap table-bordered table-striped">
//           <thead>
//             <tr>
//               <th>Created Date</th>
//               <th>Created Time</th>
//               <th>Pet Name</th>
//               <th>Owner Name</th>
//               <th>Invoice Number</th>
//               <th>Billing Query</th>
//             </tr>
//           </thead>
//           <tbody>
//             ${rows}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   `;
// }



// function Users() {
//   content.classList.remove("with-bg");

//   return `
//     <div>
//       <div class="d-flex justify-content-between align-items-center mb-3">
//         <h1 class="page-title">Users</h1>
//         <div class="p-3">
//         <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#createUserModal">
//           <span style="font-weight: bold; font-size: 20px;">+</span> Create
//         </button>
//         </div>
//       </div>
 
//       <!-- Toast Notification -->
//       <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 1055">
//         <div id="toastBox" class="toast text-white bg-success border-0" role="alert">
//           <div class="d-flex">
//             <div class="toast-body" id="toastMessage"></div>
//             <button type="button" class="btn-close btn-close-white m-auto me-2" data-bs-dismiss="toast"></button>
//           </div>
//         </div>
//       </div>
 
//       <!-- Create Modal -->
//       <div class="modal fade" id="createUserModal" tabindex="-1" aria-labelledby="createUserModalLabel" aria-hidden="true">
//         <div class="modal-dialog">
//           <div class="modal-content">
//             <form id="createUserForm">
//               <div class="modal-header">
//                 <h5 class="modal-title" id="createUserModalLabel">Create User</h5>
//                 <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//               </div>
//               <div class="modal-body">
//                 <div class="mb-3">
//                   <label for="UserName" class="form-label">Name</label>
//                   <input type="text" class="form-control letters-only" id="UserName" name="username" required>
//                 </div>


//                 <div class="mb-3">
//                     <div class="form-group">
//                   <label for="userPassword">Password</label>
//                   <div style="position: relative;">
//                     <input type="password" class="form-control" id="userPassword" name="password" placeholder="Enter password" minlength="8" required />
//                    <span id="toggleUserPassword"
//                   style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); cursor: pointer;">
//                  <i class="bi bi-eye"></i>
//                </span>
//                </div>
//                <div class="error" id="userPasswordError"></div>
//               </div>
//                 </div>
//                 <div class="mb-3">
//                   <label for="UserPhone" class="form-label">Phone</label>
//                   <input type="text" class="form-control digits-only" maxlength="8" id="UserPhone" name="phone" required>
//                 </div>
//                 <div class="mb-3">
//                 <label for="UserEmail" class="form-label">Email</label>
//                   <input 
//                   type="email" 
//                   class="form-control" 
//                   id="UserEmail" 
//                   name="email" 
//                   required
//                    />
//                  <div class="error" id="emailError" style="color:red;"></div>
//                   </div>

//                 <div class="mb-3">
//                   <label for="UserRole" class="form-label">Role</label>
//                   <select class="form-select" id="UserRole" name="role" required>
//                     <option value="">Select Role</option>
//                     <option value="Owner">Owner</option>
//                   </select>
//                 </div>
//               </div>

//               <div class='ms-2 mb-1 error' id='formError' style="color:red;"></div>

//               <div class="modal-footer">
//                 <button type="submit" class="btn btn-primary">Save</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
 
//       <!-- Edit Modal -->
//       <div class="modal fade" id="editUserModal" tabindex="-1">
//         <div class="modal-dialog">
//           <div class="modal-content">
//             <form id="editUserForm">
//               <input type="hidden" id="editUserId">
//               <div class="modal-header">
//                 <h5 class="modal-title">Edit User</h5>
//                 <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
//               </div>
//               <div class="modal-body">
//                 <input type="text" class="form-control mb-2 letters-only" id="editUserName" required />
//                 <input type="text" class="form-control mb-2 digits-only" maxlength="8"id="editUserPhone" required />
//                 <input type="email" class="form-control mb-2" id="editUserEmail" required />
//                 <select class="form-select" id="editUserRole" required>
//                   <option value="">Select Role</option>
//                   <option value="Owner">Owner</option>
//                 </select>
//               </div>
//               <div class="modal-footer">
//                 <button type="submit" class="btn btn-primary">Update</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>

 
//       <!-- Delete Modal -->
//       <div class="modal fade" id="deleteUserModal" tabindex="-1">
//         <div class="modal-dialog">
//           <div class="modal-content">
//             <div class="modal-header">
//               <h5 class="modal-title">Confirm Delete</h5>
//               <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
//             </div>
//             <div class="modal-body">Are you sure you want to delete this user?</div>
//             <div class="modal-footer">
//               <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
//               <button type="button" class="btn btn-danger" id="confirmDeleteBtn">Delete</button>
//             </div>
//           </div>
//         </div>
//       </div>
 
//       <!-- Table -->
//       <div class="table-responsive">
//         <table class="table table-bordered table-striped align-items-center">
//           <thead>
//             <tr>
//               <th>User Name</th>
//               <th>Phone No.</th>
//               <th>Email</th>
//               <th>Created By</th>
//               <th>Role</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody id="usersTableBody"></tbody>
//         </table>
//       </div>
//     </div>
//   `;
// }


// document.addEventListener("keypress", (e) => {
//   if (e.target.classList.contains("letters-only") && !/[A-Za-z ]/.test(e.key)) {
//     e.preventDefault();
//   }
//   if (e.target.classList.contains("digits-only") && !/[0-9]/.test(e.key)) {
//     e.preventDefault();
//   }
// });

//  function setupPasswordToggle(toggleId, inputId) {
//       document.getElementById(toggleId).addEventListener('click', function () {
//         const input = document.getElementById(inputId);
//         const icon = this.querySelector('i');
//         const isPassword = input.getAttribute('type') === 'password';

//         input.setAttribute('type', isPassword ? 'text' : 'password');
//         icon.classList.toggle('bi-eye');
//         icon.classList.toggle('bi-eye-slash');
//       });
//     }


// function showToast(message, type = 'success') {
//   const toastBox = new bootstrap.Toast(document.getElementById('toastBox'));
//   const toastMsg = document.getElementById('toastMessage');

//   document.getElementById('toastBox').classList.remove('bg-success', 'bg-danger');
//   document.getElementById('toastBox').classList.add(`bg-${type}`);
//   toastMsg.textContent = message;

//   toastBox.show();
// }




// // Logout


// function showLogoutPopup() {
//   const overlay = document.createElement("div");
//   overlay.className = "logout-overlay";


//   const popup = document.createElement("div");
//   popup.className = "logout-popup";
//   popup.innerHTML = `<p>Are you sure you want to log out?</p>`;

//   const yesBtn = document.createElement("button");
//   yesBtn.className = "btn-yes";
//   yesBtn.textContent = "Yes";

//   yesBtn.addEventListener("click", () => {

//     fetch(`${BASE_URL}/logout`, {
//       method: "POST",
//       credentials: "include",
//     })
//       .then((res) => {
//         if (res.ok) {
//           console.log("Logged out successfully.");
//           window.location.href = "login.html";
//         } else {
//           console.error("Logout failed.");
//         }
//       })
//       .catch((err) => {
//         console.error("Error logging out:", err);
//       });

//     document.body.removeChild(overlay);
//   });

//   const noBtn = document.createElement("button");
//   noBtn.className = "btn-no";
//   noBtn.textContent = "No";
//   noBtn.addEventListener("click", () => {

//     document.body.removeChild(overlay);
//   });

//   popup.appendChild(yesBtn);
//   popup.appendChild(noBtn);
//   overlay.appendChild(popup);
//   document.body.appendChild(overlay);
// }

// function openImagePopup(src) {
//   const modal = document.getElementById("imageModal");
//   const image = document.getElementById("popupImage");
//   image.src = src;
//   modal.style.display = "block";
// }

// function closeImagePopup() {
//   document.getElementById("imageModal").style.display = "none";
// }

// function showImagePreview(imageUrl) {
//   const imgElement = document.getElementById('previewImage');
//   imgElement.src = imageUrl;

//   const modal = new bootstrap.Modal(document.getElementById('imagePreviewModal'));
//   modal.show();
// }







import { formColumns } from './formColumns.js';

const menu = [
  { title: "Appointments", icon: "fa-calendar", submenu: ["New Appointment", "Reschedule Appointment", "Cancel Appointment"] },
  { title: "Hospitalization", icon: "fa-hospital", submenu: ["Admitted"] },
  { title: "Medication Enquiries", icon: "fa-pills", submenu: ["Medication Enquiries"] },
  { title: "Department Enquiries", icon: "fa-building", submenu: ["Avian and Exotics", "Cardiology", "Internal Medicine", "Outpatient Imaging (MRI/CT/Ultrasound scan etc.)", "Neurology", "Surgery", "Veterinary Rehabilitation & Hydrotherapy"] },
  { title: "Request a Callback", icon: "fa-phone", submenu: ["Request a Callback"] },
  { title: "Pay Deposit", icon: "fa-credit-card", submenu: ["Payment Deposit Enquiries", "Refund Enquiries", "Billing Enquiries"] },
  { title: "Users", icon: "fa-users", submenu: [] },
  { title: "Log Out", icon: "fa-right-from-bracket", submenu: [] }
];


// const BASE_URL = "https://api-beecroft.messagly.com";
// const BASE_URL = "http://localhost:5000";

const sidebar = document.getElementById('sidebar');
const content = document.getElementById('content');
const toggleBtn = document.getElementById('menu-toggle');


toggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('open');
});


menu.forEach(item => {
  const hasSubmenu = item.submenu && item.submenu.length > 0 && item.title !== "Users";
  const menuItem = document.createElement("div");
  menuItem.classList.add("menu-item");
  const contentDiv = document.createElement("div");
  contentDiv.classList.add("menu-item-content");
  contentDiv.innerHTML = `
        <i class="fa-solid ${item.icon}"></i>
        <span class="label">${item.title}</span>
      `;
  menuItem.appendChild(contentDiv);

  let arrow = null;
  if (hasSubmenu) {
    arrow = document.createElement("span");
    arrow.classList.add("arrow");
    arrow.innerHTML = "&#9662;";
    menuItem.appendChild(arrow);
  }
  sidebar.appendChild(menuItem);


  if (item.title === "Users") {
    menuItem.addEventListener("click", (e) => {
      e.stopPropagation();
      closeAllSubmenus();
      setActiveMenu(menuItem);
      content.innerHTML = Users();
      setTimeout(() => {
        const form = document.getElementById("createUserForm");
        const tableBody = document.getElementById("usersTableBody");


        let currentDeleteId = null;

        function showToast(message, type = 'success') {
          const toastBox = new bootstrap.Toast(document.getElementById('toastBox'));
          const toastMsg = document.getElementById('toastMessage');
          const toastElement = document.getElementById('toastBox');

          toastElement.classList.remove('bg-success', 'bg-danger');
          toastElement.classList.add(`bg-${type}`);
          toastMsg.textContent = message;
          toastBox.show();
        }


        async function loadUsers() {
          try {
            const response = await fetch(`${BASE_URL}/api/users`, {
              method: "GET",
              credentials: "include", 
              headers: {
                "Content-Type": "application/json"
              }
            });
            const users = await response.json();

            tableBody.innerHTML = "";
            users.forEach(user => {
              const row = `
              <tr data-id="${user._id}">
                <td>${user.username}</td>
                <td>${user.phone}</td>
                <td>${user.email}</td>
                <td>${user.createdBy || 'Admin'}</td>
                <td>${user.role}</td>
                <td>
                  <button class="btn btn-sm btn-primary mb-2 mb-md-0  edit-user">Edit</button>
                  <button class="btn btn-sm btn-danger delete-user">Delete</button>
                </td>
              </tr>`;
              tableBody.insertAdjacentHTML('beforeend', row);
            });
          } catch (error) {
            console.error("Error loading users:", error);
          }
        }


        form.addEventListener("submit", async function (e) {
          e.preventDefault();

          const userData = {
            username: form.username.value.trim(),
            phone: form.phone.value.trim(),
            email: form.email.value.trim(),
            role: form.role.value,

          };

          const emailError = document.getElementById('emailError');
          // Regex: allow .com, .in, .co.in, .org.in
          const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in|co\.in|org\.in)$/i;

          if (!regex.test(userData.email)) {
            e.preventDefault(); // stop form submission
            emailError.textContent = "Invalid email. Must end with .com, .in, .co.in, or .org.in";
            setTimeout(() => {
              emailError.textContent = ""
            })

          } else {
            emailError.textContent = "";
          }

          try {
            const response = await fetch(`${BASE_URL}/api/users`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
              body: JSON.stringify(userData)
            });

            const result = await response.json();

            if (response.ok) {
              form.reset();
              bootstrap.Modal.getInstance(document.getElementById("createUserModal")).hide();

              // Modal for showing temp password
              document.getElementById("tempPasswordUsername").textContent = result.username;
              document.getElementById("tempPasswordValue").textContent = result.tempPassword;
              new bootstrap.Modal(document.getElementById("tempPasswordModal")).show();
              loadUsers();

            } else {
              e.preventDefault()
              const formError = document.getElementById('formError')
              formError.textContent = result.message
              setTimeout(() => {
                formError.textContent = "";
              }, 5000);

            }
          } catch (error) {
            console.error("Error saving user:", error);
            const formError = document.getElementById('formError')
            formError.textContent = "Failed to Create User"
          }
        });


        tableBody.addEventListener("click", (e) => {
          if (e.target.classList.contains("edit-user")) {
            const row = e.target.closest("tr");
            const id = row.dataset.id;
            document.getElementById("editUserId").value = id;
            document.getElementById("editUserName").value = row.children[0].textContent;
            document.getElementById("editUserPhone").value = row.children[1].textContent;
            document.getElementById("editUserEmail").value = row.children[2].textContent;
            document.getElementById("editUserRole").value = row.children[4].textContent;

            const modal = new bootstrap.Modal(document.getElementById("editUserModal"));
            modal.show();
          }
        });


        document.getElementById("editUserForm").addEventListener("submit", async (e) => {
          e.preventDefault();
          const id = document.getElementById("editUserId").value;

          const updatedUser = {
            username: document.getElementById("editUserName").value.trim(),
            phone: document.getElementById("editUserPhone").value.trim(),
            email: document.getElementById("editUserEmail").value.trim(),
            role: document.getElementById("editUserRole").value,
          };

          try {
            const response = await fetch(`${BASE_URL}/api/users/${id}`, {
              method: "PUT",
             credentials: "include",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(updatedUser)
            });

            const result = await response.json();

            if (response.ok) {
              bootstrap.Modal.getInstance(document.getElementById("editUserModal")).hide();
              showToast("User updated successfully");
              loadUsers();
            } else {
              showToast(result.message || "Failed to update", "danger");
            }
          } catch (err) {
            console.error("Update error:", err);
            showToast("Server error while updating", "danger");
          }
        });


        tableBody.addEventListener("click", (e) => {
          if (e.target.classList.contains("delete-user")) {
            currentDeleteId = e.target.closest("tr").dataset.id;
            const modal = new bootstrap.Modal(document.getElementById("deleteUserModal"));
            modal.show();
          }
        });

        document.getElementById("confirmDeleteBtn").addEventListener("click", async () => {
          if (!currentDeleteId) return;
          try {
            const response = await fetch(`${BASE_URL}/api/users/${currentDeleteId}`, {
              method: "DELETE",
              credentials: "include",
            });

            const result = await response.json();

            if (response.ok) {
              bootstrap.Modal.getInstance(document.getElementById("deleteUserModal")).hide();
              showToast("User deleted successfully");
              loadUsers();
            } else {
              showToast(result.message || "Failed to delete user", "danger");
            }
          } catch (err) {
            console.error("Delete error:", err);
            showToast("Server error while deleting", "danger");
          }
        });

        loadUsers();
      }, 0);
    });
    return;
  }

  if (item.title === "Log Out") {
    menuItem.addEventListener("click", () => {
      showLogoutPopup();
    });
    return;
  }

  if (hasSubmenu) {
    const submenu = document.createElement("ul");
    submenu.classList.add("submenu");

    item.submenu.forEach(sub => {
      const li = document.createElement("li");
      li.textContent = sub;

      li.addEventListener("click", (e) => {
        e.stopPropagation();
        if (window.innerWidth <= 768) {
          sidebar.classList.remove('open');
        }

        setActiveMenu(menuItem, li);
        const noBackgroundSections = [
          "New Appointment",
          "Reschedule Appointment",
          "Cancel Appointment",
          "Admitted",
          "Medication Enquiries",
          "Avian and Exotics",
          "Cardiology",
          "Internal Medicine",
          "Neurology",
          "Surgery",
          "Veterinary Rehabilitation & Hydrotherapy",
          "Request a Callback",
          "Payment Deposit Enquiries",
          "Refund Enquiries",
          "Billing Enquiries",
          "Outpatient Imaging (MRI/CT/Ultrasound scan etc.)"
        ];

        if (noBackgroundSections.includes(sub)) {
          content.classList.remove("with-bg");
        } else {
          content.classList.add("with-bg");
        }


        if (sub === "New Appointment") {
          renderNewAppointment();
        }
        else if (sub === "Reschedule Appointment") {
          renderRescheduleAppointment();
        }
        else if (sub === "Cancel Appointment") {
          renderCancelAppointment();
        }

        else if (sub === "Admitted") {
          renderAdmitted();
        }
        else if (sub === "Medication Enquiries") {
          renderMedicationEnquiry();
        } else if (sub === "Avian and Exotics") {
          renderAvianandExotics();
        } else if (sub === "Cardiology") {
          renderCardiology();
        } else if (sub === "Internal Medicine") {
          renderInternalMedicine()
        } else if (item.title === "Department Enquiries" && sub === "Outpatient Imaging (MRI/CT/Ultrasound scan etc.)") {
          renderOutpatientImaging();
        }
        else if (sub === "Neurology") {
          renderNeurology()
        } else if (sub === "Surgery") {
          renderSurgery()
        } else if (sub === "Veterinary Rehabilitation & Hydrotherapy") {
          renderVeterinaryRehabilitationHydrotherapy()
        } else if (sub === "Request a Callback") {
          renderRequestaCallback()
        } else if (sub === "Payment Deposit Enquiries") {
          renderPaymentDepositEnquiries()
        } else if (sub === "Refund Enquiries") {
          renderRefundEnquiries()
        } else if (sub === "Billing Enquiries") {
          renderBillingEnquiries()
        } else {
          content.innerHTML = `<h1>${item.title}</h1><p>You selected <b>${sub}</b></p>`;
        }
      });
      submenu.appendChild(li);
    });

    sidebar.appendChild(submenu);
    menuItem.addEventListener("click", () => {
      const isVisible = submenu.classList.contains("show");
      document.querySelectorAll(".submenu").forEach(sm => sm.classList.remove("show"));
      document.querySelectorAll(".arrow").forEach(a => a.classList.remove("rotate"));
      if (!isVisible) {
        submenu.classList.add("show");
        if (arrow) arrow.classList.add("rotate");
      }
    });
  }
});
function setActiveMenu(menuItem, subItem = null) {
  document.querySelectorAll(".menu-item, .submenu li").forEach(el => el.classList.remove("active"));
  menuItem.classList.add("active");
  if (subItem) subItem.classList.add("active");
}
function closeAllSubmenus() {
  document.querySelectorAll(".submenu").forEach(sm => sm.classList.remove("show"));
  document.querySelectorAll(".arrow").forEach(a => a.classList.remove("rotate"));
  document.querySelectorAll(".menu-item, .submenu li").forEach(el => el.classList.remove("active"));
}



let allData = [];

async function fetchAllData() {
  try {
    const response = await fetch(`${BASE_URL}/formdatas`,{
      method: "GET",
      credentials: "include",  
    });
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    allData = await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

let currentRenderFunction = null;


function formatTime(dateString) {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
}

function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB");
}



window.onload = fetchAllData;

function isToday(dateStr) {
  const today = new Date();
  const date = new Date(dateStr);
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}

function renderTodayTables() {
  const content = document.getElementById("content");

  const createdTodayData = allData.filter(
    (item) => item.formType === "new_appointment" && isToday(item.createdAt)
  );

  const preferredTodayData = allData.filter(
    (item) => item.formType === "new_appointment" && isToday(item.Preferred_Date)
  );


  function generateTable(title, data, tableId) {
    if (data.length === 0) {
      return `
      <div class="card shadow-sm mb-4 p-4 bg-light">
        <h4 class="mb-2">${title}</h4>
        <p class="text-muted">No records found</p>
      </div>
    `;
    }

    let rows = data.map(
      (item) => `
      <tr>
        <td>${formatDate(item.createdAt)}</td>
        <td>${item.Owner_Name || ""}</td>
        <td>61${item.Phone_Number || ""}</td>
        <td>${formatDate(item.Preferred_Date) || ""}</td>
      </tr>
    `
    ).join("");

    return `
    <div class="card shadow-sm mb-5 p-4">
      <h4 class="mb-3">${title}</h4>
      <div class="table-responsive">
        <table id="${tableId}" class="table table-hover table-bordered text-center align-middle display nowrap table-striped" style="width:100%">
          <thead>
            <tr>
              <th>Created Date</th>
              <th>Owner Name</th>
              <th>Phone Number</th>
              <th>Preferred Date</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>
  `;
  }

  content.innerHTML = `
    ${generateTable("Appointments Created Today", createdTodayData, "createdTodayTable")}
    ${generateTable("Appointments Scheduled for Today", preferredTodayData, "preferredTodayTable")}
  `;


  setTimeout(() => {
    $('#createdTodayTable').DataTable({ scrollX: true });
    $('#preferredTodayTable').DataTable({ scrollX: true });
  }, 0);
}


async function initTodayAppointments() {
  showLoadingSpinner()
  await fetchAllData();
  renderTodayTables();
}

initTodayAppointments();


async function renderFormTable(formType, tableId, range = "week", from = null, to = null) {
  let filteredData = allData.filter(item => item.formType === formType);
  filteredData = filterByDateRange(filteredData, "createdAt", range, from, to);

  if (filteredData.length === 0) {
    return `<p>No ${formType.replace("_", " ")} found</p>`;
  }

  const columns = formColumns[formType];

  const rows = filteredData.map(item => {
    return `
      <tr>
        ${columns.map(col => {
          let value = item[col.field] || "-";
          if (col.isDate) value = formatDate(value);
          if (col.isTime) value = formatTime(value);
          if (col.prefix) value = `${col.prefix}${value}`;
          return `<td>${value}</td>`;
        }).join("")}
      </tr>
    `;
  }).join("");

  const headers = columns.map(col => `<th>${col.header}</th>`).join("");

  return `
    <div class="datatable-container">
      <div class="table-responsive-custom">
        <table id="${tableId}" class="display nowrap table-bordered table-striped">
          <thead><tr>${headers}</tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>
  `;
}



function showImage(photoPath) {
  document.getElementById("modalImage").src = photoPath;
}


function loadMedicationPhotos(photos) {
  const container = document.getElementById("modalImageContainer");
  container.innerHTML = "";

  if (!photos || photos.length === 0) {
    container.innerHTML = "<p>No image to preview.</p>";
    return;
  }

  photos.forEach(photo => {
    const img = document.createElement("img");
    img.src = photo;
    img.alt = "Preview";
    img.className = "img-fluid mb-3";
    container.appendChild(img);
  });
}


function MedicationEnquiry(range = "week", from = null, to = null) {
  let filteredData = allData.filter(item => item.formType === "medication");

  filteredData = filterByDateRange(filteredData, "createdAt", range, from, to);

  if (filteredData.length === 0) {
    return `<p>No medication enquiry records found.</p>`;
  }


  const rows = filteredData.map(item => {


    const fileLinks = (item.uploadedFiles && item.uploadedFiles.length > 0)
      ? item.uploadedFiles.map(file => {
        const fileUrl = `${BASE_URL}/view-file/${item._id}/${encodeURIComponent(file.name)}`;
        if (file.type?.startsWith("image/")) {
          return `<button class="btn btn-sm btn-secondary mb-2 me-1" onclick="showImagePreview('${fileUrl}')">View Image</button>`;
        } else {
          return `<a class="btn btn-sm btn-secondary mb-2" href="${fileUrl}" target="_blank">View File</a>`;
        }
      }).join("<br>")
      : '-';


    return `
      <tr id="${item._id}">
        <td>${formatDate(item.createdAt) || ''}</td>
        <td>${formatTime(item.createdAt) || ''}</td>
        <td>${item.Pet_Name || '-'}</td>
        <td>${item.Owner_Name || '-'}</td>
        <td>61${item.Phone_Number || '-'}</td>
        <td>${item.Refill_Request || '-'}</td>
        <td>${item.Medication_In_Use || '-'}</td>
        <td>${fileLinks}</td>
      </tr>
    `;
  }).join("");

  return `
    <div class="datatable-container">
      <table id="MedicationEnquiryTable" class="display nowrap table-bordered table-striped">
        <thead>
          <tr>
            <th>Created Date</th>
            <th>Created Time</th>
            <th>Pet Name</th>
            <th>Owner Name</th>
            <th>Phone Number</th>
            <th>Refill Request</th>
            <th>Medication In Use</th>
            <th>Uploaded Files</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    </div>
  `;
}


function PaymentDepositEnquiries(range = "week", from = null, to = null) {
  let filteredData = allData.filter(item => item.formType === "deposit");

  // Use the global date filter
  filteredData = filterByDateRange(filteredData, "createdAt", range, from, to);

  if (filteredData.length === 0) {
    return `<p>No Payment Deposit Enquiries records found.</p>`;
  }

  const rows = filteredData.map(item => {
    const fileLinks = (item.uploadedFiles && item.uploadedFiles.length > 0)
      ? item.uploadedFiles.map(file => {
        const fileUrl = `${BASE_URL}/view-file/${item._id}/${encodeURIComponent(file.name)}`;
        if (file.type?.startsWith("image/")) {
          return `<button class="btn btn-sm btn-secondary mb-2 me-1" onclick="showImagePreview('${fileUrl}')">View Image</button>`;
        } else {
          return `<a class="btn btn-sm btn-secondary mb-2" href="${fileUrl}" target="_blank">View File</a>`;
        }
      }).join("<br>")
      : '-';

    return `
      <tr id="${item._id}">
        <td>${formatDate(item.createdAt) || ''}</td>
        <td>${formatTime(item.createdAt) || ''}</td>
        <td>${item.Pet_Name || ''}</td>
        <td>${item.Owner_Name || ''}</td>
        <td>${item.Invoice_Number || ''}</td>
        <td>${item.Deposit_Query || ''}</td>
        <td>${fileLinks}</td>
      </tr>
    `;
  }).join("");

  return `
    <div class="datatable-container" >
      <table id="PaymentDepositEnquiriesTable" class="display nowrap table-bordered table-striped">
        <thead>
          <tr>
            <th>Created Date</th>
            <th>Created Time</th>
            <th>Pet Name</th>
            <th>Owner Name</th>
            <th>Invoice Number</th>
            <th>Deposit Query</th>
            <th>Uploaded files</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    </div>
  `;
}


function Users() {
  content.classList.remove("with-bg");

  return `
    <div>
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h1 class="page-title">Users</h1>
        <div class="p-3">
        <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#createUserModal">
          <span style="font-weight: bold; font-size: 20px;">+</span> Create
        </button>
        </div>
      </div>
 
      <!-- Toast Notification -->
      <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 1055">
        <div id="toastBox" class="toast text-white bg-success border-0" role="alert">
          <div class="d-flex">
            <div class="toast-body" id="toastMessage"></div>
            <button type="button" class="btn-close btn-close-white m-auto me-2" data-bs-dismiss="toast"></button>
          </div>
        </div>
      </div>
 
      <!-- Create Modal -->
      <div class="modal fade" id="createUserModal" tabindex="-1" aria-labelledby="createUserModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <form id="createUserForm">
              <div class="modal-header">
                <h5 class="modal-title" id="createUserModalLabel">Create User</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div class="mb-3">
                  <label for="UserName" class="form-label">Name</label>
                  <input type="text" class="form-control letters-only" id="UserName" name="username" required>
                </div>

                <div class="mb-3">
                  <label for="UserPhone" class="form-label">Phone</label>
                  <input type="text" class="form-control digits-only" maxlength="10" id="UserPhone" name="phone" required>
                </div>
                <div class="mb-3">
                <label for="UserEmail" class="form-label">Email</label>
                  <input 
                  type="email" 
                  class="form-control" 
                  id="UserEmail" 
                  name="email" 
                  required
                   />
                 <div class="error" id="emailError" style="color:red;"></div>
                  </div>

                <div class="mb-3">
                  <label for="UserRole" class="form-label">Role</label>
                  <select class="form-select" id="UserRole" name="role" required>
                    <option value="">Select Role</option>
                    <option value="Owner">Owner</option>
                    <option value="Admin">Admin</option>
                    <option value="Staff">Staff</option>
                  </select>
                </div>
              </div>

              <div class='ms-2 mb-1 error' id='formError' style="color:red;"></div>

              <div class="modal-footer">
                <button type="submit" class="btn btn-primary">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Temp Password Modal -->
<div class="modal fade" id="tempPasswordModal" tabindex="-1" aria-labelledby="tempPasswordModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header bg-primary text-white">
        <h5 class="modal-title" id="tempPasswordModalLabel">Temporary Password</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p><strong>Username:</strong> <span id="tempPasswordUsername"></span></p>
        <p><strong>Temporary Password:</strong> 
          <span id="tempPasswordValue" class="text-danger fw-bold"></span>
        </p>
        <small class="text-muted"> Share this password securely with the user.This will not be visible agin.They will be forced to change it on first login.</small>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-success" data-bs-dismiss="modal">Got it</button>
      </div>
    </div>
  </div>
</div>

 
      <!-- Edit Modal -->
      <div class="modal fade" id="editUserModal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <form id="editUserForm">
              <input type="hidden" id="editUserId">
              <div class="modal-header">
                <h5 class="modal-title">Edit User</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div class="modal-body">
                <input type="text" class="form-control mb-2 letters-only" id="editUserName" required />
                <input type="text" class="form-control mb-2 digits-only" maxlength="10" id="editUserPhone" required />
                <input type="email" class="form-control mb-2" id="editUserEmail" required />
                <select class="form-select" id="editUserRole" required>
                  <option value="">Select Role</option>
                  <option value="Owner">Owner</option>
                  <option value="Admin">Admin</option>
                  <option value="Staff">Staff</option>
                </select>
              </div>
              <div class="modal-footer">
                <button type="submit" class="btn btn-primary">Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>

 
      <!-- Delete Modal -->
      <div class="modal fade" id="deleteUserModal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Confirm Delete</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">Are you sure you want to delete this user?</div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-danger" id="confirmDeleteBtn">Delete</button>
            </div>
          </div>
        </div>
      </div>
 
      <!-- Table -->
      <div class="table-responsive">
        <table class="table table-bordered table-striped align-items-center">
          <thead>
            <tr>
              <th>User Name</th>
              <th>Phone No.</th>
              <th>Email</th>
              <th>Created By</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="usersTableBody"></tbody>
        </table>
      </div>
    </div>
  `;
}


document.addEventListener("keypress", (e) => {
  if (e.target.classList.contains("letters-only") && !/[A-Za-z ]/.test(e.key)) {
    e.preventDefault();
  }
  if (e.target.classList.contains("digits-only") && !/[0-9]/.test(e.key)) {
    e.preventDefault();
  }
});



function showToast(message, type = 'success') {
  const toastBox = new bootstrap.Toast(document.getElementById('toastBox'));
  const toastMsg = document.getElementById('toastMessage');

  document.getElementById('toastBox').classList.remove('bg-success', 'bg-danger');
  document.getElementById('toastBox').classList.add(`bg-${type}`);
  toastMsg.textContent = message;

  toastBox.show();
}




// Logout


function showLogoutPopup() {
  const overlay = document.createElement("div");
  overlay.className = "logout-overlay";


  const popup = document.createElement("div");
  popup.className = "logout-popup";
  popup.innerHTML = `<p>Are you sure you want to log out?</p>`;

  const yesBtn = document.createElement("button");
  yesBtn.className = "btn-yes";
  yesBtn.textContent = "Yes";

  yesBtn.addEventListener("click", () => {

    fetch(`${BASE_URL}/logout`, {
      method: "POST",
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          window.location.href = "login.html";
        } else {
          console.error("Logout failed.");
        }
      })
      .catch((err) => {
        console.error("Error logging out:", err);
      });

    document.body.removeChild(overlay);
  });

  const noBtn = document.createElement("button");
  noBtn.className = "btn-no";
  noBtn.textContent = "No";
  noBtn.addEventListener("click", () => {

    document.body.removeChild(overlay);
  });

  popup.appendChild(yesBtn);
  popup.appendChild(noBtn);
  overlay.appendChild(popup);
  document.body.appendChild(overlay);
}

function openImagePopup(src) {
  const modal = document.getElementById("imageModal");
  const image = document.getElementById("popupImage");
  image.src = src;
  modal.style.display = "block";
}

function closeImagePopup() {
  document.getElementById("imageModal").style.display = "none";
}

function showImagePreview(imageUrl) {
  const imgElement = document.getElementById('previewImage');
  imgElement.src = imageUrl;

  const modal = new bootstrap.Modal(document.getElementById('imagePreviewModal'));
  modal.show();
}

window.showImagePreview = showImagePreview;

function createGlobalDateFilter(containerId, onFilterChange, selectedValue = "week", customFrom = null, customTo = null) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <label for="dateRange" class="me-2 fw-bold">Filter by:</label>
    <select id="dateRange" class="form-select-sm me-2">
      <option value="week" ${selectedValue === "week" ? "selected" : ""}>This Week</option>
      <option value="month" ${selectedValue === "month" ? "selected" : ""}>This Month</option>
      <option value="year" ${selectedValue === "year" ? "selected" : ""}>This Year</option>
      <option value="custom" ${selectedValue === "custom" ? "selected" : ""}>Custom</option>
    </select>
    <input type="date" id="fromDate" class="form-control-sm me-2" style="display:${selectedValue === "custom" ? "inline-block" : "none"};" value="${customFrom || ''}" />
    <input type="date" id="toDate" class="form-control-sm me-2" style="display:${selectedValue === "custom" ? "inline-block" : "none"};" value="${customTo || ''}" />
    <button id="applyDateFilter" class="btn btn-sm btn-primary" style="display:${selectedValue === "custom" ? "inline-block" : "none"};">Apply</button>
    <div id="dateFilterError" class="text-danger mt-2 fw-bold" style="display: none;"></div>
  `;

  const dateRangeSelect = document.getElementById("dateRange");
  const fromDateInput = document.getElementById("fromDate");
  const toDateInput = document.getElementById("toDate");
  const applyBtn = document.getElementById("applyDateFilter");
  const errorDiv = document.getElementById("dateFilterError");

  dateRangeSelect.addEventListener("change", () => {
    const selected = dateRangeSelect.value;
    const showCustom = selected === "custom";
    fromDateInput.style.display = showCustom ? "inline-block" : "none";
    toDateInput.style.display = showCustom ? "inline-block" : "none";
    applyBtn.style.display = showCustom ? "inline-block" : "none";
    errorDiv.style.display = "none";

    if (selected !== "custom") {
      onFilterChange(selected);
    }
  });

  applyBtn.addEventListener("click", () => {
    const from = fromDateInput.value;
    const to = toDateInput.value;

    if (from && to) {
      errorDiv.style.display = "none";
      onFilterChange("custom", from, to);
    } else {
      errorDiv.textContent = "Please select both From and To dates.";
      errorDiv.style.display = "block";
    }
  });
}

function showLoadingSpinner() {
  document.getElementById("content").innerHTML = `
    <div class="d-flex justify-content-center align-items-center" 
         style="height:100vh; width:100%; position:relative;">
      <div class="spinner-border text-secondary" role="status" style="width: 3rem; height: 3rem;">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  `;
}



function filterByDateRange(dataArray, dateKey, range, from = null, to = null) {
  const today = new Date();

  return dataArray.filter(item => {
    const dateValue = item[dateKey];
    if (!dateValue) return false;

    const date = new Date(dateValue);
    if (isNaN(date)) return false;

    if (range === "week") {
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay());
      startOfWeek.setHours(0, 0, 0, 0);

      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(endOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);

      return date >= startOfWeek && date <= endOfWeek;
    }

    if (range === "month") {
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59, 999);

      return date >= startOfMonth && date <= endOfMonth;
    }

    if (range === "year") {
      const startOfYear = new Date(today.getFullYear(), 0, 1);
      const endOfYear = new Date(today.getFullYear(), 11, 31, 23, 59, 59, 999);

      return date >= startOfYear && date <= endOfYear;
    }

    if (range === "custom" && from && to) {
      const fromDate = new Date(from);
      const toDate = new Date(to);
      toDate.setHours(23, 59, 59, 999);
      return date >= fromDate && date <= toDate;
    }

    return true;
  });
}


async function renderTablePage(pageTitle, tableId, componentFn, range = "week", from = null, to = null) {
  showLoadingSpinner();
  await fetchAllData();

  const tableHTML = await componentFn(range, from, to); // await here

  content.innerHTML = `
    <h2 class="page-title">${pageTitle}</h2>
    <div class="row align-items-center mb-3">
      <div class="col-md-8 text-start" id="dateFilterContainer"></div>
      <div class="col-md-4 text-end">
        ${getDownloadDropdown(tableId)}
      </div>
    </div>
    ${tableHTML}  <!-- now this is actual HTML -->
  `;

  // Create date filter
  createGlobalDateFilter("dateFilterContainer", async (newRange, newFrom, newTo) => {
    await renderTablePage(pageTitle, tableId, componentFn, newRange, newFrom, newTo);
  }, range, from, to);

  setTimeout(() => {
    $(`#${tableId}`).DataTable({ scrollX: true, autoWidth: false });
  }, 0);
}


 async function renderNewAppointment(range, from, to) {
  return renderTablePage(
    "New Appointment",
    "newappointmentTable",
    (r, f, t) => renderFormTable("new_appointment", "newappointmentTable", r, f, t),
    range,
    from,
    to
  );
}

 async function renderRescheduleAppointment(range, from, to) {
  return renderTablePage(
    "Reschedule Appointment",
    "rescheduleappointmentTable",
    (r, f, t) => renderFormTable("reschedule", "rescheduleappointmentTable", r, f, t),
    range,
    from,
    to
  );
}

 async function renderCancelAppointment(range, from, to) {
  return renderTablePage(
    "Cancel Appointment",
    "cancelappointmentTable",
    (r, f, t) => renderFormTable("cancel", "cancelappointmentTable", r, f, t),
    range,
    from,
    to
  );
}

async function renderAdmitted(range, from, to) {
  return renderTablePage(
    "Admitted",
    "admittedTable",
    (r, f, t) => renderFormTable("admitted", "admittedTable", r, f, t),
    range,
    from,
    to
  );
}

async function renderMedicationEnquiry(range, from, to) {
  return renderTablePage("Medication Enquiry", "MedicationEnquiryTable", MedicationEnquiry, range, from, to);
}

 async function renderAvianandExotics(range, from, to) {
  return renderTablePage(
    "Avian and Exotics",
    "avianTable",
    (r, f, t) => renderFormTable("avian", "avianTable", r, f, t),
    range,
    from,
    to
  );
}

 async function renderCardiology(range, from, to) {
  return renderTablePage(
    "Cardiology",
    "cardiologyTable",
    (r, f, t) => renderFormTable("cardiology", "cardiologyTable", r, f, t),
    range,
    from,
    to
  );
}

 async function renderInternalMedicine(range, from, to) {
  return renderTablePage(
    "Internal Medicine Enquiry",
    "internalMedicineTable",
    (r, f, t) => renderFormTable("internal", "internalMedicineTable", r, f, t),
    range,
    from,
    to
  );
}

 async function renderOutpatientImaging(range, from, to) {
  return renderTablePage(
    "Outpatient Imaging (MRI / CT / Ultrasound Scan etc.)",
    "OutpatientImagingTable",
    (r, f, t) => renderFormTable("imaging", "OutpatientImagingTable", r, f, t),
    range,
    from,
    to
  );
}

 async function renderNeurology(range, from, to) {
  return renderTablePage(
    "Neurology",
    "NeurologyTable",
    (r, f, t) => renderFormTable("neurology", "NeurologyTable", r, f, t),
    range,
    from,
    to
  );
}


 async function renderSurgery(range, from, to) {
  return renderTablePage(
    "Surgery",
    "SurgeryTable",
    (r, f, t) => renderFormTable("surgery", "SurgeryTable", r, f, t),
    range,
    from,
    to
  );
}


 async function renderVeterinaryRehabilitationHydrotherapy(range, from, to) {
  return renderTablePage(
    "Veterinary Rehabilitation & Hydrotherapy",
    "VeterinaryRehabilitationHydrotherapyTable",
    (r, f, t) => renderFormTable("rehabilitation", "VeterinaryRehabilitationHydrotherapyTable", r, f, t),
    range,
    from,
    to
  );
}

 async function renderRequestaCallback(range, from, to) {
  return renderTablePage(
    "Request a Callback",
    "RequestaCallbackTable",
    (r, f, t) => renderFormTable("callback", "RequestaCallbackTable", r, f, t),
    range,
    from,
    to
  );
}

async function renderPaymentDepositEnquiries(range, from, to) {
  return renderTablePage("Payment Deposit Enquiries", "PaymentDepositEnquiriesTable", PaymentDepositEnquiries, range, from, to);
}

 async function renderRefundEnquiries(range, from, to) {
  return renderTablePage(
    "Refund Enquiries",
    "RefundEnquiriesTable",
    (r, f, t) => renderFormTable("refund", "RefundEnquiriesTable", r, f, t),
    range,
    from,
    to
  );
}

 async function renderBillingEnquiries(range, from, to) {
  return renderTablePage(
    "Billing Enquiries",
    "BillingEnquiriesTable",
    (r, f, t) => renderFormTable("billing", "BillingEnquiriesTable", r, f, t),
    range,
    from,
    to
  );
}
