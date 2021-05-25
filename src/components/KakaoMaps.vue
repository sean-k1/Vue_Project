<template>
  <div id="makemap">
    <div id="map">
      <v-toolbar dense floating>
        <v-text-field hide-details prepend-icon="mdi-magnify" single-line></v-text-field>

        <v-btn icon>
          <v-icon>mdi-crosshairs-gps</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-toolbar>
    </div>
    <v-icon>mdi-filter</v-icon>
  </div>
</template>
<script>
import { API_KEY } from "../views/Maps/API_KEY.js";
import kakaohttp from "../util/kakaohttp";
import boardhttp from "../util/Boardhttp";
import { mapGetters } from "vuex";
// import Vue from "vue";

const KakaoMaps = {
  name: "app",
  components: {},
  data() {
    return {
      dragDealList: [],
      map: null,
      markers: [],
      infowindows: [],
      search: "",
      searchbar: "",
      input: "",
      // station: {},
      station_temp: {},
      aptlist: {},
      area: {},
      swLatlng: 0,
      neLatlng: 0,
      placesxy: [],
      clickdeallist: [],
    };
  },

  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src = `http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${API_KEY}&libraries=services`;
      document.head.appendChild(script);
    }
  },
  updated: {},
  computed: {
    ...mapGetters(["station", "deallist"]),
  },
  methods: {
    handleClick(e) {
      if (e.target.matches(".clickevent")) {
        console.log("Got a click on .play-video or a child element");
      }
    },

    initMap() {
      let container = document.getElementById("map");
      let options = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567),
        level: 3,
        zIndex: -1,
      };
      container.style.width = "100%";
      container.style.height = "1400px";

      let map = new kakao.maps.Map(container, options);
      let mapTypeControl = new kakao.maps.MapTypeControl();

      map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

      let zoomControl = new kakao.maps.ZoomControl();
      map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
      this.map = map;

      kakao.maps.event.addListener(map, "dragend", () => {
        // 지도 영역정보를 얻어옵니다
        var bounds = map.getBounds();

        // 영역정보의 남서쪽 정보를 얻어옵니다
        this.swLatlng = bounds.getSouthWest();

        // 영역정보의 북동쪽 정보를 얻어옵니다
        this.neLatlng = bounds.getNorthEast();

        this.matcharea();
        //this.showstation();
        this.showdeallist();
      });
    },
    matcharea() {
      let nela = this.neLatlng.La;
      let swla = this.swLatlng.La;
      let nema = this.neLatlng.Ma;
      let swma = this.swLatlng.Ma;
      boardhttp
        .get(
          "/house/matcharea?swLat=" + swma + "&swlng=" + swla + "&neLat=" + nema + "&nelng=" + nela
        )
        .then(({ data }) => {
          this.showdeallist(data);
        });
    },

    removeMarker() {
      console.log("remvoe marker");

      console.log(this.markers);
      for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
        this.infowindows[i].setMap(null);
      }
      this.markers = [];
      this.infowindows = [];
      console.log(this.markers + " 지움 ");
    },

    showdeallist(areadata) {
      console.log(areadata);
      // this.removeMarker();
      for (let key in areadata) {
        let nela = this.neLatlng.La;
        let swla = this.swLatlng.La;
        let nema = this.neLatlng.Ma;
        let swma = this.swLatlng.Ma;
        let searchquery =
          areadata[key][0].dong + " " + areadata[key][0].name.replace("(", " ").replace(")", " ");

        kakaohttp.get(`keyword.json?query=` + searchquery).then(({ data }) => {
          if (data.documents.length > 0) {
            console.log(data.documents);

            let types = data.documents[0].category_name.split(" > ");
            if (
              searchquery.includes(data.documents[0].place_name) &&
              types[0] == "부동산" &&
              types[1] == "주거시설"
            ) {
              if (
                nela >= data.documents[0].x &&
                swla <= data.documents[0].x &&
                nema >= data.documents[0].y &&
                swma <= data.documents[0].y
              ) {
                this.displayMarkerclick(data.documents[0], areadata[key]);
              }
            }
          }
        });
      }
    },
    gethttp(query) {
      this.removeMarker();
      this.$store.dispatch("getStation", {});
      this.aptlist = {};
      this.station_temp = {};
      var bounds = new kakao.maps.LatLngBounds();
      kakaohttp.get(`keyword.json?query=` + query).then(({ data }) => {
        console.log(data + " data들어옴");
        console.log(data);
        let stationidx = 0;
        let aptidx = 0;
        let flag = false;
        console.log(data.documents);
        for (var i = 0; i < data.documents.length; i++) {
          let types = data.documents[i].category_name.split(" > ");
          if (types[0] == "교통,수송" && types[1] == "지하철,전철") {
            console.log("지하철입니다");
            this.station_temp[stationidx++] = {
              palce_name: data.documents[i].place_name,
              address_name: data.documents[i].address_name,
            };
            this.displayMarker(data.documents[i]);
            bounds.extend(new kakao.maps.LatLng(data.documents[i].y, data.documents[i].x));
            flag = true;
            console.log(this.station);
          }
          if (types[0] == "부동산" && types[1] == "주거시설") {
            if (types[2] == "오피스텔") {
              this.aptlist[aptidx++] = {
                place_name: data.documents[i].place_name,
                address_name: data.documents[i].address_name,
              };
              this.displayMarker(data.documents[i]);
              bounds.extend(new kakao.maps.LatLng(data.documents[i].y, data.documents[i].x));
              console.log("오피스텔입니다");
              flag = true;
            }
            if (types[2] == "아파트") {
              this.aptlist[aptidx++] = {
                place_name: data.documents[i].place_name,
                address_name: data.documents[i].address_name,
              };
              this.displayMarker(data.documents[i]);
              bounds.extend(new kakao.maps.LatLng(data.documents[i].y, data.documents[i].x));
              console.log("아파트입니다");
              flag = true;
            } else {
              this.displayMarker(data.documents[i]);
              this.aptlist[aptidx++] = {
                place_name: data.documents[i].place_name,
                address_name: data.documents[i].address_name,
              };
              bounds.extend(new kakao.maps.LatLng(data.documents[i].y, data.documents[i].x));
              console.log("기타시설입니다");
              flag = true;
            }
          }
        }
        if (flag) {
          this.map.setBounds(bounds);
          this.$store.dispatch("getStation", this.station_temp);
        }

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
      });
    },

    searchPlaces() {
      if (!this.search.replace(/^\s+|\s+$/g, "")) {
        alert("키워드를 입력해주세요!");
        return false;
      }
      this.gethttp(this.search);
    },
    displayMarkerclick(place, deallist) {
      // 마커를 생성하고 지도에 표시합니다
      // var infowindow = new kakao.maps.InfoWindow({
      //   zIndex: 1,
      // });
      console.log(deallist);
      // var content = '<div class="customoverlay">' +
      //               '<a href="#" @click='+getDealListDragger(deallist)+'target="_blank">' +
      //               '<span class="count">'+deallist.length+ '</span>' +
      //               '<span class="title">'+place.place_name+'</span>' +
      //               '</a></div>';
      let tmp = JSON.parse(JSON.stringify(deallist));
      var divMarker = document.createElement("div");
      divMarker.classList.add("customoverlay");
      // this.dragDealList = tmp;
      let out = this;

      divMarker.onclick = function() {
        // console.log(deallist);
        let item = tmp;
        let temp = { bList: item };
        console.log(temp);
        out.$store.dispatch("getDealListDragger", temp);
      }; //this.getDealListDragger;
      divMarker.onmousemove = function() {};

      divMarker.innerHTML = `
                    <a href="#" class="clickevent">
                    <span class="count">${deallist.length}</span>
                    <span class="title">${place.place_name}</span>
                    </a>`;
      // var content = `<div class="customoverlay mymarker">
      //               <div class="mymarker-info" style="display:none;">${JSON.stringify(
      //                 deallist
      //               )}</div>
      //               <a href="#" class="clickevent">
      //               <span class="count">${deallist.length}</span>
      //               <span class="title">${place.place_name}</span>
      //               </a></div>;`;

      //infowindow.setContent(`<div class="customoverlay"><p> ${place.place_name} </p>  <span class="title">구의야구공원</span></div>'`)
      console.log(deallist.length + " 개 들어옴 ");
      let latlng = place.y + " " + place.x;
      if (!this.placesxy.includes(latlng)) {
        //infowindow.open(this.map, marker);
        // var marker = new kakao.maps.Marker({
        //   map: this.map,
        //   position: new kakao.maps.LatLng(place.y, place.x),
        // });

        var customOverlay = new kakao.maps.CustomOverlay({
          map: this.map,
          position: new kakao.maps.LatLng(place.y - 0.00018, place.x),
          content: divMarker,
          yAnchor: 1,
        });
        // marker.setVisible(false);
        // this.markers.push(marker);
        // this.infowindows.push(infowindow);
        this.placesxy.push(latlng);
        this.placesxy.push(customOverlay);

        //infowindow.open(this.map, marker);
        // kakao.maps.event.addListener(marker, "click", () => {
        //   this.getDealListDragger(deallist);
        // });
      }

      //this.markers=marker;
      // 마커에 클릭이벤트를 등록합니다
    },

    displayMarker(place) {
      // 마커를 생성하고 지도에 표시합니다

      var marker = new kakao.maps.Marker({
        map: this.map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });
      //  var infowindow = new kakao.maps.InfoWindow({zIndex:1});
      var infowindow = new kakao.maps.InfoWindow({
        zIndex: 1,
        content: '<div style="padding:5px; font-size:12px;">' + place.place_name + "</div>",
      });
      //this.markers=marker;
      // 마커에 클릭이벤트를 등록합니다
      let latlng = place.y + " " + place.x;
      if (!this.placesxy.includes(latlng)) {
        //infowindow.open(this.map, marker);
        this.markers.push(marker);
        this.infowindows.push(infowindow);
        infowindow.open(this.map, marker);
      }
    },
    getdeallist(item) {
      console.log(item + " 들어옴 ");

      this.$store.dispatch("getdeallist", item);
    },
    getDealListDragger() {
      let item = this.dragDealList;
      console.log(item);
      let temp = { bList: item };
      this.$store.dispatch("getDealListDragger", temp);
    },
  },
};

