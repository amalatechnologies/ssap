<template>
  <v-card tile>
    <v-card-title class="text-h5 blue--text font-weight-bold"> BANK PAY </v-card-title>

    <v-card-text class="mt-5">
      <v-row>
        <v-col cols="12">
          <v-autocomplete
            :items="banks"
            v-model="payment.provider"
            label="Select a Bank"
            item-text="name"
            item-value="value"
            dense
            class="mt-3"
            required
          >
            <template v-slot:item="data">
              <template v-if="typeof data.item !== 'object'">
                <v-list-item-content v-text="data.item.name"></v-list-item-content>
              </template>
              <template v-else>
                <v-list-item-content>
                  <v-list-item-title v-html="data.item.name"></v-list-item-title>
                  <v-list-item-subtitle>
                    {{ data.item.subtitle }}
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-img max-width="80" max-height="50" :src="data.item.logo" />
                </v-list-item-action>
              </template>
            </template>
          </v-autocomplete>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="payment.merchantAccountNo"
            label="Bank Account No*"
            hint="Bank Account No"
            placeholder="e.g 000000000000005"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="payment.password"
            label="One time password*"
            hint="One time password"
            placeholder="e.g 1234"
            required
          ></v-text-field>
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
      <v-btn color="warning" @click="$emit('close')"> Cancel </v-btn>
      <v-btn color="blue darken-1" dark @click="initiatePayment"> Make Payment </v-btn>
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
      providers: ["NMB", "CRDB"],
    };
  },
  computed: {
    ...mapGetters({
      tenant: "tenant",
      clientId: "clientId",
    }),
  },
  methods: {
    initiatePayment() {
      if (this.tenant === "demo1") {
        this.payment.loanId = this.account.accountNo;
        this.payment.clientId = this.clientId;
        this.payment.type = "bank";
        this.$store.dispatch("_initiatePayment", this.payment).then(() => {
          this.$emit("close");
        });
      } else {
        this.$emit("close");
        this.$toast.error(
          "Sorry!, \n Bank payment is not allowed in your organization.\nContact your organization to  allow the service"
        );
      }
    },
  },
};
</script>
