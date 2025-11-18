// Initialize map centered on India
const map = L.map('map').setView([22.9734, 78.6569], 5);

// --- Esri Satellite Tiles ---
const satellite = L.tileLayer(
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', 
  {
    attribution: 'Tiles © Esri, Maxar, Earthstar Geographics'
  }
);

// --- Esri Labels Layer (boundaries + city names + roads) ---
const labels = L.tileLayer(
  'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', 
  {
    attribution: 'Labels © Esri'
  }
);

// Add both layers
satellite.addTo(map);
labels.addTo(map);

// Locations Data
const locations = [
  {
    name: "Taj Mahal",
    coords: [27.1751, 78.0421],
    description: "One of the 7 Wonders of the World, located in Agra, India."
  },
  {
    name: "India Gate",
    coords: [28.6129, 77.2295],
    description: "The India Gate (formerly known as All India War Memorial) is a war memorial located near the Rajpath (officially called Kartavya path) on the eastern edge of the ceremonial axis of New Delhi. It stands as a memorial to 74,187 soldiers of the Indian Army who died between 1914 and 1921 in the First World War, in France, Flanders, Mesopotamia, Persia, East Africa, Gallipoli and elsewhere in the Near and the Far East, and the Third Anglo-Afghan War. "
  },
  {
    name: "Gateway of India",
    coords: [18.9220, 72.8347],
    description: "Historic arch monument in Mumbai, India."
  },
  {
    name: "Charminar",
    coords: [17.3616, 78.4747],
    description: "Iconic mosque with four minarets in Hyderabad, India."
  },
  {
    name: "Mysore Palace",
    coords: [12.3052, 76.6552],
    description: "Mysore Palace, also known as Amba Vilas Palace, is a historical palace and a royal residence. It is located in Mysore, Karnataka, India. It used to be the official residence of the Wadiyar dynasty and the seat of the Kingdom of Mysore. The palace is in the centre of Mysore, and faces the Chamundi Hills eastward."
  },
  {
  name: "Bhilai Steel Plant",
  coords: [21.1915,81.4041],
  description: "The Bhilai Steel Plant (BSP) is India's largest integrated steel plant, located in Bhilai, Chhattisgarh, and was established with Soviet collaboration in 1955. It began production in 1959, making it the first and largest producer of steel rails in India, contributing significantly to the nation's infrastructure. The plant is a part of the Steel Authority of India Limited (SAIL) and sources its iron ore from the Dalli Rajhara mines"
},
{
    name: "CDAC Pune",
    coords:[18.5349, 73.8109],
    description: "Centre for Development of Advanced Computing (C-DAC) is the premier R&D organization of the Ministry of Electronics and Information Technology (MeitY) for carrying out R&D in IT, Electronics and associated areas. Different areas of C-DAC, had originated at different times, many of which came out as a result of identification of opportunities."
},
{
    name:"Statu Of Unity",
    coords:[21.837778, 73.718889],
    description:"The story of the Statue of Unity is the story of a tribute to Sardar Vallabhbhai Patel, India's first Deputy Prime Minister, who was instrumental in integrating 562 princely states to form a unified India after independence. Inaugurated on Patel's 143rd birth anniversary, October 31, 2018, this 182-meter-tall statue symbolizes national unity and patriotism."
}

];

// Store markers
const markers = [];

// Add markers with popups
locations.forEach(loc => {
  const marker = L.marker(loc.coords).addTo(map);
  marker.bindPopup(`<b>${loc.name}</b><br>${loc.description}`);
  markers.push({ name: loc.name.toLowerCase(), marker: marker });
});

// Search Function
function searchLocation() {
  const query = document.getElementById("searchInput").value.toLowerCase();

  const found = markers.find(m => m.name.includes(query));

  if (found) {
    map.setView(found.marker.getLatLng(), 10);
    found.marker.openPopup();
  } else {
    alert("Location not found. Try Taj Mahal, India Gate, etc.");
  }
}
