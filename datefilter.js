
// function getDownloadDropdown(tableId) {
//   return `
//     <div class="dropdown">
//       <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" id="downloadDropdown-${tableId}" data-bs-toggle="dropdown" aria-expanded="false">
//         Download
//       </button>
//       <ul class="dropdown-menu" aria-labelledby="downloadDropdown-${tableId}">
//         <li><button class="dropdown-item" onclick="downloadAsPDF('${tableId}')">Download as PDF</button></li>
//         <li><button class="dropdown-item" onclick="downloadAsExcel('${tableId}')">Download as Excel</button></li>
//         <li><button class="dropdown-item" onclick="downloadAsZIP('${tableId}')">Download as ZIP</button></li>
//       </ul>
//     </div>
//   `;
// }


// function downloadAsPDF(tableId) {
//   const { jsPDF } = window.jspdf;
//   const doc = new jsPDF();

//   const table = document.getElementById(tableId);
//   const headers = [];
//   const data = [];

//   // Get headers
//   const ths = table.querySelectorAll("thead th");
//   ths.forEach((th) => headers.push(th.textContent.trim()));

//   // Get row data
//   const rows = table.querySelectorAll("tbody tr");
//   rows.forEach((row) => {
//     const rowData = [];
//     row.querySelectorAll("td").forEach((td) => {
//       rowData.push(td.textContent.trim());
//     });
//     data.push(rowData);
//   });

//   doc.autoTable({
//     head: [headers],
//     body: data,
//     startY: 10,
//     theme: 'grid',
//     styles: {
//       fontSize: 8,
//       cellPadding: 2,
//     },
//     headStyles: {
//       fillColor: [95, 169, 174]
//     }
//   });

//   doc.save(`${tableId}.pdf`);
// }


// function downloadAsExcel(tableId) {
//   const table = document.getElementById(tableId);
//   const wb = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });
//   XLSX.writeFile(wb, `${tableId}.xlsx`);
// }

// function downloadAsZIP(tableId) {
//   const table = document.getElementById(tableId);

//   // Clone the table to avoid modifying the original
//   const tableClone = table.cloneNode(true);

 
//   tableClone.querySelectorAll('[class], [style]').forEach(el => {
//     el.removeAttribute('class');
//     el.removeAttribute('style');
//   });

//   // Ensure the <thead> is preserved in output
//   const htmlContent = `
//     <!DOCTYPE html>
//     <html>
//       <head>
//         <meta charset="UTF-8">
//         <title>${tableId}</title>
//         <style>
//           body { font-family: Arial, sans-serif; }
//           table { border-collapse: collapse; width: 100%; }
//           th, td { border: 1px solid #999; padding: 8px; text-align: left; }
//           thead th { background-color: #f2f2f2; }
//         </style>
//       </head>
//       <body>
//         <h2>Exported Table: ${tableId}</h2>
//         ${tableClone.outerHTML}
//       </body>
//     </html>
//   `;

//   // Create ZIP and save
//   const zip = new JSZip();
//   zip.file(`${tableId}.html`, htmlContent);
//   zip.generateAsync({ type: "blob" }).then(blob => {
//     saveAs(blob, `${tableId}.zip`);
//   });
// }

// window.getDownloadDropdown = getDownloadDropdown;
// window.downloadAsPDF = downloadAsPDF;
// window.downloadAsExcel = downloadAsExcel;
// window.downloadAsZIP = downloadAsZIP;

// function createGlobalDateFilter(containerId, onFilterChange, selectedValue = "week", customFrom = null, customTo = null) {
//   const container = document.getElementById(containerId);
//   if (!container) return;

