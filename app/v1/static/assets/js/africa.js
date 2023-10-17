const endpoint = 'https://restcountries.eu/rest/v3/';
const flagsEndpoint = '../static/assets/js/flag.json'; 
// Function to load flags.json
async function loadFlags() {
  try {
    const response = await fetch(flagsEndpoint);
    if (!response.ok) {
      throw new Error('Failed to fetch flags.json');
    }
    const flagsData = await response.json();
    return flagsData;
  } catch (error) {
    console.error(error);
    return {};
  }
}

// Function to update country information based on the selected country code
async function updateCountryInfo(countryCode) {
  // Reset the flag-img source
  document.querySelector('#flag-img').src = '';

  // Get country info from African countries data
  const country = africanCountries[countryCode];
  if (!country) {
    console.error('Country not found in African countries data');
    return;
  }

  // Update country information
  document.querySelector('#name').innerHTML = `<div>${country["Country Name"]}</div>`;
  document.querySelector('#capital').innerHTML = `<div>${country["Capital"]}</div>`;
  document.querySelector('#currency').innerHTML = `<div>${country["Currency"]}</div>`;
  document.querySelector('#ccorps').innerHTML = `<div>${country["ccorps"]}</div>`;

  // Load and set the flag image from the new JSON data
  const flagsData = await loadFlags();
  const flagPath = flagsData.find((item) => item.code === countryCode)?.image;
  if (flagPath) {
    document.querySelector('#flag-img').src = flagPath;
    document.querySelector('#flag-img').style.display="block";
    document.querySelector('#flag_na').style.display="none";
  }
}

// Function to handle country clicks
function handleCountryClick(e) {
  document.querySelectorAll(".land").forEach(country => {
    country.style.fill = "#02cd98";
  });

  const countryID = e.target.id;
  document.getElementById(countryID).style.fill = "#ffc107";
  var countryCode = countryID.toUpperCase();
  // Update country info
  updateCountryInfo(countryCode);
}

// Add click event listeners to countries
document.querySelectorAll('.land').forEach(item => {
  item.addEventListener('click', handleCountryClick);
});

document.querySelectorAll('.st0').forEach(item => {
  item.addEventListener('click', (e) => {
    document.querySelectorAll(".st0").forEach(country => {
      country.style.fill = "#2FAA9F";
    });

    var countryID = e.target.id;
    document.getElementById(countryID).style.fill = "black";
    updateCountryInfo(countryID);
  });
});

