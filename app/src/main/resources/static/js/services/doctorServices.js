import { API_BASE_URL } from './config.js';

const DOCTOR_API = `${API_BASE_URL}/api/doctors`;

export async function getDoctors() {
  try {
    const response = await fetch(DOCTOR_API);
    const data = await response.json();
    return data.doctors || [];
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return [];
  }
}

export async function deleteDoctor(doctorId, token) {
  try {
    const response = await fetch(`${DOCTOR_API}/${doctorId}/${token}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting doctor:', error);
    return { success: false, message: 'An error occurred during deletion.' };
  }
}

export async function saveDoctor(doctor, token) {
  try {
    const response = await fetch(`${DOCTOR_API}/${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(doctor),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error saving doctor:', error);
    return { success: false, message: 'An error occurred while saving the doctor.' };
  }
}

export async function filterDoctors(name, time, specialty) {
  try {
    const response = await fetch(`${DOCTOR_API}/filter/${name}/${time}/${specialty}`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error('Error filtering doctors:', response.statusText);
      return { doctors: [] };
    }
  } catch (error) {
    console.error('An error occurred during filtering:', error);
    return { doctors: [] };
  }
}
