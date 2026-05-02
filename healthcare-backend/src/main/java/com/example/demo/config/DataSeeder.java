package com.example.demo.config;

import com.example.demo.entity.Doctor;
import com.example.demo.repository.DoctorRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner seedDoctors(DoctorRepository doctorRepository) {
        return args -> {
            if (doctorRepository.count() > 0) {
                return;
            }

            doctorRepository.saveAll(List.of(
                    new Doctor(null, "Dr. John Smith", "Cardiology", "https://randomuser.me/api/portraits/men/1.jpg"),
                    new Doctor(null, "Dr. Jane Doe", "Pediatrics", "https://randomuser.me/api/portraits/women/2.jpg"),
                    new Doctor(null, "Dr. Mike Johnson", "Orthopedics", "https://randomuser.me/api/portraits/men/3.jpg"),
                    new Doctor(null, "Dr. Emily Davis", "Dermatology", "https://randomuser.me/api/portraits/women/4.jpg")
            ));
        };
    }
}
