<template>
  <div id="makemap">
    <div id="map"></div>
  </div>
</template>
<script>
import { API_KEY } from "../views/Maps/API_KEY.js";
import kakaohttp from "../util/kakaohttp";
import boardhttp from "../util/Boardhttp";
import { mapGetters } from "vuex";

const KakaoMaps = {
  name: "app",
  components: {},
  data() {
    return {
      dragDealList: [],
      map: null,
      markers: [],
      swLatlng: 0,
      neLatlng: 0,
      placesxy: [],
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
  computed: {
    ...mapGetters(["deallist", "centerMap"]),
  },
  watch: {
    centerMap: function(val) {
      this.removeMarker();
      var bounds = new kakao.maps.LatLngBounds();
      bounds.extend(new kakao.maps.LatLng(val.y, val.x));
      this.map.setBounds(bounds);
      this.displayMarker(val);
      let boundsnow = this.map.getBounds();

      // 영역정보의 남서쪽 정보를 얻어옵니다
      this.swLatlng = boundsnow.getSouthWest();

      // 영역정보의 북동쪽 정보를 얻어옵니다
      this.neLatlng = boundsnow.getNorthEast();

      this.matcharea();
    },
  },
  methods: {
    initMap() {
      let container = document.getElementById("map");
      let options = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567),
        level: 3,
        zIndex: 0,
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
      for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
      }
      this.markers = [];
    },

    showdeallist(areadata) {
      for (let key in areadata) {
        let nela = this.neLatlng.La;
        let swla = this.swLatlng.La;
        let nema = this.neLatlng.Ma;
        let swma = this.swLatlng.Ma;
        let searchquery =
          areadata[key][0].dong + " " + areadata[key][0].name.replace("(", " ").replace(")", " ");

        kakaohttp.get(`keyword.json?query=` + searchquery).then(({ data }) => {
          if (data.documents.length > 0) {
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

    displayMarkerclick(place, deallist) {
      let tmp = JSON.parse(JSON.stringify(deallist));
      var divMarker = document.createElement("div");
      divMarker.classList.add("customoverlay");
      //divMarker.style.height = "40px";

      let out = this;

      divMarker.onclick = function() {
        let item = tmp;
        let temp = { bList: item };
        out.$store.dispatch("getDealListDragger", temp);
      };
      divMarker.onmousemove = function() {};
      // <span class="count" style="height:40px; font-size:15px;    ">${deallist.length}</span>
      //  <span class="title" style='font-size:10px !important; color:black; font-weight:bold; height:40px; width:100%' >${place.place_name}</span>
      divMarker.innerHTML = `
                
    <a href="#" >
    <span class="count" style=" color:black; font-size:15px;">${deallist.length}</span>
    <span class="title" style="font-size:13px !important; color:black; font-weight:bold";>${place.place_name}</span>
    </a>
                  
                   `;

      let latlng = place.y + " " + place.x;
      if (!this.placesxy.includes(latlng)) {
        var customOverlay = new kakao.maps.CustomOverlay({
          map: this.map,
          // - 0.00018
          position: new kakao.maps.LatLng(place.y - 0.00018, place.x),
          content: divMarker,
          yAnchor: 1,
        });

        this.placesxy.push(latlng);
        this.placesxy.push(customOverlay);
      }
    },

    displayMarker(place) {
      var marker = new kakao.maps.Marker({
        map: this.map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });

      let latlng = place.y + " " + place.x;
      if (!this.placesxy.includes(latlng)) {
        this.markers.push(marker);
      }
    },
    getdeallist(item) {
      this.$store.dispatch("getdeallist", item);
    },
    getDealListDragger() {
      let item = this.dragDealList;
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
  background: rgb(233, 246, 252);
  float: left;
}
.customoverlay:nth-of-type(n) {
  border: 0;
  box-shadow: 0px 1px 2px #888;
}
.customoverlay a {
  display: block;
  text-decoration: none;
  color: #000;
  text-align: center;
  border-radius: 6px;
  font-size: 14px;
  font-weight: bold;
  overflow: hidden;
  background: #d95050;
  background: #d95050 url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png)
    no-repeat right 14px center;
}
.customoverlay .title {
  /* display: block; */
  text-align: center;
  background: #fff;
  margin-right: 35px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
  padding-right: 15px;
  font-size: 14px;
  font-weight: bold;
}
.customoverlay:after {
  content: "";
  position: absolute;
  margin-left: -12px;
  left: 50%;
  bottom: -12px;
  width: 22px;
  height: 12px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png");
}
.customoverlay .count {
  padding-left: 10px;
  padding-right: 10px;
}

/* .customoverlay .title {
  
  text-align: center;
  font-weight: bold;
}
.customoverlay .count {
  text-align: center;
  padding-left: 10px;
  font-weight: bold;
} */
</style>
