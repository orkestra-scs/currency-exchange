package com.orkestrascs.currencyExchange.service;

import com.orkestrascs.currencyExchange.data.CurrencyRepository;
import com.orkestrascs.currencyExchange.model.Currency;
import okhttp3.HttpUrl;
import okhttp3.mockwebserver.MockResponse;
import okhttp3.mockwebserver.MockWebServer;
import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;

class CurrencyServiceTest {

    @Test
    void createCurrency() {
        CurrencyRepository repository = mock(CurrencyRepository.class);

        CurrencyService service = new CurrencyService("url","key","CCY",repository);
        Currency newCurrency = new Currency();
        newCurrency.setSymbol("TST");
        newCurrency.setDescription("test");

        service.createCurrency(newCurrency);

        verify(repository).save(newCurrency);
    }

    @Test
    void updateCurrency() {
        CurrencyRepository repository = mock(CurrencyRepository.class);

        CurrencyService service = new CurrencyService("url","key","CCY",repository);
        Currency newCurrency = new Currency();
        newCurrency.setSymbol("TST");
        newCurrency.setDescription("test");
        service.updateCurrency(newCurrency);

        verify(repository).save(newCurrency);
    }

    @Test
    void getCurrencies() {
        CurrencyRepository repository = mock(CurrencyRepository.class);

        CurrencyService service = new CurrencyService("url","key","CCY",repository);
        service.getCurrencies();

        verify(repository).findAll();
    }

    @Test
    void deleteCurrency() {
        CurrencyRepository repository = mock(CurrencyRepository.class);

        CurrencyService service = new CurrencyService("url","key","CCY",repository);
        service.deleteCurrency("CCY");

        verify(repository).deleteCurrencyBySymbol("CCY");
    }

    @Test
    void historicalData() throws IOException {
        LocalDate date = LocalDate.now();
        MockWebServer mockWebServer = new MockWebServer();
        MockResponse mockedResponse = new MockResponse().setBody("[{\"id\": 1}]").addHeader("Content-Type", "application/json");
        mockWebServer.enqueue(mockedResponse);
        mockWebServer.start();
        HttpUrl url = mockWebServer.url("/timeseries?access_key=key" +
                "&start_date="+ date + "&end_date"+ date +
                "&symbols=CCY&base=CCY");

        CurrencyService service = new CurrencyService(url.toString(),"key","CCY",null);
        String result = service.historicalData(date,date,"CCY");

        assertEquals("[{\"id\": 1}]", result);

        mockWebServer.shutdown();
    }

    @Test
    void latestData() throws IOException {
        MockWebServer mockWebServer = new MockWebServer();
        MockResponse mockedResponse = new MockResponse().setBody("[{\"id\": 1}]").addHeader("Content-Type", "application/json");
        mockWebServer.enqueue(mockedResponse);
        mockWebServer.start();
        HttpUrl url = mockWebServer.url("/latest?access_key=key&symbols =CCY&base=CCY");

        CurrencyService service = new CurrencyService(url.toString(),"key","CCY",null);
        String result = service.latestData("CCY");

        assertEquals("[{\"id\": 1}]", result);

        mockWebServer.shutdown();
    }

}