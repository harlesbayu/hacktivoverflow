<template>
  <v-flex xs3 v-if="isLogin">
    <v-card>
        <v-toolbar color="#009688" style="color:#FFFFFF;">
          <v-toolbar-title>My Questions</v-toolbar-title>
        </v-toolbar>

        <div>
          <div  v-for="(question, index) in myQuestions" :key="index">
            <v-layout row wrap>
              <v-flex xs8>
                <v-toolbar>
                  <router-link :to="{ path : `/questions/${question._id}` }">
                    <v-toolbar-title style="font-size:12px; color:#009688">{{ question.title.slice(0,10) }} ... </v-toolbar-title>
                  </router-link>
                </v-toolbar>
              </v-flex>
              <v-flex xs4>
                <v-toolbar>
                  <router-link :to="{ path : `/questions/update/${question._id}` }">
                    <v-icon>update</v-icon>
                  </router-link>
                  <v-icon v-on:click="btnDelete(question._id)">delete</v-icon>
                </v-toolbar>
              </v-flex>
            </v-layout>
          </div>
        </div>
      </v-card>

  </v-flex>
</template>

<script>

import axios from "axios"
import config from "@/assets/config.js"
import { mapState } from "vuex"

export default {
  name: "RightbarComponent",
  props: ["statusReload", "statusReloadUpdate", "statusDelete"],
  data: function () {
    return {
      myQuestions: [],
      statusDeleteSide: 0
    }
  },
  created() {
    this.documentReady()
  },
  methods: {
    documentReady: function () {
      axios({
        method: "GET",
        url: `${config.port}/questions/myquestions`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then((response) => {
        this.myQuestions = response.data.questions
      }).catch((err) => {
        // console.log(err.response)
      });
    },
    btnDelete: function (questionId) {
      axios({
        method: "DELETE",
        url: `${config.port}/questions/remove/${questionId}`,
        headers: {
          token : localStorage.getItem("token")
        }
      })
      .then((response) => {
        this.statusDeleteSide++
        this.$emit("status-delete-side", this.statusDeleteSide)
        this.$router.push("/")
        this.documentReady()
      }).catch((err) => {
        console.log(err.response.data.message);
      });
    }
  },
  watch: {
    isLogin: function () {
      this.documentReady()
    },
    statusReload: function () {
      this.documentReady()
    },
    statusReloadUpdate: function () {
      this.documentReady()
    },
    statusDelete: function () {
      this.documentReady()
    },
  },
  computed: {
    ...mapState(["isLogin", "reloadAll"]),
  }
}
</script>

<style>

</style>
