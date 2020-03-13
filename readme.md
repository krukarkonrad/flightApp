# Flight App

Hi, Konrad here.
It's my app for an internship assignment.

If your are running this app via internet sites bellow by patient at beginning, **heroku** need to "wake up" (30-60 sec).
<br/>
WARNING: Option Flights->List with Tourist->*FLIGHT*->Add new Tourist - DOESN'T WORK ONLiNE (idk why) 

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

Database view with **ManyToMany** relation.
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

POST do require JSON body with fields to edit.
 ```
{
	"name": "Jan",
	"surname": "Kowalski",
}
```
This body is recived as ```Map<String, Object> updates``` which is used by loop to upload certain fields.

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

POST do require JSON body with fields to edit.
 ```
{
	"seats": "4",
	"takenSeatss": "2",
}
```
This body is recived as ```Map<String, Object> updates``` which is used by loop to upload certain fields.


