<template>
  <tr>
    <td>{{ cwriter }}</td>
    <td class="text-left">{{ ccontent }}</td>
    <td v-if="userInfo.userName == this.cwriter">
      <v-btn @click="deleteComment" small>삭제</v-btn>
    </td>
  </tr>
</template>
 
<script>
import { mapGetters } from "vuex";
export default {
  name: "commentList",
  props: {
    cwriter: { type: String },
    ccontent: { type: String },
    cnum: { type: String },
  },
  methods: {
    deleteComment() {
      console.log(this.cnum);
      this.$store.dispatch("deleteComment", this.cnum);
    },
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
};
</script>
