package com.orkestrascs.currencyExchange.data;

import com.orkestrascs.currencyExchange.model.Currency;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CurrencyRepository extends JpaRepository<Currency, String> {
    void deleteCurrencyBySymbol(String symbol);
}
