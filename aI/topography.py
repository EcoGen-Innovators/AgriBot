import ee
import folium

# Initialize Earth Engine
ee.Initialize()

# Define the location of interest (latitude, longitude)
latitude = 37.7749
longitude = -122.4194

# Create a point geometry for the location
point = ee.Geometry.Point([longitude, latitude])

# Load the SRTM digital elevation model
dem = ee.Image("CGIAR/SRTM90_V4")

# Get the elevation value at the location of interest
elevation = dem.sample(point, 30).first().get('elevation').getInfo()

# Print the elevation value
print('Elevation at the location: {} meters'.format(elevation))

# Create a map centered on the location
map = folium.Map(location=[latitude, longitude], zoom_start=12)

# Add the elevation layer to the map
map.add_ee_layer(dem, {'min': 0, 'max': 4000}, 'Digital Elevation Model')

# Display the map
display(map)