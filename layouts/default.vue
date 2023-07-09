<template>
  <v-app class="app" style="background: rgba(0, 0, 0, 0)">
    <!--NAVIGATION DRAWER-->
    <v-navigation-drawer
      v-model="drawer"
      mini-variant.sync="mini"
      overlay-color="primary"
      app
      clipped
      width="270"
      height="100%"
      elevation="0"
    >
      <v-list nav subheader tile class="mt-0 pa-0 py-0">
        <v-card
          elevation="0"
          color="primary"
          v-if="profile"
          class="mx-auto"
          min-height="150"
          tile
        >
          <v-list-item color="rgba(0, 0, 0, .4)" dark>
            <v-list-item-content class="mt-8">
              <v-list-item-title class="text-h6">
                <nuxt-link to="/me">
                  <v-avatar color="primary darken-2" size="62">
                    <span v-if="profile.displayName" class="white--text text-h5">{{
                      profile.displayName.charAt(0)
                    }}</span>
                  </v-avatar>
                </nuxt-link>
              </v-list-item-title>
              <v-list-item-subtitle class="font-weight-bold white--text">{{
                profile.displayName
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>

        <div v-for="(setting, index) in settings" :key="index">
          <v-list-item @click="navigateToHere(setting.to)">
            <v-list-item-title class="font-weight-light">
              <v-icon
                slot="prependIcon"
                v-html="setting.icon"
                :medium="!showback"
                :small="showback"
                color=" primary"
                class="ml-1 mr-2"
              ></v-icon>
              <v-badge
                :content="index === 7 ? requests : ''"
                :value="index === 7 ? requests : ''"
                color="green"
              >
                {{ $t(setting.title) }}
              </v-badge>
            </v-list-item-title>
          </v-list-item>

          <v-divider v-if="index == 7" class="py-2"></v-divider>
        </div>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar clipped-left flat fixed app color="primary">
      <v-toolbar-title>
        <v-avatar @click.stop="drawer = !drawer" color="primary " size="45">
          <img src="icon.png" alt="Amala Yangu" />
        </v-avatar>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-menu
        max-width="600"
        offset-y
        v-if="notifications"
        content-class="elevation-1 mt-4 badge"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-badge
            :content="notificationnumber"
            class="mr-8"
            color="blue lighten-2"
            overlap
          >
            <v-icon v-bind="attrs" v-on="on" color="white" medium> mdi-bell </v-icon>
          </v-badge>
        </template>
        <v-list color="white" dense tile>
          <v-timeline v-if="notifications" align-top dense>
            <v-timeline-item
              color="primary"
              small
              v-for="(n, index) in notifications.splice(0, 5)"
              :key="index"
              fill-dot
              class="pt-0 mt-0"
              icon="mdi-bell-alert"
            >
              <v-list-item dense class="ma-0 pl-0" :key="index">
                <v-list-item-content>
                  <v-list-item-title class="blue--text">{{
                    n.content
                  }}</v-list-item-title>
                  <v-list-item-subtitle class="font-weight-normal text-caption">
                    <span class="d-inline-block blue--text text-caption">{{
                      n.createdAt
                    }}</span>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
            </v-timeline-item>
            <v-timeline-item small color="blue">
              <v-list-item to="/notifications" dense class="ma-0 pl-0">
                <v-list-item-content>
                  <v-list-item-title class="blue--text">View All</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-timeline-item>
          </v-timeline>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <v-container style="background-color: white" class="ma-0 pa-0" fluid>
        <nuxt />
      </v-container>
    </v-main>
    <footer-component> </footer-component>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import FooterComponent from "@/components/footers/footer-home.vue";
export default {
  components: {
    "footer-component": FooterComponent,
  },
  data() {
    return {
      clipped: false,
      mini: true,
      drawer: true,
      fixed: false,
      picture: true,
      dark: false,
      sync: false,
      interval: {},
      value: 0,
      overlay: false,
      zIndex: 0,
      showback: false,
      menulist: 0,
      username: "Abasi Abasi Mwinyi Mkuu",
      image: 0,

      titles: {
        title: "Ospic",
      },
      settings: [
        {
          title: "label.menu.home",
          icon: "mdi-bank",
          to: "/",
        },
        {
          title: "label.menu.accounts",
          icon: "mdi-wallet",
          to: "/accounts",
        },
        {
          title: "label.menu.recenttransactions",
          icon: "mdi-label",
          to: "/transactions",
        },
        {
          title: "label.menu.charges",
          icon: "mdi-currency-rub",
          to: "/charges",
        },
        {
          title: "label.menu.calculator",
          icon: "mdi-wallet-plus",
          to: "/calculator",
        },
        {
          title: "label.menu.thridpartytransfer",
          icon: "mdi-swap-horizontal",
          to: "/transfer",
        },
        {
          title: "label.menu.beneficiaries",
          icon: "mdi-account-supervisor",
          to: "/beneficiaries",
        },
        {
          title: "label.menu.guaranteerequests",
          icon: "mdi-shield-account-variant",
          to: "/guarantors",
        },
        {
          title: "label.menu.settings",
          icon: "mdi-cog",
          to: "/settings",
        },
        {
          title: "label.menu.about",
          icon: "mdi-information",
          to: "/about",
        },
        {
          title: "label.menu.help",
          icon: "mdi-help-rhombus",
          to: "/help",
        },
        {
          title: "label.menu.share",
          icon: "mdi-share-variant",
          to: "/share",
        },
        {
          title: "label.menu.logout",
          icon: "mdi-logout",
          to: "/logout",
        },
      ],
      actions: [
        // { title: "View profile", icon: "mdi-account-circle" },
        { title: "Settings", icon: "mdi-cog" },
        { title: "Help", icon: "mdi-help" },
        { title: "Logout", icon: "mdi-logout-variant" },
      ],
      select: { locale: "English", lang: "en" },
      locales: [
        {
          locale: "English",
          lang: "en",
        },
        {
          locale: "Kiswahili",
          lang: "sw",
        },
        {
          locale: "French",
          lang: "fr",
        },
        {
          locale: "Arab",
          lang: "ar",
        },
      ],
      miniVariant: false,
      right: true,
      shaped: true,
      collapseOnScroll: true,
      rightDrawer: false,
      year: new Date().getFullYear(),
      userdata: {
        username: "Elirehema Paul",
      },
      menus: [
        { title: "View profile", icon: "mdi-account", value: 1 },
        { title: "Logout", icon: "mdi-power", value: 2 },
      ],
    };
  },
  created() {
    this.image = this.image++;
  },
  mounted: function () {
    this.$nextTick(function () {
      window.setInterval(() => {
        console.log("Notifications");
        this.$store.dispatch("_getnotifications");
        //this.$store.dispatch("_getnewnotifications");
      }, 20000);
    });
  },

  methods: {
    selectionAction: function (i) {
      switch (i.value) {
        case 1:
          this.navigateToHere("me");
          break;

        case 2:
          this.logoutsession();
          break;
      }
    },
    toggledrawer: function () {
      this.drawer = !this.drawer;
    },
    logoutsession: function () {
      this.$store.dispatch("_logoutsession");
      this.drawer = !this.drawer;
    },
    changemode: function () {
      this.dark = !this.dark;
      this.$vuetify.theme.dark = this.dark;
    },
    navigateBack: function () {
      this.settings = this.defaultmenu;
      this.showback = false;
    },
    navigateToHere(id) {
      if (id === "/logout") {
        this.logoutsession();
      } else {
        this.$router.push(id);
      }
    },
    toggle(mode) {
      if (`${mode}` === "true") {
        this.$vuetify.theme.dark = true;
        this.$store.dispatch("change_to_dark");
        document.body.style.background = "#1d3333";
        this.dark = true;
      } else {
        this.$store.dispatch("change_to_light");
        this.$vuetify.theme.dark = false;
        this.dark = false;
        document.body.style.backgroundImage =
          "url(https://cdn.hipwallpaper.com/i/50/79/MSsZP2.jpg)";
      }
    },
    changeLanguage(lang) {
      this.$i18n.locale = lang;
    },
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },

  computed: {
    ...mapGetters({
      profile: "client",
      notifications: "notifications",
      requests: "guarantorrequestsize",
      notificationnumber: "totalNotifications",
    }),
  },
};
</script>
