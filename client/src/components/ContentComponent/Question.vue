<template>
  <div>
    <v-flex v-for="(question, index) in questions" :key="index">
      <v-card>
        <v-card-title primary-title>
          <div>
            <div class="headline" style="color:#019688;">{{ question.title }}</div>
            <div class="icon">
              <v-icon v-on:click="downvoteQuestion(question._id)">thumb_down</v-icon><span class="iconQuestion">({{ question.downvote.length }})</span>
              <v-icon v-on:click="upvoteQuestion(question._id)">thumb_up</v-icon><span class="iconQuestion">({{ question.upvote.length}})</span>
              <v-icon>mode_comment</v-icon><span class="iconQuestion">({{ question.answers.length }})</span>
            </div>
          </div>
        </v-card-title>

        <v-card-actions>
          <v-btn flat>Share</v-btn>
          
          <router-link :to="{ path : `/questions/${question._id}` }" style="text-decoration: none"><v-btn flat color="#019688">Read More</v-btn></router-link>
          <div v-if="question.postBy">
            <div class="btnAccess" v-if="question.postBy.email == userEmail">
              <router-link :to="{ path : `/questions/update/${question._id}` }">
                <v-btn color="#009688" style="color:#FFFFFF">Update</v-btn>
              </router-link>
              <v-btn color="#009688" style="color:#FFFFFF; margin-left:5px;" v-on:click="btnDelete(question._id)">Delete</v-btn>
            </div>
          </div>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-flex>
  </div>
</template>

<script>
import axios from "axios"
import config from "@/assets/config.js"
import { mapState } from "vuex"

export default {
  name: "AllQuestions",
  props: ["statusDeleteSide"],
  data: function () {
    return {
      questions: [],
      statusDelete: 0
    }
  },
  created() {
    this.documentReady()
  },
  methods: {
    documentReady: function () {
      axios({
        method: "GET",
        url: `${config.port}/questions`
      })
      .then((response) => {
        this.questions = response.data.questions
      }).catch((err) => {
        
      });
    },
    downvoteQuestion: function (questionId) {
      axios({
        method: "POST",
        url: `${config.port}/questions/downvote/${questionId}`,
        headers: {
          token : localStorage.getItem("token")
        }
      })
      .then((response) => {
        this.documentReady()
      }).catch((err) => {
        console.log(err.response.data.message);
      });
    },
    upvoteQuestion: function (questionId) {
      axios({
        method: "POST",
        url: `${config.port}/questions/upvote/${questionId}`,
        headers: {
          token : localStorage.getItem("token")
        }
      })
      .then((response) => {
        this.documentReady()
      }).catch((err) => {
        console.log(err.response.data.message);
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
        this.statusDelete++
        this.$emit("status-delete", this.statusDelete)
        this.documentReady()
      }).catch((err) => {
        console.log(err.response.data.message);
      });
    }
  },
  computed: {
    ...mapState(["userEmail", "search", "popular", "mostAnswer", "allQuestions"])
  },
  watch: {
    statusDeleteSide: function () {
      this.documentReady()
    },
    search: function (val) {
      val = val.trim()
      axios({
        method: 'get',
        url: `${config.port}/questions/searchQuestion?title=${val}`
      })
      .then((response) => {
        this.questions = response.data.questions
      })
      .catch((err) =>{
        console.log(err.response)
      })

    },
    popular: function (val) {
      axios({
        method: 'get',
        url: `${config.port}/questions/popularQuestions`
      })
      .then((response) => {
        this.questions = response.data.questions
      })
      .catch((err) =>{
        console.log(err.response)
      })
    },
    mostAnswer: function (val) {
      axios({
        method: 'get',
        url: `${config.port}/questions/mostAnswer`
      })
      .then((response) => {
        this.questions = response.data.questions
      })
      .catch((err) =>{
        console.log(err.response)
      })
    },
    allQuestions: function (val) {
      this.documentReady()
    }
  }
}
</script>

<style scoped>
  .icon {
    margin-top: 15px;
  }
  .iconQuestion {
    margin-right: 8px;
  }

  .btnAccess {
    position: absolute;
    right: 10px;
    bottom: 10px;
    color: #FFFFFF;
  }
</style>
