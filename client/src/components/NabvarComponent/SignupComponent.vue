<template>
  <v-dialog v-model="modalRegister" persistent max-width="500px">
    <v-btn slot="activator" color="#009688" dark>Signup</v-btn>
    <v-card>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <div class="alert" v-if="error">
                {{ errorMessage }}
              </div> 
            </v-flex>
            <v-flex xs12>
              <v-text-field label="Name" v-model="name"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="Phone Number" v-model="phone"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="Email" v-model="email"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="Password" type="password" v-model="password"></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.native="modalRegister = false; error = false">CLOSE</v-btn>
        <v-btn color="blue darken-1" flat @click="btnRegister">REGISTER</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

import config from "@/assets/config.js"
import axios from "axios"

export default {
  name: "SignupComponent",
  data: function () {
    return {
      name: "",
      phone: "",
      email: "",
      password: "",
      modalRegister: false,
      error: false,
      errorMessage: ""
    }
  },
  methods: {
    btnRegister: function () {
      let data = {
        name: this.name,
        phone: this.phone,
        email: this.email,
        password: this.password
      }

      axios({
        method: "POST",
        url: `${config.port}/users/signup`,
        data
      })
      .then((response) => {
        this.modalRegister = false
        this.error = false
      })
      .catch((err) => {
     
        this.errorMessage = ""
        this.error = true

        if(err.response.data.err.code == 11000) {
          if(err.response.data.err.errmsg.slice(72,77) == "phone") {
          this.errorMessage = `phone number is already exists`
          } else if (err.response.data.err.errmsg.slice(72,77) == "email") {
            this.errorMessage = `email is already exists`
          } 
        } else {
          this.errorMessage = Object.values( err.response.data.err.errors)[0].message
        }
      
      });
    }
  }
}
</script>

<style>

</style>
