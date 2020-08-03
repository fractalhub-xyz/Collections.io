import requests
import os

BASE_URL = 'https://api.unsplash.com/search/photos'


def get_images_for_tag(tag_name):
    client_id = os.environ.get("UNSPLASH_CLIENT_ID", False)
    if not client_id:
        print("CLIENT ID NOT SET")
        return []

    url = f'{BASE_URL}?query={tag_name}&client_id={client_id}&per_page=4'

    response = requests.get(url)
    results = response.json()['results']

    thumbs = [res['urls']['thumb'] for res in results]
    print(thumbs)

    return ','.join(thumbs)
