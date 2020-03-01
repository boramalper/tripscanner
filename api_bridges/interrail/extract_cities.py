import json


def main():
    with open("geo-catalog.json") as f:
        doc = json.load(f)

        cities = []
        for continent in doc["Continents"]:
            for country in continent["Countries"]:
                for city in country["Cities"]:
                    cities.append({
                        "country": country["Name"],
                        "name": city["Name"],
                        "iata": city["Airports"][0]["Id"],
                    })

    with open("cities.json", "w+") as f:
        json.dump(cities, f)

    print("OK.")

if __name__ == "__main__":
    main()
