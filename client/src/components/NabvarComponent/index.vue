<template>
  <div>
    <v-toolbar color="#009688">
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <router-link to="/">
        <v-toolbar-title class="white--text" style="margin-right: 5px;">Home</v-toolbar-title>
      </router-link>

      <router-link to="/questions/create" v-if="isLogin">
        <v-toolbar-title class="white--text" style="font-size:14px;"><v-icon style="color:#FFFFFF;">note_add</v-icon>Create Question</v-toolbar-title>
      </router-link>

    
      <v-text-field  
        class="ml-12" 
        v-model="seacrh" 
        label="Search..."
        style="margin-left:15px;"  
        dark>
      </v-text-field>
  

      <v-spacer></v-spacer>
      <div v-if="!isLogin">
        <LoginComponent/>
        <SignupComponent/>
      </div>
      <div v-else>
        <v-btn color="#009688" style="color:#FFFFFF;" @click="btnLogout">LOGOUT</v-btn>
      </div>
    </v-toolbar>
  </div>
</template>

<script>

import LoginComponent from "./LoginComponent"
import SignupComponent from "./SignupComponent"
import { mapActions, mapState } from "vuex"

export default {
  name: "NavbarComponent",
  components : {
    LoginComponent,
    SignupComponent
  },
  data: function () {
    return {
      seacrh: ""
    }
  },
  methods: {
    ...mapActions(["setIslogin","setUserEmail", "setSearch"]),

    btnLogout: function () {
      localStorage.removeItem("token")
      localStorage.removeItem("email")
      this.setIslogin()
      this.setUserEmail()
      this.$router.push("/")
    }
  },
  computed: {
    ...mapState(["isLogin"])
  },
  watch: {
    seacrh: function (val) {
      this.setSearch(val)
      this.$router.push("/")
    }
  }
}
</script>

<style>

</style>
