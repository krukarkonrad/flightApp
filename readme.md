# Flight App

Hi, Konrad here.
It's my app for an internship assignment.
![](https://i.gyazo.com/575aa23c6206d617b8812ad8a071bde9.png)

#### If your are running this app via internet sites bellow by patient at beginning, **heroku** may need to "wake up" (30-60 sec).
<br/>

# General
## App sites
FrontEnd: https://nostalgic-tereshkova-d1a088.netlify.com/ (with linked backend)

BackEnd: https://flightappkk.herokuapp.com (REST API)

Datebase: curently is on **heroku** site, while writing and testing code it was a MySQL db stored locally at my computer (XAMPP app).

## Backend
 - Java
 - Spring Boot
 - Heroku Postgres DataBase

## Frontend

 - Javascript
 - React JS
 - Ant.Design: https://ant.design/

## DataBase

Database view with **ManyToMany** relationship.
![](https://i.gyazo.com/11a181d75641485aa37cc69b91a772a6.png)

# Backend HTTP Calls

Tourist.GET
 --
 GET do not require body.
 <br/> 
```
api/tourist/all
```
Return all tourist that we could find in database.
<br/>
```
api/tourist/{id}
```
Return specify tourist that we could find in database by **ID**.

If it has got flights - it will have an array of them.

```
{
    "id": 1,
    "name": "Konrad",
    "surname": "Krukar",
    "gender": "GENDER_MALE",
    "country": "Poland",
    "notes": "Blank",
    "birthDate": "1997-03-09",
    "flights": [
        {
            "fligthStart": "2020-04-07 04:02:21",
            "fligthEnd": "2020-04-09 07:14:21",
            "seats": 4,
            "takenSeatss": 3,
            "ticketPrice": 16.0,
            "id": 585
        },
        {
            "fligthStart": "2020-04-10 14:59:09",
            "fligthEnd": "2020-04-13 20:07:09",
            "seats": 3,
            "takenSeatss": 2,
            "ticketPrice": 22.0,
            "id": 199
        }
    ]
}
```

Tourist.POST
--

```
api/tourist/add
```
 POST do require JSON body, e.g:
 ```
{
	"name": "Jan",
	"surname": "Kowalski",
	"gender": "GENDER_MALE",
	"country": "Poland",
	"notes": "Likes schabowe",
	"birthDate": "1980-03-09"
}
```
As a return information we get :
```
{
    "success": true,
    "message": "User successfully added"
}
```

AND

Gender can not be random, it's restricted to
```
GENDER_MALE,
GENDER_FEMALE,
GENDER_PNG //prefer not to give
```
Database observe it and possibly will return error.

Tourist.DELETE (not implemented on Frotnend)
--
```
api/tourist/{id}
```
Removes tourist with proper **ID**

Tourist.PATCH (not implemented on Frotnend)
--

```
api/tourist/{id}
```

PATCH do require JSON body with fields to edit.
 ```
{
	"name": "Jan",
	"surname": "Kowalski",
}
```
This body is received as ```Map<String, Object> updates``` which is used by loop to upload certain fields.

Flight.GET
 --
 GET do not require body.
 <br/> 
```
api/flight/all
```
Return all tourist that we could find in database.
<br/>
```
api/flight/{id}
```
Return specify tourist that we could find in database by **ID**.

If it has got tourists - it will have an array of them.

 ```
 {
    "id": 200,
    "fligthStart": "2020-03-29 07:53:31",
    "fligthEnd": "2020-03-30 10:15:31",
    "seats": 6,
    "takenSeatss": 2,
    "ticketPrice": 35.0,
    "tourists": [
        {
            "id": 131,
            "name": "Bonny",
            "surname": "Duffield",
            "gender": "GENDER_FEMALE",
            "country": "Indonesia",
            "notes": "Tamil",
            "birthDate": "1997-12-19"
        }
    ]
}
```


Flight.POST
--
```
api/flight/add
```
 POST do require JSON body, e.g:
 ```
{
    "fligthStart": "2020-03-29 07:53:31",
    "fligthEnd": "2020-03-30 10:15:31",
    "seats": 6,
    "takenSeatss": 2,
    "ticketPrice": 35.0
}
```
As a return information we get :
```
{
    "success": true,
    "message": "Flight successfully added"
}
```


Flight.DELETE (not implemented on Frotnend)
--
```
api/flight/{id}
```
Removes flight with proper **ID**

Flight.PATCH (not implemented on Frotnend)
--
```
api/flight/{id}
```

PATCH do require JSON body with fields to edit.
 ```
{
	"seats": "4",
	"takenSeatss": "2",
}
```
This body is received as ```Map<String, Object> updates``` which is used by loop to upload certain fields.

SearchForFlight.GET
--
We have two possibly to search for flight.

With only starting date:
```
api/tourist/search/{flightstart}
```

or with additional ending date:
```
api/tourist/search/{flightstart}/{flightend}
```

Backend prevents from putting unsearchable range (like ```flightstart``` > ```flightend```)

Participate.PUT
--
Is provided by TouristController

```
api/tourist/{touristid}/inflight/{flightid}
```
Adds a relationship between Tourist and Flight.

It also checks if ```Flight.takenSeatss``` is not equal to ```Flight.seats```.

If so increment ```Flight.takenSeatss``` and adds a relationship between Tourist and Flight.

Participate.DELETE
--
Is provided by TouristController

```
api/tourist/{touristid}/inflight/{flightid}
```
Removes a relationship between Tourist and Flight

# Backend Service

Every HTTP call is holded by proper service that is doing whole logic and database stuff.

Backend code is available in this repository ```flightApp/fligthApp/src/main/java/com/flightapp/```

# Frontend

As an application contains only few action I wasn't using React Route.

The biggest vulnerability for me is not refreshing list of Tourist/Flight assigned.

After an insert or remove of Tourist/Flight we need to refresh whole page to see results.


# Disclaimer

As now it looks more like Admin Panel - we have an access to everything.

Values like ```seats```, ```takenSeatss``` are totally random: 
```
seats = takenSeatss + random(1,4)
```

As well relationships.

So we could receive a ```Flight``` with values like:

```
{
    "fligthStart": "2020-03-29 07:53:31",
    "fligthEnd": "2020-03-30 10:15:31",
    "seats": 6,
    "id": 200,
    "takenSeatss": 2,
    "ticketPrice": 35.0,
    "tourists": [
        {
            "name": "Bonny",
            "surname": "Duffield",
            "gender": "GENDER_FEMALE",
            "country": "Indonesia",
            "notes": "Tamil",
            "birthDate": "1997-12-19",
            "id": 131
        }
    ]
}
``` 

Which contains ony one ```Tourist``` but seats ```Flight.takenSeatss``` may suggest something else.
This numbers are only for presentation purpose.

# Future prospect

- Reorganize Frontend
    - Project structure
    - Duplicated code like Tourist/Flight adding/removing from Flight/Tourist
    
- Make UI more user friendly: auto list refresh, more pleasant picking bar.
- Filtering table

- Add login option and manage only proper user flight