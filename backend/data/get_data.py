from bs4 import BeautifulSoup
import requests
import re
import googlemaps
import json
from dotenv import load_dotenv
from os import getenv

YEAR = "2025"
URL = "https://www.jamesbeard.org/blog/the-2025-james-beard-award-semifinalists#"

load_dotenv()
API_KEY = getenv("API_KEY")

gmaps = googlemaps.Client(key=API_KEY)

r = requests.get(URL)
soup = BeautifulSoup(r.content, "html.parser")

finalists = []


def get_lat_lon(place: str) -> tuple[float, float]:
    """
    Returns a tuple of lat, lon from the google geocoding
    api. Assumes the first result is the correct one.
    """
    geocode_result = gmaps.geocode(place)[0]
    return (
        geocode_result["geometry"]["location"]["lat"],
        geocode_result["geometry"]["location"]["lng"],
    )


for finalist in soup.find_all(["h4", "li"]):
    if finalist.name == "h4":
        # award category
        new_category = re.sub(r"\s+(p|P)resented.*", "", finalist.text.strip())
    else:
        # clean awardee info list
        finalist_info = finalist.text.replace(" \xa0", "").split(",")
        finalist_info = [x.strip() for x in finalist_info]

        num_items = len(finalist_info)
        # no person listed in awardee info
        if num_items == 3:
            restaurant, city, state = finalist_info
            person = ""
        # info includes people
        elif len(finalist_info) == 4:
            person, restaurant, city, state = finalist_info

        if num_items > 4:
            # skip best restaurateur entries with multiple restaurants
            pass
        else:
            # get coordinates
            place = restaurant + ", " + city + ", " + state + ", " + "USA"
            lat, lon = get_lat_lon(place)

            # add structured info to list
            finalists.append(
                {
                    "restaurant": restaurant,
                    "year": YEAR,
                    "category": new_category,
                    "city": city,
                    "state": state,
                    "person": person,
                    "lat": lat,
                    "lon": lon,
                }
            )

with open(f"./{YEAR}_semifinalists.json", "w") as f:
    json.dump(finalists, f, indent=4)
