<template>
  <div>
    <v-flex xs12>
      <v-card>
        <v-card-title primary-title>
          <div>
            <div class="headline">{{ question.title }}</div>
          </div>
        </v-card-title>

        <hr style="color: #009688">
        <v-card class="fieldQuestion">
            <div style="margin: 10px 0;">
              <h3 style="color:#019688;" v-if="question.postBy">{{ question.postBy.name }}</h3>
              <p style="font-size:14px;"  v-html="question.description"></p>
            </div>

            <div class="icon">
              <v-icon v-on:click="downvoteQuestion(question._id)">thumb_down</v-icon><span class="iconQuestion" v-if="question.downvote">({{ question.downvote.length }})</span>
              <v-icon v-on:click="upvoteQuestion(question._id)">thumb_up</v-icon><span class="iconQuestion" v-if="question.upvote">({{ question.upvote.length }})</span>
              <v-icon>mode_comment</v-icon><span class="iconQuestion"  v-if="question.answers">({{ question.answers.length }})</span>
            </div>
        </v-card>
      </v-card>
    </v-flex>

    <v-flex xs12>
      <v-card class="boxComment">
        <h3 v-if="question.answers">Answer ({{ question.answers.length }})</h3>
        <v-card color="#4DB6AC" class="white--text boxAnswer" v-for="(answer, index) in question.answers" :key="index">
          <div style="padding: 10px;">
            <div style="display:block;">Post by : {{ answer.answerBy.name }}</div>
            <div style="text-align:justify;">
              {{ answer.description }}
            </div>
          </div>
          <div>
            <v-card-actions>
              <v-icon v-on:click="downvoteAnswer(answer._id)">thumb_down</v-icon><span class="iconQuestion" >({{ answer.downvote.length }})</span>
              <v-icon v-on:click="upvoteAnswer(answer._id)">thumb_up</v-icon><span class="iconQuestion">({{ answer.upvote.length }})</span>
              <AnswerUpdate @updatesuccess="updateSuccess" v-bind:answer="answer" class="btnUpdate" v-if="userEmail === answer.answerBy.email"/>
            </v-card-actions>
          </div>
        </v-card>
      </v-card>
    </v-flex>

    <v-flex xs12 v-if="isLogin">
      <v-card class="boxComment">
        <h3>Ask Question</h3>
        <v-flex xs12 style="border-radius: 5px;" v-if="error">
          <div class="alert">
            {{ errorMessage }} <span style="float:right; cursor:pointer;" @click="btnCloseError">CLOSE</span>
          </div> 
        </v-flex>
        <v-textarea
          box
          name="input-7-4"
          v-model="answerDescription"
        ></v-textarea>
        <v-btn color="#009688" style="float:right; color: #FFFFFF;" v-on:click="btnAnswer(question._id)">Post Your Answer</v-btn>
      </v-card>
    </v-flex>

  </div>
</template>

<script>
import AnswerUpdate from "./AnswerUpdate"
import axios from "axios"
import config from "@/assets/config.js"
import { mapState } from "vuex"

export default {
  name: "QuestionDetail",
  components: {
    AnswerUpdate
  },
  data: function () {
    return {
      question: [],
      answerDescription: "",
      error: false,
      errorMessage: ""
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
        this.question = response.data.questions
      }).catch((err) => {
        console.log(err.response)
      });
    },
    btnAnswer: function () {
      axios({
        method: "POST",
        url: `${config.port}/answers/${this.question._id}`,
        data: {
          description: this.answerDescription
        },
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then((response) => {
        this.answerDescription = ""
        this.documentReady()
      }).catch((err) => {
        this.errorMessage = ""
        this.error = true
        this.errorMessage  = err.response.data.err.errors.description.message
      });
    },
    downvoteAnswer: function (answerId) {
      axios({
        method: "POST",
        url: `${config.port}/answers/downvote/${answerId}`,
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
    upvoteAnswer: function (answerId) {
      axios({
        method: "POST",
        url: `${config.port}/answers/upvote/${answerId}`,
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
    updateSuccess: function () {
      this.documentReady()
    },
    btnCloseError: function () {
      this.error = false
    }
  },
  computed: {
    ...mapState(["isLogin","userEmail"]),
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
        this.question = response.data.questions
      }).catch((err) => {
        console.log(err.response)
      });
    }
  }

}
</script>

<style scoped>
 .icon {
    margin-top: 4px;
  }

  .icon .iconQuestion {
    display: inline-block;
    margin: 10px 10px 30px 0;;
  }

  .fieldQuestion {
    padding: 0 14px;
  }

  .boxAnswer {
    margin-bottom: 10px;
  }

  .btnUpdate {
    position: absolute;
    right: 10px;
    bottom: 10px;
    color: #FFFFFF;
  }

  .boxComment {
    padding: 14px;
    overflow: hidden;
  }
</style>
