import { openModal } from './modal.js';
import { getDoctors, filterDoctors, saveDoctor } from './doctorServices.js';
import { createDoctorCard } from './doctorCard.js';

const contentDiv = document.getElementById('content');

document.addEventListener('DOMContentLoaded', () => {
  const addDoctorBtn = document.getElementById('addDoctorBtn');
  if (addDoctorBtn) {
    addDoctorBtn.addEventListener('click', () => {
      openModal('addDoctor');
    });
  }

  loadDoctorCards();

  const searchInput = document.getElementById('searchBar');
  const timeFilter = document.getElementById('timeFilter');
  const specialtyFilter = document.getElementById('specialtyFilter');

  if (searchInput) searchInput.addEventListener('input', filterDoctorsOnChange);
  if (timeFilter) timeFilter.addEventListener('change', filterDoctorsOnChange);
  if (specialtyFilter) specialtyFilter.addEventListener('change', filterDoctorsOnChange);
});

async function loadDoctorCards() {
  try {
    const doctors = await getDoctors();
    if (doctors && doctors.length > 0) {
      renderDoctorCards(doctors);
    } else {
      contentDiv.innerHTML = '<p class="text-center text-gray-500">No doctors available.</p>';
    }
  } catch (error) {
    console.error('Failed to load doctor cards:', error);
    contentDiv.innerHTML = '<p class="text-center text-red-500">An error occurred while loading doctors. Please try again.</p>';
  }
}

async function filterDoctorsOnChange() {
  const name = document.getElementById('searchBar').value || 'null';
  const time = document.getElementById('timeFilter').value || 'null';
  const specialty = document.getElementById('specialtyFilter').value || 'null';

  try {
    const result = await filterDoctors(name, time, specialty);
    if (result.doctors && result.doctors.length > 0) {
      renderDoctorCards(result.doctors);
    } else {
      contentDiv.innerHTML = '<p class="text-center text-gray-500">No doctors found with the given filters.</p>';
    }
  } catch (error) {
    console.error('Error filtering doctors:', error);
    alert('An error occurred during filtering. Please try again later.');
  }
}

function renderDoctorCards(doctors) {
  contentDiv.innerHTML = '';
  doctors.forEach(doctor => {
    const card = createDoctorCard(doctor);
    contentDiv.appendChild(card);
  });
}

window.adminAddDoctor = async function(event) {
  event.preventDefault();

  const token = localStorage.getItem('token');
  if (!token) {
    alert('Authentication token not found. Please log in again.');
    return;
  }

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const password = document.getElementById('password').value;
  const specialty = document.getElementById('specialization').value;
  const availableTimes = document.getElementById('availability').value.split(',').map(s => s.trim());

  const doctor = { name, email, phone, password, specialty, availableTimes };

  try {
    const result = await saveDoctor(doctor, token);

    if (result.success) {
      alert(result.message);
      window.closeModal('addDoctor');
      loadDoctorCards();
    } else {
      alert(result.message);
    }
  } catch (error) {
    console.error('Error adding new doctor:', error);
    alert('An error occurred while adding the doctor. Please try again.');
  }
};