//   container.innerHTML = `
//     <label for="dateRange" class="me-2 fw-bold">Filter by:</label>
//     <select id="dateRange" class="form-select-sm me-2">
//       <option value="week" ${selectedValue === "week" ? "selected" : ""}>This Week</option>
//       <option value="month" ${selectedValue === "month" ? "selected" : ""}>This Month</option>
//       <option value="year" ${selectedValue === "year" ? "selected" : ""}>This Year</option>
//       <option value="custom" ${selectedValue === "custom" ? "selected" : ""}>Custom</option>
//     </select>
//     <input type="date" id="fromDate" class="form-control-sm me-2" style="display:${selectedValue === "custom" ? "inline-block" : "none"};" value="${customFrom || ''}" />
//     <input type="date" id="toDate" class="form-control-sm me-2" style="display:${selectedValue === "custom" ? "inline-block" : "none"};" value="${customTo || ''}" />
//     <button id="applyDateFilter" class="btn btn-sm btn-primary" style="display:${selectedValue === "custom" ? "inline-block" : "none"};">Apply</button>
//     <div id="dateFilterError" class="text-danger mt-2 fw-bold" style="display: none;"></div>
//   `;

//   const dateRangeSelect = document.getElementById("dateRange");
//   const fromDateInput = document.getElementById("fromDate");
//   const toDateInput = document.getElementById("toDate");
//   const applyBtn = document.getElementById("applyDateFilter");
//   const errorDiv = document.getElementById("dateFilterError");

//   dateRangeSelect.addEventListener("change", () => {
//     const selected = dateRangeSelect.value;
//     const showCustom = selected === "custom";
//     fromDateInput.style.display = showCustom ? "inline-block" : "none";
//     toDateInput.style.display = showCustom ? "inline-block" : "none";
//     applyBtn.style.display = showCustom ? "inline-block" : "none";
//     errorDiv.style.display = "none";

//     if (selected !== "custom") {
//       onFilterChange(selected);
//     }
//   });

//   applyBtn.addEventListener("click", () => {
//     const from = fromDateInput.value;
//     const to = toDateInput.value;

//     if (from && to) {
//       errorDiv.style.display = "none";
//       onFilterChange("custom", from, to);
//     } else {
//       errorDiv.textContent = "Please select both From and To dates.";
//       errorDiv.style.display = "block";
//     }
//   });
// }



// function filterByDateRange(dataArray, dateKey, range, from = null, to = null) {
//   const today = new Date();

//   return dataArray.filter(item => {
//     const dateValue = item[dateKey];
//     if (!dateValue) return false;

//     const date = new Date(dateValue);
//     if (isNaN(date)) return false;

//     if (range === "week") {
//       const startOfWeek = new Date(today);
//       startOfWeek.setDate(today.getDate() - today.getDay());
//       startOfWeek.setHours(0, 0, 0, 0);

//       const endOfWeek = new Date(startOfWeek);
//       endOfWeek.setDate(endOfWeek.getDate() + 6);
//       endOfWeek.setHours(23, 59, 59, 999);

//       return date >= startOfWeek && date <= endOfWeek;
//     }

//     if (range === "month") {
//       const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
//       const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59, 999);

//       return date >= startOfMonth && date <= endOfMonth;
//     }

//     if (range === "year") {
//       const startOfYear = new Date(today.getFullYear(), 0, 1);
//       const endOfYear = new Date(today.getFullYear(), 11, 31, 23, 59, 59, 999);

//       return date >= startOfYear && date <= endOfYear;
//     }

//     if (range === "custom" && from && to) {
//       const fromDate = new Date(from);
//       const toDate = new Date(to);
//       toDate.setHours(23, 59, 59, 999);
//       return date >= fromDate && date <= toDate;
//     }

//     return true;
//   });
// }


// let cachedData = null;

// async function loadData() {
//   if (!cachedData) {
//     cachedData = await fetchAllData();
//   }
//   return cachedData;
// }


// async function renderNewAppointment(range = "filter", from = null, to = null) {
  
//  await loadData();

//   document.getElementById("content").innerHTML = `
//     <h2 class="page-title">New Appointment</h2>
//     <div class="row align-items-center mb-3">
//       <div class="col-md-8 text-start" id="dateFilterContainer"></div>
//       <div class="col-md-4 text-end">
//         ${getDownloadDropdown("newappointmentTable")}
//       </div>
//     </div>
//     ${NewAppointment(range, from, to)}
//   `;

