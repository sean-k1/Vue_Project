<template>
  <div>
    <div v-if="!deallist.bList">
      <div class=" bd-sidebar">
        <h4 class=" font-weight-bold">매매 정보</h4>
        <ul class="nav" id="sidebar_deal_list ">
          <li class="border">
            <a
              >해당하는 건물이 없습니다.<br />
              <br />
            </a>
          </li>
        </ul>
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

export default {
  name: "list",
  components: {
    AptRow,
  },
  AptRowdata: function() {
    return {
      apt: [{ curpage: "" }],
    };
  },

  computed: {
    ...mapGetters(["deallist"]),
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

<style></style>
