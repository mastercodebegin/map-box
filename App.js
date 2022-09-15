import React, { useEffect, useRef, useState } from 'react'
import { PermissionsAndroid, Platform, View } from 'react-native';
import MapboxGL from "@rnmapbox/maps";
// import GeolocationLib from "react-native-geolocation-service";

// MapboxGL.setWellKnownTileServer('mapbox');
// MapboxGL.setWellKnownTileServer(MapboxGL.TileServers.Mapbox)
MapboxGL.setAccessToken(
  "pk"
);
const defaultStyle = {
  version: 8,
  name: 'Land',
  sources: {
    map: {
      type: 'raster',
      tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'],
      tileSize: 256,
      minzoom: 1,
      maxzoom: 19,
    },
  },
  layers: [
    {
      id: 'background',
      type: 'background',
      paint: {
        'background-color': '#f2efea',
      },
    },
    {
      id: 'map',
      type: 'raster',
      source: 'map',
      paint: {
        'raster-fade-duration': 100,
      },
    },
  ],
};

// MapboxGL.setWellKnownTileServer("mapbox")
export default App = () => {
  const [userLocation, setUserLocation] = useState();
  const [currentUserLocation, setCurrentUserLocation] = useState();
  let cameraRef = useRef();
  const touchable = useRef();
  useEffect(() => {
    // requestPermission()
  }, [])

  const requestPermission = async () => {
    try {
      // Platform.OS==="android"?
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
        'title': 'Example App',
        'message': 'Example App access to your location '
      }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // console.log("You can use the location")
        GeolocationLib.getCurrentPosition(
          (position) => {
            const { longitude, latitude } = position.coords;
            if (longitude && latitude) {
              setUserLocation([...[longitude, latitude]]);
              setCurrentUserLocation([...[longitude, latitude]])
            }
          })
      } else {
        // console.log("location permission denied")
        alert("Location permission denied");
      }
    } catch (err) {
      console.warn(err)
      throw err
    }
  }
  return (
    // <Dashboard/>
    <View style={{ height: "100%", width: "100%" }}>
       <MapboxGL.MapView
        style={{ flex: 1 }}
        // styleURL={"mapbox://styles/shopax/cl836q9yw00dj14pmjritvat1"} // use this style to display map

        styleURL={"mapbox://styles/kliq/cl8399vja005c15qjx9dd0cra"}
        styleJSON={JSON.stringify(defaultStyle)} 
>
       {/* > */}
        {/* <MapboxGL.Camera
          ref={cameraRef}
          zoomLevel={16}
          centerCoordinate={[3.3362400, 6.5790100]}
          animationMode="flyTo"
          animationDuration={0}
          centerCoordinate={currentUserLocation}
        /> */}
{/* 
        {userLocation ? (
          <MapboxGL.PointAnnotation
            id={"key12"}
            coordinate={userLocation}
          ref={touchable}
          >
            <UserMarker />
          </MapboxGL.PointAnnotation>
        ) : null} */}
       </MapboxGL.MapView>
     
    </View>
  )
}



const UserMarker = () => {
  return (
    <View
      style={{
        height: 22,
        width: 22,
        borderRadius: 22 / 2,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#813BE3",
        borderWidth: 1,
        borderColor: "white",
      }}
    />
  );
}
