<template>
  <v-card flat tile fluid>
    <v-container class="d-flex align-center justify-space-between px-3 py-5">
      <p class="pt-3">Contact Us</p>
      <div v-if="office">
        <p class="pa-0 ma-0">{{ office.phone }}</p>
        <p>{{ office.email }}</p>
      </div>
      <div v-else>
        <p class="pa-0 ma-0">+255 737 789 207</p>
        <p>info@amala.co.tz</p>
      </div>
    </v-container>
  </v-card>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {},
  created() {
    this.$store.dispatch("_getofficecontacts");
  },
  computed: {
    ...mapGetters({
      office: "contacts",
    }),
  },
};
</script>
