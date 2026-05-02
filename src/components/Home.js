// // src/components/Home.js
// import React from 'react';
// import hospitalImage from '../assets/images/hospital.jpg'; // Make sure you have this image
// import doctor1Image from '../assets/images/doctor1.jpg'; // Make sure you have this image
// import doctor2Image from '../assets/images/doctor2.jpg'; // Make sure you have this image
// import './Home.css'; // We'll create this next


// const Home = () => {
//   return (
//     <div className="home-container">
//       <section className="hero-section">
//         <img src={hospitalImage} alt="Modern Hospital" className="hero-image" />
//         <div className="hero-overlay">
//           <h1>Your Health, Our Priority</h1>
//           <p>Providing exceptional healthcare services with compassion and expertise.</p>
//         </div>
//       </section>

//       <section className="about-us-section">
//         <h2>About Us</h2>
//         <p>
//           We are dedicated to delivering top-tier medical care. Our state-of-the-art facilities and
//           highly experienced team ensure that you receive the best possible treatment.
//         </p>
//       </section>

//       <section className="doctors-section">
//         <h2>Meet Our Experts</h2>
//         <div className="doctor-cards">
//           <div className="doctor-card">
//             <img src={doctor1Image} alt="Dr. John Smith" className="doctor-image" />
//             <h3>Dr. John Smith</h3>
//             <p>Cardiology Specialist</p>
//             <p>Experienced in advanced cardiac care.</p>
//           </div>
//           <div className="doctor-card">
//             <img src={doctor2Image} alt="Dr. Jane Doe" className="doctor-image" />
//             <h3>Dr. Jane Doe</h3>
//             <p>Pediatrician</p>
//             <p>Compassionate care for children of all ages.</p>
//           </div>
//         </div>
//       </section>

//       <section className="locations-section">
//         <h2>Our Locations</h2>
//         <div className="location-details">
//           <div>
//             <h3>Main Campus</h3>
//             <p>123 Health Ave, New York, NY 10001</p>
//             <p>Phone: (123) 456-7890</p>
//           </div>
//           <div>
//             <h3>Satellite Clinic</h3>
//             <p>456 Wellness Blvd, Brooklyn, NY 11201</p>
//             <p>Phone: (123) 987-6543</p>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Home;

// src/components/Home.js
import React from 'react';
import doctors from '../data/doctors.json'; // Import the local JSON file
import './Home.css';
import hospitalImage from '../assets/images/hospital.jpg';

const Home = () => {
  return (
    <div className="home-container">
      <section className="hero-section">
        <img src={hospitalImage} alt="Modern Hospital" className="hero-image" />
        <div className="hero-overlay">
          <h1>Your Health, Our Priority</h1>
          <p>Providing exceptional healthcare services with compassion and expertise.</p>
        </div>
      </section>

      <section className="about-us-section">
        <h2>About Us</h2>
        <p>
          We are dedicated to delivering top-tier medical care. Our state-of-the-art facilities and
          highly experienced team ensure that you receive the best possible treatment.
        </p>
      </section>

      <section className="doctors-section">
        <h2>Meet Our Experts</h2>
        <div className="doctor-cards">
          {doctors.map(doctor => (
            <div className="doctor-card" key={doctor.id}>
              <img src={doctor.imageUrl} alt={doctor.name} className="doctor-image" />
              <h3>{doctor.name}</h3>
              <p>{doctor.specialization}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="locations-section">
        <h2>Our Locations</h2>
        <div className="location-details">
          <div>
            <h3>Main Campus</h3>
            <p>123 Health Ave, New York, NY 10001</p>
            <p>Phone: (123) 456-7890</p>
          </div>
          <div>
            <h3>Satellite Clinic</h3>
            <p>456 Wellness Blvd, Brooklyn, NY 11201</p>
            <p>Phone: (123) 987-6543</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;