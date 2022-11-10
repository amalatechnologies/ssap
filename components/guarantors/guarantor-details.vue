<template>
  <div>
    <v-alert border="left" colored-border color="primary" elevation="1">
      <nuxt-link :to="`/guarantors/${guarantor.id}`">
        <v-row class="black--text" dense>
          <v-col class="font-weight-bold" cols="8">Name: </v-col>
          <v-col cols="4" class="d-flex justify-start">{{ guarantor.firstname }} {{ guarantor.lastname }}</v-col>
          <v-col class="font-weight-bold" cols="8">Office: </v-col>
          <v-col cols="4" class="d-flex justify-start">{{ guarantor.officeName }}</v-col>
          <v-col class="font-weight-bold" cols="8">Relation: </v-col>
          <v-col cols="4" class="d-flex justify-start">{{ guarantor.clientRelationshipType.name }}</v-col>
          <v-col class="font-weight-bold" cols="8">Guarantor Type: </v-col>
          <v-col cols="4" class="d-flex justify-start">{{ guarantor.guarantorType.value }}</v-col>
          <v-col class="font-weight-bold" cols="8">Loan ID: </v-col>
          <v-col cols="4" class="d-flex justify-start">{{ guarantor.loanId }}</v-col>
          <v-col class="font-weight-bold" cols="8">Amount: </v-col>
          <v-col cols="4" class="d-flex justify-start">{{ guarantor.guarantorFundingDetails[0].amount }}</v-col>
          <v-col class="font-weight-bold" cols="8">Joined: </v-col>
          <v-col cols="4" class="d-flex justify-start">{{ guarantor.joinedDate | dateformat }}</v-col>
          <v-col class="font-weight-bold" cols="8">Active ?</v-col>
          <v-col cols="4" class="d-flex justify-start">
            <v-icon small color="primary" v-if="guarantor.status">mdi-check</v-icon>
            <v-icon small color="warning" v-else>mdi-close</v-icon>
          </v-col>


        </v-row>
      </nuxt-link>
    </v-alert>
  </div>
</template>
<script>
export default {
  props: {
    guarantor: {
      type: Object,
      default: null,
    },
  },
};
</script>