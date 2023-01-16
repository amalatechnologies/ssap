<template>
  <v-container>
    <v-card color="transparent" flat>
      <v-toolbar color="primary" tile dark flat>
        <v-toolbar-title>
          <v-avatar color="primary " size="36">
            <span class="white--text font-weight-bold overline" @click.stop="$router.go(-1)">
              <v-icon large color="white">mdi-keyboard-backspace</v-icon>
            </span>
          </v-avatar>
        </v-toolbar-title>
        <v-toolbar-title class="white--text">
          &nbsp; &nbsp;
          {{ capitalizeFirstLetter(request.clientName) }} Guarantor
          Details</v-toolbar-title>
      </v-toolbar>

      <v-card class="mt-5 pa-4">
        <v-row>
          <v-col cols="8">Client Name:</v-col>
          <v-col cols="4" class="d-flex justify-start">{{
            request.clientName
          }}</v-col>
          <v-col cols="8">Loan product:</v-col>
          <v-col cols="4" class="d-flex justify-start">{{
            request.productName
          }}</v-col>
          <v-col cols="8">Loan Account:</v-col>
          <v-col cols="4" class="d-flex justify-start">{{
            request.loanAccount
          }}</v-col>
          <v-col cols="8">Loan Amount:</v-col>
          <v-col cols="4" class="d-flex justify-start">{{
            request.loanAmount
          }}</v-col>
          <v-col cols="8">Requested Amount:</v-col>
          <v-col cols="4" class="d-flex justify-start">{{
            request.totalGuarantee
          }}</v-col>
        </v-row>
      </v-card>

      <p class="py-4 font-weight-bold">Guarantees</p>
      <v-card v-for="(d, index) in details" :key="index" class="mt-5 pa-4" color="#FAFAFA" tile>
        <v-card-text>
          <v-row class="black--text" dense>
            <v-col cols="8">Client Name:</v-col>
            <v-col cols="4" class="d-flex justify-start">{{
              d.displayName
            }}</v-col>
            <v-col cols="8">Product Name:</v-col>
            <v-col cols="4" class="d-flex justify-start">{{
              d.loanProductName
            }}</v-col>
            <v-col cols="8">Account:</v-col>
            <v-col cols="4" class="d-flex justify-start">{{
              d.accountNumber
            }}</v-col>
            <v-col cols="8">Loan Amount:</v-col>
            <v-col cols="4" class="d-flex justify-start">{{
              d.loanAmount
            }}</v-col>
            <v-col cols="8">Guarantee:</v-col>
            <v-col cols="4" class="d-flex justify-start">{{
              d.guaranteeAmount
            }}</v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <v-row no-gutters class="my-4 d-flex justify-space-between">
        <v-col cols="5">
          <v-btn block color="warning" @click="decline">DECLINE</v-btn>
        </v-col>
        <v-col cols="5 ">
          <v-btn block color="primary" @click="approve" class="font-weight-bold">APPROVE</v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    search: null,
    details: [],
  }),
  created() {
    if (this.request) {
      this.retrieveguarantordetails();
    }
  },
  computed: {
    styledHeaders() {
      return this.headers.map((item) => ({ ...item, ["class"]: "primary" }));
    },
    request() {
      return this.$store.getters.guarantorrequest(this.$route.params.id);
    },
  },
  methods: {
    getColor(status) {
      return status === "Paid" ? "green" : "orange";
    },
    async retrieveguarantordetails() {
      await this.$api
        .$get(
          `/loans/client/${this.request.guarantorId}/loan/${this.request.loanId}/obligeedetails`
        )
        .then((response) => {
          this.details = response;
        })
        .catch((error) => { });
    },
    approve() {
      let payload = {
        loanId: this.request.loanId,
        requestId: this.request.requestId,
      };
      this.$store.dispatch("_approveguarantors", payload).then(() => {
        this.$router.go(-1);
      });
    },
    decline() {
      let payload = {
        loanId: this.request.loanId,
        requestId: this.request.requestId,
      };
      this.$store.dispatch("_declineguarantors", payload).then(() => {
        this.$router.go(-1);
      });
    },
  },
};
</script>