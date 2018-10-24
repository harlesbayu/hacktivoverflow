<template>
  <v-app>
    <NavbarComponent></NavbarComponent>
    <router-view></router-view>
  </v-app>
</template>

<script>

import NavbarComponent from "@/components/NabvarComponent/index"
import { mapActions } from 'vuex';

export default {
  name: 'App',
  components: {
    NavbarComponent
  },
  data () {
    return {}
  },
  created() {
    this.setIslogin()
    this.setUserEmail()
  },
  methods: {
    ...mapActions(["setIslogin", "setUserEmail"])
  }
}
</script>
