Please provide documentation on how to setup the environment from scratch

Application execution

1.  Create currencyExchange postgresql databases
2.  cd currencyExchange
3.  Execute 

        a.  On Linux/Unix 
                ./gradlew flywayClean
                ./gradlew flywayMigrate
                ./gradlew bootRun
        b.  On Windows 
                ./gradlew.bat flywayClean
                ./gradlew.bat flywayMigrate
                ./gradlew.bat bootRun
 
Application should start on port 8080
    


To execute the integration tests:

    1.  Create currencyExchangeTest db
    2.  execute : 

        create table currency(
             id bigint not null unique ,
            symbol varchar(3) not null unique ,
            description varchar(255) not null,
            constraint currency_pkey primary key (id)
        );

        create table user_credentials(
             id bigint not null unique ,
             username varchar(255) not null unique,
             password varchar(255) not null,
             is_valid boolean,
             constraint user_credentials_pkey primary key (id)
        );
        
        CREATE SEQUENCE hibernate_sequence START 3;

    3. Comment out line 37 in CurrencyExchangeApplicationTests.java
    4. ./gradlew test
