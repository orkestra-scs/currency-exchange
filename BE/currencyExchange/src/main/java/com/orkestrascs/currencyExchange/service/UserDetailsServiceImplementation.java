package com.orkestrascs.currencyExchange.service;

import com.orkestrascs.currencyExchange.data.UserCredentialsRepository;
import com.orkestrascs.currencyExchange.model.UserCredentials;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImplementation  implements UserDetailsService {
    protected final UserCredentialsRepository userCredentialsRepository;

    public UserDetailsServiceImplementation(UserCredentialsRepository userCredentialsRepository) {
        this.userCredentialsRepository = userCredentialsRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserCredentials userCredentials = userCredentialsRepository.findByEmail(username);
        if (userCredentials != null) {
            return userCredentials;
        }
        throw new UsernameNotFoundException("User '" + username + "' not found");
    }


}
