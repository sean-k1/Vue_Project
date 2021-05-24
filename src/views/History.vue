<template>
  <div id="history" class="fill-height">
    <v-container fluid class="pt-0 pb-0 fill-height">
      <v-row class="fill-height">
        <v-col
          cols="8"
        >
         <kakaomap ></kakaomap>
         maps area
        </v-col>
        <v-col
         cols="4"
          :class="[
            'pa-0',
            { 'fill-height': $vuetify.breakpoint.name.smAndDown ? true : false }
          ]"
        >
         검색 내역 area
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import KakaoMaps from "@/components/KakaoMaps.vue";
export default {
   name: "search",
    components: {
    kakaomap: KakaoMaps,
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
