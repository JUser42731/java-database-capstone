import { openBookingOverlay } from './loggedPatient.js';
import { deleteDoctor } from './doctorServices.js';
import { fetchPatientByToken } from './patientServices.js';

const userRole = localStorage.getItem("userRole");

function createDoctorCard(doctorData) {
    const card = document.createElement('div');
    card.className = 'doctor-card';

    const infoDiv = document.createElement('div');
    infoDiv.className = 'doctor-info';

    const nameEl = document.createElement('h3');
    nameEl.textContent = doctorData.name;

    const specializationEl = document.createElement('p');
    specializationEl.className = 'specialty';
    specializationEl.textContent = doctorData.specialization;

    const emailEl = document.createElement('p');
    emailEl.textContent = `Email: ${doctorData.email}`;

    const timesEl = document.createElement('div');
    timesEl.className = 'appointment-times';
    const timesHeader = document.createElement('p');
    timesHeader.textContent = 'Available Times:';
    timesEl.appendChild(timesHeader);
    const timesList = document.createElement('ul');
    doctorData.appointmentTimes.forEach(time => {
        const li = document.createElement('li');
        li.textContent = time;
        timesList.appendChild(li);
    });
    timesEl.appendChild(timesList);

    infoDiv.appendChild(nameEl);
    infoDiv.appendChild(specializationEl);
    infoDiv.appendChild(emailEl);
    infoDiv.appendChild(timesEl);
    card.appendChild(infoDiv);

    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'card-actions';

    if (userRole === 'admin') {
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        
        deleteBtn.addEventListener('click', async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                showMessage("Admin token not found. Please log in.");
                return;
            }
            
            try {
                await deleteDoctor(doctorData.id, token);
                showMessage('Doctor deleted successfully!');
                card.remove(); // Remove the card from the DOM
            } catch (error) {
                console.error('Failed to delete doctor:', error);
                showMessage('Failed to delete doctor.');
            }
        });
        actionsDiv.appendChild(deleteBtn);
    } else if (userRole === 'patient') {
        const bookBtn = document.createElement('button');
        bookBtn.className = 'book-btn';
        bookBtn.textContent = 'Book Now';
        
        bookBtn.addEventListener('click', () => {
            showMessage("Please log in to book an appointment.");
        });
        actionsDiv.appendChild(bookBtn);
    } else if (userRole === 'loggedPatient') {
        const bookBtn = document.createElement('button');
        bookBtn.className = 'book-btn';
        bookBtn.textContent = 'Book Now';
        
        bookBtn.addEventListener('click', async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                showMessage("Your session has expired. Please log in again.");
                return;
            }
            
            try {
                const patientData = await fetchPatientByToken(token);
                if (patientData) {
                    openBookingOverlay(doctorData, patientData);
                } else {
                    showMessage("Could not fetch patient details.");
                }
            } catch (error) {
                console.error('Error fetching patient data:', error);
                showMessage("Failed to retrieve your data. Please try again.");
            }
        });
        actionsDiv.appendChild(bookBtn);
    }

    card.appendChild(actionsDiv);
    return card;
}

function showMessage(message) {
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.backgroundColor = '#fff';
    modal.style.padding = '20px';
    modal.style.border = '1px solid #ccc';
    modal.style.zIndex = '1000';
    modal.textContent = message;

    const closeBtn = document.createElement('span');
    closeBtn.textContent = '×';
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '5px';
    closeBtn.style.right = '10px';
    closeBtn.style.cursor = 'pointer';
    closeBtn.onclick = () => document.body.removeChild(modal);

    modal.appendChild(closeBtn);
    document.body.appendChild(modal);
}

export { createDoctorCard };