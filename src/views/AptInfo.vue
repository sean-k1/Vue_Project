<template>
  <div>
    <div>
      <span v-if="searchResult.stationlist">
        <template>
          <v-card class="mx-auto" max-width="344" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="overline mb-4">
                  지하철역
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

      <span v-if="searchResult.aptlist">
        <template>
          <v-card class="mx-auto" max-width="344" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="overline mb-4">
                  아파트
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
      <span v-if="searchResult.officelist">
        <template>
          <v-card class="mx-auto" max-width="344" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="overline mb-4">
                  오피스텔
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
    </div>
    <div v-if="!deallist.bList">
      <div class=" bd-sidebar">
        <v-simple-table>
          <template v-slot:default>
            해당하는 건물이 없습니다.
          </template>
        </v-simple-table>
        <br />
      </div>
    </div>
    <div v-else>
      <h4 class=" font-weight-bold">매매 정보</h4>

      <v-simple-table>
        <template v-slot:default>
          <!-- <colgroup>
                  <col :style="{ width: '30%' }" />
                  <col :style="{ width: '50%' }" />
                  <col :style="{ width: '20%' }" />
            </colgroup> -->
          <thead>
            <tr>
              <th class="text-left">동</th>
              <th class="text-left">아파트이름</th>
              <th class="text-left">buildYear</th>
              <th class="text-left">dealYear</th>
              <th class="text-left">dealAmount</th>
            </tr>
          </thead>
          <apt-row v-for="(apt, idx) in deallist.bList" :key="idx" :apt="apt"> </apt-row>
        </template>
      </v-simple-table>
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
    ...mapGetters(["deallist", "searchResult"]),
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
};
</script>

<style>
.inline-block {
  display: inline-block;
}
</style>