//   createGlobalDateFilter("dateFilterContainer", renderNewAppointment, range, from, to);

//   setTimeout(() => {
//     $('#newappointmentTable').DataTable({ scrollX: true, autoWidth: false });
//   }, 0);
// }


// async function renderRescheduleAppointment(range = "filter", from = null, to = null) {
//   await fetchAllData(); 
//   content.innerHTML = `
//     <h2 class="page-title">Reschedule Appointment</h2>
    
//     <div class="row align-items-center mb-3">
//       <div class="col-md-8 text-start" id="dateFilterContainer"></div>
//       <div class="col-md-4 text-end">
//         ${getDownloadDropdown("rescheduleappointmentTable")}
//       </div>
//     </div>

//     ${RescheduleAppointment(range, from, to)}
//   `;

//   // Pass range, from, and to
//   createGlobalDateFilter("dateFilterContainer", renderRescheduleAppointment, range, from, to);

//   setTimeout(() => {
//     $('#rescheduleappointmentTable').DataTable({
//       scrollX: true,
//       autoWidth: false,
//     });
//   }, 0);
// }



// async function renderCancelAppointment(range = "filter", from = null, to = null) {
//   await fetchAllData(); 
// content.innerHTML = `
//   <h2 class="page-title">Cancel Appointment</h2>

//   <div class="row align-items-center mb-3">
//     <div class="col-md-8 text-start" id="dateFilterContainer"></div>
//     <div class="col-md-4 text-end">
//       ${getDownloadDropdown("cancelappointmentTable")}
//     </div>
//   </div>

//   ${CancelAppointment(range, from, to)}
// `;


//   createGlobalDateFilter("dateFilterContainer", renderCancelAppointment, range, from, to);


//   setTimeout(() => {
//     $('#cancelappointmentTable').DataTable({
//       scrollX: true,
//       autoWidth: false
//     });
//   }, 0);

// }


// async function renderAdmitted(range = "filter", from = null, to = null) {
//   await fetchAllData(); 
// content.innerHTML = `
//   <h2 class="page-title">Admitted</h2>

//   <div class="row align-items-center mb-3">
//     <div class="col-md-8 text-start" id="dateFilterContainer"></div>
//     <div class="col-md-4 text-end">
//       ${getDownloadDropdown("AdmittedTable")}
//     </div>
//   </div>

//   <div id="tableContainer">${Admitted(range, from, to)}</div>
// `;


//   createGlobalDateFilter("dateFilterContainer", renderAdmitted, range, from, to);

//   setTimeout(() => {
//     $('#AdmittedTable').DataTable({
//       scrollX: true,
//       autoWidth: false
//     });
//   }, 0);

// }



// async function renderMedicationEnquiry(range = "filter", from = null, to = null) {
//   await fetchAllData(); 
// content.innerHTML = `
//   <h2 class="page-title">Medication Enquiry</h2>

//   <div class="row align-items-center mb-3">
//     <div class="col-md-8 text-start" id="dateFilterContainer"></div>
//     <div class="col-md-4 text-end">
//       ${getDownloadDropdown("MedicationEnquiryTable")}
//     </div>
//   </div>

//   <div id="tableContainer">${MedicationEnquiry(range, from, to)}</div>
// `;



//   createGlobalDateFilter("dateFilterContainer", renderMedicationEnquiry, range, from, to);


//   setTimeout(() => {
//     $('#MedicationEnquiryTable').DataTable({
//       scrollX: true,
//       autoWidth: false
//     });
//   }, 0);

// }


// async function renderAvianandExotics(range = "filter", from = null, to = null) {
//   await fetchAllData(); 
// content.innerHTML = `
//   <h2 class="page-title">Avian and Exotics</h2>

