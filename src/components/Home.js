import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import doctors from '../data/doctors.json';
import './Home.css';
import hospitalImage from '../assets/images/hospital.jpg';

const services = [
  { title: 'Primary care', copy: 'Annual checkups, preventive screening, and coordinated follow-up care.' },
  { title: 'Specialist visits', copy: 'Cardiology, pediatrics, orthopedics, dermatology, and more in one network.' },
  { title: 'Diagnostics', copy: 'Fast lab coordination and imaging referrals with clear next steps.' },
  { title: 'Care support', copy: 'Appointment reminders, visit preparation, and patient support after discharge.' }
];

const stats = [
  { value: '24/7', label: 'Urgent guidance' },
  { value: '18+', label: 'Clinical specialties' },
  { value: '4.8/5', label: 'Patient rating' }
];

const Home = ({ isLoggedIn }) => {
  const [query, setQuery] = useState('');
  const [specialty, setSpecialty] = useState('All');

  const specialties = useMemo(
    () => ['All', ...new Set(doctors.map((doctor) => doctor.specialization))],
    []
  );

  const filteredDoctors = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return doctors.filter((doctor) => {
      const matchesSpecialty = specialty === 'All' || doctor.specialization === specialty;
      const matchesQuery =
        !normalizedQuery ||
        doctor.name.toLowerCase().includes(normalizedQuery) ||
        doctor.specialization.toLowerCase().includes(normalizedQuery);

      return matchesSpecialty && matchesQuery;
    });
  }, [query, specialty]);

  return (
    <main className="home-container">
      <section className="hero-section">
        <img src={hospitalImage} alt="Modern hospital lobby" className="hero-image" />
        <div className="hero-overlay">
          <div className="hero-copy">
            <p className="eyebrow">Integrated healthcare network</p>
            <h1>Care that is easy to book, track, and trust.</h1>
            <p>
              Connect with experienced doctors, choose a convenient appointment slot, and keep
              your visit details organized in one patient-friendly experience.
            </p>
            <div className="hero-actions">
              <Link to={isLoggedIn ? '/book' : '/login'} className="primary-action">
                Book appointment
              </Link>
              <a href="#doctors" className="secondary-action">
                View doctors
              </a>
            </div>
          </div>
          <div className="hero-panel" aria-label="Today at a glance">
            <span>Today</span>
            <strong>32 open slots</strong>
            <p>Average confirmation time: 12 minutes</p>
          </div>
        </div>
      </section>

      <section className="stats-band" aria-label="Clinic highlights">
        {stats.map((stat) => (
          <div key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </section>

      <section className="content-section about-us-section">
        <div>
          <p className="eyebrow">Why patients choose us</p>
          <h2>Modern care with human follow-through.</h2>
        </div>
        <p>
          Our care teams combine specialist access, practical scheduling, and clear communication
          so patients know what happens before, during, and after each visit.
        </p>
      </section>

      <section className="content-section services-section">
        <div className="section-heading">
          <p className="eyebrow">Services</p>
          <h2>Everything needed for everyday care.</h2>
        </div>
        <div className="service-grid">
          {services.map((service) => (
            <article className="service-card" key={service.title}>
              <h3>{service.title}</h3>
              <p>{service.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section doctors-section" id="doctors">
        <div className="section-heading">
          <p className="eyebrow">Doctors</p>
          <h2>Find the right specialist.</h2>
        </div>
        <div className="doctor-toolbar">
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by doctor or specialty"
            aria-label="Search doctors"
          />
          <select value={specialty} onChange={(event) => setSpecialty(event.target.value)}>
            {specialties.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="doctor-cards">
          {filteredDoctors.map((doctor) => (
            <article className="doctor-card" key={doctor.id}>
              <img src={doctor.imageUrl} alt={doctor.name} className="doctor-image" />
              <div>
                <h3>{doctor.name}</h3>
                <p>{doctor.specialization}</p>
              </div>
              <Link to={isLoggedIn ? '/book' : '/login'}>Schedule</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section locations-section">
        <div className="section-heading">
          <p className="eyebrow">Locations</p>
          <h2>Visit a clinic near you.</h2>
        </div>
        <div className="location-details">
          <article>
            <h3>Main Campus</h3>
            <p>123 Health Ave, New York, NY 10001</p>
            <span>(123) 456-7890</span>
          </article>
          <article>
            <h3>Satellite Clinic</h3>
            <p>456 Wellness Blvd, Brooklyn, NY 11201</p>
            <span>(123) 987-6543</span>
          </article>
        </div>
      </section>
    </main>
  );
};

export default Home;
