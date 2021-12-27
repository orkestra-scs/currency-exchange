package com.orkestrascs.currencyExchange;

import com.orkestrascs.currencyExchange.data.CurrencyRepository;
import com.orkestrascs.currencyExchange.data.UserCredentialsRepository;
import com.orkestrascs.currencyExchange.model.Currency;
import com.orkestrascs.currencyExchange.model.UserCredentials;
import org.junit.Ignore;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.annotation.Order;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.util.NestedServletException;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@Ignore
class CurrencyExchangeApplicationTests {

	@Autowired
	private MockMvc mockMvc;
	@Autowired
	private UserCredentialsRepository credentialsRepository;
	@Autowired
	private CurrencyRepository currencyRepository;

	@Test @Order(1)
	void registerUser() throws Exception {
		credentialsRepository.deleteAll();
		String credentials = "{\n" +
				"    \"username\":\"test\",\n" +
				"    \"password\": \"password\"\n" +
				"}";
		mockMvc.perform(post("/register")
				.contentType(MediaType.APPLICATION_JSON)
				.content(credentials))
				.andExpect(status().isOk());
		UserCredentials user = credentialsRepository.findByUsername("test");
		assertNotNull(user, "User is null");
		assertEquals(user.getUsername(),"test");
	}

	@Test @Order(2)
	void registerUserExists()  {
		UserCredentials userCredentials = new UserCredentials();
		userCredentials.setUsername("test2");
		userCredentials.setPassword("password");
		credentialsRepository.save(userCredentials);
		String credentials = "{\n" +
				"    \"username\":\"test2\",\n" +
				"    \"password\": \"password\"\n" +
				"}";
		String expectedExceptionMessage = "Request processing failed; nested exception is org.springframework.dao.DataIntegrityViolationException:" +
				" could not execute statement; SQL [n/a]; constraint [user_credentials_username_key]; " +
				"nested exception is org.hibernate.exception.ConstraintViolationException:" +
				" could not execute statement";
		NestedServletException exception = Assertions.assertThrows(NestedServletException.class, () -> mockMvc.perform(post("/register")
				.contentType(MediaType.APPLICATION_JSON)
				.content(credentials))
				.andExpect(status().isOk()));

		Assertions.assertEquals(expectedExceptionMessage, exception.getMessage());
	}

	@Test @Order(3)
	void loginInvalidCredentials() throws Exception {
		mockMvc.perform(get("/login")
				.with(httpBasic("testBad","password")))
				.andExpect(status().isUnauthorized());
	}

	@Test @Order(4)
	void login() throws Exception {
		mockMvc.perform(get("/login")
				.with(httpBasic("test","password")))
				.andExpect(status().isOk());
	}

	@Test
	void addCurrencyNoAuth() throws Exception {
		String currency = "{\n" +
				"    \"symbol\":\"TST\",\n" +
				"    \"description\": \"test\"\n" +
				"}";
		mockMvc.perform(post("/currency")
				.contentType(MediaType.APPLICATION_JSON)
				.content(currency))
				.andExpect(status().isUnauthorized());
	}

	@Test @WithMockUser(username = "test")
	void addCurrencyAuth() throws Exception {
		currencyRepository.deleteAll();
		String currency = "{\n" +
				"    \"symbol\":\"TST\",\n" +
				"    \"description\": \"test\"\n" +
				"}";
		mockMvc.perform(post("/currency")
				.contentType(MediaType.APPLICATION_JSON)
				.content(currency))
				.andExpect(status().isOk());

		Currency savedCurrency = currencyRepository.findBySymbol("TST");
		assertNotNull(savedCurrency, "Currency is null");
		assertEquals("TST",savedCurrency.getSymbol());

	}

	@Test @WithMockUser(username = "test")
	void addExistingCurrency() {
		currencyRepository.deleteAll();
		Currency newCurrency = new Currency();
		newCurrency.setSymbol("TST");
		newCurrency.setDescription("test");
		currencyRepository.save(newCurrency);

		String currency = "{\n" +
				"    \"symbol\":\"TST\",\n" +
				"    \"description\": \"test\"\n" +
				"}";
		String expectedExceptionMessage = "Request processing failed; nested exception is org.springframework.dao.DataIntegrityViolationException:" +
				" could not execute statement; SQL [n/a]; constraint [currency_symbol_key]; " +
				"nested exception is org.hibernate.exception.ConstraintViolationException: " +
				"could not execute statement";

		NestedServletException exception = Assertions.assertThrows(NestedServletException.class, () -> mockMvc.perform(post("/currency")
				.contentType(MediaType.APPLICATION_JSON)
				.content(currency))
				.andExpect(status().isOk()));

		Assertions.assertEquals(expectedExceptionMessage, exception.getMessage());
	}

