<template>
  <v-container class="pa-5">
    <v-container fluid>
      <v-row dense>
        <v-col cols="8"> Account Number</v-col>
        <v-col cols="4" class="d-flex justify-start">{{ accountNumber }}</v-col>
        <v-col cols="8"> Disbursment Date</v-col>
        <v-col cols="4" class="d-flex justify-start">{{
          disbursmentDate | dateformat
        }}</v-col>
        <v-col cols="8"> Number of Repayments</v-col>
        <v-col cols="4" class="d-flex justify-start">{{
          numberOfRepayments
        }}</v-col>
      </v-row>
      <v-simple-table light>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left white--text">Date</th>
              <th class="text-left white--text">Loan Balance</th>
              <th class="text-left white--text">Repayment</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(period, index) in repayments.periods">
              <tr v-if="index != 0" :key="period.period">
                <td>{{ period.dueDate | dateformat }}</td>
                <td>
                  {{ repayments.currency.code }}
                  {{ period.principalLoanBalanceOutstanding | currency }}
                </td>
                <td>
                  {{ repayments.currency.code }}
                  {{ period.totalDueForPeriod | currency }}
                </td>
              </tr>
            </template>
          </tbody>
        </template>
      </v-simple-table>
    </v-container>
  </v-container>
</template>
<script>
export default {
  props: {
    accountNumber: {
      type: String,
      default: null,
    },
    disbursmentDate: {
      type: Array,
      default: [],
    },
    numberOfRepayments: {
      type: Number,
      default: 0,
    },
    repayments: {
      type: Object,
      default: null,
    },
  },
};
</script>
