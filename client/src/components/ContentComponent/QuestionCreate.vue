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

            <v-btn color="#009688" style="float: right" v-on:click="btnCreate"><span style=" color:#FFFFFF">CREATE</span></v-btn>
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
import { mapActions, mapState } from 'vuex';

export default {
  name: "QuestionCreate",
  data: function () {
    return {
      title: "",
      description: "",
      error: false,
      errorMessage: "",
    }
  },
  methods: {
    ...mapActions(["setReloadPage", "setReloadAll"]),
    btnCreate: function () {
      let data = {
        title: this.title,
        description: this.description
      }

      let self = this

      axios({
        method: "POST",
        url: `${config.port}/questions`,
        data,
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then((response) => {
        this.$router.push(`/questions/${response.data.question._id}`)
        this.setReloadAll()
        this.$emit("status-reload", response.data.question._id)
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
  computed: {}
}
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>
