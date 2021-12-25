package com.orkestrascs.currencyExchange.service;

import com.orkestrascs.currencyExchange.data.CurrencyRepository;
import com.orkestrascs.currencyExchange.model.Currency;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Locale;

@Service
public class CurrencyService {
    private final String baseCurrency;
    private final CurrencyRepository currencyRepository;
    private final OkHttpClient client;
    private final String dataAPI;
    private final String accessKey;

    public CurrencyService(@Value("${data-api}") String dataAPI,
                           @Value("${access-key}") String accessKey,
                           @Value("${base-currency}") String baseCurrency,
                           CurrencyRepository currencyRepository) {
        this.baseCurrency = baseCurrency;
        this.currencyRepository = currencyRepository;
        this.client = new OkHttpClient();
        this.dataAPI = dataAPI;
        this.accessKey = accessKey;
    }

    @Transactional
    public Currency createCurrency(Currency currency){
        currency.setSymbol(currency.getSymbol().toUpperCase(Locale.ROOT));
        return currencyRepository.save(currency);
    }
    @Transactional
    public Currency updateCurrency(Currency currency){
        currency.setSymbol(currency.getSymbol().toUpperCase(Locale.ROOT));
        return currencyRepository.save(currency);
    }

    public List<Currency> getCurrencies(){
        return currencyRepository.findAll();
    }
    @Transactional
    public void deleteCurrency(String symbol){
        currencyRepository.deleteCurrencyBySymbol(symbol);
    }
    @Cacheable(value = "symbolHistory")
    public String historicalData(LocalDate startDate, LocalDate endDate, String symbol) throws IOException {
        Request request = new Request.Builder()
                .url(dataAPI+"/timeseries?"+
                        "&start_date="+ startDate.toString() + "&end_date="+endDate.toString()+
                        "&symbols="+symbol +"&base="+baseCurrency)
                .build();
        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) throw new IOException("Unexpected code " + response);
            return response.body().string();
        }
    }

    public String latestData( String symbol) throws IOException {
        Request request = new Request.Builder()
                .url(dataAPI+"/latest?"+
                        "&symbols="+symbol +"&base="+baseCurrency)
                .build();
        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) throw new IOException("Unexpected code " + response);
            return response.body().string();
        }
    }

    public String getAllLatestData() throws IOException {
        String symbols = String.join(",",currencyRepository.getAllSymbols());
       return latestData(symbols);
    }

}
