<template>
  <v-card class="mb-2" tile="">
    <v-row align="start">
      <v-col class="shrink">
        <v-img src="//placehold.it/80x120" max-width="80" class="ml-3"></v-img>
      </v-col>
      <v-col>
        <v-card-title>
          {{ apt.dealAmount | comma }} / {{ apt.name }}
        </v-card-title>
        <v-card-subtitle> {{ apt.dong }} / {{ apt.dealYear }} </v-card-subtitle>
        <v-card-subtitle>
          면적 : {{ apt.width }} / 층 : {{ apt.stair }}</v-card-subtitle
        >
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import moment from "moment";
export default {
  name: "row",
  props: {
    apt: { type: Object },
  },
  filters: {
    comma(number) {
      number = eval(number);
      var inputNumber = number < 0 ? false : number;
      var unitWords = ["", "만", "억", "조", "경"];
      var splitUnit = 10000;
      var splitCount = unitWords.length;
      var resultArray = [];
      var resultString = "";

      for (let i = 0; i < splitCount; i++) {
        var unitResult =
          (inputNumber % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
        unitResult = Math.floor(unitResult);
        if (unitResult > 0) {
          resultArray[i] = unitResult;
        }
      }

      for (let i = 0; i < resultArray.length; i++) {
        if (!resultArray[i]) continue;
        resultString = String(resultArray[i]) + unitWords[i] + resultString;
      }

      return resultString;
    },
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
