<template>
  <v-app>
    <v-main style="background-color: white">
      <nuxt />
    </v-main>
    <footer-component v-if="isMdAndUp"></footer-component>
  </v-app>
</template>

<script>
import FooterComponent from "@/components/footers/footer-index.vue";
export default {
  components: {
    "footer-component": FooterComponent,
  },
  data() {
    return {
      locales: ["English", "Kiswahili"],
      socials: [
        {
          icon: "mdi-twitter",
          link: "https://twitter.com/ospicapp?ref_src=twsrc%5Etfw",
        },
        {
          icon: "mdi-facebook",
          link: null,
        },
        { icon: "mdi-linkedin", link: null },
        { icon: "mdi-instagram", link: null },
      ],
    };
  },
};
</script>
