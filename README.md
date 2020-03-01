# Tripscanner

**SKYSCANNER CHALLANGE WINNER OF HACK THE BURGH 2020**

See https://devpost.com/software/tripscanner-znpwi8

## Running
```bash
./runall.sh
```

Visit [http://localhost:8080/](http://localhost:8080/).

----


## Inspiration
We wanted to show people that it is possible to travel to a lot of places by train as well as airplane, and that it takes about the same time sometimes and to inform about the emission during the flight.+

## What it does
It takes a route consisting of as many places as you like, where you want to stay a certain amount of tim, and finds you the corresponding flight route, and if possible, train alternatives.
We include the time for both ways so that you can compare if train might even be faster.

## How we built it
We used Python and Node, as well as the Skyscanner and the Interrail APIs.

## Challenges we ran into
For example the time for flight is calculated over emissions, since there is no duration response.

## Accomplishments that we're proud of
It works and gives all the relevant information in a very concise and intuitive way.

## What we learned
How to operate with the Skyscanner API, and that it is possible to make a prototype of an idea in a very short time.

## What's next for TripScanner
Calculating the best way to order the route, by calculating the route with the least emission of all possible routes going to the places the user wishes to visit.
