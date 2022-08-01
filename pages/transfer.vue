<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center" class="fill-height">
      <p>Under development</p>
    </v-row>
    <v-form>
      <v-col class="d-flex" cols="12" sm="6">
        <v-select
          :items="getSavings"
          item-text="accountNo"
          return-object
          v-model="selected"
          label="Pay To"
        >
          <!-- <option :value="{id:acc.id,type:acc.accountType}" v-for="acc in savingsAccounts" :key="acc.id">{{ acc.accountNo}}</option> -->
        </v-select>
      </v-col>

      <v-col class="d-flex" cols="12" sm="6">
        <v-select
          :items="getSavings"
          item-text="accountNo"
          return-object
          v-model="selected"
          label="Pay From"
        >
          <!-- <option :value="{id:acc.id,type:acc.accountType}" v-for="acc in savingsAccounts" :key="acc.id">{{ acc.accountNo}}</option> -->
        </v-select>
      </v-col>

      <v-col class="d-flex" cols="12" sm="6">
        <v-select
          :items="getSavings"
          item-text="accountNo"
          return-object
          v-model="selected"
          label="Amount"
        >
          <!-- <option :value="{id:acc.id,type:acc.accountType}" v-for="acc in savingsAccounts" :key="acc.id">{{ acc.accountNo}}</option> -->
        </v-select>
      </v-col>

      <v-col class="d-flex" cols="12" sm="6">
        <v-select
          :items="getSavings"
          item-text="accountNo"
          return-object
          v-model="selected"
          label="Pay To"
        >
          <!-- <option :value="{id:acc.id,type:acc.accountType}" v-for="acc in savingsAccounts" :key="acc.id">{{ acc.accountNo}}</option> -->
        </v-select>
      </v-col>

      <div>
        <v-text-field
          label="Report"
          hide-details="auto"
          :rules="rules"
        ></v-text-field>
      </div>
    </v-form>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  //pay from
  data: () => ({
    selected: { accountId: 0, accountType: "", accountNo: "" },
    rules: [
      (value) => !!value || "Required.",
      (value) => (value && value.length >= 3) || "Min 3 characters",
    ],
  }),
  computed: {
    getSavings() {
      return this.savingsAccounts.map((item) => ({
        accountId: item.id,
        accountType: item.accountType.code,
        accountNo: item.accountNo,
      }));
    },

    ...mapGetters({
      savingsAccounts: "savingaccounts",
    }),
  },
  mounted() {
    console.log(this.getSavings);
  },
  created() {
    this.$store.dispatch("_getaccounts", this.clientId);
  },
};
</script>
<style>
#app {
  font-family: "Lato", sans-serif;
}
.routeLink {
  text-decoration: none;
}
</style>
