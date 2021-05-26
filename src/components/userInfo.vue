<template>
  <div>
    <v-row style="height: 150px">
      <v-col align="center">
        <v-avatar color="primary" size="105">
          <img
            :src="`http://localhost:9999/happyhouse/img/test${copyUserInfo.profile_img}.jpg
             `"
          />
        </v-avatar>
      </v-col>
    </v-row>
    <v-row>
      <v-col align="center">
        <v-btn color="primary" class="ma-2" dark @click="imageDialog = true">
          프로필 선택
        </v-btn>
      </v-col>
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
              <img src="http://localhost:9999/happyhouse/img/test1.jpg" />
            </v-list-item-avatar>
          </v-col>
          <v-col align="center">
            <v-list-item-avatar
              size="105"
              @click="img_choice(2)"
              style="cursor: pointer"
            >
              <img src="http://localhost:9999/happyhouse/img/test2.jpg" />
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
              <img src="http://localhost:9999/happyhouse/img/test3.jpg" />
            </v-list-item-avatar>
          </v-col>
          <v-col align="center">
            <v-list-item-avatar
              size="105"
              @click="img_choice(4)"
              style="cursor: pointer"
            >
              <img src="http://localhost:9999/happyhouse/img/test4.jpg" />
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
              <img src="http://localhost:9999/happyhouse/img/test5.jpg" />
            </v-list-item-avatar>
          </v-col>
          <v-col align="center">
            <v-list-item-avatar
              size="105"
              @click="img_choice(6)"
              style="cursor: pointer"
            >
              <img src="http://localhost:9999/happyhouse/img/test6.jpg" />
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

    <v-container>
      <validation-observer ref="observer" v-slot="{ invalid }">
        <form @submit.prevent="modifyUserInfo">
          <validation-provider
            v-slot="{ errors }"
            name="ID"
            rules="required|max:10"
          >
            <v-text-field
              v-model="copyUserInfo.userId"
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
              v-model="copyUserInfo.userPwd"
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
              v-model="copyUserInfo.userName"
              :counter="10"
              :error-messages="errors"
              label="Name"
              required
            ></v-text-field>
          </validation-provider>
          <v-text-field
            label="Email"
            v-model="copyUserInfo.email"
            required
          ></v-text-field>
          <v-text-field
            label="Address"
            v-model="copyUserInfo.address"
            required
          ></v-text-field>
          <v-btn class="mr-4" type="submit" :disabled="invalid">
            수정하기
          </v-btn>
          <v-btn @click="deleteUser"> 탈퇴하기 </v-btn>
        </form>
      </validation-observer>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      imageDialog: false,
    };
  },
  methods: {
    modifyUserInfo() {
      this.$store.dispatch("modifyUser", this.copyUserInfo);
    },
    deleteUser() {
      this.$store.dispatch("deleteUser").then(() => {
        alert("바이 바이...");
      });
    },
    img_choice(num) {
      this.copyUserInfo.profile_img = num;
      this.imageDialog = false;
    },
  },

  computed: {
    ...mapGetters({ userInfo: "userInfo", isLogin: "isLogin" }),
    copyUserInfo() {
      let temp = JSON.parse(JSON.stringify(this.userInfo));
      temp.userPwd = "";
      return temp;
    },
  },
};
</script>
<style>
</style>