<template>
  <v-container grid-list-md>
    <!-- text-xs-center -->
    <v-layout row wrap>

      <LeftbarComponent/>
      <v-flex xs6>
        <router-view :status-delete-side="statusDeleteSide" @status-reload="statusreload" @status-reload-update="statusreloadupdate" @status-delete="statusdelete"></router-view>
      </v-flex>
      <RightbarComponent :status-reload="statusReload" :status-reload-update="statusReloadUpdate" :status-delete="statusDelete" @status-delete-side="statusdeleteside"/>

    </v-layout>
  </v-container>
</template>

<script>
import LeftbarComponent from "../components/SidebarComponent/LeftbarComponent.vue"
import RightbarComponent from "../components/SidebarComponent/RightbarComponent.vue"

export default {
  name: "home",
  components: {
    LeftbarComponent,
    RightbarComponent
  },
  data: function () {
    return {
      statusReload: "",
      statusReloadUpdate: "",
      statusDelete: "",
      statusDeleteSide: ""
    }
  },
  methods: {
    statusreload: function (val) {
      this.statusReload = val
    },
    statusreloadupdate: function (val) {
      this.statusReloadUpdate = val
    },
    statusdelete: function (val) {
      this.statusDelete = val
    },
    statusdeleteside: function (val) {
      this.statusDeleteSide = val
    },
  
  }
}
</script>
