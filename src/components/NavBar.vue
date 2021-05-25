<template>
  <nav id="navbar">
    <v-app-bar class="white" flat app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="font-weight-bold"
        ><router-link to="/" class="black--text" style="text-decoration: none"
          >WantSeek House</router-link
        ></v-toolbar-title
      >
      <v-spacer></v-spacer>

      <search-bar></search-bar>
      <v-spacer></v-spacer>
      <div v-if="isLogin">
        <v-menu offset-y left>
          <template v-slot:activator="{ on }">
            <v-btn small color="blue" depressed fab v-on="on" class="white--text">
              {{ userInfo.userId }}

              <v-icon dark right> mdi-cancel </v-icon>
            </v-btn>
          </template>

          <v-card>
            <v-list>
              <v-list-item>
                <v-list-item-avatar>
                  <img :src="`https://randomuser.me/api/portraits/men/4.jpg`" />
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>{{ userInfo.userName }}</v-list-item-title>
                  <v-list-item-subtitle>{{ userInfo.email }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list>
              <v-list-item router to="/userInfo">
                <v-list-item-icon>
                  <v-icon>mdi-account-box</v-icon>
                </v-list-item-icon>
                <v-list-item-title>회원 정보</v-list-item-title>
              </v-list-item>
              <v-list-item router to="/studio">
                <v-list-item-icon>
                  <v-icon>mdi-youtube-studio</v-icon>
                </v-list-item-icon>
                <v-list-item-title>VueTube Studio</v-list-item-title>
              </v-list-item>
              <v-list-item @click="logOut">
                <v-list-item-icon>
                  <v-icon>mdi-login-variant</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Sign out</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </div>
      <div v-else>
        <v-dialog v-model="signUpDialog" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="ma-2" color="#009688" dark v-bind="attrs" v-on="on">
              <v-icon dark left> mdi-human-greeting </v-icon>
              Sign Up
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
                      :src="
                        `http://localhost:9999/happyhouse/img/test${signUp.profile_img}.jpg
                    `
                      "
                    />
                  </v-avatar>
                </v-row>
                <v-row justify="center">
                  <v-btn color="primary" class="ma-2" dark @click="imageDialog = true">
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
                          <img :src="`http://localhost:9999/happyhouse/img/test1.jpg`" />
                        </v-list-item-avatar>
                      </v-col>
                      <v-col align="center">
                        <v-list-item-avatar
                          size="105"
                          @click="img_choice(2)"
                          style="cursor: pointer"
                        >
                          <img :src="`http://localhost:9999/happyhouse/img/test2.jpg`" />
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
                          <img :src="`http://localhost:9999/happyhouse/img/test3.jpg`" />
                        </v-list-item-avatar>
                      </v-col>
                      <v-col align="center">
                        <v-list-item-avatar
                          size="105"
                          @click="img_choice(4)"
                          style="cursor: pointer"
                        >
                          <img :src="`http://localhost:9999/happyhouse/img/test4.jpg`" />
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
                          <img :src="`http://localhost:9999/happyhouse/img/test5.jpg`" />
                        </v-list-item-avatar>
                      </v-col>
                      <v-col align="center">
                        <v-list-item-avatar
                          size="105"
                          @click="img_choice(6)"
                          style="cursor: pointer"
                        >
                          <img :src="`http://localhost:9999/happyhouse/img/test6.jpg`" />
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
                  <form @submit.prevent="postSignUp">
                    <validation-provider v-slot="{ errors }" name="ID" rules="required|max:10">
                      <v-text-field
                        v-model="signUp.userId"
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
                        v-model="signUp.userPwd"
                        :counter="25"
                        type="password"
                        :error-messages="errors"
                        label="Password"
                        required
                      ></v-text-field>
                    </validation-provider>

                    <validation-provider v-slot="{ errors }" name="Name" rules="required|max:10">
                      <v-text-field
                        v-model="signUp.userName"
                        :counter="10"
                        :error-messages="errors"
                        label="Name"
                        required
                      ></v-text-field>
                    </validation-provider>
                    <v-text-field label="Email" v-model="signUp.email" required></v-text-field>
                    <v-text-field label="Address" v-model="signUp.address" required></v-text-field>
                    <v-btn class="mr-4" type="submit" :disabled="invalid">
                      submit
                    </v-btn>
                    <v-btn @click="signUpDialog = false"> close </v-btn>
                  </form>
                </validation-observer>
              </v-container>
            </v-card-text>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="ma-2" color="primary" dark v-bind="attrs" v-on="on">
              <v-icon dark left> mdi-account-circle </v-icon>
              Login
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Welcome WantSeek House</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field label="I D" v-model="login.userId" required></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Password"
                      type="password"
                      v-model="login.userPwd"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="postLogin">
                Login
              </v-btn>

              <v-btn color="blue darken-1" text @click="dialog = false">
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      :clipped="$route.name !== 'Watch'"
      :temporary="$route.name === 'Watch'"
      id="nav"
    >
      <div tag="div" class="v-navigation-drawer__content" v-bar>
        <v-list dense nav class="py-0" tag="div">
          <v-list-item
            :class="{
              'hidden-lg-and-up': $route.name === 'Watch' ? false : true,
            }"
          >
            <v-app-bar-nav-icon @click="drawer = !drawer" class="mr-5"></v-app-bar-nav-icon>
            <v-toolbar-title class="font-weight-bold">VueTube</v-toolbar-title>
          </v-list-item>
          <v-divider class="hidden-lg-and-up"></v-divider>
          <div v-for="parentItem in items" :key="parentItem.header">
            <v-subheader
              v-if="parentItem.header"
              class="pl-3 py-4 subtitle-1 font-weight-bold text-uppercase"
              >{{ parentItem.header }}</v-subheader
            >
            <v-list-item
              v-for="item in parentItem.pages"
              :key="item.title"
              link
              class="mb-0"
              router
              :to="item.link"
              exact
              active-class="active-item"
            >
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title class="font-weight-medium subtitle-2">{{
                  item.title
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider class="mt-2 mb-2"></v-divider>
          </div>

          <span v-for="link in links" :key="link.text">
            <span v-if="link.text === 'Terms'" class="mb-2 d-block"> </span>
            <v-btn href router :to="link.link" text class="text-capitalize px-1" small>{{
              link.text
            }}</v-btn>
          </span>
        </v-list>
      </div>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
import SearchBar from "../views/Search";
export default {
  components: {
    SearchBar,
  },
  data: () => ({
    drawer: false,
    dialog: false,
    signUpDialog: false,
    imageDialog: false,
    login: {},
    signUp: {
      profile_img: "2",
    },
    profile_items: ["img 1", "img 2", "img 3", "img 4"],
    items: [
      {
        header: null,
        pages: [
          { title: "매물 정보", link: "/", icon: "mdi-home" },
          { title: "게시판", link: "/board/list", icon: "mdi-fire" },
          {
            title: "회원관리",
            link: "/adminPage",
            icon: "mdi-account-cog",
          },
        ],
      },
    ],
    links: [
      { text: "About", link: "#" },
      { text: "Press", link: "#" },
      { text: "Copyrignt", link: "#" },
      { text: "Contact us", link: "#" },
      { text: "Creators", link: "#" },
      { text: "Advertise", link: "#" },
      { text: "Developers", link: "#" },
      { text: "Terms", link: "#" },
      { text: "Privacy", link: "#" },
      { text: "Policy & Safety", link: "#" },
      { text: "Test new features", link: "#" },
    ],
    searchText: "",
  }),
  created() {
    this.$store.dispatch("getLoginState");
  },
  methods: {
    search() {
      if (!this.searchText) return;
      this.$router.push({
        name: "Search",
        query: { "search-query": this.searchText },
      });
    },
    postLogin() {
      this.$store.dispatch("login", this.login).then(() => {});
    },
    postSignUp() {
      console.log(this.signUp);
      this.$store.dispatch("signUp", this.signUp).then(() => {
        //window.location.reload();
      });
    },
    img_choice(num) {
      this.signUp.profile_img = num;
      this.imageDialog = false;
    },

    logOut() {
      this.$store.dispatch("logout").then(() => {
        alert("로그아웃 되었습니다 !");
        this.isLogin = false;
        window.location.reload();
      });
      console.log(this.isLogin);
    },
  },
  mounted() {
    this.drawer = this.$vuetify.breakpoint.mdAndDown ? false : true;
    this.drawer = this.$route.name === "Watch" ? false : this.drawer;
  },
  computed: {
    ...mapGetters({ userInfo: "userInfo", isLogin: "isLogin" }),
  },
};
</script>

<style lang="scss">
#navbar {
  .active-item {
    .v-list-item__icon {
      color: red !important;
    }
  }
  .v-navigation-drawer__border {
    width: 0 !important;
  }

  .vuebar-element {
    height: 250px;
    width: 100%;
    max-width: 500px;
    background: #dfe9fe;
  }

  .vb > .vb-dragger {
    z-index: 5;
    width: 10px;
    right: 0;
  }

  .vb > .vb-dragger > .vb-dragger-styler {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transform: rotate3d(0, 0, 0, 0);
    transform: rotate3d(0, 0, 0, 0);
    -webkit-transition: background-color 100ms ease-out, margin 100ms ease-out,
      height 100ms ease-out;
    transition: background-color 100ms ease-out, margin 100ms ease-out, height 100ms ease-out;

    margin: 5px 5px 5px 0;
    border-radius: 20px;
    height: calc(100% - 10px);
    display: block;
  }

  .v-navigation-drawer__content:hover .vb > .vb-dragger > .vb-dragger-styler {
    width: 10px;
    background-color: #e0e0e0;
  }

  .vb.vb-scrolling-phantom > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(48, 121, 244, 0.3);
    background-color: rgba(255, 255, 255, 0.3);
  }

  .vb > .vb-dragger:hover > .vb-dragger-styler {
    margin: 0px;
    width: 10px;
  }

  .vb.vb-dragging > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(48, 121, 244, 0.5);
    margin: 0px;
    height: 100%;
  }

  .vb.vb-dragging-phantom > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(48, 121, 244, 0.5);
  }
}
</style>
