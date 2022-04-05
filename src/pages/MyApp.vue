<template>
  <div class="q-pa-md">
    <div class="text-body1 text-grey-9 q-pa-sm">
      Please select the list of waypoints to get optimized route.
    </div>
    <WayPointList />
    <div class="row justify-between no-wrap q-pa-md items-center">
      <q-card v-if="currentPosition" flat style="max-width: fit-content">
        <div>Lat:{{ currentPosition.latitude }}</div>
        <div>Long:{{ currentPosition.longitude }}</div>
        <!-- <div>WatchId: {{ watchID }}</div> -->
      </q-card>
      <q-card v-else flat style="max-width: fit-content">
        Loading location coordinates..
      </q-card>
      <q-card v-if="error" flat style="max-width: fit-content">
        <div>{{ error.code }}</div>
        <div>{{ error.message }}</div>
      </q-card>
      <q-btn
        color="grey-11"
        text-color="primary"
        label="Next"
        class="q-ma-md"
        to="/mapview"
      />
    </div>
  </div>
</template>

<script>
import WayPointList from "../components/WayPointList.vue";
import { ref } from "vue";
import { useWaypointsStore } from "../stores/waypoint-store";
import { storeToRefs } from "pinia";
export default {
  components: {
    WayPointList,
  },
  setup() {
    const { currentPosition } = storeToRefs(useWaypointsStore());
    const { updateLocationCoords } = useWaypointsStore();
    updateLocationCoords();
    let error = ref(null);
    var watchID = navigator.geolocation.watchPosition(
      (pos) => {
        currentPosition.value = pos.coords;
      },
      (err) => {
        console.log("Error in geolocation", err);
        error.value = err;
      },
      { maximumAge: 1000, timeout: 10000, enableHighAccuracy: true }
    );
    return { currentPosition, watchID, error };
  },
};
</script>

<style></style>
