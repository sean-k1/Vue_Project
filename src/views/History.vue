<template>
  <div id="history" class="fill-height">
    <v-container fluid class="pt-0 pb-0 fill-height">
      <v-row class="fill-height">
        <v-col
          cols="9"
        >
 
  

         <kakaomap >
           
         </kakaomap>
         maps area
        </v-col>
        <v-col
         cols="3"
          :class="[
            'pa-0',
            { 'fill-height': $vuetify.breakpoint.name.smAndDown ? true : false }
          ]"
        >
        거래내역
         <aptinfo> </aptinfo>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import KakaoMaps from "@/components/KakaoMaps.vue";
import AptInfo from "../views/AptInfo.vue";
export default {
   name: "search",
    components: {
    kakaomap: KakaoMaps,
    aptinfo:AptInfo,

  },
  data: () => ({
  
  }),

  methods: {
  
  },
  mounted() {
    
  }
}
</script>

<style lang="scss" scoped></style>
