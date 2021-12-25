package com.orkestrascs.currencyExchange.service;

import com.orkestrascs.currencyExchange.data.UserCredentialsRepository;
import com.orkestrascs.currencyExchange.model.UserCredentials;
import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class UserServiceTest {
    @Test
    void createUser() {
        PasswordEncoder passwordEncoder = mock(PasswordEncoder.class);
        UserCredentialsRepository userCredentialsRepository = mock(UserCredentialsRepository.class);

        UserCredentials userCredentials = new UserCredentials();
        userCredentials.setPassword("pass");
        userCredentials.setUsername("username");
        userCredentials.setId(0);

        when(passwordEncoder.encode(anyString())).thenReturn("secretPassword");
        when(userCredentialsRepository.save(any())).thenReturn(userCredentials);

        UserService userService =
                new UserService(userCredentialsRepository,passwordEncoder);
        UserCredentials expected = (UserCredentials) userService.createUser(userCredentials);

        assertEquals("username", expected.getUsername());
        assertEquals("username", expected.getUsername());
        assertEquals(0, expected.getId());
        verify(passwordEncoder).encode("pass");
        verify(userCredentialsRepository).save(any());
    }

}