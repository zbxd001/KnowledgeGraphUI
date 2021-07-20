<template>
  <div id="app">
    <el-container>
    <router-view></router-view>
    </el-container>
  </div>
</template>


<script>
  export default {
    name: 'app'
  }
</script>


<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>

<!--<template>-->
<!--  <div>-->
<!--    <LoginPage v-if="Lpage" @login="onLogin" @Register="ToRegister" />-->
<!--    <RegPage v-if="Rpage" @toLogin="ToLogin" />-->
<!--    <FirstPage v-if="Fpage" @draw="onDraw" @logout="ToLogin" />-->
<!--    <ShowPage-->
<!--      v-if="Spage"-->
<!--      @backToFirst="backToFirst"-->
<!--      @toNewObjectPage="toNewObjectPage"-->
<!--      @toNewPrimitivePage="toNewPrimitivePage"-->
<!--      @toNewRelationPage="toNewRelationPage"-->
<!--      @toWritePrimitivePage="toWritePrimitivePage"-->
<!--      @toWriteRealObjectPage="toWriteRealObjectPage"-->
<!--      @toWriteRelationPage="toWriteRelationPage"-->
<!--      @logout="ToLogin"-->
<!--      @update="backToSecond"-->
<!--    />-->

<!--    <NewObjectPage v-if="ShowNewObjectPage" @backToSecond="backToSecond" />-->
<!--    <NewPrimitivePage-->
<!--      v-if="ShowNewPrimitivePage"-->
<!--      @backToSecond="backToSecond"-->
<!--    />-->
<!--    <NewRelationPage v-if="ShowNewRelationPage" @backToSecond="backToSecond" />-->
<!--    <WriteRealObjectPage-->
<!--      v-if="ShowWriteRealObjectPage"-->
<!--      @backToSecond="backToSecond"-->
<!--    />-->
<!--    <WritePrimitivePage-->
<!--      v-if="ShowWritePrimitivePage"-->
<!--      @backToSecond="backToSecond"-->
<!--      @backToSecond2="backToSecond"-->
<!--    />-->
<!--    <WriteRelationPage-->
<!--      v-if="ShowWriteRelationPage"-->
<!--      @backToSecond="backToSecond"-->
<!--    />-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import LoginPage from "./components/LoginPage";-->
<!--import RegPage from "./components/RegisterPage";-->
<!--import FirstPage from "./components/firstPage";-->
<!--import ShowPage from "./components/showPage";-->
<!--import NewObjectPage from "./components/newObjectPage";-->
<!--import NewRelationPage from "./components/newRelationPage";-->
<!--import WriteRealObjectPage from "./components/writeRealObject";-->
<!--import WriteRelationPage from "./components/writeRelation";-->
<!--import WritePrimitivePage from "./components/writePrimitve";-->
<!--import NewPrimitivePage from "./components/newPrimitivePage";-->

<!--export default {-->
<!--  name: "App",-->
<!--  components: {-->
<!--    LoginPage,-->
<!--    RegPage,-->
<!--    FirstPage,-->
<!--    ShowPage,-->
<!--    NewObjectPage,-->
<!--    NewRelationPage,-->
<!--    WriteRealObjectPage,-->
<!--    WriteRelationPage,-->
<!--    WritePrimitivePage,-->
<!--    NewPrimitivePage,-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      Lpage: true,-->
<!--      Rpage: false,-->
<!--      Fpage: false,-->
<!--      Spage: false,-->
<!--      ShowNewObjectPage: false,-->
<!--      ShowNewRelationPage: false,-->
<!--      ShowWriteRealObjectPage: false,-->
<!--      ShowWriteRelationPage: false,-->
<!--      ShowWritePrimitivePage: false,-->
<!--      ShowNewPrimitivePage: false,-->
<!--    };-->
<!--  },-->
<!--  methods: {-->
<!--    setAllFalse() {-->
<!--      this.Lpage = false;-->
<!--      this.Rpage = false;-->
<!--      this.Fpage = false;-->
<!--      this.Spage = false;-->
<!--      this.ShowNewObjectPage = false;-->
<!--      this.ShowNewRelationPage = false;-->
<!--      this.ShowWriteRealObjectPage = false;-->
<!--      this.ShowWriteRelationPage = false;-->
<!--      this.ShowWritePrimitivePage = false;-->
<!--      this.ShowNewPrimitivePage = false;-->
<!--    },-->
<!--    onLogin() {-->
<!--      this.setAllFalse();-->
<!--      this.Fpage = true;-->
<!--    },-->
<!--    ToRegister() {-->
<!--      this.setAllFalse();-->
<!--      this.Rpage = true;-->
<!--    },-->
<!--    ToLogin() {-->
<!--      this.setAllFalse();-->
<!--      this.Lpage = true;-->
<!--    },-->
<!--    onDraw() {-->
<!--      this.setAllFalse();-->
<!--      this.Spage = true;-->
<!--    },-->
<!--    backToFirst() {-->
<!--      this.setAllFalse();-->
<!--      this.Fpage = true;-->
<!--    },-->
<!--    backToSecond() {-->
<!--      this.setAllFalse();-->
<!--      this.Spage = true;-->
<!--    },-->
<!--    toNewObjectPage() {-->
<!--      this.setAllFalse();-->
<!--      this.ShowNewObjectPage = true;-->
<!--    },-->
<!--    toNewPrimitivePage() {-->
<!--      this.setAllFalse();-->
<!--      this.ShowNewPrimitivePage = true;-->
<!--    },-->
<!--    toNewRelationPage() {-->
<!--      this.setAllFalse();-->
<!--      this.ShowNewRelationPage = true;-->
<!--    },-->
<!--    toWritePrimitivePage() {-->
<!--      this.setAllFalse();-->
<!--      this.ShowWritePrimitivePage = true;-->
<!--    },-->
<!--    toWriteRealObjectPage() {-->
<!--      this.setAllFalse();-->
<!--      this.ShowWriteRealObjectPage = true;-->
<!--    },-->
<!--    toWriteRelationPage() {-->
<!--      this.setAllFalse();-->
<!--      this.ShowWriteRelationPage = true;-->
<!--    },-->
<!--  },-->
<!--};-->
<!--</script>-->

<!--<style>-->
<!--#app {-->
<!--  font-family: Avenir, Helvetica, Arial, sans-serif;-->
<!--  -webkit-font-smoothing: antialiased;-->
<!--  -moz-osx-font-smoothing: grayscale;-->
<!--  text-align: center;-->
<!--  color: #2c3e50;-->
<!--}-->
<!--</style>-->
