import React, { useState } from "react";
import { MapContainer, 
    TileLayer, 
    Marker, 
    Popup, 
    useMapEvents 
} from "react-leaflet";
import "../leaflet.css"
import LocationMarker from "./TestLocationMarker";



const MyMap = () => {
    // const position = [1.3521, 103.8198];
    
      
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
            <div style={{ height: "500px" }}>
            <MapContainer center={[1.3521, 103.8198]} zoom={12} style={{ height: "80vh" }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* <Marker position={[1.3521, 103.8198]}>
                    <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker> */}
                <LocationMarker />
            </MapContainer>
            </div>
        </>
    )
}

export default MyMap;