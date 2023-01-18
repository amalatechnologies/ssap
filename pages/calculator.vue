<template>
  <v-container v-if="template == null" class="fill-height">
    <v-row align="center" justify="center" class="fill-height">
      <v-progress-circular :size="50" color="primary" indeterminate>
        <v-icon>mdi-cloud</v-icon>
      </v-progress-circular>
    </v-row>
  </v-container>
  <v-container v-else>
    <v-row justify="center">
      <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
        class="px-3 pt-3"
      >
        <repayment-schedule
          :rs="repaymentSchedule"
          :charges="charges"
          @close="dialog = !dialog"
        ></repayment-schedule>
      </v-dialog>
    </v-row>
    <v-container>
      <v-row>
        <v-col class="d-flex" cols="12" sm="6">
          <v-select
            :items="template.productOptions"
            v-model="calculation.productId"
            label="Select loan Product"
            @change="productchange()"
            item-text="name"
            item-value="id"
            dense
            class="mt-3"
            required
          ></v-select>
        </v-col>
        <v-col v-if="producttemplate != null" class="d-flex" cols="12" sm="6">
          <v-select
            :items="producttemplate.loanPurposeOptions"
            v-model="calculation.loanPurposeId"
            label="Loan purpose"
            item-text="name"
            item-value="id"
            dense
            required
          ></v-select>
        </v-col>

        <v-col v-if="producttemplate != null" class="d-flex" cols="12" sm="6">
          <v-text-field
            v-model="calculation.principal"
            label="Principal*"
            hint="Principal"
            required
          ></v-text-field>
        </v-col>
        <v-col v-if="producttemplate != null" class="d-flex" cols="12" sm="6">
          <v-text-field
            v-model="calculation.clientCurrentIncome"
            label="Client current Income"
            hint="Client current Income"
            required
          ></v-text-field>
        </v-col>
        <v-col v-if="producttemplate != null" class="d-flex" cols="12" sm="">
          <v-text-field
            v-model="currency"
            label="Currency*"
            hint="Currency"
            required
            readonly
            disabled
          ></v-text-field>
        </v-col>

        <v-col v-if="producttemplate != null" class="d-flex" cols="12" sm="6">
          <v-simple-table light>
            <template v-slot:default>
              <tbody>
                <tr>
                  <td>Currency</td>
                  <td>
                    {{ producttemplate.currency.name }}
                    [{{ producttemplate.currency.code }}]
                  </td>
                </tr>
                <tr>
                  <td>Submission Date</td>
                  <td>
                    {{
                      producttemplate.timeline.expectedDisbursementDate
                        | simpledateformat
                    }}
                  </td>
                </tr>
                <tr>
                  <td>Expected Disbursment Date</td>
                  <td>
                    {{
                      producttemplate.timeline.expectedDisbursementDate
                        | simpledateformat
                    }}
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
        <v-col v-if="show" class="d-flex" cols="12" sm="12">
          <p class="text-outline red--text font-weight-bold">
            Under Development
          </p>
        </v-col>

        <v-col v-if="producttemplate != null" class="d-flex" cols="12" sm="6">
          <v-btn color="primary" block @click="calculate()">Calculate</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
import RepaymentSchedule from "@/components/calculator/repayment.vue";
export default {
  components: {
    "repayment-schedule": RepaymentSchedule,
  },
  data() {
    return {
      show: false,
      showearning: false,
      showdeductions: false,
      dialog: false,

      repaymentSchedule: null,
      producttemplate: null,
      activePicker: null,
      submittedondate: "",
      sumittedonmenu: false,
      expecteddisbursementdate: null,
      expecteddisbursementmenu: false,
      currency: "",
      charges: [],
      calculation: {
        clientId: 0,
        productId: 0,
        disbursementData: [],
        principal: 0,
        loanTermFrequency: 0,
        loanTermFrequencyType: 0,
        numberOfRepayments: 0,
        repaymentEvery: 0,
        repaymentFrequencyType: 0,
        interestRatePerPeriod: 0,
        amortizationType: 0,
        isEqualAmortization: false,
        interestType: 0,
        interestCalculationPeriodType: 0,
        allowPartialPeriodInterestCalcualtion: false,
        transactionProcessingStrategyId: 0,
        loanPurposeId: 0,
        clientCurrentIncome: "",

        charges: [],
        locale: "en",
        dateFormat: "dd MMMM yyyy",
        loanType: "individual",
        expectedDisbursementDate: "",
        submittedOnDate: "",
      },
    };
  },

  methods: {
    async productchange() {
      await this.$api
        .$get("loans/template", {
          params: {
            clientId: this.clientId,
            templateType: "individual",
            productId: this.calculation.productId,
          },
        })
        .then((response) => {
          this.producttemplate = response;
          var charges = [];
          if (response.charges.length > 0) {
            this.charges = response.charges;
            response.charges.forEach((c) => {
              var change = {
                chargeId: c.chargeId,
                amount: c.amount,
                dueDate: this.submittedondate,
              };
              charges.push(change);
            });
          }
          this.calculation.clientId = this.clientId;
          this.calculation.productId = response.product.id;
          if (response.fundOptions) {
            this.calculation.fundId = response.fundOptions[0].id;
          }
          this.calculation.principal = response.approvedPrincipal;
          this.calculation.loanTermFrequency = response.termFrequency;
          this.calculation.loanTermFrequencyType =
            response.termPeriodFrequencyType.id;
          this.calculation.numberOfRepayments = response.numberOfRepayments;
          this.calculation.repaymentEvery = response.repaymentEvery;
          this.calculation.repaymentFrequencyType =
            response.repaymentFrequencyType.id;
          this.calculation.interestRatePerPeriod =
            response.interestRatePerPeriod;
          this.calculation.amortizationType = response.amortizationType.id;
          this.calculation.isEqualAmortization = response.isEqualAmortization;
          this.calculation.interestType = response.interestType.id;
          this.calculation.interestCalculationPeriodType =
            response.interestCalculationPeriodType.id;
          this.calculation.allowPartialPeriodInterestCalcualtion =
            response.allowPartialPeriodInterestCalcualtion;
          this.calculation.transactionProcessingStrategyId =
            response.transactionProcessingStrategyId;
          this.calculation.loanPurposeId = response.loanPurposeOptions[0].id;
          this.calculation.charges = charges;
          this.calculation.submittedOnDate = this.expecteddisbursementdate;
          this.calculation.expectedDisbursementDate =
            this.expecteddisbursementdate;

          this.currency =
            response.currency.name + ` [${response.currency.code}]`;
          this.calculation.principal = response.principal;
        });
    },
    async calculate() {
      await this.$api
        .$post(`loans`, this.calculation, {
          params: { command: "calculateLoanSchedule" },
        })
        .then((response) => {
          this.repaymentSchedule = response;
          this.dialog = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    savesumittedondate(date) {
      this.$refs.sumittedonmenu.save(date);
    },
    expecteddisbursementdate(date) {
      this.$refs.expecteddisbursementmenu.save(date);
    },
  },
  created() {
    var d = new Date(Date.now() - new Date().getTimezoneOffset() * 60000);
    var date =
      d.getDate() + " " + this.months[d.getMonth() + 1] + " " + d.getFullYear();
    this.submittedondate = date;
    this.expecteddisbursementdate = date;
    this.$store.dispatch("_getloancalculatortemplate", this.clientId);
  },
  computed: {
    ...mapGetters({
      template: "loancalculatortemplate",
    }),
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
