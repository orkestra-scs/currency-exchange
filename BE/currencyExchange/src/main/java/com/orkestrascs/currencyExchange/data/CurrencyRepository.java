package com.orkestrascs.currencyExchange.data;

import com.orkestrascs.currencyExchange.model.Currency;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CurrencyRepository extends JpaRepository<Currency, Long> {
    void deleteCurrencyBySymbol(String symbol);
    Currency findBySymbol(String symbol);
    @Query("select symbol from Currency ")
    List<String> getAllSymbols();
}
