<template>
  <div>
    <v-list-item-title class="headline mb-1">
      <v-btn depressed elevation="2" raised @click="setCenterMap(place.x, place.y)">
        {{ place.place_name }}
      </v-btn>
    </v-list-item-title>
    <v-list-item-subtitle>
      {{ place.address_name }}
    </v-list-item-subtitle>
  </div>
</template>

<script>
export default {
  name: "aptrow",
  props: {
    place: { type: Object },
  },
  computed: {},
  methods: {
    setCenterMap(x, y) {
      console.log("enter x y");

      let temp = {
        x: x,
        y: y,
      };
      let searchResult = {
        stationlist: {},
        aptlist: {},
        officelist: {},
      };

      this.$store.dispatch("searchResult", searchResult);
      this.$store.dispatch("centerMap", temp);
    },
  },
};
</script>
