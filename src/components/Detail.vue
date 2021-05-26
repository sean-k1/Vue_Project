<template>
  <div>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">제목</th>
            <th class="text-left">작성자</th>
            <th class="text-left">작성일</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ board.btitle }}</td>
            <td>{{ board.bwriter }}</td>
            <td>{{ getFormatDate(board.bregdate) }}</td>
          </tr>
          <tr>
            <td class="text-center" colspan="3">내용</td>
          </tr>
          <tr>
            <td colspan="3">{{ board.bcontent }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <div
      class="text-center"
      v-if="board.userId == userInfo.userId || userInfo.userId == 'admin'"
    >
      <span><v-btn @click="putBoard" color="info" small>수정하기</v-btn></span>
      &nbsp;
      <span
        ><v-btn @click="deleteBoard" color="red" small>삭제하기</v-btn></span
      >
    </div>
    <br />
  </div>
</template>
 
<script>
import { mapGetters } from "vuex";
import moment from "moment";
export default {
  name: "detail",
  props: {
    board: { type: Object },
  },
  methods: {
    getFormatDate(regtime) {
      return moment(new Date(regtime)).format("YYYY.MM.DD HH:mm:ss");
    },
    deleteBoard() {
      this.$store.dispatch("deleteBoard", this.board);
      this.$router.push("list");
    },
    putBoard() {
      this.$router.push("modify?bnum=" + this.board.bnum);
    },
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
};
</script>
