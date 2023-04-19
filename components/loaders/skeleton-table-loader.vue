<template>
<v-card class="outlined" color="white" elevation="0">
  <v-container
    height="100%"
    width="100%"
    class="d-flex justify-center align-center"
    fluid
  >
    
      <v-skeleton-loader
        min-width="100%"
        v-bind="attrs"
        type="table-heading, table-thead,table-tbody, table-tfoot"
      ></v-skeleton-loader>
   
  </v-container>
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