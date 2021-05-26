<template>
  <v-autocomplete
    flat
    hide-details
    append-icon="mdi-magnify"
    placeholder="Search"
    dense
    v-model="search"
    :items="items"
    @click:append="temp"
    @keyup.enter="temp"
    @input="search"
    class="hidden-sm-and-down"
  ></v-autocomplete>
</template>

<script>
import kakaohttp from "../util/kakaohttp";
import { data } from "@/util/areaAuto.js";
export default {
  data: () => ({
    loading: true,
    items: data,
    testSearch: null,
    search: null,
    select: null,
    states: [],
    aptlist: {},
    officelist: {},
    stationlist: {},
  }),
  methods: {
    temp(e) {
      this.searchtype(e.target.value);
    },
    searchtype(query) {
      console.log("검색어 :" + query);
      kakaohttp.get(`keyword.json?query=` + query).then(({ data }) => {
        let stationidx = 0;
        let aptidx = 0;
        let officeidx = 0;
        let flag = false;
        console.log(data.documents);
        this.stationlist = {};
        this.aptlist = {};
        this.officelist = {};
        for (var i = 0; i < data.documents.length; i++) {
          let types = data.documents[i].category_name.split(" > ");
          if (types[0] == "교통,수송" && types[1] == "지하철,전철") {
            console.log("지하철입니다");
            this.stationlist[stationidx++] = {
              place_name: data.documents[i].place_name,
              address_name: data.documents[i].address_name,
              x: data.documents[i].x,
              y: data.documents[i].y,
            };

            flag = true;
            console.log(this.station);
          }
          if (types[0] == "부동산" && types[1] == "주거시설") {
            if (types[2] == "오피스텔") {
              this.officelist[officeidx++] = {
                place_name: data.documents[i].place_name,
                address_name: data.documents[i].address_name,
                x: data.documents[i].x,
                y: data.documents[i].y,
              };

              console.log("오피스텔입니다");
              flag = true;
            }
            if (types[2] == "아파트") {
              this.aptlist[aptidx++] = {
                place_name: data.documents[i].place_name,
                address_name: data.documents[i].address_name,
                x: data.documents[i].x,
                y: data.documents[i].y,
              };

              console.log("아파트입니다");
              flag = true;
            } else {
              this.aptlist[aptidx++] = {
                place_name: data.documents[i].place_name,
                address_name: data.documents[i].address_name,
                x: data.documents[i].x,
                y: data.documents[i].y,
              };

              console.log("기타시설입니다");
              flag = true;
            }
          }
        }
        console.log("지나감");

        if (flag) {
          let searchResult = {
            stationlist: this.stationlist,
            aptlist: this.aptlist,
            officelist: this.officelist,
          };

          this.$store.dispatch("searchResult", searchResult);
        } else if (data.documents.length == 0) {
          console.log("enter 2");
          this.search = "관련 데이터가 없습니다.";
        } else {
          console.log("enter");
          let temp = {
            x: data.documents[0].x,
            y: data.documents[0].y,
          };
          this.$store.dispatch("centerMap", temp);
        }

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
      });
    },
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 3000);
  },
};
</script>

<style></style>