//
const africanCountries = 
      { "DZ": {
    "Country Name": "Algeria",
    "Calling Code": 213,
    "Official Language": "Arabic",
    "Capital": "Algiers",
    "Currency": "Algerian dinar",
    "Country Flag": "🇩🇿",
    "Internet users": 4700000,
    "Population": 38813722,
    "ccorps": ["Wheat", "Barley", "Oats", "Grapes", "Tomatoes", "Potatoes", "Dates", "Olives", "Citrus fruits", "Pistachios"],
  },
  "AO": {
    "Country Name": "Angola",
    "Calling Code": 244,
    "Official Language": "Portuguese",
    "Capital": "Luanda",
    "Currency": "Angolan kwanza",
    "Country Flag": "🇦🇴",
    "Internet users": 606700,
    "ccorps": ["Maize", "Cassava", "Sweet Potatoes", "Beans", "Rice", "Sorghum", "Groundnuts", "Bananas", "Coffee", "Tea"],
  },
  "BJ": {
    "Country Name": "Benin",
    "Calling Code": 229,
    "Official Language": "French",
    "Capital": "Porto-Novo",
    "Currency": "West African CFA franc",
    "Country Flag": "🇧🇯",
    "Internet users": 200100,
    "Population": 10160556,
    "ccorps": ["Cassava", "Yams", "Maize", "Sorghum", "Millet", "Rice", "Cotton", "Cocoa", "Palm Oil", "Rubber"],
  },
  "BW": {
    "Country Name": "Botswana",
    "Calling Code": 267,
    "Official Language": "Setswana",
    "Capital": "Gaborone",
    "Currency": "Botswana pula",
    "Country Flag": "🇧🇼",
    "Internet users": 120000,
    "Population": 2155784,
    "ccorps": ["Maize", "Sorghum", "Millets", "Groundnuts", "Beans", "Sesame", "Sorghum", "Soybeans", "Sunflower", "Cotton"],
  },
  "BF": {
    "Country Name": "Burkina Faso",
    "Calling Code": 226,
    "Official Language": "French",
    "Capital": "Ouagadougou",
    "Currency": "West African CFA franc",
    "Country Flag": "🇧🇫",
    "Internet users": 178100,
    "Population": 18365123,
    "ccorps": ["Millet", "Sorghum", "Maize", "Rice", "Cowpeas", "Groundnuts", "Cotton", "Sesame", "Sorghum", "Maize"],
  },
  "BI": {
    "Country Name": "Burundi",
    "Calling Code": 257,
    "Official Language": "Kirundi",
    "Capital": "Bujumbura",
    "Currency": "Burundi franc",
    "Country Flag": "🇧🇮",
    "Internet users": 157800,
    "Population": 10395931,
    "ccorps": ["Bananas", "Maize", "Beans", "Sweet Potatoes", "Cassava", "Irish Potatoes", "Sorghum", "Rice", "Wheat", "Coffee"],
  },
  "CV": {
    "Country Name": "Cabo Verde",
    "Calling Code": 238,
    "Official Language": "Portuguese",
    "Capital": "Praia",
    "Currency": "Cape Verdean escudo",
    "Country Flag": "🇨🇻",
    "Internet users": 150000,
    "Population": 538535,
    "ccorps": ["Maize", "Beans", "Sweet Potatoes", "Manioc", "Potatoes", "Peanuts", "Sugarcane", "Bananas", "Taro", "Sorghum"],
  },
  "CM": {
    "Country Name": "Cameroon",
    "Calling Code": 237,
    "Official Language": "Major African languages",
    "Capital": "Yaoundé",
    "Currency": "Central African CFA franc",
    "Country Flag": "🇨🇲",
    "Internet users": 749600,
    "Population": 23130708,
    "ccorps": ["Cassava", "Plantains", "Maize", "Cocoa", "Coffee", "Rubber", "Bananas", "Oil Palm", "Sorghum", "Rice"],
  },
  "CF": {
    "Country Name": "Central African Republic",
    "Calling Code": 236,
    "Official Language": "French",
    "Capital": "Bangui",
    "Currency": "Central African CFA franc",
    "Country Flag": "🇨🇫",
    "Internet users": 22600,
    "Population": 5277959,
    "ccorps": ["Cassava", "Maize", "Millet", "Sorghum", "Bananas", "Cocoa", "Coffee", "Groundnuts", "Oil Palm", "Sesame"],
  },
  "TD": {
    "Country Name": "Chad",
    "Calling Code": 235,
    "Official Language": "French",
    "Capital": "N'Djamena",
    "Currency": "Central African CFA franc",
    "Country Flag": "🇹🇩",
    "Internet users": 168100,
    "Population": 11412107,
    "ccorps": ["Sorghum", "Millet", "Maize", "Groundnuts", "Sesame", "Cowpeas", "Cotton", "Sorghum", "Rice", "Millet"],
  },
  "KM": {
    "Country Name": "Comoros",
    "Calling Code": 269,
    "Official Language": "Arabic",
    "Capital": "Moroni",
    "Currency": "Comorian franc",
    "Country Flag": "🇰🇲",
    "Internet users": 24300,
    "Population": 766865,
    "ccorps": ["Yams", "Cassava", "Bananas", "Sweet Potatoes", "Coconuts", "Rice", "Manioc", "Vanilla", "Cloves", "Coffee"],
  },
  "CD": {
    "Country Name": "Democratic Republic of the Congo",
    "Calling Code": 243,
    "Official Language": "French",
    "Capital": "Kinshasa",
    "Currency": "Congolese franc",
    "Country Flag": "🇨🇩",
    "Internet users": 290000,
    "Population": 77433744,
    "ccorps": ["Cassava", "Maize", "Plantains", "Cocoa", "Coffee", "Palm Oil", "Rubber", "Cassava", "Sorghum", "Rice"],
  },
  "CG": {
    "Country Name": "Republic of the Congo",
    "Calling Code": 242,
    "Official Language": "French",
    "Capital": "Brazzaville",
    "Currency": "Central African CFA franc",
    "Country Flag": "🇨🇬",
    "Internet users": 245200,
    "Population": 4662446,
    "ccorps": ["Maize", "Cassava", "Rice", "Plantains", "Sorghum", "Soybeans", "Groundnuts", "Bananas", "Coffee", "Cocoa"],
  },
  "CI": {
    "Country Name": "Cote D'Ivoire",
    "Calling Code": 225,
    "Official Language": "French",
    "Capital": "Yamoussoukro",
    "Currency": "West African CFA franc",
    "Country Flag": "🇨🇮",
    "Internet users": 967300,
    "Population": 22848945,
    "ccorps": ["Cocoa", "Coffee", "Rubber", "Oil Palm", "Cotton", "Cashews", "Sorghum", "Rice", "Maize", "Yams"]
  },
  "DJ": {
    "Country Name": "Djibouti",
    "Calling Code": 253,
    "Official Language": "French",
    "Capital": "Djibouti (city)",
    "Currency": "Djiboutian franc",
    "Country Flag": "🇩🇯",
    "Internet users": 25900,
    "Population": 810179,
    "ccorps": ["Sorghum", "Barley", "Wheat", "Maize", "Potatoes", "Sweet Potatoes", "Khat", "Dates", "Citrus fruits", "Tomatoes"],
  },
  "EG": {
    "Country Name": "Egypt",
    "Calling Code": 20,
    "Official Language": "Arabic",
    "Capital": "Cairo",
    "Currency": "Egyptian Pound",
    "Country Flag": "🇪🇬",
    "Internet users": 20136000,
    "Population": 86895099,
    "ccorps": ["Wheat", "Rice", "Corn", "Barley", "Cotton", "Tomatoes", "Pears", "Figs", "Grapes", "Pomegranates"],
  },
  "GQ": {
    "Country Name": "Equatorial Guinea",
    "Calling Code": 240,
    "Official Language": "Spanish",
    "Capital": "Malabo",
    "Currency": "Central African CFA franc",
    "Country Flag": "🇬🇶",
    "Internet users": 14400,
    "Population": 722254,
    "ccorps": ["Cocoa", "Oil Palm", "Cassava", "Plantains", "Bananas", "Coconuts", "Cocoa", "Coffee", "Palm Kernels", "Rice"],
  },
  "ER": {
    "Country Name": "Eritrea",
    "Calling Code": 291,
    "Official Language": "Afar",
    "Capital": "Asmara",
    "Currency": "Eritrean nakfa",
    "Country Flag": "🇪🇷",
    "Internet users": 200000,
    "Population": 6380803,
    "ccorps": ["Sorghum", "Maize", "Barley", "Wheat", "Teff", "Lentils", "Chickpeas", "Bananas", "Grapes", "Citrus fruits"],
  },
  "ET": {
    "Country Name": "Ethiopia",
    "Calling Code": 251,
    "Official Language": "Amharic",
    "Capital": "Addis Ababa",
    "Currency": "Ethiopian birr",
    "Country Flag": "🇪🇹",
    "Internet users": 447300,
    "Population": 96633458,
    "ccorps": ["Maize", "Teff", "Sorghum", "Barley", "Wheat", "Beans", "Maize", "Coffee", "Oilseeds", "Pulses"],
  },
  "GA": {
    "Country Name": "Gabon",
    "Calling Code": 241,
    "Official Language": "French",
    "Capital": "Libreville",
    "Currency": "Central African CFA franc",
    "Country Flag": "🇬🇦",
    "Internet users": 98800,
    "Population": 1672597,
    "ccorps": ["Cocoa", "Oil Palm", "Rubber", "Bananas", "Plantains", "Cassava", "Sweet Potatoes", "Cocoa", "Oilseeds", "Rice"],
  },
  "GH": {
    "Country Name": "Ghana",
    "Calling Code": 233,
    "Official Language": "English",
    "Capital": "Accra",
    "Currency": "Ghanaian cedi",
    "Country Flag": "🇬🇭",
    "Internet users": 1297000,
    "Population": 25758108,
    "ccorps": ["Cocoa", "Maize", "Cassava", "Yams", "Plantains", "Oil Palm", "Rice", "Sorghum", "Millet", "Groundnuts"],
  },
  "GM": {
    "Country Name": "Gambia",
    "Calling Code": 220,
    "Official Language": "English",
    "Capital": "Banjul",
    "Currency": "Dalasi",
    "Country Flag": "🇬🇲",
    "Internet users": null,
    "Population": 1857181,
    "ccorps": ["Groundnuts", "Millets", "Sorghum", "Maize", "Rice", "Cowpeas", "Cassava", "Potatoes", "Sweet Potatoes", "Cotton"],
  },
  "GN": {
    "Country Name": "Guinea",
    "Calling Code": 224,
    "Official Language": "French",
    "Capital": "Conakry",
    "Currency": "Guinean franc",
    "Country Flag": "🇬🇳",
    "Internet users": 95000,
    "Population": 11474383,
    "ccorps": ["Rice", "Maize", "Millet", "Sorghum", "Cassava", "Sweet Potatoes", "Groundnuts", "Bananas", "Coffee", "Palm Kernels"],
  },
  "GW": {
    "Country Name": "Guinea-Bissau",
    "Calling Code": 245,
    "Official Language": "Portuguese",
    "Capital": "Bissau",
    "Currency": "West African CFA franc",
    "Country Flag": "🇬🇼",
    "Internet users": 37100,
    "Population": 1693398,
    "ccorps": ["Rice", "Maize", "Millet", "Sorghum", "Cassava", "Sweet Potatoes", "Groundnuts", "Cashews", "Cotton", "Oil Palm"],
  },
  "KE": {
    "Country Name": "Kenya",
    "Calling Code": 254,
    "Official Language": "English",
    "Capital": "Nairobi",
    "Currency": "Kenyan shilling",
    "Country Flag": "🇰🇪",
    "Internet users": 3996000,
    "Population": 45010056,
    "ccorps": ["Maize", "Sorghum", "Millet", "Wheat", "Rice", "Potatoes", "Beans", "Coffee", "Tea", "Cotton"],
  },
  "LS": {
    "Country Name": "Lesotho",
    "Calling Code": 266,
    "Official Language": "Sesotho",
    "Capital": "Maseru",
    "Currency": "Lesotho loti",
    "Country Flag": "🇱🇸",
    "Internet users": 76800,
    "Population": 1942008,
    "ccorps": ["Maize", "Sorghum", "Wheat", "Barley", "Potatoes", "Beans", "Peas", "Fruits", "Vegetables", "Cattle"],
  },
  "LR": {
    "Country Name": "Liberia",
    "Calling Code": 231,
    "Official Language": "English",
    "Capital": "Monrovia",
    "Currency": "Liberian Dollar",
    "Country Flag": "🇱🇷",
    "Internet users": 20000,
    "Population": 4092310,
    "ccorps": ["Rice", "Cassava", "Sweet Potatoes", "Yams", "Plantains", "Rubber", "Cocoa", "Coffee", "Oil Palm", "Sugarcane"],
  },
  "LY": {
    "Country Name": "Libya",
    "Calling Code": 218,
    "Official Language": "Arabic",
    "Capital": "Tripoli",
    "Currency": "Libyan dinar",
    "Country Flag": "🇱🇾",
    "Internet users": 353900,
    "Population": 6244174,
    "ccorps": ["Wheat", "Barley", "Oats", "Dates", "Citrus fruits", "Olives", "Potatoes", "Tomatoes", "Cucumbers", "Onions"],
  },
  "MG": {
    "Country Name": "Madagascar",
    "Calling Code": 261,
    "Official Language": "French",
    "Capital": "Antananarivo",
    "Currency": "Malagasy ariary",
    "Country Flag": "🇲🇬",
    "Internet users": 319900,
    "Population": 23201926,
    "ccorps": ["Rice", "Cassava", "Sweet Potatoes", "Bananas", "Cattle", "Cattle", "Vanilla", "Clove", "Ginger", "Pepper"],
  },
  "MW": {
    "Country Name": "Malawi",
    "Calling Code": 265,
    "Official Language": "Chichewa",
    "Capital": "Lilongwe",
    "Currency": "Malawian kwacha",
    "Country Flag": "🇲🇼",
    "Internet users": 716400,
    "Population": 17377468,
    "ccorps": ["Maize", "Cassava", "Rice", "Groundnuts", "Sorghum", "Tea", "Sugarcane", "Cotton", "Tobacco", "Coffee"],
  },
  "ML": {
    "Country Name": "Mali",
    "Calling Code": 223,
    "Official Language": "French",
    "Capital": "Bamako",
    "Currency": "West African CFA franc",
    "Country Flag": "🇲🇱",
    "Internet users": 249800,
    "Population": 16455903,
    "ccorps": ["Millet", "Sorghum", "Maize", "Rice", "Cowpeas", "Groundnuts", "Sesame", "Sorghum", "Cotton", "Soybeans"],
  },
  "MR": {
    "Country Name": "Mauritania",
    "Calling Code": 222,
    "Official Language": "Arabic",
    "Capital": "Nouakchott",
    "Currency": "Mauritanian ouguiya",
    "Country Flag": "🇲🇷",
    "Internet users": 75000,
    "Population": 3516806,
    "ccorps": ["Dates", "Millet", "Sorghum", "Maize", "Rice", "Cowpeas", "Groundnuts", "Cattle", "Sheep", "Goats"],
  },
  "MU": {
    "Country Name": "Mauritius",
    "Calling Code": 230,
    "Official Language": "Creole",
    "Capital": "Port Louis",
    "Currency": "Mauritian rupee",
    "Country Flag": "🇲🇺",
    "Internet users": 290000,
    "Population": 1331155,
    "ccorps": ["Sugarcane", "Tea", "Maize", "Potatoes", "Bananas", "Cattle", "Cattle", "Cattle", "Cattle", "Cattle"],
  },
  "MA": {
    "Country Name": "Morocco",
    "Calling Code": 212,
    "Official Language": "Arabic",
    "Capital": "Rabat",
    "Currency": "Moroccan dirham",
    "Country Flag": "🇲🇦",
    "Internet users": 13213000,
    "Population": 32987206,
    "ccorps": ["Wheat", "Barley", "Corn", "Rice", "Cotton", "Olives", "Citrus fruits", "Grapes", "Tomatoes", "Potatoes"],
  },
  "MZ": {
    "Country Name": "Mozambique",
    "Calling Code": 258,
    "Official Language": "Emakhuwa",
    "Capital": "Maputo",
    "Currency": "Mozambican metical",
    "Country Flag": "🇲🇿",
    "Internet users": 613600,
    "Population": 24692144,
    "ccorps": ["Maize", "Sorghum", "Rice", "Cassava", "Sweet Potatoes", "Beans", "Groundnuts", "Cashews", "Coconuts", "Tea"],
  },
  "NA": {
    "Country Name": "Namibia",
    "Calling Code": 264,
    "Official Language": null,
    "Capital": "Windhoek",
    "Currency": "Namibian Dollar",
    "Country Flag": "🇳🇦",
    "Internet users": 127500,
    "Population": 2198406,
    "ccorps": ["Millets", "Maize", "Sorghum", "Wheat", "Barley", "Groundnuts", "Grapes", "Dates", "Olives", "Oranges"],
  },
  "NE": {
    "Country Name": "Niger",
    "Calling Code": 227,
    "Official Language": "French",
    "Capital": "Niamey",
    "Currency": "West African CFA franc",
    "Country Flag": "🇳🇪",
    "Internet users": 115900,
    "Population": 17466172,
    "ccorps": ["Millet", "Sorghum", "Cowpeas", "Groundnuts", "Rice", "Maize", "Cassava", "Sesame", "Sorghum", "Rice"],
  },
  "NG": {
    "Country Name": "Nigeria",
    "Calling Code": 234,
    "Official Language": "English",
    "Capital": "Abuja",
    "Currency": "Nigerian naira",
    "Country Flag": "🇳🇬",
    "Internet users": 43989000,
    "Population": 200963599,
    "ccorps": ["Cassava", "Maize", "Rice", "Yam", "Sorghum", "Millet", "Groundnut", "Cocoa", "Palm Oil", "Plantains"],
  },
  "RW": {
    "Country Name": "Rwanda",
    "Calling Code": 250,
    "Official Language": "Kinyarwanda",
    "Capital": "Kigali",
    "Currency": "Rwandan franc",
    "Country Flag": "🇷🇼",
    "Internet users": 450000,
    "Population": 12337138,
    "ccorps": ["Bananas", "Maize", "Potatoes", "Cassava", "Sweet Potatoes", "Beans", "Rice", "Wheat", "Coffee", "Tea"],
  },
  "ST": {
    "Country Name": "Sao Tome And Principe",
    "Calling Code": 239,
    "Official Language": "Portuguese",
    "Capital": "São Tomé",
    "Currency": "Sao Tome and Principe dobra",
    "Country Flag": "🇸🇹",
    "Internet users": 26700,
    "Population": 190428,
    "ccorps": ["Cocoa", "Coconuts", "Oil Palm", "Bananas", "Sweet Potatoes", "Yams", "Cassava", "Maize", "Pepper", "Cattle"],
  },
  "SN": {
    "Country Name": "Senegal",
    "Calling Code": 221,
    "Official Language": "French",
    "Capital": "Dakar",
    "Currency": "West African CFA franc",
    "Country Flag": "🇸🇳",
    "Internet users": 1818000,
    "Population": 13635927,
    "ccorps": ["Cocoa", "Coconuts", "Oil Palm", "Bananas", "Sweet Potatoes", "Yams", "Cassava", "Maize", "Pepper", "Cattle"],
  },
  "SC": {
    "Country Name": "Seychelles",
    "Calling Code": 248,
    "Official Language": "Creole",
    "Capital": "Victoria",
    "Currency": "Seychellois rupee",
    "Country Flag": "🇸🇨",
    "Internet users": 32000,
    "Population": 91650,
    "ccorps": ["Cinnamon", "Vanilla", "Copra", "Coconuts", "Sweet Potatoes", "Yams", "Breadfruits", "Fishing", "Fruits", "Vegetables"],
  },
  "SL": {
    "Country Name": "Sierra Leone",
    "Calling Code": 232,
    "Official Language": "English",
    "Capital": "Freetown",
    "Currency": "Sierra Leonean leone",
    "Country Flag": "🇸🇱",
    "Internet users": 14900,
    "Population": 5743725,
    "ccorps": ["Rice", "Cassava", "Sweet Potatoes", "Yams", "Plantains", "Cocoa", "Coffee", "Palm Oil", "Rubber", "Sugarcane"],
  },
  "SO": {
    "Country Name": "Somalia",
    "Calling Code": 252,
    "Official Language": "Somali",
    "Capital": "Mogadishu",
    "Currency": "Somali shilling",
    "Country Flag": "🇸🇴",
    "Internet users": 106000,
    "Population": 10428043,
    "ccorps": ["Bananas", "Maize", "Sorghum", "Sugarcane", "Coconuts", "Sesame", "Sorghum", "Cassava", "Sweet Potatoes", "Millet"],
  },
  "ZA": {
    "Country Name": "South Africa",
    "Calling Code": 27,
    "Official Language": "IsiZulu",
    "Capital": "Pretoria / Cape Town",
    "Currency": "South African rand",
    "Country Flag": "🇿🇦",
    "Internet users": 4420000,
    "Population": 48375645
  },
  "SS": {
    "Country Name": "South Sudan",
    "Calling Code": 211,
    "Official Language": "Arabic",
    "Capital": "Juba",
    "Currency": "South Sudanese Pound",
    "Country Flag": "🇸🇸",
    "Internet users": null,
    "Population": 11562695,
    "ccorps": ["Sorghum", "Maize", "Millet", "Wheat", "Groundnuts", "Sesame", "Sorghum", "Cassava", "Maize", "Millet"],
  },
  "SD": {
    "Country Name": "Sudan",
    "Calling Code": 249,
    "Official Language": "Arabic",
    "Capital": "Khartoum",
    "Currency": "Sudanese Pound",
    "Country Flag": "🇸🇩",
    "Internet users": 4200000,
    "Population": 35482233,
    "ccorps": ["Sorghum", "Millet", "Maize", "Wheat", "Groundnuts", "Sesame", "Sorghum", "Cassava", "Rice", "Sugarcane"],
  },
  "SZ": {
    "Country Name": "Eswatini",
    "Calling Code": 268,
    "Official Language": "English",
    "Capital": "Mbabane",
    "Currency": "Swazi lilangeni",
    "Country Flag": "🇸🇿",
    "Internet users": 90100,
    "Population": 1419623,
    "ccorps": ["Maize", "Sorghum", "Sugarcane", "Pineapples", "Cotton", "Tobacco", "Citrus fruits", "Bananas", "Grapes", "Cassava"],
  },
  "TZ": {
    "Country Name": "Tanzania",
    "Calling Code": 255,
    "Official Language": "Kiswahili or Swahili",
    "Capital": "Dodoma",
    "Currency": "Tanzanian shilling",
    "Country Flag": "🇹🇿",
    "Internet users": 678000,
    "Population": 49639138,
    "ccorps": ["Maize", "Sorghum", "Millet", "Rice", "Cassava", "Sweet Potatoes", "Bananas", "Cashews", "Coffee", "Sisal"],
  },
  "TG": {
    "Country Name": "Togo",
    "Calling Code": 228,
    "Official Language": "French",
    "Capital": "Lomé",
    "Currency": "West African CFA franc",
    "Country Flag": "🇹🇬",
    "Internet users": 356300,
    "Population": 7351374,
    "ccorps": ["Cassava", "Yams", "Maize", "Sorghum", "Millet", "Rice", "Cotton", "Cocoa", "Palm Oil", "Rubber"],
  },
  "TN": {
    "Country Name": "Tunisia",
    "Calling Code": 216,
    "Official Language": "Arabic",
    "Capital": "Tunis",
    "Currency": "Tunisian dinar",
    "Country Flag": "🇹🇳",
    "Internet users": 3500000,
    "Population": 10937521,
    "ccorps": ["Wheat", "Barley", "Oats", "Dates", "Citrus fruits", "Grapes", "Tomatoes", "Potatoes", "Olives", "Cucumbers"],
  },
  "UG": {
    "Country Name": "Uganda",
    "Calling Code": 256,
    "Official Language": "English",
    "Capital": "Kampala",
    "Currency": "Ugandan shilling",
    "Country Flag": "🇺🇬",
    "Internet users": 3200000,
    "Population": 35918915,
    "ccorps": ["Bananas", "Maize", "Cassava", "Sweet Potatoes", "Beans", "Sorghum", "Groundnuts", "Coffee", "Tea", "Cotton"],

  },
  "ZA": {
    "Country Name": "South Africa",
    "Calling Code": 27,
    "Official Language": "IsiZulu",
    "Capital": "Pretoria / Cape Town",
    "Currency": "South African rand",
    "Country Flag": "🇿🇦",
    "Internet users": 4420000,
    "Population": 48375645,
    "ccorps": ["Maize", "Sugarcane", "Wheat", "Barley", "Sunflowers", "Sorghum", "Potatoes", "Citrus fruits", "Grapes", "Apples"],
  },
  "ZM": {
    "Country Name": "Zambia",
    "Calling Code": 260,
    "Official Language": "English",
    "Capital": "Lusaka",
    "Currency": "Zambian kwacha",
    "Country Flag": "🇿🇲",
    "Internet users": 816200,
    "Population": 14638505,
    "ccorps": ["Maize", "Sorghum", "Millet", "Cassava", "Groundnuts", "Rice", "Wheat", "Soybeans", "Sunflower", "Cotton"],
  },
  "ZW": {
    "Country Name": "Zimbabwe",
    "Calling Code": 263,
    "Official Language": "English",
    "Capital": "Harare",
    "Currency": "United States Dollar",
    "Country Flag": "🇿🇼",
    "Internet users": 1423000,
    "Population": 13771721,
    "ccorps": ["Maize", "Sorghum", "Millet", "Cotton", "Tobacco", "Wheat", "Coffee", "Sugarcane", "Groundnuts", "Sunflower"]

  },
   "RE": {
     "Country Name": "Réunion Island",
      "Capital": "Saint-Denis",
      "Currency": "Euro",
      "Country Flag": "🇷🇪"
    },
    "YT": {
    "Population": 13771721,
    "Country Name": "Mayotte",
    "Capital": "Mamoudzou",
    "Currency": "Euro",
    "Country Flag":"🇾🇹"
      },
        "SH": {
          "Country Name": "Saint Helena, Ascension and Tristan da Cunha",
            "Capital": "Jamestown",
    "Currency": "Saint Helena pound & pound sterling",
    "Country Flag":"🇸🇭"
        },
        "ES-CN": {
          "Country Name": "Canary Islands",
            "Capital": "Las Palmas de Gran Canaria and Santa Cruz de Tenerife",
    "Currency": "Euro",
    "Country Flag":"🇮🇨"
        },
       "EH":{
       "Country Name": "Western Sahara",
         "Capital": "Laayoune",
         "Currency": "Sahrawi peseta, Moroccan dirham",
         "Country Flag": "🇲🇦/🇪🇭"
      }
}