//   <div class="row align-items-center mb-3">
//     <div class="col-md-8 text-start" id="dateFilterContainer"></div>
//     <div class="col-md-4 text-end">
//       ${getDownloadDropdown("AvianTable")}
//     </div>
//   </div>

//   <div id="tableContainer">${AvianandExotics(range, from, to)}</div>   
// `;

//   createGlobalDateFilter("dateFilterContainer", renderAvianandExotics, range, from, to);


//   setTimeout(() => {
//     $('#AvianTable').DataTable({
//       scrollX: true,
//       autoWidth: false
//     });
//   }, 0);

// }




// async function renderCardiology(range = "filter", from = null, to = null) {
//   await fetchAllData(); 
// content.innerHTML = `
//   <h2 class="page-title">Cardiology</h2>

//   <div class="row align-items-center mb-3">
//     <div class="col-md-8 text-start" id="dateFilterContainer"></div>
//     <div class="col-md-4 text-end">
//       ${getDownloadDropdown("CardiologyTable")}
//     </div>
//   </div>

//   <div id="tableContainer">${Cardiology(range, from, to)}</div>
// `;


//   createGlobalDateFilter("dateFilterContainer", renderCardiology, range, from, to);

//   setTimeout(() => {
//     $('#CardiologyTable').DataTable({
//       scrollX: true,
//       autoWidth: false
//     });
//   }, 0);

// }



// async function renderInternalMedicine(range = "filter", from = null, to = null) {
//   await fetchAllData(); 
// content.innerHTML = `
//   <h2 class="page-title">Internal Medicine Enquiry</h2>

//   <div class="row align-items-center mb-3">
//     <div class="col-md-8 text-start" id="dateFilterContainer"></div>
//     <div class="col-md-4 text-end">
//       ${getDownloadDropdown("InternalMedicineTable")}
//     </div>
//   </div>

//   <div id="tableContainer">${InternalMedicine(range, from, to)}</div>
// `;


//   createGlobalDateFilter("dateFilterContainer", renderInternalMedicine, range, from, to);


//   setTimeout(() => {
//     $('#InternalMedicineTable').DataTable({
//       scrollX: true,
//       autoWidth: false
//     });
//   }, 0);

// }



// async function renderOutpatientImaging(range = "filter", from = null, to = null) {
//   await fetchAllData();
// content.innerHTML = `
//   <h2 class="page-title">Outpatient Imaging (MRI / CT / Ultrasound Scan etc.)</h2>

//   <div class="row align-items-center mb-3">
//     <div class="col-md-8 text-start" id="dateFilterContainer"></div>
//     <div class="col-md-4 text-end">
//       ${getDownloadDropdown("OutpatientImagingTable")}
//     </div>
//   </div>

//   <div id="tableContainer">${OutpatientImaging(range, from, to)}</div>
// `;


//   createGlobalDateFilter("dateFilterContainer", renderOutpatientImaging, range, from, to);

//   setTimeout(() => {
//     $('#OutpatientImagingTable').DataTable({
//       scrollX: true,
//       autoWidth: false
//     });
//   }, 0);

// }


// async function renderNeurology(range = "filter", from = null, to = null) {
//   await fetchAllData(); 
// content.innerHTML = `
//   <h2 class="page-title">Neurology</h2>

//   <div class="row align-items-center mb-3">
//     <div class="col-md-8 text-start" id="dateFilterContainer"></div>
//     <div class="col-md-4 text-end">
//       ${getDownloadDropdown("NeurologyTable")}
//     </div>
//   </div>

//   <div id="tableContainer">${Neurology(range, from, to)}</div>
// `;


//    createGlobalDateFilter("dateFilterContainer", renderNeurology, range, from, to)

//   setTimeout(() => {
//     $('#NeurologyTable').DataTable({
//       scrollX: true,
//       autoWidth: false
//     });
//   }, 0);


// }

// async function renderSurgery(range = "filter", from = null, to = null) {
//   await fetchAllData(); 

