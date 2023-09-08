// TO MAKE THE MAP APPEAR YOU MUST
// ADD YOUR ACCESS TOKEN FROM
// https://account.mapbox.com
mapboxgl.accessToken = 'pk.eyJ1IjoiZGV2MDUxMCIsImEiOiJjbGNoaG41czEwYmxuM3FtOWNvemVub3lkIn0.5hN1wrZNfw-7YmnNYKM2YQ';
const bounds = [
	[91.5,26.1], //NW boundary
	[91.81,26.17] //SE boundary
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

map.on('load', () => {
	map.addLayer({
        id: 'Flood',
        type: 'fill',
        source: {
            type: 'vector',
            url: 'mapbox://dev0510.3qizm4je'
        },
        'source-layer': 'Flood-b6habr',
        paint: {
            'fill-color': 'rgb(25, 9, 116)',
            'fill-opacity': 0.5
        }
    });

	map.addLayer({
        id: 'Water',
        type: 'fill',
        source: {
            type: 'vector',
            url: 'mapbox://dev0510.ah1saj44'
        },
        'source-layer': 'Water_Bodies-apbrap',
        paint: {
            'fill-color': 'rgb(30, 210, 241)',
            'fill-opacity': 0.5
        }
    });

	map.addLayer({
        id: 'Buildings',
        type: 'fill',
        source: {
            type: 'vector',
            url: 'mapbox://dev0510.8myrsoy3'
        },
        'source-layer': 'Buildings-ae0u60',
        paint: {
            'fill-color': 'rgb(244, 218, 73)',
            'fill-opacity': 0.5
        }
    });

    map.addLayer({
        id: 'Flooded-Buildings',
        type: 'fill',
        source: {
            type: 'vector',
            url: 'mapbox://dev0510.ainrk11y'
        },
        'source-layer': 'fld_buildings-1b4fyp',
        paint: {
            'fill-color': 'rgb(162, 66, 6)',
            'fill-opacity': 0.5
        }
    });
});
 
// After the last frame rendered before the map enters an "idle" state.
map.on('idle', () => {
	// If these two layers were not added to the map, abort
	if (!map.getLayer('Flood') || !map.getLayer('Water') || !map.getLayer('Buildings') || !map.getLayer('Flooded-Buildings')) {
	return;
}
 
// Enumerate ids of the layers.
const toggleableLayerIds = ['Flood', 'Water','Buildings','Flooded-Buildings'];
 
// Set up the corresponding toggle button for each layer.
for (const id of toggleableLayerIds) {
	// Skip layers that already have a button set up.
	if (document.getElementById(id)) {
	continue;
    }
 
    // Create a link.
    const link = document.createElement('a');
    link.id = id;
    link.href = '#';
    link.textContent = id;
    link.className = 'active';
    
    // Create a slider for opacity
    const opacitySlider = document.createElement('input');
    opacitySlider.type = 'range';
    opacitySlider.min = '0';
    opacitySlider.max = '1';
    opacitySlider.step = '0.1';
    opacitySlider.value = 0.5; // Set the initial opacity value
    opacitySlider.className = 'opacity-slider';

    // Show or hide layer when the toggle is clicked.
    link.onclick = function (e) {
        const clickedLayer = this.textContent;
        e.preventDefault();
        e.stopPropagation();
    
        const visibility = map.getLayoutProperty(
            clickedLayer,
            'visibility'
            );
    
        // Toggle layer visibility by changing the layout object's visibility property.
        if (visibility === 'visible') {
            map.setLayoutProperty(clickedLayer, 'visibility', 'none');
            this.className = '';
            opacitySlider.value = 0;
        } else {
            this.className = 'active';
            map.setLayoutProperty(
            clickedLayer,
            'visibility',
            'visible');
            opacitySlider.value = 0.5;
            }
        };
    
    // Attach an event listener to the slider to update the layer opacity
    opacitySlider.addEventListener('input', (event) => {
        const newOpacity = parseFloat(event.target.value);
        map.setPaintProperty(id, 'fill-opacity', newOpacity);
    });
    
	const layers = document.getElementById('menu');
		layers.appendChild(link);
        layers.appendChild(opacitySlider);
	}
});
