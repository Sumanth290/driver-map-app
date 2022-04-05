<template>
  <div>
    <q-item-label header class="text-body1 q-mt-md">Way points</q-item-label>
    <q-separator />
    <q-list title="Waypoints" class="q-mx-sm">
      <q-item
        v-for="(point, index) in waypoints"
        :key="index"
        clickable
        class="list-item q-my-sm q-pa-md rounded-borders"
        @click="point.selected = !point.selected"
        active-class="bg-secondary"
        :active="point.selected"
      >
        <q-item-section avatar>
          <q-icon name="place" />
        </q-item-section>
        <q-item-section>
          <q-item-label lines="2">
            {{ point.name }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { useWaypointsStore } from "../stores/waypoint-store";
import { storeToRefs } from "pinia";

export default {
  setup() {
    const { waypoints } = storeToRefs(useWaypointsStore());
    return { waypoints };
  },
};
</script>

<style lang="scss">
.list-item {
  background-color: lighten($color: $primary, $amount: 5);
  color: $grey-11;
}
</style>
