<template>
  <v-flex xs3>
    <v-toolbar color="teal" dark>
      <v-toolbar-title style="font-size:18px; cursor:pointer;" @click="allQuestion">All Question</v-toolbar-title>
    </v-toolbar>
    <v-toolbar color="teal" dark>
      <v-toolbar-title style="font-size:18px; cursor:pointer;" @click="popularQuestion">Question Popular</v-toolbar-title>
    </v-toolbar>
    <v-toolbar color="teal" dark>
      <v-toolbar-title style="font-size:18px; cursor:pointer;" @click="mostAnswers">Most Answers</v-toolbar-title>
    </v-toolbar>
  </v-flex>
</template>

<script>

import { mapActions } from "vuex"

export default {
  name: "LeftbarComponent",
  data: function () {
    return {
      allquestions: 0,
      popular: 0,
      mostAnswer: 0,
    }
  },
  methods: {
    ...mapActions(["setPopularQuestion", "setMostAnswer", "setAllQuestions"]),

    allQuestion: function () {
      this.allquestions++
      this.setAllQuestions(this.allquestions)
      this.$router.push("/")
    },
    popularQuestion: function () {
      this.popular++
      this.setPopularQuestion(this.popular)
      this.$router.push("/")
    },
    mostAnswers: function () {
      this.mostAnswer++
      this.setMostAnswer(this.mostAnswer)
      this.$router.push("/")

    }
  }
}
</script>

<style>

</style>
