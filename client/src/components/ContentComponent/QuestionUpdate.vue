<template>
  <v-flex xs12>
    <v-card>
      <v-form>
        <v-container>
          <v-layout row wrap>

            <v-flex xs12 style="border-radius: 5px;" v-if="error">
              <div class="alert">
                {{ errorMessage }} <span style="float:right; cursor:pointer;" @click="btnCloseError">CLOSE</span>
              </div> 
            </v-flex>

            <v-flex xs12>
            <v-text-field label="Question" solo  v-model="title"></v-text-field>
            <!-- <v-textarea
              solo
              label="Description"
              v-model="description"
            ></v-textarea> -->
            <wysiwyg v-model="description"/>

            <v-btn color="#009688" style="float: right" v-on:click="btnUpdate"><span style=" color:#FFFFFF">UPDATE</span></v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
    </v-card>
  </v-flex>
</template>

<script>
import axios from "axios"
import config from "@/assets/config.js"

export default {
  name: "QuestionUpdate",
  data: function () {
    return {
      title: "",
      description: "",
      error: false,
      errorMessage: "",
      statusReloadUpdate: 0
    }
  },
  created() {
    this.documentReady()
  },
  methods: {
    documentReady: function () {
      let articleId = this.$route.params.id

      axios({
        method: "GET",
        url: `${config.port}/questions/detail/${articleId}`
      })
      .then((response) => {
        this.title = response.data.questions.title
        this.description = response.data.questions.description
      }).catch((err) => {
        console.log(err.response)
      });
    },
    btnUpdate: function () {
      let articleId = this.$route.params.id

      let data = {
        title: this.title,
        description: this.description
      }
      let self = this
      axios({
        method: "PUT",
        url: `${config.port}/questions/update/${articleId}`,
        data,
        headers: {
          token : localStorage.getItem("token")
        }
      })
      .then((response) => {
  
        this.statusReloadUpdate += Math.random()*1000
        this.$emit("status-reload-update", this.statusReloadUpdate)
        this.$router.push(`/questions/${articleId}`)
      }).catch((err) => {
        this.errorMessage = ""
        this.error = true
        this.errorMessage = Object.values(err.response.data.err.errors)[0].message
      });
    },
    btnCloseError: function () {
      this.error = false
    }
  },
  computed: {
    getQuestionsIdFormParams: function () {
      return this.$route.params.id
    }
  },
  watch: {
    getQuestionsIdFormParams: function (articleId) {
      axios({
        method: "GET",
        url: `${config.port}/questions/detail/${articleId}`
      })
      .then((response) => {
        this.title = response.data.questions.title
        this.description = response.data.questions.description
      }).catch((err) => {
        console.log(err.response)
      });
    }
  }
}
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>
