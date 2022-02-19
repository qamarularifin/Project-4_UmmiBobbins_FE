import React, { useState } from "react";
import { MapContainer, 
    TileLayer, 
    Marker, 
    Popup, 
    useMapEvents,
    SVGOverlay, 
} from "react-leaflet";
import "../leaflet.css"
import LocationMarker from "./TestLocationMarker";



const MyMap = () => {
    // const position = [1.3521, 103.8198];
    const bounds = [
        [1.3, 102],
        [1.38, 104],
      ]
    const clickHandler = () => {
        LocationMarker();
    }      
    //   function EventsExample() {
    //     return (
    //       <MapContainer 
    //         center={{ lat: 1.3521, lng: 103.8198}} 
    //         zoom={12} 
    //         style={{ height: "80vh" }}
    //       >
    //         <TileLayer
    //           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    //           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    //         />
    //         <LocationMarker />
    //       </MapContainer>
    //     )
    //   }

    return (
        <>
            <div><h1>My Map</h1></div>
            <div id="leaflet-container" style={{ height: "500px" }}>
            <MapContainer center={[1.3521, 103.8198]} zoom={12} style={{ height: "80vh" }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker />
            </MapContainer>
            </div>
        </>
    )
}

export default MyMap;