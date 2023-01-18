<template>
  <v-container class="transparent fill-height" fluid>
    <v-row align="center" class="justify-center" justify="center" no-gutters>
      <v-col cols="12" class="d-flex justify-space-around">
        <v-flex xs6 class="d-flex align-center justify-end flex-column">
          <div class="font-weight-black">
            Amala Yangu web self-service application was created and maintained
            by
            <a href="https://singo.africa" target="_blank">Singo Africa </a>
            as a web application for
            <a
              style="color: blue; text-decoration: underline"
              href="https://amala.co.tz/products/amala-yangu/"
              target="_blank"
              >Amala yangu</a
            >
            self-service application for financial institution customers to
            access and manage their accounts informations e.g. Loans, Shares,
            Savings etc. <br />
            <br />
            Copyright &copy;
            {{ new Date().getFullYear() }}
          </div>
          <v-btn
            class="mt-4 px-4"
            color="primary"
            rounded
            small
            @click.stop="$router.go(-1)"
          >
            <v-icon small dense left color="white"
              >mdi-keyboard-backspace</v-icon
            >
            Click to go Back</v-btn
          >
        </v-flex>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="js">
export default {
  meta: {
    auth: {
      requiresAuth: false
    }
  },
  layout: "home",
  data: () => ({
    valid: false,
    show1: false,
    show2: true,
    show3: false,
    show4: false,
    payload:{
       password: "password",
       username: "demo",

    },
    image:"https://images.squarespace-cdn.com/content/v1/5608c2dae4b0ffbc0ff092a2/1462484735802-94M1A977HJJEL2THCD2Q/ke17ZwdGBToddI8pDm48kLl6r9ydDU0pEbLAVM93WoUUqsxRUqqbr1mOJYKfIPR7IxQp-SzSi0mUVxNxPLQ2a8ST-OHudl8xFkQoit3yJpm7Mythp_T-mtop-vrsUOmeInPi9iDjx9w8K4ZfjXt2dtBAdYz4rrMKLrjAsWFNRtjSprFKWBuEhUbdsZxltHXcCjLISwBs8eEdxAxTptZAUg/Medical-physician-doctor-hands.png?format=2500w",
    rules: {
      required: value => !!value || "Required.",
      min: v => v.length >= 8 || "Min 8 characters",
      emailMatch: () => "The email and password you entered don't match"
    }
  }),
  computed: {

  },
  methods: {
    login() {

    this.$store.dispatch("_authenticate_then_login",  this.payload)
    },
    nativateToHere(id) {
      this.$router.push('/' + id);
    },
  }
};
</script>
