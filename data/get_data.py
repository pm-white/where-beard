from bs4 import BeautifulSoup
import requests
import re
import googlemaps
from dotenv import load_dotenv
from os import getenv


def get_lat_lon(place: str, gmaps_client: googlemaps.Client) -> tuple[float, float]:
    """
    Returns a tuple of lat, lon from the google geocoding
    api. Assumes the first result is the correct one.
    """
    geocode_result = gmaps_client.geocode(place)[0]
    return (
        geocode_result["geometry"]["location"]["lat"],
        geocode_result["geometry"]["location"]["lng"],
    )


def get_data(year: int, url: str) -> list:
    r = requests.get(url)
    soup = BeautifulSoup(r.content, "html.parser")

    load_dotenv()
    API_KEY = getenv("API_KEY")
    gmaps = googlemaps.Client(key=API_KEY)

    finalists = []
    # the page structure changed quite a bit from 2025 so just find the section with the awards and search within that
    section = soup.find("section", id="eb7ab6fa2b30")
    page_items = section.find_all(["h3", "li"])
    count = 0
    for finalist in page_items:
        count += 1
        if count % 50 == 0:
            print(f"Parsing item {count} / {len(page_items)} items on awards page.")
        if finalist.name == "h3":
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
                lat, lon = get_lat_lon(place, gmaps)

                # add structured info to list
                finalists.append(
                    {
                        "restaurant": restaurant,
                        "year": year,
                        "category": new_category,
                        "city": city,
                        "state": state,
                        "person": person,
                        "lat": lat,
                        "lon": lon,
                    }
                )

    return finalists
