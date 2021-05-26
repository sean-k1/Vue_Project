<template>
  <div>
    <div>
      <span v-if="Object.keys(searchResult.stationlist).length != 0">
        <template>
          <v-card class="mx-auto" max-width="100%" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="overline mb-4">
                  <h2>지하철역</h2>
                </div>
                <search-row
                  class="inline-block"
                  v-for="(item, idx) in searchResult.stationlist"
                  :key="idx"
                  :place="item"
                ></search-row>
              </v-list-item-content>

              <v-list-item-avatar tile size="40" color="grey"></v-list-item-avatar>
            </v-list-item>
          </v-card>
        </template>
      </span>

      <span v-if="Object.keys(searchResult.aptlist).length != 0">
        <template>
          <v-card class="mx-auto" max-width="100%" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="overline mb-4">
                  <h2>아파트</h2>
                </div>
                <search-row
                  class="inline-block"
                  v-for="(item, idx) in searchResult.aptlist"
                  :key="idx"
                  :place="item"
                ></search-row>
              </v-list-item-content>

              <v-list-item-avatar tile size="40" color="grey"></v-list-item-avatar>
            </v-list-item>
          </v-card>
        </template>
      </span>
      <span v-if="Object.keys(searchResult.officelist).length != 0">
        <template>
          <v-card class="mx-auto" max-width="100%" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="overline mb-4">
                  <h2>오피스텔</h2>
                </div>
                <search-row
                  class="inline-block"
                  v-for="(item, idx) in searchResult.officelist"
                  :key="idx"
                  :place="item"
                ></search-row>
              </v-list-item-content>

              <v-list-item-avatar tile size="40" color="grey"></v-list-item-avatar>
            </v-list-item>
          </v-card>
        </template>
      </span>

      <span v-else> </span>
    </div>
    <div v-if="!deallist.bList">
      <div class=" bd-sidebar">
        <v-simple-table>
          <template v-slot:default> </template>
        </v-simple-table>
        <br />
      </div>
    </div>
    <div v-else>
      <h4 class=" font-weight-bold">매매 정보</h4>

      <apt-row v-for="(apt, idx) in deallist.bList" :key="idx" :apt="apt"> </apt-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AptRow from "../components/AptRow.vue";
import SearchRow from "../components/SearchRow.vue";
export default {
  name: "list",
  components: {
    AptRow,
    SearchRow,
  },
  AptRowdata: function() {
    return {
      apt: [{ curpage: "" }],
    };
  },

  computed: {
    ...mapGetters(["deallist", "searchResult", "startPage", "endPage", "curPage", "totalPage"]),
  },

  methods: {
    write() {
      this.$router.push("write");
    },
    range(start, end) {
      let list = [];
      for (let i = start; i <= end; i++) {
        list.push(i);
      }
      return list;
    },
  },
  movePage(page) {
    this.$store.dispatch("movePage", page);
  },
};
</script>

<style>
.inline-block {
  display: inline-block;
}
</style>
