<template>
  <v-container v-if="account == null" class="fill-height">
    <v-row align="center" justify="center" class="fill-height">
      <v-progress-circular :size="50" color="primary" indeterminate>
        <v-icon>mdi-cloud</v-icon>
      </v-progress-circular>
    </v-row>
  </v-container>
  <v-card v-else color="transparent" flat>
    <v-toolbar color="primary" tile dark flat>
      <v-toolbar-title>
        <v-avatar color="primary " size="36">
          <span class="white--text font-weight-bold overline" @click.stop="$router.go(-1)">
            <v-icon large color="white">mdi-keyboard-backspace</v-icon>
          </span>
        </v-avatar>
      </v-toolbar-title>
      <v-toolbar-title class="white--text">
        &nbsp; &nbsp; {{ capitalizeFirstLetter($route.params.type) }} Account
        Details</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu v-if="isloan">
        <template v-slot:activator="{ on, attrs }">
          <v-btn dark icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="(item, i) in items" :key="i">
            <v-list-item-title @click="applyguarantor()">{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar>

    <v-container class="pa-0 ma-0" v-if="account">
      <saving-account-view v-if="this.$route.params.type == 'saving'" :account="account"></saving-account-view>
      <view-loan-account v-if="this.$route.params.type == 'loan'" :account="account"></view-loan-account>
      <view-share-account v-if="this.$route.params.type == 'share'" :account="account"></view-share-account>
    </v-container>
  </v-card>
</template>

<script>
import ViewSavingPage from "@/components/accounts/view_saving.vue";
import ViewLoanAccount from "@/components/accounts/view_loan.vue";
import ViewShareAccount from "@/components/accounts/view_share.vue";
export default {
  layout: "views",
  components: {
    "saving-account-view": ViewSavingPage,
    "view-loan-account": ViewLoanAccount,
    "view-share-account": ViewShareAccount,
  },
  data() {
    return {
      account: null,
      items: [
        { title: 'Create Guarantor' },
      ],
    };
  },
  created() {
    if (this.$route.params.type == "saving") {
      this.getsavingaccountdetails();
    }
    if (this.$route.params.type == "loan") {
      this.getloanaccountdetails();
    }
    if (this.$route.params.type == "share") {
      this.getshareaccountdetails();
    }
  },
  methods: {
    async getloanaccountdetails() {
      await this.$api
        .$get(`loans/${this.$route.params.id}`, {
          params: { associations: "repaymentSchedule,transactions,charges" },
        })
        .then((response) => {
          this.account = response;
        })
        .catch((error) => { });
    },
    async getsavingaccountdetails() {
      await this.$api
        .$get(`savingsaccounts/${this.$route.params.id}`, {
          params: { associations: "transactions,charges" },
        })
        .then((response) => {
          this.account = response;
        })
        .catch((error) => { });
    },
    async getshareaccountdetails() {
      await this.$api
        .$get(`shareaccounts/${this.$route.params.id}`, {
          params: { associations: "transactions, charges" },
        })
        .then((response) => {
          this.account = response;
        })
        .catch((error) => { });
    },
    applyguarantor() {
      this.$router.push(`/accounts/${this.$route.params.id}/guarantor`)
    }
  },
  computed: {
    isloan() {
      return this.$route.params.type === 'loan'
    }
  },
};
</script>