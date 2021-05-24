<template>
  <div id="makemap">    
    

    <div id="map"></div>
     </div>
</template>
<script>
import { API_KEY } from '../views/Maps/API_KEY.js'
export default {
    
  name: "app",
  components : {
 
  },
  data() {
    return {
      map: null,
      geocoder: null,
      markers:[],
      infowindows:[],
      search: "",
      user: "",
      country: 0,
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
   // ...mapGetters(["station","deallist"]),
  },
  methods: {


    initMap() {
      let container = document.getElementById("map");
      let options = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567),
        level: 3,
      };
      container.style.width = "100%";
      container.style.height = "1000px";

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
        
    
});
      this.geocoder = new kakao.maps.services.Geocoder();
    },
  },
 
};
</script>
<style>
#deal{
  float:left;
  width:30%;
height: 1000px;
}
#map{

}
</style>