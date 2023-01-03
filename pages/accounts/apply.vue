<template>
  <v-container v-if="template == null" class="fill-height">
    <v-row align="center" justify="center" class="fill-height">
      <v-progress-circular :size="50" color="primary" indeterminate>
        <v-icon>mdi-cloud</v-icon>
      </v-progress-circular>
    </v-row>
  </v-container>
  <v-container v-else>
    <v-container>
      <v-row>
        <v-col class="d-flex" cols="12" sm="6">
          <v-select
            :items="template.productOptions"
            v-model="loanapplication.productId"
            label="Select loan Product"
            @change="productchange()"
            item-text="name"
            item-value="id"
            dense
            required
          ></v-select>
        </v-col>
        <v-col v-if="producttemplate != null" class="d-flex" cols="12" sm="6">
          <v-select
            :items="producttemplate.loanPurposeOptions"
            v-model="loanapplication.loanPurposeId"
            label="Loan purpose"
            item-text="name"
            item-value="id"
            dense
            required
          ></v-select>
        </v-col>
        <v-col v-if="producttemplate != null" class="d-flex" cols="12" sm="6">
          <v-text-field
            v-model="loanapplication.clientCurrentIncome"
            label="Client current Income"
            hint="Client current Income"
            required
          ></v-text-field>
        </v-col>
        <v-col v-if="producttemplate != null" class="d-flex" cols="12" sm="6">
          <v-text-field
            v-model="loanapplication.principal"
            label="Principle*"
            hint="Principal"
            required
          ></v-text-field>
        </v-col>
        <v-col v-if="producttemplate != null" class="d-flex" cols="12" sm="6">
          <v-text-field
            v-model="currency"
            label="Currency*"
            hint="Currency"
            required
          ></v-text-field>
        </v-col>

        <!--<v-col v-if="producttemplate != null" class="d-flex" cols="12" sm="6">
          <v-menu
            ref="sumittedonmenu"
            v-model="sumittedonmenu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="submittedondate"
                label="Submitted on Date*"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="submittedondate"
              :active-picker.sync="activePicker"
              :max="
                new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                  .toISOString()
                  .substr(0, 10)
              "
              min="1950-01-01"
              @change="save"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col v-if="producttemplate != null" class="d-flex" cols="12" sm="6">
          <v-menu
            ref="expecteddisbursementmenu"
            v-model="expecteddisbursementmenu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="expecteddisbursementdate"
                label="Expected Disbursment date*"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="expecteddisbursementdate"
              :active-picker.sync="activePicker"
              :max="
                new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                  .toISOString()
                  .substr(0, 10)
              "
              min="1950-01-01"
              @change="save"
            ></v-date-picker>
          </v-menu>
        </v-col>-->
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
                  <td>Eexpected Disbursment Date</td>
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
        <v-col v-if="producttemplate != null" class="d-flex" cols="12" sm="6">
          <v-btn color="primary" block @click="submitLoanApplication"
            >Submit Loan</v-btn
          ></v-col
        >
      </v-row>
    </v-container>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      producttemplate: null,
      activePicker: null,
      submittedondate: null,
      sumittedonmenu: false,
      expecteddisbursementdate: null,
      expecteddisbursementmenu: false,
      deductions: {
        psssf: 0,
        dowuta: 0,
        other: 0,
        bank: 0,
        rent: 0,
        bcs: 0,
        paye: 0,
        bcsloan: 0,
      },
      earnings: {
        hardship: 0,
        salary: 0,
        transport: 0,
      },
      repaymentSchedule: null,
      producttemplate: null,
      activePicker: null,
      submittedondate: "",
      sumittedonmenu: false,
      expecteddisbursementdate: null,
      expecteddisbursementmenu: false,
      currency: "",
      charges: [],
      loanapplication: {
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
    loadtemplate: function () {
      this.$store.dispatch("_getloanapplicationtemplate", this.clientId);
    },
    async productchange() {
      await this.$axios
        .$get("/api/loans/template", {
          params: {
            clientId: this.clientId,
            templateType: "individual",
            productId: this.loanapplication.productId,
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
          /**this.loanapplication.currency =
            response.currency.name + ` [${response.currency.code}]`;

          this.loanapplication.principal = response.principal;
          **/
          this.loanapplication.clientId = this.clientId;
          this.loanapplication.productId = response.product.id;
          if (response.fundOptions) {
            this.loanapplication.fundId = response.fundOptions[0].id;
          }
          this.loanapplication.principal = response.approvedPrincipal;
          this.loanapplication.loanTermFrequency = response.termFrequency;
          this.loanapplication.loanTermFrequencyType =
            response.termPeriodFrequencyType.id;
          this.loanapplication.numberOfRepayments = response.numberOfRepayments;
          this.loanapplication.repaymentEvery = response.repaymentEvery;
          this.loanapplication.repaymentFrequencyType =
            response.repaymentFrequencyType.id;
          this.loanapplication.interestRatePerPeriod =
            response.interestRatePerPeriod;
          this.loanapplication.amortizationType = response.amortizationType.id;
          this.loanapplication.isEqualAmortization =
            response.isEqualAmortization;
          this.loanapplication.interestType = response.interestType.id;
          this.loanapplication.interestCalculationPeriodType =
            response.interestCalculationPeriodType.id;
          this.loanapplication.allowPartialPeriodInterestCalcualtion =
            response.allowPartialPeriodInterestCalcualtion;
          this.loanapplication.transactionProcessingStrategyId =
            response.transactionProcessingStrategyId;
          this.loanapplication.loanPurposeId =
            response.loanPurposeOptions[0].id;
          this.loanapplication.charges = charges;
          this.loanapplication.submittedOnDate = this.expecteddisbursementdate;
          this.loanapplication.expectedDisbursementDate =
            this.expecteddisbursementdate;

          this.currency =
            response.currency.name + ` [${response.currency.code}]`;
          this.loanapplication.principal = response.principal;
        });
    },
    savesumittedondate(date) {
      this.$refs.sumittedonmenu.save(date);
    },
    expecteddisbursementdate(date) {
      this.$refs.expecteddisbursementmenu.save(date);
    },
    submitLoanApplication: function () {
      console.log(this.loanapplication);
      this.$store.dispatch("_applyloan", this.loanapplication);
    },
  },
  created() {
    this.loadtemplate();
    var d = new Date(Date.now() - new Date().getTimezoneOffset() * 60000);
    var date =
      d.getDate() + " " + this.months[d.getMonth()] + " " + d.getFullYear();
    this.submittedondate = date;
    this.expecteddisbursementdate = date;
  },
  watch: {
    sumittedonmenu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
    expecteddisbursementmenu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
  },
  computed: {
    ...mapGetters({
      template: "loantemplate",
    }),
  },
};
</script>
