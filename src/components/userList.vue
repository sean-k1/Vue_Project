<template>
  <tr v-if="this.isModify">
    <td>{{ user.userId }}</td>
    <td>-</td>
    <td>{{ user.userName }}</td>
    <td>{{ user.email }}</td>
    <td>{{ user.address }}</td>
    <td>{{ getFormatDate(user.joindate) }}</td>
    <td>
      <v-btn color="#B2DFDB" @click="modifyOnBtn">수정</v-btn>
    </td>
    <td>
      <v-btn color="#EF5350" @click="deleteBtn">삭제</v-btn>
    </td>
  </tr>
  <tr v-else>
    <td>{{ user.userId }}</td>
    <td>
      <v-text-field
        v-model="modify_user.userPwd"
        :counter="10"
        required
      ></v-text-field>
    </td>
    <td>{{ user.userName }}</td>
    <td>
      <v-text-field v-model="modify_user.email" required></v-text-field>
    </td>
    <td>
      <v-text-field v-model="modify_user.address" required></v-text-field>
    </td>

    <td>{{ getFormatDate(user.joindate) }}</td>
    <td>
      <v-btn color="#B2DFDB" @click="putUser">수정</v-btn>
    </td>
    <td>
      <v-btn color="#EF5350" @click="modifyOffBtn">취소</v-btn>
    </td>
  </tr>
</template>

<script>
import moment from "moment";
export default {
  data: function () {
    return {
      isModify: "false",
      modify_user: {},
      now_select: {
        userId: "",
        userPwd: "",
        userName: "",
        email: "",
        address: "",
      },
    };
  },
  name: "userlist",
  props: {
    user: { type: Object },
  },
  methods: {
    getFormatDate(regtime) {
      return moment(new Date(regtime)).format("YYYY.MM.DD");
    },
    modifyOnBtn() {
      this.modify_user = this.user;
      this.now_select.userId = this.modify_user.userId;
      this.now_select.userPwd = this.modify_user.userPwd;
      this.now_select.userName = this.modify_user.userName;
      this.now_select.email = this.modify_user.email;
      this.now_select.address = this.modify_user.address;

      this.isModify = !this.isModify;
    },
    modifyOffBtn() {
      this.modify_user.userId = this.now_select.userId;
      this.modify_user.userPwd = this.now_select.userPwd;
      this.modify_user.userName = this.now_select.userName;
      this.modify_user.email = this.now_select.email;
      this.modify_user.address = this.now_select.address;

      this.isModify = !this.isModify;
    },
    putUser() {
      if (
        this.modify_user.userPwd == null ||
        this.modify_user.userName == null
      ) {
        alert("필수항목을 모두 채워주세요");
        return;
      }

      this.$store.dispatch("adminPutUser", this.modify_user);
      this.isModify = !this.isModify;
    },
    deleteBtn() {
      console.log(this.user);
      this.$store.dispatch("adminDeleteUser", this.user);
    },
  },
};
</script>

<style>
</style>