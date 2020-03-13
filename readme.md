# Flight App

Hi, Konrad here.
It's my app for an internship assignment.

If your are running this app via internet sites bellow by patient at beginning, **heroku** need to "wake up" (30-60 sec).

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


