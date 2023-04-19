<template>
  <v-container>
    <v-list subheader two-line>
      <v-subheader>
        <v-list-item class="mt-2">
          <v-list-item-content>
            <v-list-item-title> LOAN DOCUMENTS </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-progress-circular
              v-if="loading"
              indeterminate
              color="grey lighten-1"
            ></v-progress-circular>
          </v-list-item-action>
        </v-list-item>
      </v-subheader>

      <v-card v-for="doc in documents" :key="doc.id" class="mt-2 pa-2" elevation="1">
        <v-list-item>
          <v-list-item-avatar>
            <v-icon v-if="doc.type.split('/')[0] === 'image'" class="primary" dark>
              mdi-image
            </v-icon>
            <v-icon v-else class="blue lighten-1" dark> mdi-file-document </v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-text="doc.name"></v-list-item-title>

            <v-list-item-subtitle v-text="doc.description"></v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn fab small elevation="1" @click="deleteloanaccountdocument(doc)">
              <v-icon color="red lighten-1">mdi-delete</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-card>
      <v-fab-transition>
        <div class="text-center">
          <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                fab
                large
                color="primary"
                fixed
                bottom
                right
                elevation="2"
                v-bind="attrs"
                v-on="on"
                class="v-btn--example"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="text-h5 white--text primary darken-2">
                Upload Loan Document
              </v-card-title>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-card-text class="mt-3">
                  <v-row>
                    <v-col cols="12" sm="12">
                      <v-text-field
                        v-model="document.name"
                        label="Document Name"
                        hint="Document Name"
                        outlined
                        :rules="[(v) => !!v || 'Field is required']"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="12">
                      <v-textarea
                        v-model="document.description"
                        name="input-7-1"
                        label="Description"
                        outlined
                        hint="Description"
                        :rules="[(v) => !!v || 'Field is required']"
                      ></v-textarea>
                    </v-col>
                    <v-col>
                      <v-file-input
                        show-size
                        counter
                        multiple
                        chips
                        type="file"
                        accept="image/*, file/*, application/*"
                        label="Select Document"
                        :rules="rules"
                        @change="onFileChanged($event)"
                      ></v-file-input>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-form>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="warning" small @click="dialog = false"> Cancel </v-btn>
                <v-btn color="primary" small @click="uploadloanaccountdocument()">
                  Upload
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </v-fab-transition>
    </v-list>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      documents: null,
      dialog: false,
      loading: false,
      isSelecting: false,
      selectedFile: null,
      valid: true,
      form: new FormData(),
      rules: [
        (value) =>
          !value ||
          value.size < 4000000 ||
          "Document file size should be less than 4 MB!",
        (v) => !!v || "Document is required",
      ],
      document: {
        name: null,
        description: null,
      },
    };
  },
  created() {
    this.getloanaccountdocuments();
  },
  methods: {
    async getloanaccountdocuments() {
      this.loading = true;
      await this.$api
        .$get(`/loans/${this.$route.params.id}/documents`)
        .then((response) => {
          this.loading = false;
          this.documents = response;
        })
        .catch((error) => {});
    },
    async deleteloanaccountdocument(document) {
      this.loading = true;
      await this.$api
        .$delete(`/loans/${this.$route.params.id}/${document.id}`)
        .then((response) => {
          this.getloanaccountdocuments();
        })
        .catch((error) => {});
    },
    async uploadloanaccountdocument() {
      this.loading = true;
      this.form.append("name", this.document.name);
      this.form.append("description", this.document.description);
      await this.$api
        .$post(`/loans/${this.$route.params.id}/documents`, this.form)
        .then((response) => {
          this.dialog = false;
          this.getloanaccountdocuments();
        })
        .catch((error) => {});
    },

    onFileChanged(e) {
      this.selectedFile = e[0];
      this.form.append("file", this.selectedFile);
      // Do whatever you need with the file, liek reading it with FileReader
    },
  },
};
</script>