// content.innerHTML = `
//   <h2 class="page-title">Surgery</h2>

//   <div class="row align-items-center mb-3">
//     <div class="col-md-8 text-start" id="dateFilterContainer"></div>
//     <div class="col-md-4 text-end">
//       ${getDownloadDropdown("SurgeryTable")}
//     </div>
//   </div>

//   <div id="tableContainer">${Surgery(range, from, to)}</div>
// `;


//    createGlobalDateFilter("dateFilterContainer", renderSurgery, range, from, to);

//   setTimeout(() => {
//     $('#SurgeryTable').DataTable({
//       scrollX: true,
//       autoWidth: false
//     });
//   }, 0);


// }




// async function renderVeterinaryRehabilitationHydrotherapy(range = "filter", from = null, to = null) {
//   await fetchAllData(); 
// content.innerHTML = `
//   <h2 class="page-title">Veterinary Rehabilitation & Hydrotherapy</h2>

//   <div class="row align-items-center mb-3">
//     <div class="col-md-8 text-start" id="dateFilterContainer"></div>
//     <div class="col-md-4 text-end">
//       ${getDownloadDropdown("VeterinaryRehabilitationHydrotherapyTable")}
//     </div>
//   </div>

//   <div id="tableContainer">${VeterinaryRehabilitationHydrotherapy(range, from, to)}</div>
// `;


//     createGlobalDateFilter("dateFilterContainer", renderVeterinaryRehabilitationHydrotherapy, range, from, to);

//   setTimeout(() => {
//     $('#VeterinaryRehabilitationHydrotherapyTable').DataTable({
//       scrollX: true,
//       autoWidth: false
//     });  }, 0);


// }

// async function renderRequestaCallback(range = "filter", from = null, to = null) {
//  await fetchAllData(); 
// content.innerHTML = `
//   <h2 class="page-title">Request a Callback</h2>

//   <div class="row align-items-center mb-3">
//     <div class="col-md-8 text-start" id="dateFilterContainer"></div>
//     <div class="col-md-4 text-end">
//       ${getDownloadDropdown("RequestaCallbackTable")}
//     </div>
//   </div>

//   <div id="tableContainer">${RequestaCallback(range, from, to)}</div>
// `;

//    createGlobalDateFilter("dateFilterContainer", renderRequestaCallback, range, from, to);

//   setTimeout(() => {
//     $('#RequestaCallbackTable').DataTable({
//       scrollX: true,
//       autoWidth: false
//     });   
//   }, 0);
// }


// async function renderPaymentDepositEnquiries(range = "filter", from = null, to = null) {
//  await fetchAllData(); 
// content.innerHTML = `
//   <h2 class="page-title">Payment Deposit Enquiries</h2>

//   <div class="row align-items-center mb-3">
//     <div class="col-md-8 text-start" id="dateFilterContainer"></div>
//     <div class="col-md-4 text-end">
//       ${getDownloadDropdown("PaymentDepositEnquiriesTable")}
//     </div>
//   </div>

//   <div id="tableContainer">${PaymentDepositEnquiries(range, from, to)}</div>
// `;


//   createGlobalDateFilter("dateFilterContainer", renderPaymentDepositEnquiries, range, from, to);

//   setTimeout(() => {
//     $('#PaymentDepositEnquiriesTable').DataTable({
//       scrollX: true,
//       autoWidth: false
//     });
//   }, 0);

// }

// async function renderRefundEnquiries(range = "filter", from = null, to = null) {
//    await fetchAllData(); 
// content.innerHTML = `
//   <h2 class="page-title">Refund Enquiries</h2>

//   <div class="row align-items-center mb-3">
//     <div class="col-md-8 text-start" id="dateFilterContainer"></div>
//     <div class="col-md-4 text-end">
//       ${getDownloadDropdown("RefundEnquiriesTable")}
//     </div>
//   </div>

//   <div id="tableContainer">${RefundEnquiries(range, from, to)}</div>
// `;


