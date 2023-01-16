<template>
  <v-card flat tile>
    <v-toolbar color="primary" dark flat>
      <v-toolbar-title>Accounts</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>

      <template v-slot:extension>
        <v-tabs grow v-model="tab" align-with-title>
          <v-tabs-slider color="blue"></v-tabs-slider>

          <v-tab v-for="item in items" :key="item" class="text-uppercase font-weight-bold">
            {{ item }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-progress-circular :size="50" v-if="!savingaccounts" color="primary" indeterminate></v-progress-circular>
        <v-card v-else flat>
          <v-container>
            <v-list two-line class="mt-0 pt-0">
              <v-list-item-group active-class="pink--text">
                <div v-for="(account, index) in savingaccounts" :key="index">
                  <v-list-item :to="`accounts/${account.id}/saving`">
                    <template v-slot:default="{ active }">
                      <v-list-item-avatar max-width="1" :color="account.status.active ? 'primary' : 'yellow'" size="10">
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title v-html="account.accountNo"></v-list-item-title>
                        <v-list-item-subtitle v-html="account.productName"></v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-action v-if="account.accountBalance">
                        <p :class="
                          active
                            ? 'text--red text-subtitl-1'
                            : 'primary--text text-h6'
                        ">
                          {{ account.currency.code }}
                          {{ account.accountBalance | currency }}
                        </p>
                      </v-list-item-action>
                    </template>
                  </v-list-item>
                  <v-divider :key="index"></v-divider>
                </div>
              </v-list-item-group>
            </v-list>
          </v-container>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-container>
            <v-list two-line class="mt-0 pt-0">
              <v-list-item-group active-class="pink--text">
                <div v-for="(account, index) in loanaccounts" :key="index">
                  <v-list-item :to="`accounts/${account.id}/loan`" :key="index + account.accountNo">
                    <template v-slot:default="{ active }">
                      <v-list-item-avatar max-width="1" :color="account.status.active ? 'primary' : 'yellow'" size="10">
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title v-html="account.accountNo"></v-list-item-title>
                        <v-list-item-subtitle v-html="account.productName"></v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-action v-if="account.loanBalance">
                        <p :class="
                          active
                            ? 'text--red text-subtitl-1'
                            : 'primary--text text-h6'
                        ">
                          {{ currencyFormat(account.loanBalance) }}
                        </p>
                      </v-list-item-action>
                    </template>
                  </v-list-item>
                  <v-divider :key="index"></v-divider>
                </div>
              </v-list-item-group>
            </v-list>
          </v-container>
          <v-fab-transition>
            <v-btn fab large color="primary" fixed bottom right to="/accounts/apply" class="v-btn--example">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-fab-transition>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-container>
            <v-list two-line class="mt-0 pt-0">
              <v-list-item-group active-class="pink--text">
                <div v-for="(account, index) in shareaccounts" :key="index">
                  <v-list-item :to="`accounts/${account.id}/share`" :key="account.accountNo">
                    <template v-slot:default="{ active }">
                      <v-list-item-avatar max-width="1" :color="account.status.active ? 'primary' : 'yellow'" size="10">
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title v-html="account.accountNo"></v-list-item-title>
                        <v-list-item-subtitle v-html="account.productName"></v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-action v-if="account.totalApprovedShares">
                        <p :class="
                          active
                            ? 'text--red text-subtitl-1'
                            : 'primary--text '
                        ">
                          Approved {{ account.totalApprovedShares }}
                        </p>
                      </v-list-item-action>
                    </template>
                  </v-list-item>
                  <v-divider :key="index"></v-divider>
                </div>
              </v-list-item-group>
            </v-list>
          </v-container>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      tab: null,
      items: ["Savings", "Loans", "Share"],
    };
  },
  created() {
    this.$store.dispatch("_getaccounts", this.clientId);
  },
  computed: {
    ...mapGetters({
      savingaccounts: "savingaccounts",
      loanaccounts: "loanaccounts",
      shareaccounts: "shareaccounts",
    }),
  },
};
</script>