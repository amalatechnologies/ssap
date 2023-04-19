<template>
      <v-skeleton-loader
          v-bind="attrs"
          type="table-thead,table-tbody"
        ></v-skeleton-loader>
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