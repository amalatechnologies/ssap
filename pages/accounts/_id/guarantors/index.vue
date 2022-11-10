<template>
  <v-container v-if="guarantors == null" class="fill-height">
    <v-row align="center" justify="center" class="fill-height">
      <v-progress-circular :size="50" color="primary" indeterminate>
        <v-icon>mdi-cloud</v-icon>
      </v-progress-circular>
    </v-row>
  </v-container>
  <v-container v-else>
    <v-list three-line>
      <v-list-item class="ma-0 pa-0" v-for="(guarantor, index) in guarantors" :key="index">
        <v-list-item-content>
          <guarantor-details :guarantor="guarantor"></guarantor-details>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-container>
</template>
</template>
<script>
export default {
  data() {
    return {
      guarantors: [],
    }
  },
  created() {
    this.getloanguarantors()
  },
  methods: {
    async getloanguarantors() {
      await this.$api
        .$get(`loans/${this.$route.params.id}/guarantors`)
        .then((response) => {
          this.guarantors = response;
        })
        .catch((error) => { });
    },
  }
}
</script>