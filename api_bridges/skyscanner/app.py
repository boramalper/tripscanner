from typing import List

from flask import Flask, request, jsonify
import requests
from datetime import datetime, timedelta
import json

def daysIn(airports, airport, daysInPlaces):
    x=0
    while(airports[x]!=airport):
        x=x+1
    return daysInPlaces[x]

def calculatePriceAndCarrier(route, startAirport, airports, startDate, daysInPlaces):
    carrier = []
    price = []
    daysPassed = 0
    for (a, b) in route:
        currDate = (datetime.strptime(startDate, "%Y-%m-%d")+timedelta(days=daysPassed))
        currStrDate = currDate.strftime("%Y-%m-%d")
        data = requests.get("https://www.skyscanner.net/g/chiron/api/v1/flights/browse/browsequotes/v1.0/"+"UK"+"/"+"EUR"+"/"+"en-GB"+"/"+a+"/"+b+"/"+currStrDate+"/", headers={"api-key": "hack-the-burgh-2020", "Accept": "application/json"}).json()
        print(data)
        if(data["Quotes"]!=[]):
          price.append(data["Quotes"][0]["MinPrice"])
          carrier.append(data["Quotes"][0]["OutboundLeg"]["CarrierIds"])
        else:
          price.append(0)
          carrier.append([0])
        if(b!=startAirport):
            daysPassed = daysPassed + daysIn(airports, b, daysInPlaces)
    return price, carrier

def calculateEmission(route):
    emissions = []
    time = []
    for (a, b) in route:
        data = requests.get("https://www.skyscanner.net/g/chiron/api/v1/eco/average-emissions?routes="+a+","+b, headers={"api-key": "hack-the-burgh-2020", "Accept": "application/json"}).json()
        print(">>>", a, b, data)
        emissions.append(data[0]["perSeatEmissions"])
        time.append(data[0]["emissions"] / 6500)
    return emissions, time


app = Flask(__name__)


@app.route("/")
def index():
    # 3-letters IATA main airport code
    start_iata = request.args["start_iata"]  # type: str
    # ISO8601: 2020-11-23
    start_date = request.args["start_date"]  # type: str
    visits = request.args.getlist("visit")  # type: List[str]
    days = [int(x) for x in request.args.getlist("day")]  # type: List[int]

    if len(visits) != len(days):
        raise Exception("visits and days are of different length!")

    print(start_iata)
    print(start_date)
    print(visits)
    print(days)

    #### PUT YOUR CODE BELOW ####
    allAirports = [start_iata]+visits+[start_iata]
    route = list(zip(allAirports, allAirports[1:]))
    price, carrier = calculatePriceAndCarrier(route, start_iata, visits, start_date, days)
    emissions, time = calculateEmission(route)

    response = jsonify([{
        "price": price[i],
        "emission": emissions[i],
        "carrierId": carrier[i][0],
        "time": time[i]
    } for i in range(len(visits)+1)])
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


if __name__ == '__main__':
    app.run("")
