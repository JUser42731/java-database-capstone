import { getAllAppointments } from './appointment.js';
import { createPatientRow } from './patientRows.js';

const patientTableBody = document.getElementById('patientTableBody');
const searchInput = document.getElementById('searchBar');
const datePicker = document.getElementById('datePicker');
const todayBtn = document.getElementById('todayButton');

const today = new Date().toISOString().split('T')[0];
let selectedDate = today;
let patientName = 'null';
const token = localStorage.getItem('token');

async function loadAppointments() {
  if (!patientTableBody || !token) {
    console.error('Required DOM element or token not found.');
    return;
  }

  patientTableBody.innerHTML = '';

  try {
    const result = await getAllAppointments(token, selectedDate, patientName);

    if (result.success && result.appointments.length > 0) {
      result.appointments.forEach(appointment => {
        const patient = {
          id: appointment.patientId,
          name: appointment.patientName,
          phone: appointment.patientPhone,
          email: appointment.patientEmail,
        };
        const row = createPatientRow(patient);
        patientTableBody.appendChild(row);
      });
    } else {
      const noAppointmentsRow = document.createElement('tr');
      noAppointmentsRow.innerHTML = `<td colspan="4" class="text-center py-4 text-gray-500">No appointments found for this date.</td>`;
      patientTableBody.appendChild(noAppointmentsRow);
    }
  } catch (error) {
    console.error('Error loading appointments:', error);
    const errorRow = document.createElement('tr');
    errorRow.innerHTML = `<td colspan="4" class="text-center py-4 text-red-500">Error loading appointments. Try again later.</td>`;
    patientTableBody.appendChild(errorRow);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Set the date picker value to today's date
  if (datePicker) {
    datePicker.value = today;

    datePicker.addEventListener('change', () => {
      selectedDate = datePicker.value;
      loadAppointments();
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const value = searchInput.value.trim();
      patientName = value === '' ? 'null' : value;
      loadAppointments();
    });
  }

  if (todayBtn) {
    todayBtn.addEventListener('click', () => {
      selectedDate = today;
      if (datePicker) {
        datePicker.value = today;
      }
      loadAppointments();
    });
  }

  loadAppointments();
});
