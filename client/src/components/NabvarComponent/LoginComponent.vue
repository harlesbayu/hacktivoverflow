<template>
   <v-dialog v-model="modalLogin" persistent max-width="500px">
      <v-btn slot="activator" color="#009688" dark>LOGIN</v-btn>
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
                <v-text-field label="Email" required v-model="email"></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-text-field label="Password" type="password" v-model="password"></v-text-field>
              </v-flex>

            </v-layout>
          </v-container>
        </v-card-text>

          <div style="text-align: center;">
            <v-spacer></v-spacer>
            <div style="display: block; padding: 0 150px;;">
              <div id="my-signin2"></div>
            </div>
            <div style="display: block; color:#FFFFFF">
              <v-btn color="#009688" @click="btnLogin" style="width: 200px;"><span style="color:#FFFFFF">LOGIN MANUAL</span></v-btn>
            </div>
            <div>
              <v-btn color="blue darken-1" flat @click.native="modalLogin = false; error = false">CLOSE</v-btn>
            </div>
          </div>
      </v-card>
    </v-dialog>
</template>

<script>
import config from "@/assets/config.js"
import axios from "axios"
import { mapActions, mapState } from "vuex"

export default {
  name: "LoginComponent",
  data: function () {
    return {
      email: "",
      password: "",
      modalLogin: false,
      error: false,
      errorMessage: ""
    }
  },
  mounted() {
    this.renderButton()
  },
  methods: {
    ...mapActions(["setIslogin", "setUserEmail"]),

    btnLogin: function () {
      let data = {
        email: this.email,
        password: this.password
      }

      axios({
        method: "POST",
        url: `${config.port}/users/signin`,
        data
      })
      .then((response) => {
        localStorage.setItem("name", response.data.name)
        localStorage.setItem("email", response.data.email)
        localStorage.setItem("token", response.data.token)
        this.setIslogin()
        this.setUserEmail()
        this.error = false

      }).catch((err) => {
        this.errorMessage = ""
        this.error = true
        this.errorMessage = err.response.data.message
      });
    },
    renderButton() {
      gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 200,
        'height': 30,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': this.onSuccess,
        'onfailure': this.onFailure
      });
    },
    onSuccess(googleUser) {
      let token = googleUser.Zi.id_token
      
      axios({
        method: "POST",
        url: `${config.port}/users/signinGoogle`,
        headers: {
          tokenGoogle : token
        }
      })
      .then((response) => {
        localStorage.setItem("name", response.data.name)
        localStorage.setItem("email", response.data.email)
        localStorage.setItem("token", response.data.token)
        this.setIslogin()
        this.setUserEmail()
      }).catch((err) => {
        console.log(err.response);
      });

    },
    onFailure(error) {
      console.log(error);
    }
  }
}
</script>

<style>
.alert {
    padding: 20px;
    background-color: #f44336; /* Red */
    color: white;
    margin-bottom: 15px;
}

.closebtn {
    margin-left: 15px;
    color: white;
    font-weight: bold;
    float: right;
    font-size: 22px;
    line-height: 20px;
    cursor: pointer;
    transition: 0.3s;
}

/* When moving the mouse over the close button */
.closebtn:hover {
    color: black;
}
</style>
