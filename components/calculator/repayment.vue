<template>
  <v-card>
    <v-toolbar dark color="primary">
      <v-btn icon dark @click="$emit('close')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title class="text-h6">Repayment Schedule</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn dark text @click="$emit('close')"> Close </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-card-text v-if="rs" class="mt-6">
      <v-row>
        <v-col
          class="d-flex align-center py-4"
          style="background-color: #ececec"
          cols="6"
          xs="6"
        >
          <span>Repayment per installment</span>
        </v-col>
        <v-col
          class="d-flex d-flex justify-end align-center"
          style="background-color: #ececec"
          cols="6"
          xs="6"
        >
          <span>{{
            rs.periods[1].totalInstallmentAmountForPeriod | currency
          }}</span>
        </v-col>
        <v-col class="d-flex align-center py-4" cols="6" xs="6">
          <span>Total Interest payable</span>
        </v-col>
        <v-col class="d-flex d-flex justify-end align-center" cols="6" xs="6">
          <span>{{ rs.totalInterestCharged | currency }}</span>
        </v-col>
        <v-col
          class="d-flex align-center py-4"
          style="background-color: #ececec"
          cols="6"
          xs="6"
        >
          <span>Total Fee payable</span>
        </v-col>
        <v-col
          class="d-flex d-flex justify-end align-center"
          style="background-color: #ececec"
          cols="6"
          xs="6"
        >
          <span>{{ rs.totalFeeChargesCharged | currency }}</span>
        </v-col>

        <v-col class="d-flex align-center py-4" cols="6" xs="6">
          <span>Amount to be disbursed</span>
        </v-col>
        <v-col class="d-flex d-flex justify-end align-center" cols="6" xs="6">
          <span>{{
            (rs.totalPrincipalDisbursed - rs.totalInterestCharged) | currency
          }}</span>
        </v-col>
      </v-row>

      <div class="mt-8">
        <span class="font-medium text-h6 text-black">Loan Charges</span>
      </div>
      <v-divider />
      <v-list v-if="charges.length > 0" class="py-2 px-0 mx-0" three-line>
        <v-list-item
          class="ma-0 pa-0"
          v-for="(charge, index) in charges"
          :key="index"
        >
          <loan-charge-component :charge="charge"></loan-charge-component>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    rs: {
      type: Object,
      default: null,
    },
    charges: {
      type: Array,
      default: [],
    },
  },
};
</script>
