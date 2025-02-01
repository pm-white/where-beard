from bs4 import BeautifulSoup
import requests

url = "https://www.jamesbeard.org/blog/the-2025-james-beard-award-semifinalists#"
r = requests.get(url)
soup = BeautifulSoup(r.content, "html.parser")

states = ["MA", "RI", "ME", "NH", "VT"]

finalists = {}

for finalist in soup.find_all(["h4", "li"]):
    # print(finalist.name)
    state = finalist.text.split(",")[-1].replace(")", "").strip()
    if finalist.name == "h4":
        new_category = finalist.text
        finalists[new_category] = []
        # print(finalist.text)
    elif state in states:
        finalists[new_category].append(finalist.text)
        # print("\t" + finalist.text)

for cat, finalists in finalists.items():
    if finalists:
        print(cat, "-------", sep="\n")
        for finalist in finalists:
            print(" ", finalist)
        print()