//   createGlobalDateFilter("dateFilterContainer", renderRefundEnquiries, range, from, to);

//   setTimeout(() => {
//     $('#RefundEnquiriesTable').DataTable({
//       scrollX: true,
//       autoWidth: false
//     }); 
//   }, 0);

// }

// async function renderBillingEnquiries(range = "filter", from = null, to = null) {
//    await fetchAllData(); 
// content.innerHTML = `
//   <h2 class="page-title">Billing Enquiries</h2>

//   <div class="row align-items-center mb-3">
//     <div class="col-md-8 text-start" id="dateFilterContainer"></div>
//     <div class="col-md-4 text-end">
//       ${getDownloadDropdown("BillingEnquiriesTable")}
//     </div>
//   </div>

//   <div id="datatable-container">${BillingEnquiries(range, from, to)}</div>
// `;


//    createGlobalDateFilter("dateFilterContainer", renderBillingEnquiries, range, from, to);


//   setTimeout(() => {
//     $('#BillingEnquiriesTable').DataTable({
//       scrollX: true,
//       autoWidth: false
//     });
//   }, 0);

// }



function getDownloadDropdown(tableId) {
  return `
    <div class="dropdown">
      <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" id="downloadDropdown-${tableId}" data-bs-toggle="dropdown" aria-expanded="false">
        Download
      </button>
      <ul class="dropdown-menu" aria-labelledby="downloadDropdown-${tableId}">
        <li><button class="dropdown-item" onclick="downloadAsPDF('${tableId}')">Download as PDF</button></li>
        <li><button class="dropdown-item" onclick="downloadAsExcel('${tableId}')">Download as Excel</button></li>
        <li><button class="dropdown-item" onclick="downloadAsZIP('${tableId}')">Download as ZIP</button></li>
      </ul>
    </div>
  `;
}

function downloadAsPDF(tableId) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const table = document.getElementById(tableId);
  const headers = [];
  const data = [];

  // Get headers
  const ths = table.querySelectorAll("thead th");
  ths.forEach((th) => headers.push(th.textContent.trim()));

  // Get row data
  const rows = table.querySelectorAll("tbody tr");
  rows.forEach((row) => {
    const rowData = [];
    row.querySelectorAll("td").forEach((td) => {
      rowData.push(td.textContent.trim());
    });
    data.push(rowData);
  });

  doc.autoTable({
    head: [headers],
    body: data,
    startY: 10,
    theme: 'grid',
    styles: {
      fontSize: 8,
      cellPadding: 2,
    },
    headStyles: {
      fillColor: [95, 169, 174]
    }
  });

  doc.save(`${tableId}.pdf`);
}


function downloadAsExcel(tableId) {
  const table = document.getElementById(tableId);
  const wb = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });
  XLSX.writeFile(wb, `${tableId}.xlsx`);
}

function downloadAsZIP(tableId) {
  const table = document.getElementById(tableId);

  // Clone the table to avoid modifying the original
  const tableClone = table.cloneNode(true);

 
  tableClone.querySelectorAll('[class], [style]').forEach(el => {
    el.removeAttribute('class');
    el.removeAttribute('style');
  });

  // Ensure the <thead> is preserved in output
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>${tableId}</title>
        <style>
          body { font-family: Arial, sans-serif; }
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #999; padding: 8px; text-align: left; }
          thead th { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        <h2>Exported Table: ${tableId}</h2>
        ${tableClone.outerHTML}
      </body>
    </html>
  `;

  // Create ZIP and save
  const zip = new JSZip();
  zip.file(`${tableId}.html`, htmlContent);
  zip.generateAsync({ type: "blob" }).then(blob => {
    saveAs(blob, `${tableId}.zip`);
  });
}

window.getDownloadDropdown = getDownloadDropdown;
window.downloadAsPDF = downloadAsPDF;
window.downloadAsExcel = downloadAsExcel;
window.downloadAsZIP = downloadAsZIP;
