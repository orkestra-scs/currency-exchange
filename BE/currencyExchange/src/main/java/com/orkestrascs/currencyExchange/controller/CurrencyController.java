package com.orkestrascs.currencyExchange.controller;

import com.orkestrascs.currencyExchange.model.Currency;
import com.orkestrascs.currencyExchange.service.CurrencyService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@RestController() @RequestMapping("/currency") @CrossOrigin(origins="http://localhost:3000", maxAge=3600)
public class CurrencyController {
    private final CurrencyService currencyService;

    public CurrencyController(CurrencyService currencyService) {
        this.currencyService = currencyService;
    }

    @PostMapping()
    public Currency addCurrency(@RequestBody Currency currency){
        return currencyService.createCurrency(currency);
    }

    @PutMapping()
    public Currency updateCurrency(@RequestBody Currency currency){
        return currencyService.updateCurrency(currency);
    }

    @DeleteMapping()
    public void deleteCurrency(@RequestParam String symbol){
        currencyService.deleteCurrency(symbol);
    }

    @GetMapping()
    public List<Currency> getCurrencies(){
        return currencyService.getCurrencies();
    }

    @GetMapping("/latest")
    public String getLatest(@RequestParam String symbol) throws IOException {
        return currencyService.latestData(symbol);
    }

    @GetMapping("/all-latest")
    public String getAllLatest() throws IOException {
        return currencyService.getAllLatestData();
    }

    @GetMapping("/timeseries")
    public String getTimeSeries(@RequestParam LocalDate startDate, @RequestParam LocalDate endDate, @RequestParam String symbol) throws IOException {
        return currencyService.historicalData(startDate, endDate,symbol);
    }

}
