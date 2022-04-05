<template>
  <q-page class="q-pa-md column" style="gap: 2rem">
    <div id="myMap" style="flex: 1 0 auto">
      <div class="text-h5">Map Loading...</div>
    </div>
    <q-btn color="primary" label="Current Location" @click="easeToCurrentLoc" />
    <q-btn color="primary" label="Delete Marker" @click="deleteMarker" />
  </q-page>
</template>

<script>
import { useWaypointsStore } from "../stores/waypoint-store";
import { storeToRefs } from "pinia";
import tt from "@tomtom-international/web-sdk-maps";
import { ref } from "vue";

export default {
  setup() {
    let ttMap = ref(null);
    let { selectedWaypoints, currentPosition } = storeToRefs(
      useWaypointsStore()
    );

    let marker = null;

    const currentPos = {
      lat: currentPosition.value.latitude,
      lon: currentPosition.value.longitude,
    };

    const easeToCurrentLoc = () => {
      ttMap.value.easeTo({
        center: currentPos,
        zoom: 16,
      });

      marker = new tt.Marker()
        .setLngLat(currentPos)
        .setPopup(new tt.Popup({ offset: 35 }).setHTML("Current Location"))
        .addTo(ttMap.value);
    };

    const deleteMarker = () => {
      marker.remove();
    };

    return {
      selectedWaypoints,
      currentPosition,
      ttMap,
      easeToCurrentLoc,
      deleteMarker,
    };
  },
  mounted() {
    let map = tt.map({
      container: "myMap",
      key: "QaxtAgTTg5w04JNEypMTzosC5orq2EPo",
      center: {
        lat: 41.78552,
        lon: -88.21509,
      },
      zoom: 14,
    });

    let markers = [];

    new tt.Marker()
      .setLngLat({
        lat: 41.78552,
        lon: -88.21509,
      })
      .setPopup(new tt.Popup({ offset: 35 }).setHTML("Current Location"))
      .addTo(map);

    markers.push({
      lat: 41.78552,
      lng: -88.21509,
    });

    this.selectedWaypoints.forEach((point) => {
      new tt.Marker()
        .setLngLat(point.coords)
        .setPopup(new tt.Popup({ offset: 35 }).setHTML(point.name))
        .addTo(map);

      markers.push(point.coords);
    });

    let minLat = null;
    let minLon = null;
    let maxLat = null;
    let maxLon = null;

    markers.forEach((marker) => {
      if (!minLat || marker.lat < minLat) {
        minLat = marker.lat;
      }
      if (!maxLat || marker.lat > maxLat) {
        maxLat = marker.lat;
      }
      if (!minLon || marker.lng < minLon) {
        minLon = marker.lng;
      }
      if (!maxLon || marker.lng > maxLon) {
        maxLon = marker.lng;
      }
    });

    let bounds = [
      [minLon, minLat],
      [maxLon, maxLat],
    ];

    map.fitBounds(bounds, {
      padding: { top: 40, bottom: 40, left: 40, right: 40 },
    });

    this.ttMap = Object.freeze(map);
  },
};
</script>

<style></style>
