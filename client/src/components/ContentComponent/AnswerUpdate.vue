<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-btn slot="activator" color="#4DB6AC" dark>UPDATE</v-btn>

    <v-card>
      <v-card-text>
        <v-flex sm12>
          <v-card color="#009688" class="white--text" style="clear:both">

            <v-flex xs12 style="border-radius: 5px;">
              <div class="alert" v-if="error">
                {{ errorMessage }}
              </div> 
            </v-flex>

            <v-card-title primary-title>
      
            <v-textarea
            solo-inverted
            name="input-7-4"
            v-model="description"
            ></v-textarea>
        
            </v-card-title>
          </v-card>
        </v-flex>
      </v-card-text>

      <v-card-title>
        <v-spacer></v-spacer>
        <v-btn color="#009688" @click.native="dialog = false; error = false" style="color: #FFFFFF;">CLOSE</v-btn>
        <v-btn color="#009688" v-on:click="btnUpdate(answer._id)" style="color: #FFFFFF;">UPDATE</v-btn>
      </v-card-title>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios"
import config from "@/assets/config.js"

export default {
  name: "AnswerUpdate",
  props: ["answer"],
   data: function () {
     return {
       description: "",
       dialog: false,
       error: false,
       errorMessage: ""
     }
   },
   methods: {
     btnUpdate: function (answerId) {
    
       axios({
         method: "PUT",
         url: `${config.port}/answers/update/${answerId}`,
         data: {
           description: this.description
         },
         headers: {
           token : localStorage.getItem("token")
         }
       })
       .then((response) => {
         this.$emit('updatesuccess', true)
         this.dialog = false
       }).catch((err) => {
         this.errorMessage = ""
         this.error = true
         this.errorMessage = err.response.data.err.errors.description.message
       });
     }
   }
}
</script>

<style>

</style>
