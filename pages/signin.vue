<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" class="justify-center" justify="center" no-gutters>
      <v-col cols="12" class="d-flex justify-space-around">
        <v-card class="elevation-12" width="400">
          <v-toolbar prominent :src="image" flat>
            <v-toolbar-title color="white" dense>
              <img
                height="100px"
                width="100"
                class="mt-6"
                src="../assets/images/logo.png"
                alt=""
              />
            </v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form
              @submit.prevent="login"
              id="check-login-form"
              class="mt-3"
              v-model="valid"
            >
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12">
                    <v-text-field
                      rounded
                      label="Username"
                      placeholder="e.g. demo"
                      v-model="payload.username"
                      prepend-inner-icon="person"
                      :rules="[rules.required]"
                      value="user"
                      required
                      outlined
                    >
                    </v-text-field>

                    <v-text-field
                      rounded
                      v-model="payload.password"
                      prepend-inner-icon="lock"
                      :append-icon="show1 ? 'visibility' : 'visibility_off'"
                      :rules="[rules.required, rules.min]"
                      :type="show1 ? 'text' : 'password'"
                      name="input-10-1"
                      label="Password"
                      placeholder="e.g ********"
                      hint="At least 8 characters"
                      counter
                      @click:append="show1 = !show1"
                      required
                      outlined
                    >
                    </v-text-field>

                    <v-chip
                      v-if="!tenant"
                      class="d-flex justify-center blue--text text-h6"
                      @click="tenant = !tenant"
                    >
                      Change default Tenant
                    </v-chip>
                    <v-text-field
                      v-else
                      label="Chnage default Tenant Identifier"
                      placeholder="e.g. default"
                      v-model="payload.tenant"
                      prepend-inner-icon="mdi-key-chain"
                      :rules="[rules.required]"
                      required
                      clearable
                      @click:clear="cleartenant"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-row no-gutters>
              <v-col cols="12">
                <v-btn
                  block
                  large
                  rounded
                  color="primary"
                  type="submit"
                  :disabled="!valid"
                  form="check-login-form"
                >
                  Login
                </v-btn>
              </v-col>
              <v-col cols="12" class="d-flex justify-center py-4">
                <v-btn
                  block
                  text
                  rounded
                  small
                  class="blue--text text-normal"
                  @click="$store.dispatch('_updatetenant', 'demo')"
                >
                  Click Here to reset</v-btn
                >
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="js">
import { mapGetters } from "vuex"
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
    tenant: false,
    payload: {
      password: "Password1!",
      username: "selfservice",
      tenant: 'demo'
    },
    image: "https://vicsguide.com/wp-content/uploads/2021/07/Best-loan-apps.jpg",
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
      this.$store.dispatch("_authenticate", this.payload)
    },
    nativateToHere(id) {
      this.$router.push('/' + id);
    },
    cleartenant() {
      this.payload.tenant = 'demo';
      this.tenant = !this.tenant;
    }
  },

  beforeMount() {
    if (!this.isAuthenticated) {
      this.$router.push("/");
    }
  },
  computed: {
    ...mapGetters({
      isAuthenticated: "isAuthenticated"
    })
  }
};
</script>

