import Vue from "vue";
import Vuex from "vuex";
import VueSession from 'vue-session';
import boardhttp from "@/util/Boardhttp.js";
import tokenhttp from "@/util/Tokenhttp.js";


Vue.use(Vuex);
Vue.use(VueSession);
export default new Vuex.Store({
  state: {
    userInfo:{
      profile_img:"1",
    },
    token:"",
    board:{},
    boards:[],
    comment:{},
    comments:[],
    startPage:"",
    endPage:"",
    totalPage:"",
    curPage: "",
    aptInfos: [],
    aptStartPage:"",
    aptEndPage:"",
    aptTotalPage:"",
    aptCurPage: "",
    users:[],
    station: {},
    deallist: {},
    isLogin: "",
    searchResult: { stationlist: {},
    aptlist: {},
    officelist: {}},
    centerMap: {},
  },
  getters:{
    boards(state){
      return state.boards;
    },
    token(state){
      return state.token;
    },
    aptInfos(state) {
      return state.aptInfos;
    },
    board(state){
      return state.board;
    },
    comment(state){
      return state.comment;      
    },
    comments(state){
      return state.comments;
    },
    startPage(state){
      return state.startPage;
    },
    endPage(state){
      return state.endPage;
    },
    totalPage(state){
      return state.totalPage;
    },
    curPage(state){
      return state.curPage;
    },
    aptStartPage(state){
      return state.aptStartPage;
    },
    aptEndPage(state){
      return state.aptEndPage;
    },
    aptTotalPage(state){
      return state.aptTotalPage;
    },
    aptCurPage(state){
      return state.aptCurPage;
    },
    userInfo(state){
      return state.userInfo;
    },
    users(state){
      return state.users;
    },
    station(state){
      return state.station;
    },
    deallist(state) {
      return state.deallist;
    },
    isLogin(state){
      return state.isLogin;
    },
    searchResult(state) {
      return state.searchResult;
    },
    centerMap(state) {
      return state.centerMap;
    }
    
  },
  mutations: {
    setComments(state,payload){
      state.comments = payload;
    },
    setComment(){},
    setBoard(state, payload){
      state.board = payload;
    },
    setBoards(state,payload){
      state.boards = payload.bList;
    },
    setEndPage(state, payload){
      state.endPage = payload;
    },
    setTotalPage(state, payload){
      state.totalPage = payload;
    },
    setStartPage(state ,payload){
      state.startPage = payload;
    },
    setCurPage(state, payload){
      state.curPage = payload;
    },
    setAptEndPage(state, payload){
      state.EndPage = payload;
    },
    setAptTotalPage(state, payload){
      state.totalPage = payload;
    },
    setAptStartPage(state ,payload){
      state.startPage = payload;
    },
    setAptCurPage(state, payload){
      state.curPage = payload;
    },
    setaptInfos(state, payload) {
      state.aptInfos = payload.bList;
    },
    setUserInfo(state,payload){
      state.userInfo = payload;
    },
    setToken(state,payload){
      state.token = payload;
    },
    setUsers(state, payload){
      state.users = payload;
    },
    setStation(state, payload){
      state.station = payload;
    },
    setDealList(state, payload) {
      state.deallist = payload;
    },
    setIsLoginTrue(state){
      state.isLogin = true;
    },
    setIsLoginfalse(state){
      state.isLogin = false;
    },
    setSearchResult(state,payload) {
      state.searchResult = payload;
    },
    setCenterMap(state, payload) {
      state.centerMap = payload;
    }

  },
  actions: {
    movePage(context, page) {
      boardhttp
      .get("/BoardMain?page=" + page)
      .then(({ data }) => {
        context.commit("setBoards",data);
        context.commit("setTotalPage",data.totalPage);
        context.commit("setEndPage",data.endPage);
        context.commit("setStartPage",data.startPage);
        context.commit("setCurPage",page);
      })
      .catch(() => {
        alert("????????? ??????????????????.");
      });
    },
    getBoard(context, payload){
      boardhttp
      .get("/board?num=" + payload)
      .then(({data})=>{
        context.commit("setBoard",data);
      })
    },    getAptInfos(context, payload){
      // this.board = "board";            
      if ( payload.curPage== null) {
        payload.curPage = 1;
      } 
      boardhttp
        .get("/mvhouseinfo?page=" + payload.curPage)
        .then(({ data }) => {
          context.commit("setBoards",data);
          context.commit("setAptTotalPage",data.totalPage);
          context.commit("setAptEndPage",data.endPage);
          context.commit("setAptStartPage",data.startPage);
          context.commit("setAptCurPage",payload.curPage);
        })
        .catch(() => {
          alert("????????? ??????????????????.");
        });

    },
    


    getBoards(context, payload){
      // this.board = "board";            
      if ( payload.curPage== null) {
        payload.curPage = 1;
      } 
      boardhttp
        .get("/BoardMain?page=" + payload.curPage)
        .then(({ data }) => {
          context.commit("setBoards",data);
          context.commit("setTotalPage",data.totalPage);
          context.commit("setEndPage",data.endPage);
          context.commit("setStartPage",data.startPage);
          context.commit("setCurPage",payload.curPage);
        })
        .catch(() => {
          alert("????????? ??????????????????.");
        });

    },

    randomViews() {
      return Math.floor(Math.random(10, 100) * 100);
    },
    postBoard(context, payload) {
      tokenhttp.defaults.headers['Authorization']="Bearer " + context.state.token;
      console.log(tokenhttp.defaults.headers['Authorization']);
      tokenhttp
        .post("/postboard",payload)
        .then(() => {
        
        })
        .catch(() => {
          alert("????????? ??????????????????.");
        });
    },
    deleteBoard(context,payload){
      tokenhttp.defaults.headers['Authorization']="Bearer " + context.state.token;
      tokenhttp
      .delete("/deleteboard?num="+payload.bnum)
      .then(()=>{
        alert("?????? ???????????????!");
      })
      .catch(()=>{
        alert("????????? ?????? ??? ?????? ??????");
      })
    },
    putBoard(context,payload){
      tokenhttp.defaults.headers['Authorization']="Bearer " + context.state.token;
      tokenhttp
      .put("/putboard",payload)
      .then(()=>{
        alert("?????? ??????");
      })
      .catch(()=>{
        alert("????????? ????????????!");
      })
    },
  setToken(context,payload){
    context.commit("setToken",payload);
  },
  login(context,payload){
    boardhttp
    .post("/login", payload)
    .then(({data})=>{
      alert("???????????????!");
      context.commit("setToken",data.token);
      context.commit("setIsLoginTrue");
      tokenhttp.defaults.headers['Authorization']="Bearer " + context.state.token;
      tokenhttp.defaults.headers['userid']=payload.userId;
      this.dispatch('getUser',payload);
      Vue.prototype.$session.set("token",data.token);
    })
    .catch(()=>{
      alert("???????????? ??????????????? ??????????????????");
    })
  },
  getUser(context,payload){
    //tokenhttp.defaults.headers['Authorization']="Bearer " + context.state.token;
    console.log("??? ?????? :"+ tokenhttp.defaults.headers['userid']);
    tokenhttp
    .post("/getUser",payload)
    .then(({data})=>{
      context.commit("setUserInfo",data);
      Vue.prototype.$session.set("loginId",data.userId);
    })
  },
  signUp(context,payload){
    boardhttp
    .post("/signUp",payload)
    .then(()=>{
      alert("?????? ??????!")
      window.location.reload();
    })
    .catch(()=>{
      alert("????????? ????????? ?????????!");
    })
    ;
  },
  modifyUser(context,payload){
    tokenhttp.defaults.headers['Authorization']="Bearer " + context.state.token;
    tokenhttp
    .put("/modify",payload)
    .then(({data})=>{
      if(data === "success")
        this.dispatch("getUser",payload).then(()=>{
          alert("?????? ??????");
          window.location.reload();
        });
      

    })
  },
  deleteUser(context){
    //tokenhttp.defaults.headers['Authorization']="Bearer " + context.state.token;
    tokenhttp
    .delete("/delete?userId="+context.state.userInfo.userId)
    .then(()=>{
      context.commit("setUserInfo",null);
      context.commit("setToken",null);
      this.dispatch('logout');
      
    })
  },
  logout(context){
    context.commit("setIsLoginFalse");
    context.commit("setToken",null);
    context.commit("setUserInfo",null);
    Vue.prototype.$session.remove("token");
    Vue.prototype.$session.remove("loginId");
  },
  getLoginState(context){
    let loginId ={};
    loginId.userId =  Vue.prototype.$session.get("loginId");
    let token =  Vue.prototype.$session.get("token");

    tokenhttp.defaults.headers['Authorization']="Bearer " + token;
    tokenhttp.defaults.headers['userid']=loginId.userId;
    console.log("?????? : "+tokenhttp.defaults.headers['Authorization']);

    if(loginId != null && token != null){
      context.commit("setIsLoginTrue");
      context.commit("setToken",token);     
      this.dispatch('getUser',loginId);
    }
  },
  getUserList(context){
    // tokenhttp.defaults.headers['Authorization']="Bearer " + context.state.token;
    // tokenhttp.defaults.headers['userId']=context.state.userInfo.userId;
    tokenhttp
    .get("userlist")
    .then(({data})=>{
      context.commit("setUsers",data);      

    })
  },
  postUser(context,payload){    
    tokenhttp.defaults.headers['Authorization']="Bearer " + context.state.token;
    tokenhttp.defaults.headers['userId']=context.state.userInfo.userId;
    tokenhttp
    .post("/admin",payload)
    .then(({data})=>{
      alert("?????? ??????");
      context.commit("setUsers",data);
    })
  },
  adminDeleteUser(context,payload){
    tokenhttp
    .delete("/admin/"+payload.userId)
    .then(({data})=>{
      alert("?????? ??????");
      context.commit("setUsers",data);
    })
  },
  adminPutUser(context,payload){
    tokenhttp.defaults.headers['Authorization']="Bearer " + context.state.token;
    tokenhttp
    .put("/admin",payload)
    .then(({data})=>{
      alert("?????? ??????");
      context.commit("setUsers",data);
    })
  },
    getStation(context, payload) {
    context.commit("setStation",payload);
    },
    getdeallist(context, payload) {
      boardhttp.get("house/searchtype?type=1&area="+payload).then(({ data }) => {
        context.commit("setDealList",data);
      })
      .catch(() => {
        alert("????????? ??????????????????.");
      });
    },
    getDealListDragger(context, payload) {
      context.commit("setDealList",payload);
    },
    getCmtList(context,payload) {
      boardhttp.get("/ajax?bnum="+payload).then(({ data }) => {
        context.commit("setComments",data);
      });
    },
    postComment(context, payload){
      tokenhttp
      .post("/ajax",payload)
      .then(()=>{
        window.location.reload();
      })
    },
    deleteComment(context,payload){
      tokenhttp.defaults.headers['Authorization']="Bearer " + context.state.token;
      tokenhttp
      .put("cmtDelete",payload)
      .then(()=>{
        alert("?????? ???????????????!");
        window.location.reload();
      })
    },
    searchResult(context, payload) {
      context.commit("setSearchResult", payload);
    },
    centerMap(context, payload) {
      context.commit("setCenterMap", payload);
    },


    
    


    
    // getFormatDate(regtime) {
    //   return moment(new Date(regtime)).format('YYYY.MM.DD');
    // },
    // getFormatDateDetail(regtime) {
    //   return moment(new Date(regtime)).format('YYYY.MM.DD HH:mm:ss');
    // },
  },
});
