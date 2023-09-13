// TO MAKE THE MAP APPEAR YOU MUST
// ADD YOUR ACCESS TOKEN FROM
// https://account.mapbox.com
mapboxgl.accessToken = 'pk.eyJ1IjoiZGV2MDUxMCIsImEiOiJjbGNoaG41czEwYmxuM3FtOWNvemVub3lkIn0.5hN1wrZNfw-7YmnNYKM2YQ';
const bounds = [
	[91.68,26.1], //NW boundary
	[91.86,26.21] //SE boundary
];
const map = new mapboxgl.Map({
    container: 'map',
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/satellite-v9',
	opacity: 0.75,
    center: [91.7434, 26.1376],
    zoom: 12,
    projection: 'globe', // starting projection
    maxBounds: bounds
});

// Create a default Marker and add it to the map.
var popup = new mapboxgl.Popup()
    .setHTML('<h3>Chandmari</h3><p>Coordinates:<br>(26.1836N,91.775E) </p>');
const marker = new mapboxgl.Marker()
// .setPopup('Chandmari')
.setLngLat([91.775, 26.1836])
.addTo(map);
marker.setPopup(popup);
map.on('load', () => {
	map.addLayer({
        id: 'Flood',
        type: 'fill',
        source: {
            type: 'vector',
            url: 'mapbox://dev0510.0jypj8dj'
        },
        'source-layer': 'Flood-84dctc',
        paint: {
            'fill-color': 'rgb(25, 9, 116)',
            'fill-opacity': 0.5
        }
    });

	map.addLayer({
        id: 'Buildings',
        type: 'fill',
        source: {
            type: 'vector',
            url: 'mapbox://dev0510.4bykuqru'
        },
        'source-layer': 'Buildings-6eb77p',
        paint: {
            'fill-color': 'rgb(244, 218, 73)',
            'fill-opacity': 0.5
        }
    });

    map.addLayer({
        id: 'Flooded Buildings',
        type: 'fill',
        source: {
            type: 'vector',
            url: 'mapbox://dev0510.bkvmxavy'
        },
        'source-layer': 'fld_blds-8x7tnq',
        paint: {
            'fill-color': 'rgb(162, 66, 6)',
            'fill-opacity': 0.5
        }
    });
});
 
// After the last frame rendered before the map enters an "idle" state.
map.on('idle', () => {
	// If these two layers were not added to the map, abort
	if (!map.getLayer('Flood') || !map.getLayer('Buildings') || !map.getLayer('Flooded Buildings')) {
	return;
}
 
// Enumerate ids of the layers.
const toggleableLayerIds = ['Flood', 'Buildings','Flooded Buildings'];
 
// Set up the corresponding toggle button for each layer.
for (const id of toggleableLayerIds) {
	// Skip layers that already have a button set up.
	if (document.getElementById(id)) {
	continue;
    }
 
    // Create a link.
    const lay_name = document.createElement('span');
    lay_name.innerHTML=id;
    const switchlabel = document.createElement('label');
    switchlabel.className='switch';
    const link = document.createElement('input');
    link.type = 'checkbox';
    link.checked = true;
    link.id = id;
    link.href = '#';
    // link.textContent = id;
    link.className = 'active';
    const roundedslider = document.createElement('span');
    roundedslider.className = 'slider round';
    
    // Show or hide layer when the toggle switch state changes.
    link.addEventListener('change', () => {
        const visibility = link.checked ? 'visible' : 'none';
        map.setLayoutProperty(id, 'visibility', visibility);
    });

    const lbreak = document.createElement('p');
	const layers = document.getElementById('menu');
        layers.appendChild(lay_name);
        lay_name.appendChild(switchlabel);
        // layers.appendChild(switchlabel);
		switchlabel.appendChild(link);
        switchlabel.appendChild(roundedslider);
        for (let i=0;i<5;i++){
            layers.appendChild(lbreak);
        }
        // layers.appendChild(opacitySlider);
	}
});
