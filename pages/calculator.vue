<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center" class="fill-height">

      <div class="primary" placehoder="Apply for Loan">Apply for Loan</div>
    </v-row>
    <v-row align="center" justify="center">

      <v-col class="d-flex" cols="12" sm="6">

        <p>
          NEW loan Application for Client A1 A1
        </p>
        <br>
        <p> Account number 000000131
        </p>
      </v-col>


    </v-row>


    <v-row align="center">
      <v-col class="d-flex" cols="12" sm="6">
        <v-select :items="items1" label="Select loan Product*"></v-select>
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col class="d-flex" cols="12" sm="6">
        <v-select :items="items" label="Purpose of loan*"></v-select>
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col class="d-flex" cols="12" sm="6">
        <v-text-field label="Principal Amount*"></v-text-field>
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col class="d-flex" cols="12" sm="6">
        <v-text-field label="Current income*"></v-text-field>
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col class="d-flex" cols="12" sm="6">
        <v-select :items="cr" label="currency*"></v-select>
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col class="d-flex" cols="12" sm="6">
        <p>currency*</p>
      </v-col>
      <v-col class="d-flex" cols="12" sm="6">
        <v-select :items="cr" label="select currency"></v-select>
      </v-col>
      <v-col class="d-flex" cols="12" sm="6">
        <p>Submission date*</p>
      </v-col>
      <v-col cols="12" lg="6">
        <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false" transition="scale-transition" offset-y
          max-width="290px" min-width="auto">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field v-model="dateFormatted" label="Date" hint="MM/DD/YYYY format" persistent-hint
              prepend-icon="mdi-calendar" v-bind="attrs" @blur="date = parseDate(dateFormatted)" v-on="on">
            </v-text-field>
          </template>
          <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
        </v-menu>
        <p>Date of submission: <strong>{{ date }}</strong></p>
      </v-col>
      <v-col class="d-flex" cols="12" sm="6">
        <p>Expected Dibursement date</p>
      </v-col>
      <v-col cols="12" lg="6">
        <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false" transition="scale-transition" offset-y
          max-width="290px" min-width="auto">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field v-model="dateFormatted" label="Date" hint="MM/DD/YYYY format" persistent-hint
              prepend-icon="mdi-calendar" v-bind="attrs" @blur="date = parseDate(dateFormatted)" v-on="on">
            </v-text-field>
          </template>
          <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
        </v-menu>
        <p>Expected Dibursement date: <strong>{{ date }}</strong></p>
      </v-col>
    </v-row>
    <div cols="12" sm="6" justify="center" class="text-center>">
      <v-btn class="text-center>" color="primary">SUBMIT LOAN</v-btn>
    </div>

  </v-container>

</template>

<script>
export default {
  data: () => ({


  }), data: vm => ({
    cr: ['Tanzania Shillings[TSH]', 'Kenya Shillings[KSH]', 'Uganda Shillings [UGX]', 'USD'], items: ['Agriculture', 'Manufacturing', 'SchoolFees', 'Construction'], items1: ['NBC Development Loan', 'Saccos', 'CRDB kilimo', 'TADB'],
    date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    dateFormatted: vm.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),
    menu1: false,
    menu2: false,
  }),

  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date)
    },
  },

  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date)
    },
  },

  methods: {
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    parseDate(date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
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

