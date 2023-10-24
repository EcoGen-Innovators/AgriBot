import requests

def get_soil_characteristics(longitude, latitude):
    # Make request to properties endpoint
    url = f"https://rest.isric.org/soilgrids/v2.0/properties/query?lon={longitude}&lat={latitude}&property=clay&property=sand&depth=0-5cm&value=mean&value=uncertainty"
    response = requests.get(url)

    if response.status_code == 200:
        # Parse response
        data = response.json()
        sand_mean = data['properties']['layers'][0]['depths'][0]['values'][0]
        clay_mean = data['properties']['layers'][0]['depths'][0]['values'][1]

        # Check soil class based on sand and clay content
        if sand_mean > 70 and clay_mean < 8:
            soil_class = "Sandy Soils"
        else:
            # Make request to classification endpoint
            url = f"https://rest.isric.org/soilgrids/v2.0/classification/query?lon={longitude}&lat={latitude}&number_classes=0"
            response = requests.get(url)

            if response.status_code == 200:
                # Parse response
                data = response.json()
                wrb_class_name = data['classification']['result'][0]['classes'][0]['name']
                soil_class = map_soil_class(wrb_class_name)
            else:
                print("Error: Failed to retrieve soil classification")
                return None
    else:
        print("Error: Failed to retrieve soil properties")
        return None

    return soil_class

def map_soil_class(wrb_class_name):
    # Map soil class to soil characteristics
    soil_mapping = {
        "Gleysols": "Wetland Soils",
        "Andosols": "Volcanic Soils",
        "Podzols": "Spodic Soils",
        "Leptosols": "Others",
        "Vertisols": "Others",
        "Kastanozems": "Others",
        "Chernozems": "Others",
        "Phaeozems": "Others",
        "Luvisols": "Others",
        "Alisols": "Others",
        "Albeluvisols": "Others",
        "Solonetz": "Others",
        "Calcisols": "Others",
        "Gypsisols": "Others",
        "Umbrisols": "Others",
        "Cambisols": "Others",
        "Regosols": "Others"
    }

    return soil_mapping.get(wrb_class_name, "Low Activity Clay Soils")

# Replace with actual longitude and latitude
longitude = 0
latitude = 0

# Get soil characteristics
soil_characteristics = get_soil_characteristics(longitude, latitude)

if soil_characteristics is not None:
    print("Soil Class:", soil_characteristics)