# Libre Content App

App for register any content which you thinking.

## Stack

- MEAN.
- Docker.

## For Run

$ docker-compose up -d

## REST API Routes

POST http://localhost:3000/contents/create : for create content with the body {"title":"the title of the content","author":"the author of the content","description":"the description"}
GET http://localhost:3000/contents/:id : get detail of a content given by id
GET http://localhost:3000/contents/list/all : get all contents
PUT http://localhost:3000/contents/:id/update : update content given by id
DELETE http://localhost:3000/contents/:id/delete : delete content given by id
GET http://localhost:3000/contents/printNumber/:number : get number in stair format
GET http://localhost:3000/contents/printStair/:times : get # symbols in stair format the times you want
GET http://localhost:3000/contents/nearbyEvent/:dateForQuery&:eventDates get date of the event closest ["YYYY-MM-DD","YYYY-MM-DD",...] to the entered date (date format : YYYY-MM-DD)

## Frontend

http://localhost:4200

## TO DO

- Frontend : edit and delete buttons, routes and UI details.
- Backend : finish de functionality of printNumber, printStair and nearbyEvent.