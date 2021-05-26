<template>
  <div class="container">
    <div v-if="userInfo.userId == 'admin'">
      <h2>회원 목록</h2>
      <div align="right">
        <v-dialog v-model="postUserDialog" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="ma-2" color="#009688" dark v-bind="attrs" v-on="on">
              <v-icon dark left> mdi-human-greeting </v-icon>
              유저 등록
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Welcome WantSeek House</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row justify="center">
                  <v-avatar color="primary" size="105">
                    <img
                      :src="`http://localhost:9999/happyhouse/img/test${addUser.profile_img}.jpg
                    `"
                    />
                  </v-avatar>
                </v-row>
                <v-row justify="center">
                  <v-btn
                    color="primary"
                    class="ma-2"
                    dark
                    @click="imageDialog = true"
                  >
                    프로필 선택
                  </v-btn>
                </v-row>
                <v-dialog v-model="imageDialog" max-width="500px">
                  <v-card>
                    <v-card-title> 프로필 선택 </v-card-title>
                    <v-row align="center">
                      <v-col align="center">
                        <v-list-item-avatar
                          size="105"
                          @click="img_choice(1)"
                          style="cursor: pointer"
                        >
                          <img
                            :src="`http://localhost:9999/happyhouse/img/test1.jpg`"
                          />
                        </v-list-item-avatar>
                      </v-col>
                      <v-col align="center">
                        <v-list-item-avatar
                          size="105"
                          @click="img_choice(2)"
                          style="cursor: pointer"
                        >
                          <img
                            :src="`http://localhost:9999/happyhouse/img/test2.jpg`"
                          />
                        </v-list-item-avatar>
                      </v-col>
                    </v-row>
                    <v-row align="center">
                      <v-col align="center">
                        <v-list-item-avatar
                          size="105"
                          @click="img_choice(3)"
                          style="cursor: pointer"
                        >
                          <img
                            :src="`http://localhost:9999/happyhouse/img/test3.jpg`"
                          />
                        </v-list-item-avatar>
                      </v-col>
                      <v-col align="center">
                        <v-list-item-avatar
                          size="105"
                          @click="img_choice(4)"
                          style="cursor: pointer"
                        >
                          <img
                            :src="`http://localhost:9999/happyhouse/img/test4.jpg`"
                          />
                        </v-list-item-avatar>
                      </v-col>
                    </v-row>
                    <v-row align="center">
                      <v-col align="center">
                        <v-list-item-avatar
                          size="105"
                          @click="img_choice(5)"
                          style="cursor: pointer"
                        >
                          <img
                            :src="`http://localhost:9999/happyhouse/img/test5.jpg`"
                          />
                        </v-list-item-avatar>
                      </v-col>
                      <v-col align="center">
                        <v-list-item-avatar
                          size="105"
                          @click="img_choice(6)"
                          style="cursor: pointer"
                        >
                          <img
                            :src="`http://localhost:9999/happyhouse/img/test6.jpg`"
                          />
                        </v-list-item-avatar>
                      </v-col>
                    </v-row>
                    <v-card-actions>
                      <v-btn color="primary" text @click="imageDialog = false">
                        Close
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>

                <validation-observer ref="observer" v-slot="{ invalid }">
                  <form @submit.prevent="postUser">
                    <validation-provider
                      v-slot="{ errors }"
                      name="ID"
                      rules="required|max:10"
                    >
                      <v-text-field
                        v-model="addUser.userId"
                        :counter="10"
                        :error-messages="errors"
                        label="ID"
                        required
                      ></v-text-field>
                    </validation-provider>

                    <validation-provider
                      v-slot="{ errors }"
                      name="Password"
                      rules="required|max:20"
                    >
                      <v-text-field
                        v-model="addUser.userPwd"
                        :counter="25"
                        type="password"
                        :error-messages="errors"
                        label="Password"
                        required
                      ></v-text-field>
                    </validation-provider>

                    <validation-provider
                      v-slot="{ errors }"
                      name="Name"
                      rules="required|max:10"
                    >
                      <v-text-field
                        v-model="addUser.userName"
                        :counter="10"
                        :error-messages="errors"
                        label="Name"
                        required
                      ></v-text-field>
                    </validation-provider>
                    <v-text-field
                      label="Email"
                      v-model="addUser.email"
                      required
                    ></v-text-field>
                    <v-text-field
                      label="Address"
                      v-model="addUser.address"
                      required
                    ></v-text-field>
                    <v-btn class="mr-4" type="submit" :disabled="invalid">
                      submit
                    </v-btn>
                    <v-btn @click="postUserDialog = false"> close </v-btn>
                  </form>
                </validation-observer>
              </v-container>
            </v-card-text>
          </v-card>
        </v-dialog>
      </div>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-center">아이디</th>
              <th class="text-center">비밀번호</th>
              <th class="text-center">이름</th>
              <th class="text-center">이메일</th>
              <th class="text-center">주소</th>
              <th class="text-center">가입일</th>
              <th class="text-center"></th>
              <th class="text-center"></th>
            </tr>
          </thead>
          <user-list
            v-for="(user, idx) in userList"
            :key="idx"
            :user="user"
          ></user-list>
        </template>
      </v-simple-table>
    </div>
    <div v-else>
      <h1>권한이 없는 페이지 입니다.</h1>
    </div>
  </div>
</template>

<script>
import UserList from "@/components/userList.vue";
import { mapGetters } from "vuex";
export default {
  name: "adminPage",
  components: {
    UserList,
  },
  data: function () {
    return {
      postUserDialog: false,
      imageDialog: false,
      addUser: {
        profile_img: "2",
      },
      add_user: {
        userId: "",
        userPwd: "",
        userName: "",
        email: "",
        address: "",
      },
    };
  },
  created() {
    this.$store.dispatch("getUserList");
    if (this.userInfo.userId !== "admin") {
      alert("관리자 이상만 접속 가능한 페이지 입니다");
      this.$router.push("/");
    }
  },

  computed: {
    ...mapGetters({ userList: "users", userInfo: "userInfo" }),
  },
  methods: {
    postUser() {
      this.$store.dispatch("postUser", this.addUser).then(() => {});
    },
  },
};
</script>

<style>
</style>