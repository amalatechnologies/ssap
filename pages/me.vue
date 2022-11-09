<template>
  <div>

    <v-container fluid>
      <v-card flat class="mx-auto default">
        <v-toolbar color="primary" flat dark>
          <v-toolbar-title> User Profile</v-toolbar-title>

        </v-toolbar>

        <v-card-text v-if="client != null">
          <v-container>
            <v-row>
              <v-col class="font-weight-bold" cols="8">Name: </v-col>
              <v-col cols="4" class="d-flex justify-start">{{ client.displayName }}</v-col>
              <v-col class="font-weight-bold" cols="8">Client ID: </v-col>
              <v-col cols="4" class="d-flex justify-start">{{ client.id }}</v-col>
              <v-col class="font-weight-bold" cols="8">Gender: </v-col>
              <v-col cols="4" class="d-flex justify-start">{{ client.gender.name | }}</v-col>
              <v-col class="font-weight-bold" cols="8">Status: </v-col>
              <v-col cols="4" class="d-flex justify-start">{{ client.status.value }}</v-col>
              <v-col class="font-weight-bold" cols="8">Phone: </v-col>
              <v-col cols="4" class="d-flex justify-start">{{ client.mobileNo }}</v-col>
              <v-col class="font-weight-bold" cols="8">Office: </v-col>
              <v-col cols="4" class="d-flex justify-start">{{ client.officeName }}</v-col>
              <v-col class="font-weight-bold" cols="8">Submitted: </v-col>
              <v-col cols="4" class="d-flex justify-start">{{ client.timeline.submittedOnDate | dateformat }}
              </v-col>
              <v-col class="font-weight-bold" cols="8">Activated: </v-col>
              <v-col cols="4" class="d-flex justify-start">{{ client.activationDate | dateformat }}</v-col>
              <v-col class="font-weight-bold" cols="8">Residence: </v-col>
              <v-col cols="4" class="d-flex justify-start">{{ client.placeOfResidence }}</v-col>
              <v-col class="font-weight-bold" cols="8">Dependents: </v-col>
              <v-col cols="4" class="d-flex justify-start">{{ client.numberOfDependent | }}</v-col>


            </v-row>
          </v-container>
        </v-card-text>
        <v-card-text v-else>
          <v-progress-circular :width="2" color="primary" size="20" indeterminate></v-progress-circular>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>
<script>
export default {
  data: () => ({

  }),
  beforeCreate() {
    //this.$store.dispatch("selfserviceclient");
  },
  methods: {
  },
  created() {

  },
  computed: {
    client() {
      return this.$store.getters.client
    },

  },
};
</script>
