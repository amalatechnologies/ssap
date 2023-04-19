<template>
        <v-card outlined>
          <v-skeleton-loader
          v-bind="attrs" width="100%"
          type="table-heading,table-heading"
        ></v-skeleton-loader>
        </v-card>
</template>
<script>
  export default {
    data: () => ({
      attrs: {
        class: '',
        boilerplate: true,
        elevation: 0,
      },
    }),
  }
</script>