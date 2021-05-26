<template>
  <div>
    <h4>게시글 작성</h4>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left" colspan="3">제목</th>
            <th class="text-left">작성자</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <v-text-field
                :counter="25"
                placeholder="제목을 입력해주세요"
                v-model="copyBoard.btitle"
                required
              ></v-text-field>
            </td>
            <td>
              <v-text-field
                disabled
                v-model="copyBoard.bwriter"
                required
              ></v-text-field>
            </td>
          </tr>
          <tr>
            <td class="text-center" colspan="3">내용</td>
          </tr>
          <tr>
            <td colspan="3">
              <v-textarea
                filled
                :counter="1000"
                v-model="copyBoard.bcontent"
                placeholder="여기에 몬가 적어주세요"
                rows="15"
                row-height="30"
              ></v-textarea>
            </td>
          </tr>
        </tbody>
        <v-btn @click="putBoard">작성하기</v-btn>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      item: {},
    };
  },
  created() {
    console.log("modify : " + this.$route.query.bnum);
    this.$store.dispatch("getBoard", this.$route.query.bnum);
    this.item = this.board;
  },
  computed: {
    ...mapGetters(["board"]),
    copyBoard() {
      let temp = JSON.parse(JSON.stringify(this.board));
      return temp;
    },
  },
  methods: {
    putBoard() {
      console.log(this.copyBoard);
      this.$store.dispatch("putBoard", this.copyBoard).then(() => {
        this.$router.push("list");
      });
    },
  },
};
</script>

<style>
</style>