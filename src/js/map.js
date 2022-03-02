// - Creates the map here
const createMap = (L, coordinates) => {
    const container = L.DomUtil.get('map-container');
    if (container != null) {
        container._leaflet_id = null;

        const map = L.map('map-container').setView(coordinates, 13)
        const token = 'pk.eyJ1IjoibWFjY2xhcmVueiIsImEiOiJjbDA0dWN6aHQxcmJwM2lsc3lyejRsZzdoIn0.XcaMQ-PGjFsAhsdKv0zS8A'
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + token, {
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: token
        }).addTo(map)

        createMarker(L, coordinates, map)

        const mapContainer = document.querySelector('#map-container')
        mapContainer.addEventListener('resize', () => {
            map.invalidateSize()
        })
    }


}

// - Customize the icon with the one in images folder
const customizeIcon = (L) => {
    const newIcon = L.icon({
        iconUrl: './images/icon-location.svg',
        iconSize: [46, 58]
    })

    return newIcon
}

const createMarker = (L, coordinates, map) => {
    const icon = customizeIcon(L)
    L.marker(coordinates, {
        icon: icon
    }).addTo(map)
}

export {
    createMap
}
