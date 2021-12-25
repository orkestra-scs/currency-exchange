package com.orkestrascs.currencyExchange.data;

import com.orkestrascs.currencyExchange.model.UserCredentials;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserCredentialsRepository extends JpaRepository<UserCredentials, Long> {
    UserCredentials findByUsername(String username);
}
