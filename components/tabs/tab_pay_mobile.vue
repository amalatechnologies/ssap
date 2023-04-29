<template>
  <v-card tile>
    <v-card-title class="text-h5 blue--text font-weight-bold"> MOBILE PAY</v-card-title>

    <v-card-text class="mt-5">
      <v-row>
        <v-col cols="12">
          <v-autocomplete
            :items="partners"
            v-model="payment.provider"
            label="Select provider name"
            @focus="$store.dispatch('_getpartners')"
            item-text="partnerName"
            item-value="partnerName"
            dense
            class="mt-3"
            required
          >
            <template v-slot:item="data">
              <template v-if="typeof data.item !== 'object'">
                <v-list-item-content v-text="data.item.partnerName"></v-list-item-content>
              </template>
              <template v-else>
                <v-list-item-content>
                  <v-list-item-title v-html="data.item.partnerName"></v-list-item-title>
                  <v-list-item-subtitle>
                    {{ data.item.partnerName }} ({{ data.item.currency }})
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-img max-width="110" :src="data.item.logoUrl" />
                </v-list-item-action>
              </template>
            </template>
          </v-autocomplete>
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
      <v-btn color="primary" @click="$emit('close')"> Cancel </v-btn>
      <v-btn color="blue" dark @click="initiatePayment"> Initiate Payment </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: {
    account: {
      type: Object,
      default: null,
      required: true,
    },
  },
  data() {
    return {
      payment: {},
    };
  },
  computed: {
    ...mapGetters({
      partners: "partners",
      clientId: "clientId",
    }),
  },
  methods: {
    initiatePayment() {
      this.payment.loanId = this.account.accountNo;
      this.payment.clientId = this.clientId;
      this.payment.type = "mno";
      this.$store.dispatch("_initiatePayment", this.payment).then(() => {
        this.$emit("close");
      });
    },
  },
};
</script>
