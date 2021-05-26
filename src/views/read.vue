<template>
  <div>
    <h1>게시글 읽기</h1>
    <detail :board="board" />
    <div v-if="comments.length > 0">
      <v-simple-table light>
        <template v-slot:default>
          <tr>
            <th>작성자</th>
            <th colspan="3">댓글</th>
          </tr>
          <tbody>
            <commentlist
              v-for="(item, index) in comments"
              :key="index"
              :cnum="item.cnum"
              :ccontent="item.ccontent"
              :cwriter="item.cwriter"
            />
          </tbody>
          <thead>
            <tr>
              <th class="text-left">{{ comment.cwriter }}</th>
            </tr>
          </thead>
        </template>
      </v-simple-table>
    </div>
    <v-simple-table light>
      <template v-slot:default>
        <tbody>
          <tr>
            <td class="text-center" colspan="3">내용</td>
          </tr>
          <tr>
            <td colspan="3">
              <v-text-field
                filled
                :counter="100"
                v-model="comment.ccontent"
                placeholder="The Word Is Your Reflection."
              ></v-text-field>
            </td>
            <v-btn @click="postComment">작성하기</v-btn>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import commentlist from "@/components/CommentList.vue";
import Detail from "@/components/Detail.vue";
import { mapGetters } from "vuex";
export default {
  name: "read",
  components: {
    Detail,
    commentlist,
  },
  data: function () {
    return {
      item: {},
      cmtList: {},
      comment: {
        cwriter: "",
        bnum: "",
      },
    };
  },
  created() {
    this.$store.dispatch("getBoard", this.$route.query.bnum);
    this.$store.dispatch("getCmtList", this.$route.query.bnum);
  },
  methods: {
    // getCmtList() {
    //   boardhttp.get(`/ajax?bnum=${this.$route.query.bnum}`).then(({ data }) => {
    //     this.cmtList = data;
    //   });
    // },
    postComment() {
      if (this.userInfo.userId == undefined) {
        alert("로그인 하신 회원만 댓글을 다실 수 있습니다");
        return;
      }
      this.comment.bnum = this.$route.query.bnum;
      this.comment.cwriter = this.$store.getters.userInfo.userName;
      this.comment.userId = this.$store.getters.userInfo.userId;
      this.$store.dispatch("postComment", this.comment);
    },
  },
  computed: {
    ...mapGetters(["board", "userInfo", "comments"]),
  },
};
</script>

<style></style>