export default KakaoMaps;
</script>

<style>
.customoverlay {
  position: relative;
  bottom: 85px;
  border-radius: 6px;
  border: 1px solid #ccc;
  border-bottom: 2px solid #ddd;
  float: left;
}
.customoverlay .title {
  display: inline-flex;
  text-align: center;
  background: #fff;
  margin-right: 35px;
  padding: 12px 10px 15px 15px;
  font-size: 14px;
  font-weight: bold;
}
.customoverlay .count {
  display: inline-flex;
  text-align: center;
  background: #fff;
  font-size: 20px;
  font-weight: bold;
  padding: 13px 15px 17px 17px;
  margin-right: -5px;
}
/* .customoverlay a {display:inline-block;text-decoration:none; color:black} */
.customoverlay a {
  display: block;
  text-decoration: none;
  color: #000;
  text-align: center;
  border-radius: 6px;
  overflow: hidden;
  background: #d95050;
  background: #d95050 url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png)
    no-repeat right 14px center;
}
/* .customoverlay .title {display:block;text-align:center;background:#fff;margin-right:35px;padding:10px 15px;font-size:14px;font-weight:bold;} */
/* .customoverlay:after {content:'';position:absolute;margin-left:-12px;left:50%;bottom:-12px;width:22px;height:12px;background:url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png')} */
/* .customoverlay:nth-of-type(n) {border:0; box-shadow:0px 1px 2px #888;}
.customoverlay a {display:block;text-decoration:none;color:#000;text-align:center;border-radius:6px;font-size:14px;font-weight:bold;overflow:hidden;background: #d95050;background: #d95050 url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png) no-repeat right 14px center;}
.customoverlay .title {display:block;text-align:center;background:#fff;margin-right:35px;padding:10px 15px;font-size:14px;font-weight:bold;}
.customoverlay:after {content:'';position:absolute;margin-left:-12px;left:50%;bottom:-12px;width:22px;height:12px;background:url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png')} */
</style>