	@Test
	void updateCurrencyNoAuth() throws Exception {
		String currency = "{\n" +
				"    \"symbol\":\"TST\",\n" +
				"    \"description\": \"test update\"\n" +
				"}";
		mockMvc.perform(put("/currency")
				.contentType(MediaType.APPLICATION_JSON)
				.content(currency))
				.andExpect(status().isUnauthorized());
	}

	@Test  @WithMockUser(username = "test")
	void updateCurrencyAuth() throws Exception {
		currencyRepository.deleteAll();
		Currency newCurrency = new Currency();
		newCurrency.setSymbol("TST");
		newCurrency.setDescription("test");
		newCurrency = currencyRepository.save(newCurrency);

		String currency = "{\n" +
				"    \"id\":\"" +newCurrency.getId() +"\",\n" +
				"    \"symbol\":\"TST\",\n" +
				"    \"description\": \"test\"\n" +
				"}";
		mockMvc.perform(put("/currency")
				.contentType(MediaType.APPLICATION_JSON)
				.content(currency))
				.andExpect(status().isOk());

		Currency savedCurrency = currencyRepository.findBySymbol("TST");
		assertNotNull(savedCurrency, "Currency is null");
		assertEquals("TST",savedCurrency.getSymbol());
		assertEquals("test",savedCurrency.getDescription());
	}

	@Test
	void deleteCurrencyNoAuth() throws Exception {
		mockMvc.perform(delete("/currency?symbol=TST"))
				.andExpect(status().isUnauthorized());
	}

	@Test @WithMockUser(username = "test")
	void deleteCurrencyAuth() throws Exception {
		currencyRepository.deleteAll();
		Currency newCurrency = new Currency();
		newCurrency.setSymbol("TST");
		newCurrency.setDescription("test");
		currencyRepository.save(newCurrency);

		mockMvc.perform(delete("/currency?symbol=TST"))
				.andExpect(status().isOk());

		Currency savedCurrency = currencyRepository.findBySymbol("TST");
		assertNull(savedCurrency, "Currency is not null");
	}

	@Test
	void getAllCurrencyNoAuth() throws Exception {
		mockMvc.perform(get("/currency"))
				.andExpect(status().isUnauthorized());
	}

	@Test @WithMockUser(username = "test")
	void getAllCurrencyAuth() throws Exception {
		currencyRepository.deleteAll();
		Currency newCurrency = new Currency();
		newCurrency.setSymbol("TST");
		newCurrency.setDescription("test");
		currencyRepository.save(newCurrency);

		mockMvc.perform(get("/currency"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$[0].symbol").value("TST"))
		;
	}

	@Test
	void getLatestNoAuth() throws Exception {
		mockMvc.perform(get("/currency/latest?symbol=CAD"))
				.andExpect(status().isUnauthorized());
	}

	@Test @WithMockUser(username = "test")
	void getLatestAuth() throws Exception {
		mockMvc.perform(get("/currency/latest?symbol=CAD"))
				.andExpect(status().isOk());
	}

	@Test
	void getAllLatestNoAuth() throws Exception {
		mockMvc.perform(get("/currency/all-latest"))
				.andExpect(status().isUnauthorized());
	}

	@Test @WithMockUser(username = "test")
	void getAllLatestAuth() throws Exception {
		mockMvc.perform(get("/currency/all-latest"))
				.andExpect(status().isOk());
	}

	@Test
	void getTimeSeriesNoAuth() throws Exception {
		mockMvc.perform(get("/currency/timeseries?startDate="+LocalDate.now()
				+"&endDate="+LocalDate.now()+ "&symbol=CAD"))
				.andExpect(status().isUnauthorized());
	}

	@Test @WithMockUser(username = "test")
	void getTimeSeriesAuth() throws Exception {
		mockMvc.perform(get("/currency/timeseries?startDate="+LocalDate.now()
				+"&endDate="+LocalDate.now()+ "&symbol=CAD"))
				.andExpect(status().isOk());
	}
}
