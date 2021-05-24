<template>
  <div id="makemap">    
    <div id="map"></div>
     </div>
</template>
<script>
import { API_KEY } from '../views/Maps/API_KEY.js'
import kakaohttp from "../util/kakaohttp";
import boardhttp from "../util/Boardhttp";
import { mapGetters } from "vuex";
export default {
    
  name: "app",
  components : {
  },
  data() {
    return {
      map: null,
      markers:[],
      infowindows:[],
      search: "",
      searchbar: "",
      input: "",
      // station: {},
      station_temp:{},
      aptlist: {},
      area: {},
      swLatlng:0,
      neLatlng:0,
      placesxy:[],
      clickdeallist:[],
  
    };
  },

  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        `http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${API_KEY}&libraries=services`;
      document.head.appendChild(script);
    }
  },
  updated:{
   
  }
  ,computed: {
    ...mapGetters(["station","deallist"]),
  },
  methods: {



    initMap() {
      let container = document.getElementById("map");
      let options = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567),
        level: 3,
      };
      container.style.width = "100%";
      container.style.height = "1400px";

      let map = new kakao.maps.Map(container, options);
      let mapTypeControl = new kakao.maps.MapTypeControl();

      map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

      let zoomControl = new kakao.maps.ZoomControl();
      map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
      this.map = map;


      kakao.maps.event.addListener(map, 'dragend', ()=> {             
    
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
    matcharea(){
       let nela=this.neLatlng.La;
       let swla =this.swLatlng.La;
      let nema=(this.neLatlng.Ma);
     let swma=(this.swLatlng.Ma);
      boardhttp.get("/house/matcharea?swLat="+swma+"&swlng="+swla+"&neLat="+nema+"&nelng="+nela)
      .then(({ data }) => {
        this.showdeallist(data);
        
      })
  

      
    }


    ,removeMarker() {
    
      console.log("remvoe marker");

      console.log(this.markers);
      for ( var i = 0; i <this.markers.length; i++ ) {
          this.markers[i].setMap(null);
          this.infowindows[i].setMap(null);
      }
      this.markers = [];
      this.infowindows=[];
      console.log(this.markers +" 지움 ");

    },



    showdeallist(areadata){
      console.log(areadata);
     // this.removeMarker();
      for(let key in areadata) {

            let nela=this.neLatlng.La;
            let swla =this.swLatlng.La;
            let nema=(this.neLatlng.Ma);
            let swma=(this.swLatlng.Ma);
            let searchquery= areadata[key][0].dong +" "+areadata[key][0].name.replace("("," ").replace(")"," ");

            kakaohttp.get(`keyword.json?query=` + searchquery).then(({ data }) => {
                if(data.documents.length>0){
                    console.log(data.documents);    

                    let types = data.documents[0].category_name.split(" > ");
                    if(searchquery.includes(data.documents[0].place_name)  && types[0] == "부동산" && types[1] == "주거시설"){
                        if(nela>=data.documents[0].x&&swla<=data.documents[0].x && nema>=data.documents[0].y && swma<=data.documents[0].y){
                             this.displayMarkerclick(data.documents[0],areadata[key] );

                     }
                   }

                   }
              });
      }

    }
    ,gethttp(query) {
      this.removeMarker();
      this.$store.dispatch("getStation", {});
      this.aptlist={};
      this.station_temp={};
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
            this.station_temp[stationidx++] = {"palce_name":data.documents[i].place_name,"address_name": data.documents[i].address_name};
            this.displayMarker(data.documents[i]);
            bounds.extend(
              new kakao.maps.LatLng(data.documents[i].y, data.documents[i].x)
            );
            flag = true;
            console.log(this.station);
          }
          if (types[0] == "부동산" && types[1] == "주거시설") {
            if (types[2] == "오피스텔") {
              this.aptlist[aptidx++] ={"place_name":data.documents[i].place_name,"address_name": data.documents[i].address_name};
              this.displayMarker(data.documents[i]);
              bounds.extend(
                new kakao.maps.LatLng(data.documents[i].y, data.documents[i].x)
              );
              console.log("오피스텔입니다");
              flag = true;
            }
            if (types[2] == "아파트") {
              this.aptlist[aptidx++] = {"place_name":data.documents[i].place_name,"address_name": data.documents[i].address_name};
              this.displayMarker(data.documents[i]);
              bounds.extend(
                new kakao.maps.LatLng(data.documents[i].y, data.documents[i].x)
              );
              console.log("아파트입니다");
              flag = true;
            } else {
              this.displayMarker(data.documents[i]);
              this.aptlist[aptidx++] = {"place_name":data.documents[i].place_name,"address_name": data.documents[i].address_name};
              bounds.extend(
                new kakao.maps.LatLng(data.documents[i].y, data.documents[i].x)
              );
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
     displayMarkerclick(place,deallist) {
      // 마커를 생성하고 지도에 표시합니다
      console.log(deallist.length +" 개 들어옴 ");
      
        // var imageSrc = `https://icongr.am/material/numeric-${deallist.length}-circle-outline.svg?size=128&color=currentColor`, // 마커이미지의 주소입니다    
        //     imageSize = new kakao.maps.Size(64, 69), // 마커이미지의 크기입니다
        //     imageOption = {offset: new kakao.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

        // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
        //var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

        // var marker = new kakao.maps.Marker({
        //     map:this.map,
        // position: new kakao.maps.LatLng(place.y, place.x),
        // image: markerImage // 마커이미지 설정 
        // });
      var marker = new kakao.maps.Marker({
        map: this.map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });

      var infowindow = new kakao.maps.InfoWindow({
        zIndex: 1,
        content:
          `<div 
          <div id="temp" @click="getdeallist(deallist)" style="padding:5px; font-size:12px;">
          ${place.place_name} 
          </div>`,
        //   `<div id="temp" @click="getdeallist(deallist)" style="padding:5px; font-size:12px;">
        //   ${place.place_name} 
        //   </div>`,
      });
      //this.markers=marker;
      // 마커에 클릭이벤트를 등록합니다
      let latlng= place.y+" "+place.x;
      if (!this.placesxy.includes(latlng)){
         //infowindow.open(this.map, marker);
         this.markers.push(marker);
        this.infowindows.push(infowindow);

          
          kakao.maps.event.addListener(marker, 'click', ()=> {
          // 마커 위에 인포윈도우를 표시합니다
         infowindow.open(this.map, marker);  
          this.getDealListDragger(deallist);

    });
      }
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
        content:
          '<div style="padding:5px; font-size:12px;">' +
          place.place_name +
          "</div>",
      });
      //this.markers=marker;
      // 마커에 클릭이벤트를 등록합니다
      let latlng= place.y+" "+place.x;
      if (!this.placesxy.includes(latlng)){
         //infowindow.open(this.map, marker);
         this.markers.push(marker);
        this.infowindows.push(infowindow);
          infowindow.open(this.map, marker);  

      }

    },
    getdeallist(item){
      console.log(item+" 들어옴 ");
      
      this.$store.dispatch("getdeallist", item);
    },
     getDealListDragger(item){
       console.log(item);
       let temp={"bList":item};
      this.$store.dispatch("getDealListDragger", temp);
  }
  }
 
};
</script>
<style>

</style>