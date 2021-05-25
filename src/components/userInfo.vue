<template>
  <div>
    <v-row style="height: 150px">
      <v-spacer />
      <v-col cols="6" sm="6" md="7">
        <v-avatar color="primary" size="105">{{ userInfo.userId }}</v-avatar>
      </v-col>
    </v-row>
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
    return {};
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