export default  {
  components: {
    "loan-charge-component": () => import('~/components/charges/loan_charges.vue'),
    "guarantor-request":()=>import('~/components/guarantors/guarantor_request.vue'),
    "guarantor-details": ()=>import('~/components/guarantors/guarantor-details.vue'),
    "skeleton-table-loader": () =>import("~/components/loaders/skeleton-table-loader.vue"),
    "skeleton-datepicker-loader": () => import("~/components/loaders/skeleton-date-picker.vue"),
    "skeleton-summary-card": () =>import("~/components/loaders/skeleton-summary-card.vue"),
  },
  data () {
    return {
      mobileBreakPoint: 200,
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      banks: [
        {
          name: "CRDB Bank",
          subtitle:"CRDB Bank Plc",
          value: "CRDB",
          logo: "/crdb.png",
        },
        {
          name: "NMB Bank",
          subtitle:"NMB Bank Plc",
          value: "NMB",
          logo: "/nmb.png",
        },
      ],
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
    clientId() {
      return this.$store.getters.clientId
    }
  },
}
