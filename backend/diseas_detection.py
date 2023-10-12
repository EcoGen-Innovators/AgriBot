import requests

API_URL = "https://api-inference.huggingface.co/models/linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification"
headers = {"Authorization": "Bearer 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"}

def query(filename):
    with open(filename, "rb") as f:
        data = f.read()
    response = requests.post(API_URL, headers=headers, data=data)
    return response.json()

output = query("plant.jpeg")
