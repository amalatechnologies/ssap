<template>
  <v-container fluid class="fill-height">
    <v-row align="center" justify="center" class="fill-height">
      <v-col cols="12">
        <v-card>
          <v-card-title
            ><h3>Charges</h3>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field
          ></v-card-title>
          <v-data-table :headers="headers" :items="charges" :search="search">
            <template v-slot:item.status="{ item }">
              <v-chip :color="getColor(item.status)">{{ item.status }}</v-chip>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    search: "",
    headers: [
      { text: "Status", align: "start", filterable: true, value: "status" },
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
    this.$store.dispatch("_getcharges", this.clientId);
    console.table(this.charges);
  },
  computed: {
    ...mapGetters({
      charges: "charges",
    }),
  },
  methods: {
    getColor(status) {
      return status === "Paid" ? "green" : "orange";
    },
  },
};
</script>
