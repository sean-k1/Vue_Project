<template>
  <div>
    <h1 class="text-center">게시글 작성</h1>
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
                v-model="board.btitle"
                required
              ></v-text-field>
            </td>
            <td>
              <v-text-field
                disabled
                v-model="board.bwriter"
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
                v-model="board.bcontent"
                placeholder="여기에 몬가 적어주세요"
                rows="15"
                row-height="30"
              ></v-textarea>
            </td>
          </tr>
        </tbody>
        <v-btn @click="postBoard">작성하기</v-btn>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      board: {
        bwriter: "",
        btitle: "",
        bcontent: "",
      },
    };
  },
  created() {
    this.board.bwriter = this.$store.getters.userInfo.userName;
    this.board.userId = this.$store.getters.userInfo.userId;
  },
  methods: {
    postBoard() {
      this.board.bwriter = this.$store.getters.userInfo.userName;
      this.board.userId = this.$store.getters.userInfo.userId;
      this.$store.dispatch("postBoard", this.board).then(() => {
        this.$router.push("list");
      });
    },
  },
};
</script>

<style>
</style>