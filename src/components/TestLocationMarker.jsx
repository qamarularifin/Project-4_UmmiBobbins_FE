import React, { useState } from "react";
import markerIcon from "../images/marker-icon-2x.png"
import { Icon } from "leaflet";
import { MapContainer, 
    TileLayer, 
    Marker, 
    Popup, 
    useMapEvents 
} from "react-leaflet";
import "../leaflet.css"


function LocationMarker() {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, 17) // #17 refers to zoom level
      },
    })
  
    const icon2 = new Icon ({
        iconUrl: markerIcon,
        iconSize: [50, 50]
    });

    return position === null ? null : (
      <Marker position={position} icon={icon2}>
        <Popup>You are here</Popup>
      </Marker>
    )
}

export default LocationMarker;