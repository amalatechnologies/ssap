<template>
  <v-alert border="left" colored-border color="primary" elevation="1">
    <nuxt-link :to="`/guarantors/${request.requestId}`">
      <v-row class="black--text" dense>
        <v-col class="font-weight-bold" cols="8">Request From Client: </v-col>
        <v-col cols="4" class="d-flex justify-start">{{ request.clientName }}</v-col>
        <v-col class="font-weight-bold" cols="8">Total Request Amount: </v-col>
        <v-col cols="4" class="d-flex justify-start">{{ request.totalGuarantee | currency }}</v-col>
        <v-col class="font-weight-bold" cols="8">Loan account: </v-col>
        <v-col cols="4" class="d-flex justify-start">{{ request.loanAccount }} [{{ request.productName }}]</v-col>
        <v-col class="font-weight-bold" cols="8">Loan Amount: </v-col>
        <v-col cols="4" class="d-flex justify-start">{{ request.loanAmount | currency }}</v-col>

      </v-row>
    </nuxt-link>
  </v-alert>
</template>
<script>
export default {
  props: {
    request: {
      type: Object,
      default: null,
    },
  },
};
</script>