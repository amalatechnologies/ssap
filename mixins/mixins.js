import Vue from "vue";
import { mapGetters } from "vuex";
import LoanChargeComponent from "@/components/charges/loan_charges.vue"
Vue.mixin({
  layout: "default",
  components: {
    'loan-charge-component': LoanChargeComponent
  },
  data: function () {
    return {
      mobileBreakPoint: 200,
      months: [
        "January", "February", "March",
        "April", "May", "June",
        "July", "August", "September",
        "October", "November", "December"
      ]
    };
  },
  methods: {
    currencyFormat(value) {
      if (value != null) {
        return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      }
    },
    capitalizeFirstLetter: function (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
  },
  computed: {
    isMdAndUp() {
      return this.$vuetify.breakpoint.mdAndUp;
    },
    ...mapGetters({
      clientId: "clientId",
    }),
  },
});
