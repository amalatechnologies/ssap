<template>
  <v-container class="ma-0 pa-0" fluid>
    <v-container fluid class="ma-0 pa-0">
      <v-card tile flat>
        <v-toolbar color="primary" tile dark flat>
          <v-toolbar-title>
            <v-avatar color="primary " size="36">
              <span class="white--text font-weight-bold overline" @click.stop="$router.go(-1)">
                <v-icon large color="white">mdi-keyboard-backspace</v-icon>
              </span>
            </v-avatar>
          </v-toolbar-title>
          <v-toolbar-title class="white--text">
            &nbsp; &nbsp; Settings</v-toolbar-title>
        </v-toolbar>
        <v-list dense>
          <p class="px-3">Accounts</p>
          <v-list-item two-lin class="py-0 my-0" dense two-line>
            <v-list-item-content>
              <v-list-item-title>Change Password</v-list-item-title>
              <v-list-item-subtitle class="text-body-2 font-weight-normal mt-1">Change your account password
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-lin class="py-0 my-0" dense two-line>
            <v-list-item-content>
              <v-list-item-title>Change Passcode</v-list-item-title>
              <v-list-item-subtitle class="text-body-2 font-weight-normal mt-1">Change app passcode
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <p class="pa-3">Others</p>
          <v-list-item two-lin class="py-0 my-0" dense two-line>
            <v-list-item-content>
              <v-list-item-title>Language</v-list-item-title>
              <v-list-item-subtitle class="text-body-2 font-weight-normal mt-1">Choose language
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-dialog v-model="dialog" transition="dialog-bottom-transition" width="500">
            <template v-slot:activator="{ on, attrs }">
              <v-list-item v-bind="attrs" v-on="on" two-lin class="py-0 my-0" dense two-line>
                <v-list-item-content>
                  <v-list-item-title>Update Endpoint</v-list-item-title>
                  <v-list-item-subtitle class="text-body-2 font-weight-normal mt-1">Click here to change your endpoint
                    configurations
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>

            <v-card>
              <v-card-title class="text-h5 primary">
                Update Endpoint
              </v-card-title>

              <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field v-model="settings.url" :rules="[(v) => !!v || 'Field is required']" label="Base URL"
                    hint="Enter the Base URL" required readonly></v-text-field>

                  <v-text-field v-model="settings.tenant" :rules="tenantrules" label="Tenant" hint="Enter tenant name"
                    required></v-text-field>
                </v-form>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue lighten-1" @click="dialog = !dialog">
                  Ignore
                </v-btn>
                <v-btn color="primary" @click="submit"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-list>
      </v-card>
    </v-container>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  layout: "views",
  data() {
    return {
      dialog: false,
      valid: true,
      settings: {},
      tenantrules: [
        (v) => !!v || "Tenant is required",
        (v) =>
          (v && v.length >= 3) || "Name must be not less than 3 characters",
      ],
    };
  },
  created() {
    var tenant = localStorage.getItem("tenant");
    this.settings.url = "https://demo.amala.app";
    this.settings.tenant = tenant;
  },
  methods: {
    submit: function () {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("_updatetenant", this.settings.tenant);
        this.dialog = false;
        this.$forceUpdate();
      }
    },
  },
  computed: {
    ...mapGetters({
      tenant: 'tenant'
    })
  },
};
</script>
