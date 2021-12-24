package com.orkestrascs.currencyExchange.service;

import com.orkestrascs.currencyExchange.data.UserCredentialsRepository;
import com.orkestrascs.currencyExchange.model.UserCredentials;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class UserDetailsServiceImplementationTest {

    @Test
    void loadUserByUsername() {
        UserCredentialsRepository userCredentialsRepository = mock(UserCredentialsRepository.class);

        UserCredentials userCredentials = new UserCredentials();
        userCredentials.setPassword("pass");
        userCredentials.setEmail("email");
        userCredentials.setName("name");
        userCredentials.setId(0);

        when(userCredentialsRepository.findByEmail("email")).thenReturn(userCredentials);

        UserDetailsServiceImplementation userDetailsServiceImplementation =
                new UserDetailsServiceImplementation(userCredentialsRepository);
        UserCredentials expected = (UserCredentials) userDetailsServiceImplementation.loadUserByUsername("email");

        assertEquals("email", expected.getEmail());
        assertEquals("email", expected.getUsername());
        assertEquals(0, expected.getId());
        verify(userCredentialsRepository).findByEmail("email");
    }

    @Test
    void loadUserByUsernameException() {
        UserCredentialsRepository userCredentialsRepository = mock(UserCredentialsRepository.class);

        UsernameNotFoundException exception = Assertions.assertThrows(UsernameNotFoundException.class, () -> {
            UserCredentials userCredentials = new UserCredentials();
            userCredentials.setPassword("pass");
            userCredentials.setEmail("email");
            userCredentials.setName("name");
            userCredentials.setId(0);

            UserDetailsServiceImplementation userDetailsServiceImplementation =
                    new UserDetailsServiceImplementation(userCredentialsRepository);
            userDetailsServiceImplementation.loadUserByUsername("email");
        });

        Assertions.assertEquals("User 'email' not found", exception.getMessage());
    }
}