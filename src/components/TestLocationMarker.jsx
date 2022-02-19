import React, { useState } from "react";
import { MapContainer, 
    TileLayer, 
    Marker, 
    Popup, 
    useMapEvents 
} from "react-leaflet";
import "../leaflet.css"


function LocationMarker() {
    const [position, setPosition] = useState([1.3521, 103.8198])
    const map = useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom(15))
      },
    })
  
    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    )
}

export default LocationMarker;