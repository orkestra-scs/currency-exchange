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
        userCredentials.setUsername("username");
        userCredentials.setId(0);

        when(userCredentialsRepository.findByUsername("username")).thenReturn(userCredentials);

        UserDetailsServiceImplementation userDetailsServiceImplementation =
                new UserDetailsServiceImplementation(userCredentialsRepository);
        UserCredentials expected = (UserCredentials) userDetailsServiceImplementation.loadUserByUsername("username");

        assertEquals("username", expected.getUsername());
        assertEquals("username", expected.getUsername());
        assertEquals(0, expected.getId());
        verify(userCredentialsRepository).findByUsername("username");
    }

    @Test
    void loadUserByUsernameException() {
        UserCredentialsRepository userCredentialsRepository = mock(UserCredentialsRepository.class);

        UsernameNotFoundException exception = Assertions.assertThrows(UsernameNotFoundException.class, () -> {
            UserCredentials userCredentials = new UserCredentials();
            userCredentials.setPassword("pass");
            userCredentials.setUsername("username");
            userCredentials.setId(0);

            UserDetailsServiceImplementation userDetailsServiceImplementation =
                    new UserDetailsServiceImplementation(userCredentialsRepository);
            userDetailsServiceImplementation.loadUserByUsername("username");
        });

        Assertions.assertEquals("User 'username' not found", exception.getMessage());
    }
}