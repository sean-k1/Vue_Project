

<template>
  <div>
    {{ startPage }}
    {{ endPage }}
    {{ curPage }}
    {{ totalPage }}
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">작성자</th>
            <th class="text-center">글 제목</th>
            <th class="text-left">날짜</th>
          </tr>
        </thead>
        <tbody>
          <list-row
            v-for="(board, idx) in boards"
            :key="idx"
            :board="board"
          ></list-row>
        </tbody>
      </template>
    </v-simple-table>

    <div v-if="boards.length">
      <div class="d-flex justify-content-center container">
        <nav aria-label="...">
          <ul class="pagination">
            <li v-if="startPage > 1" class="page-item disabled">
              <v-btn
                href="#"
                @click="movePage(startPage - 1)"
                class="page-link"
                color="#E0E0E0"
                tabindex="-1"
                >Previous</v-btn
              >
            </li>
            <div class="text-center">
              <v-pagination
                v-model="page"
                :length="endPage - startPage + 1"
                @input="next"
                circle
              ></v-pagination>
            </div>
            <li
              class="page-item"
              v-for="i in range(startPage, endPage)"
              v-bind:key="i"
            >
              <a href="#" @click="movePage(i)" class="page-link">{{ i }}</a>
            </li>
            <li v-if="endPage < totalPage" class="page-item">
              <v-btn color="#E0E0E0" href="#" @click="movePage(endPage + 1)"
                >Next</v-btn
              >
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <div v-else>글이 없습니다.</div>
    <div class="text-right">
      <!-- <button @click="`${movePage(pages.curPage-1)}`" class="btn btn-primary">이전</button>
      <button @click="`${movePage(pages.curPage+1)}`" class="btn btn-primary">다음</button> -->
    </div>

    <v-btn depressd color="primary" @click="write">등록</v-btn>
  </div>
</template>


<script>
import ListRow from "@/components/Row.vue";
import { mapGetters } from "vuex";
export default {
  name: "list",
  components: {
    ListRow,
  },
  data: function () {
    return {
      boarda: [{ curpage: "" }],
      page: "1",
      // items: [],
      // pages: [],
      // board: "",
      // page: "",
    };
  },
  created() {
    this.$store.dispatch("getBoards", this.boarda); // list들 받아오기
  },
  computed: {
    ...mapGetters(["boards", "startPage", "endPage", "curPage", "totalPage"]),
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
    next(page) {
      this.$store.dispatch("movePage", page);
    },
  },
};
</script>


<style>
.page-item {
  list-style: none;
}
</style>