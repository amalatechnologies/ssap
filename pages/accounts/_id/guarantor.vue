<template>
  <v-container>
    <v-card flat elevation-1>
      <v-toolbar color="primary" dark>

        <v-toolbar-title>Request Guarantor</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-shield-account-variant</v-icon>
        </v-btn>
      </v-toolbar>
      <v-container fluid>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row dense>
            <v-col cols="12" sm="12" md="4">
              <v-text-field :rules="rules" v-model="guarantor.amount" hint="How much do you want from guarantor"
                label="Guarantor Amount">
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="4">
              <v-text-field :rules="rules" v-model.number="guarantor.entityId"
                hint="Guarantor id can be found in client profile" label="Guarantor ID">
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="4">
              <v-text-field :rules="rules" v-model.number="guarantor.savingsId"
                hint="Saving account numerical value e.g 302" label="Guarantor Saving Account ID">
              </v-text-field>
            </v-col>
          </v-row>
        </v-form>
        <v-row class="d-flex justify-space-between">
          <v-col cols="6">
            <v-btn color="warning" class="mt-8" @click="$router.go(-1)" block>CANCEL</v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn color="primary" class="mt-8" @click="submitguarantor()" block>Submit</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      valid: true,
      rules: [v => !!v || 'Field is required'],
      guarantor: {
        guarantorTypeId: 1,
        amount: "",
        entityId: 0,
        clientRelationshipTypeId: 9,
        savingsId: 0,
        locale: "en",
        fromClient: true,
      }
    }
  },
  methods: {
    submitguarantor() {
      if (this.$refs.form.validate()) {
        let payload = {
          loanId: this.$route.params.id,
          data: this.guarantor
        }
        this.$store.dispatch("_applyguarantor", payload)
      }
    }
  },
}
</script>