package com.orkestrascs.currencyExchange.service;

import com.orkestrascs.currencyExchange.data.UserCredentialsRepository;
import com.orkestrascs.currencyExchange.model.UserCredentials;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    protected final UserCredentialsRepository userCredentialsRepository;
    protected final PasswordEncoder encoder;

    public UserService(UserCredentialsRepository userCredentialsRepository, PasswordEncoder encoder) {
        this.userCredentialsRepository = userCredentialsRepository;
        this.encoder = encoder;
    }

    public UserDetails createUser(UserCredentials userCredentials){
        userCredentials.setPassword(encoder.encode(userCredentials.getPassword()));
        return userCredentialsRepository.save(userCredentials);
    }
}
