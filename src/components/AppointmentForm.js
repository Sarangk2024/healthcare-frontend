// // src/components/AppointmentForm.js
// import React, { useState } from 'react';
// import axios from 'axios';

// const AppointmentForm = () => {
//     const [appointment, setAppointment] = useState({
//         patientName: '',
//         doctorName: '',
//         appointmentDate: '',
//         appointmentTime: '',
//         reason: ''
//     });
//     const [message, setMessage] = useState('');

//     const handleChange = (e) => {
//         setAppointment({ ...appointment, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('http://localhost:8080/api/appointments', appointment);
//             setMessage(`Appointment booked successfully! ID: ${response.data.id}`);
//             setAppointment({
//                 patientName: '',
//                 doctorName: '',
//                 appointmentDate: '',
//                 appointmentTime: '',
//                 reason: ''
//             });
//         } catch (error) {
//             setMessage('Error booking appointment. Please check the backend server.');
//             console.error('There was an error!', error);
//         }
//     };

//     return (
//         <div className="form-container">
//             <h1>Book Your Appointment</h1>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="text"
//                     name="patientName"
//                     value={appointment.patientName}
//                     onChange={handleChange}
//                     placeholder="Patient Name"
//                     required
//                 />
//                 <input
//                     type="text"
//                     name="doctorName"
//                     value={appointment.doctorName}
//                     onChange={handleChange}
//                     placeholder="Doctor Name"
//                     required
//                 />
//                 <input
//                     type="date"
//                     name="appointmentDate"
//                     value={appointment.appointmentDate}
//                     onChange={handleChange}
//                     required
//                 />
//                 <input
//                     type="time"
//                     name="appointmentTime"
//                     value={appointment.appointmentTime}
//                     onChange={handleChange}
//                     required
//                 />
//                 <textarea
//                     name="reason"
//                     value={appointment.reason}
//                     onChange={handleChange}
//                     placeholder="Reason for appointment"
//                     required
//                 />
//                 <button type="submit">Book Appointment</button>
//             </form>
//             {message && <p className="message">{message}</p>}
//         </div>
//     );
// };

// export default AppointmentForm;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AppointmentForm = () => {
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [appointment, setAppointment] = useState({
        patientName: '',
        appointmentDate: '',
        appointmentTime: '',
        reason: ''
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/api/doctors')
            .then(response => {
                setDoctors(response.data);
            })
            .catch(error => {
                console.error('Error fetching doctors:', error);
            });
    }, []);

    const handleChange = (e) => {
        setAppointment({ ...appointment, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const appointmentWithDoctor = { ...appointment, doctorId: selectedDoctor };
            const response = await axios.post('http://localhost:8080/api/appointments', appointmentWithDoctor);
            setMessage(`Appointment booked successfully! ID: ${response.data.id}`);
            setAppointment({
                patientName: '',
                appointmentDate: '',
                appointmentTime: '',
                reason: ''
            });
            setSelectedDoctor('');
        } catch (error) {
            setMessage('Error booking appointment. Please check the backend server.');
            console.error('There was an error!', error);
        }
    };

    return (
        <div className="form-container">
            <h1>Book Your Appointment</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="patientName"
                    value={appointment.patientName}
                    onChange={handleChange}
                    placeholder="Patient Name"
                    required
                />
                <select
                    name="doctorId"
                    value={selectedDoctor}
                    onChange={(e) => setSelectedDoctor(e.target.value)}
                    required
                >
                    <option value="">Select a Doctor</option>
                    {doctors.map(doctor => (
                        <option key={doctor.id} value={doctor.id}>
                            {doctor.name} - {doctor.specialization}
                        </option>
                    ))}
                </select>
                <input
                    type="date"
                    name="appointmentDate"
                    value={appointment.appointmentDate}
                    onChange={handleChange}
                    required
                />
                <input
                    type="time"
                    name="appointmentTime"
                    value={appointment.appointmentTime}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="reason"
                    value={appointment.reason}
                    onChange={handleChange}
                    placeholder="Reason for appointment"
                    required
                />
                <button type="submit">Book Appointment</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default AppointmentForm;