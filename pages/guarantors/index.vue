<template>
  <v-container v-if="requests == null" class="fill-height">
    <v-row align="center" justify="center" class="fill-height">
      <v-progress-circular :size="50" color="primary" indeterminate>
        <v-icon>mdi-cloud</v-icon>
      </v-progress-circular>
    </v-row>
  </v-container>
  <v-container v-else>
    <v-list three-line>
      <v-list-item class="ma-0 pa-0" v-for="(request, index) in requests" :key="request.requestId">
        <guarantor-request :request="request"></guarantor-request>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    search: null,
    headers: [
      {
        text: "Status",
        align: "start",
        filterable: true,
        value: "status",
      },
      { text: "Name", align: "start", filterable: false, value: "name" },
      {
        text: "Due As Of",
        align: "start",
        filterable: false,
        value: "dueAsOf",
      },
      { text: "Due", align: "start", filterable: false, value: "due" },
      { text: "Paid", align: "start", filterable: false, value: "paid" },
      { text: "Waived", align: "start", filterable: false, value: "waived" },
      {
        text: "Outstanding Balance",
        align: "start",
        filterable: false,
        value: "outstanding",
      },
    ],
  }),
  created() {
    this.$store.dispatch("_retrieveguarantors", this.clientId);
  },
  computed: {
    styledHeaders() {
      return this.headers.map((item) => ({ ...item, ["class"]: "primary" }));
    },
    ...mapGetters({
      requests: "guarantorrequests",
    }),
  },
  methods: {
    getColor(status) {
      return status === "Paid" ? "green" : "orange";
    },
    getSearchData: (value, search, item) => value == item.status,
  },
};
</script>
