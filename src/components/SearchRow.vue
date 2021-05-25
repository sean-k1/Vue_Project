<template>
  <div>
    <v-list-item-title class="headline mb-1">
      {{ place.place_name }}
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
  created() {},
  methods: {},
};
</script>
