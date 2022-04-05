import { defineStore } from "pinia";
import tt from "@tomtom-international/web-sdk-services";

export const useWaypointsStore = defineStore("waypointStore", {
  state: () => ({
    waypoints: [
      {
        name: "1908 Continental Ave, Apt # 106, Naperville, IL - 60563",
        selected: false,
      },
      {
        name: "2119 Allegre Cir, Apt # 304, Naperville, IL - 60563",
        selected: false,
      },
      {
        name: "1804 Centre Point Circle,Suite # 102, Naperville, IL - 60563",
        selected: false,
      },
    ],
    currentPosition: null,
  }),
  getters: {
    selectedWaypoints: (state) =>
      state.waypoints
        .filter((pnt) => pnt.selected)
        .map((pnt) => {
          return { name: pnt.name, coords: pnt.coords };
        }),
  },
  actions: {
    updateLocationCoords() {
      this.waypoints.forEach((point) => {
        tt.services
          .fuzzySearch({
            key: "QaxtAgTTg5w04JNEypMTzosC5orq2EPo",
            query: point.name,
          })
          .then((resp) => {
            point.coords = {
              lat: resp.results[0].position.lat,
              lng: resp.results[0].position.lng,
            };
          })
          .catch((err) => {
            console.log("Error occurred with Fuzzy Search", err);
          });
      });
    },
  },
});
