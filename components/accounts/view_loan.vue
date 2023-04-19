<template>
  <v-container class="ma-0 pa-0" fluid>
    <v-container fluid class="ma-0 pa-0">
      <v-container v-if="details" fluid class="ma-0 pa-0">
        <v-card tile>
          <v-list dense>
            <v-list-item v-if="account.summary" two-lin class="py-0 my-0" dense two-line>
              <v-list-item-content>
                <v-list-item-title>Outstanding Balance</v-list-item-title>
                <v-list-item-subtitle class="text-body-2 font-weight-normal mt-1"
                  >{{ account.currency.code }}
                  {{ account.summary.totalOutstanding | currency }}</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
            <v-list-item dense two-lin class="py-0 my-0">
              <v-list-item-content>
                <v-list-item-title>Next Installment</v-list-item-title>
                <v-list-item-subtitle class="text-body-2 font-weight-normal mt-1">
                  {{ account.status.value }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item dense two-line class="py-0 my-0">
              <v-list-item-content>
                <v-list-item-title>Maturity Date</v-list-item-title>
                <v-list-item-subtitle class="text-body-2 font-weight-normal mt-1">
                  {{ account.timeline.expectedMaturityDate | dateformat }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item dense two-line class="py-0 my-0">
              <v-list-item-content>
                <v-list-item-title>Account Number</v-list-item-title>
                <v-list-item-subtitle class="text-body-2 font-weight-normal mt-1">
                  {{ account.accountNo }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item dense two-line class="py-0 my-0">
              <v-list-item-content>
                <v-list-item-title>Loan Type</v-list-item-title>
                <v-list-item-subtitle class="text-body-2 font-weight-normal mt-1">
                  {{ account.loanType.value }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item dense two-line class="py-0 my-0">
              <v-list-item-content>
                <v-list-item-title>Currency</v-list-item-title>
                <v-list-item-subtitle class="text-body-2 font-weight-normal mt-1">
                  {{ account.currency.code }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content> </v-list-item-content>
              <v-list-item-action class="d-flex flex-row">
                <v-dialog v-model="dialog" width="500" overlay-color="black">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      v-if="tenant == 'demo'"
                      class="text-capitalize mr-2"
                      color="primary"
                      v-bind="attrs"
                      v-on="on"
                    >
                      Mobile Pay
                    </v-btn>
                  </template>

                  <v-card>
                    <v-card-title class="text-h5 white--text primary darken-1">
                      Mobile Payment
                    </v-card-title>

                    <v-card-text class="mt-5">
                      <v-row>
                        <v-col cols="12">
                          <v-select
                            :items="partners"
                            v-model="payment.provider"
                            label="Select provider name"
                            @focus="$store.dispatch('_getpartners')"
                            item-text="partnerName"
                            item-value="partnerName"
                            dense
                            class="mt-3"
                            required
                          ></v-select>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="payment.amount"
                            label="Amount*"
                            hint="Amount"
                            type="number"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="payment.phone"
                            label="Phone Number*"
                            hint="Phone Number"
                            placeholder="e.g 255716000000"
                            required
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" @click="dialog = false"> Cancel </v-btn>
                      <v-btn color="warning" @click="initiatePayment">
                        Initiate Payment
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-btn class="text-capitalize" color="primary" @click="applyguarantor()"
                  >Request Guarantor</v-btn
                >
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>

        <p class="pa-3">Monitor</p>
        <v-card>
          <v-list>
            <v-list-item @click="details = !details" dense two-line class="py-0 my-0">
              <v-list-item-avatar color="grey lighten-3">
                <v-icon color="primary" dark>mdi-clipboard-text </v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>Loan Summary</v-list-item-title>
                <v-list-item-subtitle class="mt-1">
                  View Loan summary
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              @click="(details = !details), (tab = 1)"
              dense
              two-line
              class="py-0 my-0"
            >
              <v-list-item-avatar color="grey lighten-3">
                <v-icon color="primary" dark>mdi-currency-rub </v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>Loan Charges</v-list-item-title>
                <v-list-item-subtitle class="mt-1"> View Charges </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              @click="(details = !details), (tab = 2)"
              dense
              two-line
              class="py-0 my-0"
            >
              <v-list-item-avatar color="grey lighten-3">
                <v-icon color="primary" dark>mdi-currency-rub </v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>Repayment Schedule</v-list-item-title>
                <v-list-item-subtitle class="mt-1">
                  View Repayment Schedule
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              @click="(details = !details), (tab = 3)"
              dense
              two-line
              class="py-0 my-0"
            >
              <v-list-item-avatar color="grey lighten-3">
                <v-icon color="primary" dark> mdi-swap-horizontal </v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>Transactions</v-list-item-title>
                <v-list-item-subtitle class="mt-1">
                  View Transactions
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              @click="(details = !details), (tab = 4)"
              dense
              two-line
              class="py-0 my-0"
            >
              <v-list-item-avatar color="grey lighten-3">
                <v-icon color="primary" dark> mdi-qrcode </v-icon>
              </v-list-item-avatar>
              <v-list-item-content @click="(details = !details), (tab = 5)">
                <v-list-item-title>QR Code</v-list-item-title>
                <v-list-item-subtitle class="mt-1">
                  View QR Code for this account
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-container>
      <v-card v-else tile flat>
        <v-toolbar color="primary" dark flat>
          <v-toolbar-title>Account Details</v-toolbar-title>
          <v-spacer> </v-spacer>
          <v-btn @click="details = !details" icon>
            <v-icon>mdi-eye-off</v-icon>
          </v-btn>
          <template v-slot:extension>
            <v-tabs grow v-model="tab" align-with-title>
              <v-tabs-slider color="blue"></v-tabs-slider>

              <v-tab v-for="item in items" :key="item">
                {{ item }}
              </v-tab>
            </v-tabs>
          </template>
        </v-toolbar>

        <v-tabs-items v-model="tab">
          <v-tab-item>
            <loan-summary-component
              :loanPurpose="account.loanPurposeName"
              :productName="account.loanProductName"
              :accountNumber="account.accountNo"
              :status="account.status"
              :summary="account.summary"
            >
            </loan-summary-component>
          </v-tab-item>
          <v-tab-item>
            <v-list class="pa-3" three-line>
              <v-list-item
                class="ma-0 pa-0"
                v-for="(charge, index) in account.charges"
                :key="index"
              >
                <loan-charge-component :charge="charge"></loan-charge-component>
              </v-list-item>
            </v-list>
          </v-tab-item>
          <v-tab-item>
            <loan-repayment-component
              :productName="account.loanProductName"
              :accountNumber="account.accountNo"
              :disbursmentDate="account.timeline.actualDisbursementDate"
              :numberOfRepayments="account.numberOfRepayments"
              :repayments="account.repaymentSchedule"
            >
            </loan-repayment-component>
          </v-tab-item>
          <v-tab-item>
            <loan-transactions-component
              :transactions="account.transactions"
            ></loan-transactions-component>
          </v-tab-item>
          <v-tab-item>
            <v-card>
              <v-container class="fill-height">
                <v-row align="center" justify="center" class="fill-height">
                  <v-icon size="200">mdi-qrcode</v-icon>
                </v-row>
              </v-container>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-container>
  </v-container>
</template>
<script>
import LoanSummaryComponent from "@/components/loans/loan_summary.vue";
import LoanRepaymentComponent from "@/components/loans/loan_repayments.vue";
import LoanTransactionsComponent from "@/components/loans/loan_transactions.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    "loan-summary-component": LoanSummaryComponent,
    "loan-repayment-component": LoanRepaymentComponent,
    "loan-transactions-component": LoanTransactionsComponent,
  },
  props: {
    account: {
      type: Object,
      default: null,
      required: true,
    },
  },
  data() {
    return {
      details: true,
      dialog: false,
      tab: null,
      selected: null,
      payment: {},
      items: ["Summary", "Charges", "Repayment Schedule", "Transactions", "QR Code"],
    };
  },
  computed: {
    ...mapGetters({
      tenant: "tenant",
      partners: "partners",
      clientId: "clientId",
    }),
  },
  methods: {
    applyguarantor() {
      this.$router.push(`/accounts/${this.$route.params.id}/guarantors/apply`);
    },
    initiatePayment() {
      this.payment.loanId = this.account.accountNo;
      this.payment.clientId = this.clientId;
      console.log(this.payment);
      this.$store.dispatch("_initiatePayment", this.payment).then(() => {
        this.dialog = false;
      });
    },
  },
};
</script>
