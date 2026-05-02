import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import fallbackDoctors from '../data/doctors.json';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

const initialAppointment = {
    patientName: '',
    appointmentDate: '',
    appointmentTime: '',
    reason: ''
};

const AppointmentForm = () => {
    const [doctors, setDoctors] = useState(fallbackDoctors);
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [appointment, setAppointment] = useState(initialAppointment);
    const [appointments, setAppointments] = useState([]);
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isOfflineMode, setIsOfflineMode] = useState(false);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/doctors`)
            .then((response) => {
                if (Array.isArray(response.data) && response.data.length > 0) {
                    setDoctors(response.data);
                    setIsOfflineMode(false);
                }
            })
            .catch((error) => {
                setIsOfflineMode(true);
                console.error('Error fetching doctors:', error);
            });

        axios.get(`${API_BASE_URL}/appointments`)
            .then((response) => {
                if (Array.isArray(response.data)) {
                    setAppointments(response.data.slice(-4).reverse());
                }
            })
            .catch(() => {
                setAppointments([]);
            });
    }, []);

    const selectedDoctorDetails = useMemo(
        () => doctors.find((doctor) => String(doctor.id) === String(selectedDoctor)),
        [doctors, selectedDoctor]
    );

    const handleChange = (e) => {
        setAppointment({ ...appointment, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage('');

        try {
            const payload = {
                ...appointment,
                doctor: { id: Number(selectedDoctor) }
            };
            const response = await axios.post(`${API_BASE_URL}/appointments`, payload);
            setMessage(`Appointment booked successfully. Confirmation #${response.data.id}`);
            setAppointments((current) => [response.data, ...current].slice(0, 4));
            setAppointment(initialAppointment);
            setSelectedDoctor('');
        } catch (error) {
            setMessage('Error booking appointment. Please confirm the backend is running.');
            console.error('There was an error!', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="booking-page">
            <section className="booking-shell">
                <div className="booking-intro">
                    <p className="eyebrow">Appointment booking</p>
                    <h1>Choose your doctor and preferred visit time.</h1>
                    <p>
                        Submit the appointment request and the care team will confirm availability.
                        Use clear details so the clinic can route your visit correctly.
                    </p>
                    {selectedDoctorDetails && (
                        <div className="selected-doctor">
                            <img src={selectedDoctorDetails.imageUrl} alt={selectedDoctorDetails.name} />
                            <div>
                                <span>Selected doctor</span>
                                <strong>{selectedDoctorDetails.name}</strong>
                                <p>{selectedDoctorDetails.specialization}</p>
                            </div>
                        </div>
                    )}
                    {isOfflineMode && (
                        <p className="status-note">
                            Using local doctor data until the backend is available.
                        </p>
                    )}
                </div>

                <div className="form-container">
                    <h2>Book an appointment</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="patientName">Patient name</label>
                        <input
                            id="patientName"
                            type="text"
                            name="patientName"
                            value={appointment.patientName}
                            onChange={handleChange}
                            placeholder="Full name"
                            required
                        />

                        <label htmlFor="doctorId">Doctor</label>
                        <select
                            id="doctorId"
                            name="doctorId"
                            value={selectedDoctor}
                            onChange={(e) => setSelectedDoctor(e.target.value)}
                            required
                        >
                            <option value="">Select a doctor</option>
                            {doctors.map((doctor) => (
                                <option key={doctor.id} value={doctor.id}>
                                    {doctor.name} - {doctor.specialization}
                                </option>
                            ))}
                        </select>

                        <div className="form-row">
                            <div>
                                <label htmlFor="appointmentDate">Date</label>
                                <input
                                    id="appointmentDate"
                                    type="date"
                                    name="appointmentDate"
                                    value={appointment.appointmentDate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="appointmentTime">Time</label>
                                <input
                                    id="appointmentTime"
                                    type="time"
                                    name="appointmentTime"
                                    value={appointment.appointmentTime}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <label htmlFor="reason">Reason for visit</label>
                        <textarea
                            id="reason"
                            name="reason"
                            value={appointment.reason}
                            onChange={handleChange}
                            placeholder="Briefly describe symptoms or visit goals"
                            rows="5"
                            required
                        />
                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Booking...' : 'Confirm appointment'}
                        </button>
                    </form>
                    {message && <p className="message">{message}</p>}
                </div>
            </section>

            {appointments.length > 0 && (
                <section className="recent-appointments">
                    <div className="section-heading">
                        <p className="eyebrow">Recent</p>
                        <h2>Latest appointment requests</h2>
                    </div>
                    <div className="appointment-list">
                        {appointments.map((item) => (
                            <article key={item.id}>
                                <strong>{item.patientName}</strong>
                                <span>{item.appointmentDate} at {item.appointmentTime}</span>
                                <p>{item.doctor?.name || 'Doctor pending'} - {item.reason}</p>
                            </article>
                        ))}
                    </div>
                </section>
            )}
        </main>
    );
};

export default AppointmentForm;
