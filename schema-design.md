## MySQL Database Design

Tables:
1. Patients
2. Doctors
3. Appointments
4. Admin

**Patients:**
- Id - INT, PRIMARY_KEY, AUTO_INCREMENT
- Name - VARCHAR, NOT NULL
- Email - VARCHAR, UNIQUE, NOT NULL
- Date of Birth - DATETIME
- Phone - VARCHAR

**Doctors:**
- Id - INT, PRIMARY_KEY, AUTO_INCREMENT
- Name - VARCHAR, NOT NULL
- Email - VARCHAR, UNIQUE, NOT NULL
- Date of Birth - DATETIME
- Phone - VARCHAR
- Specialty - VARCHAR

**Appointments:**
- Id - INT, PRIMARY_KEY, AUTO_INCREMENT
- Scheduled - DATETIME, NOT NULL
- Doctor id - INT, FOREIGN KEY -> Doctors (id)
- Patient id - INT, FOREIGN KEY -> Patients (id)
- Status - INT (0 = Scheduled, 1 = Completed, 2 = Cancelled)

**Admin:**
- Id - PRIMARY_KEY, AUTO_INCREMENT
- Email - VARCHAR, UNIQUE, NOT NULL

## MongoDB Collection Design

**Logs:**

```json
{
  "_id": "ObjectId('64abc123456')",
  "message": "Appointment scheduled",
  "appointmentId": 51,
  "metadata": {
    "createdAt": "2025-09-09T20:20:20"  
  },
  "env": "production",
  "service": "appointments",
  "traceId": "0000-0000-0000-0000"
}
```
