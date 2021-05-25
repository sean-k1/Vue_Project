<template>
  <!-- <div>
    <v-card-title>
      {{ apt.name }}
    </v-card-title>

    <v-card-subtitle>
      {{ apt.dealAmount }}
    </v-card-subtitle>
    <v-card-subtitle>
      {{ apt.buildYear }}
    </v-card-subtitle>
    <v-card-subtitle>
      {{ apt.dealYear }}
    </v-card-subtitle>
    <v-card-subtitle>
      {{ apt.dong }}
    </v-card-subtitle>
  </div> -->
  <v-card class="mb-2" tile="">
    <v-row align="start">
      <v-col class="shrink">
        <v-img src="//placehold.it/80x120" max-width="80" class="ml-3"></v-img>
      </v-col>
      <v-col>
        <v-card-title> {{ apt.dealAmount }}</v-card-title>
        <v-card-subtitle>{{ apt.name }}</v-card-subtitle>
        <v-card-subtitle> {{ apt.dong }} / {{ apt.dealYear }} </v-card-subtitle>
      </v-col>
    </v-row>
  </v-card>

  <!-- <tr>
    <td>{{ apt.dong }}</td>
    <td>{{ apt.name }}</td>
    <td>{{ apt.buildYear }}</td>
    <td>{{ apt.dealYear }}</td>
    <td>{{ apt.dealAmount }}</td>
  </tr> -->
</template>

<script>
import moment from "moment";
export default {
  name: "row",
  props: {
    apt: { type: Object },
  },
  computed: {},
  created() {},
  methods: {
    getFormatDate(regtime) {
      return moment(new Date(regtime)).format("YYYY.MM.DD");
    },
  },
};
</script>
