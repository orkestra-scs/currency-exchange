# currency-exchange

This assignment is to create a simple web page in which users can register, add the currency of their choice and monitor the rate of selected currencies against USD. 

> You can use any public API of your choice to load the rates as long as it includes current rates and historical rates
> E.g. https://exchangeratesapi.io/documentation/

## Technology Stack
* Front-End: React JS
* Back-End: Spring Boot or Django
* Database: PostgreSQL

### Front-End
The front-end application should include the following pages:
* Register
    * Sign up with username & password & confirm password
    * password validation: minimum 8 characters & alpha-numeric 
* login / logout (session handling)
* Currencies page
    * View list of currencies that user has added
    * ability to add, edit or remove currencies
    * base currency is USD
* landing page / Dashboard
    * a way to select different currencies added in previous page
    * show a chart with daily rates for the past 2-3 weeks
    * show current rates for all currencies in a separate section
* Unit tests & E2E tests
    
### Back-End
The back-end application should include the following features:
* Data models for DB
* User management
* Session handling
* Connection to a public API for exchange rates (e.g. https://exchangeratesapi.io/documentation/)
* Api endpoints to support FE:
    * User registration
    * User login
    * CRUD for currency
* Unit tests & E2E tests

> Note!
> 
> When adding a new currency we should call the public exchange rate API and load the historical rates for the past month
        
  
## Objectives
The main goal here is to assess your abilities to build a modern app from scratch. In the process of building this simple app you'll:
* Create a reliable API that supports the FE and links it up with the database
* Create data models that would be transformed into database tables
* Link up with a public RESTfull API
* Build a modern and responsive web application. 
> Although the focus wouldn't be on building a fancy web app with sophisticated UI design, it is expected to see a decent-looking app. Try to use  Bootstrap to easily incorporate the design aspect into your app
* Add unit test and E2E test to both apps

### Nice to have
* Unit test for both FE and BE
* DB migration in the BE


> ###Important Note!
> 
> * It should take you between 2-4 days to implement all features for this project. You can fork this repo and submit your code in your own Github account.
> * It is fine if you cannot complete all the mentioned features. Focus on delivering as much as you can in the most reliable and scalable way possible.
> * Try to break the app into different sections and submit the respective code in separate commits.
> * Your code is expected to be clean, readable and follow industry coding conventions.
