"""Disease detection view"""

import requests

API_URL = "https://api-inference.huggingface.co/models/linkanjarad/mobilenet_v2_1.\
    0_224-plant-disease-identification"
headers = {"Authorization": "Bearer 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"}


def query(filename):
    """Query the model"""
    with open(filename, "rb") as file:
        data = file.read()
    response = requests.post(API_URL, headers=headers, data=data)
    return response.json()
