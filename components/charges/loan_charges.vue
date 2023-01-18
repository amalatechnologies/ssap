<template>
  <v-container class="mx-0 px-0" fluid>
    <v-alert border="left" colored-border :color="charge.isPaid || charge.isWaived ? 'black' : 'deposit'" elevation="2">
      <v-row dense>
        <v-col class="font-weight-bold" cols="8"> {{ charge.name }}</v-col>
        <v-col cols="4" class="d-flex justify-start">{{
          charge.dueDate | simpledateformat
        }}</v-col>
        <v-col class="font-weight-bold" cols="8"> Due:</v-col>
        <v-col cols="4" class="d-flex justify-start">{{ charge.currency.code }} {{ charge.amount | currency }}</v-col>
        <v-col class="font-weight-bold" cols="8"> Paid:</v-col>
        <v-col cols="4" class="d-flex justify-start">{{ charge.currency.code }} {{
          charge.amountPaid | currency
        }}</v-col>
        <v-col class="font-weight-bold" cols="8"> Waved:</v-col>
        <v-col cols="4" class="d-flex justify-start">{{ charge.currency.code }} {{
          charge.amountWaived | currency
        }}</v-col>
        <v-col class="font-weight-bold" cols="8"> Outstanding:</v-col>
        <v-col cols="4" class="d-flex justify-start">{{ charge.currency.code }} {{
          charge.amountOutstanding | currency
        }}</v-col>
      </v-row>
    </v-alert>
  </v-container>
</template>
<script>
export default {
  props: {
    charge: {
      type: Object,
      default: null,
    },
  },
};
</script>
