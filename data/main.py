"""
Things to update before a run:
 - year var
 - url var
 - google maps api key
 - in get_data, update the id of the section element that contains the awardee list
"""

import json
from get_data import get_data
from store_data import store_data


def main():
    year = 2026
    url = "https://www.jamesbeard.org/stories/james-beard-award-semifinalists-2026"

    print("Getting data.")
    semifinalists = get_data(year, url)
    print(f"Found {len(semifinalists)} new awardees.")

    output_path = f"{year}_semifinalists.json"
    with open(output_path, "w") as f:
        json.dump(semifinalists, f, indent=4)
    print(f"Saved {output_path}")

    print("Inserting data into database.")
    num_records = store_data(semifinalists)
    print(f"Inserted {num_records} new awardees.")


if __name__ == "__main__":
    main()
