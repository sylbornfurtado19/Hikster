package com.hikster.repositories;

import com.hikster.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // This allows us to find a user by email during login
    User findByEmail(String email);
}
