<template>
  <v-text-field
    flat
    hide-details
    append-icon="mdi-magnify"
    placeholder="Search"
    outlined
    dense
    v-model="search"
    @click:append="temp"
    @keyup.enter="temp"
    class="hidden-sm-and-down"
  ></v-text-field>
</template>

<script>
import kakaohttp from "../util/kakaohttp";
export default {
  data: () => ({
    loading: true,
    items: [],
    search: null,
    select: null,
    states: [],
    aptlist: {},
    officelist: {},
    stationlist: {},
  }),
  methods: {
    temp() {
      console.log(this.search);
      this.searchtype(this.search);
    },
    searchtype(query) {
      kakaohttp.get(`keyword.json?query=` + query).then(({ data }) => {
        let stationidx = 0;
        let aptidx = 0;
        let officeidx = 0;
        let flag = false;
        console.log(data.documents);

        for (var i = 0; i < data.documents.length; i++) {
          let types = data.documents[i].category_name.split(" > ");
          if (types[0] == "교통,수송" && types[1] == "지하철,전철") {
            console.log("지하철입니다");
            this.stationlist[stationidx++] = {
              place_name: data.documents[i].place_name,
              address_name: data.documents[i].address_name,
              x: data.documents[i].place_x,
              y: data.documents[i].place_y,
            };

            flag = true;
            console.log(this.station);
          }
          if (types[0] == "부동산" && types[1] == "주거시설") {
            if (types[2] == "오피스텔") {
              this.officelist[officeidx++] = {
                place_name: data.documents[i].place_name,
                address_name: data.documents[i].address_name,
                x: data.documents[i].place_x,
                y: data.documents[i].place_y,
              };

              console.log("오피스텔입니다");
              flag = true;
            }
            if (types[2] == "아파트") {
              this.aptlist[aptidx++] = {
                place_name: data.documents[i].place_name,
                address_name: data.documents[i].address_name,
                x: data.documents[i].place_x,
                y: data.documents[i].place_y,
              };

              console.log("아파트입니다");
              flag = true;
            } else {
              this.aptlist[aptidx++] = {
                place_name: data.documents[i].place_name,
                address_name: data.documents[i].address_name,
                x: data.documents[i].place_x,
                y: data.documents[i].place_y,
              };

              console.log("기타시설입니다");
              flag = true;
            }
          }
        }
        if (flag) {
          console.log("enter");

          let searchResult = {
            stationlist: this.stationlist,
            aptlist: this.aptlist,
            officelist: this.officelist,
          };

          this.$store.dispatch("searchResult", searchResult);
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
