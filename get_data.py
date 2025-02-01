from bs4 import BeautifulSoup
import requests

url = "https://www.jamesbeard.org/blog/the-2025-james-beard-award-semifinalists#"
r = requests.get(url)
soup = BeautifulSoup(r.content, "html.parser")

states = ["MA", "RI", "MA", "NH", "VT"]

for finalist in soup.find_all(["h4", "li"]):
    state = finalist.text.split(",")[-1].replace(")", "").strip()
    # print(state)
    if state in states:
        print(finalist.text)
