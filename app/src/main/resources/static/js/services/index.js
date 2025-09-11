import { openModal } from './modal.js';
import { selectRole } from './roleHandler.js';
import { API_BASE_URL } from './config.js';

const ADMIN_API = `${API_BASE_URL}/api/admin/login`;
const DOCTOR_API = `${API_BASE_URL}/api/doctor/login`;

window.onload = function() {
  const adminLoginBtn = document.getElementById('adminLoginBtn');
  const doctorLoginBtn = document.getElementById('doctorLoginBtn');

  if (adminLoginBtn) {
    adminLoginBtn.addEventListener('click', () => {
      openModal('adminLogin');
    });
  }

  if (doctorLoginBtn) {
    doctorLoginBtn.addEventListener('click', () => {
      openModal('doctorLogin');
    });
  }
};


window.adminLoginHandler = async function(event) {
  event.preventDefault(); 

  try {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const admin = { username, password };

    const response = await fetch(ADMIN_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(admin),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token);
      selectRole('admin');
    } else {
      alert('Invalid username or password. Please try again.');
    }
  } catch (error) {
    console.error('Login failed:', error);
    alert('An error occurred during login. Please try again later.');
  }
};

window.doctorLoginHandler = async function(event) {
  event.preventDefault(); 

  try {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const doctor = { email, password };

    const response = await fetch(DOCTOR_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(doctor),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token);
      selectRole('doctor');
    } else {
      alert('Invalid email or password. Please try again.');
    }
  } catch (error) {
    console.error('Login failed:', error);
    alert('An error occurred during login. Please try again later.');
  }
};