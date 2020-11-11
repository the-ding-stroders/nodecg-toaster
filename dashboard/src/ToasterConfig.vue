<template>
  <v-app>
    <v-container fluid>
      <v-row>
        <v-col
          :cols="4"
        >
          <v-card
            color="#003300"
            :elevation="6"
          >
            <v-card-title class="headline">
              Make A New Toast
            </v-card-title>

            <v-card-text>
              <v-form
                ref="form"
                v-model="valid"
              >
                <v-text-field
                  v-model="draftToast.title"
                  :rules="titleRules"
                  label="Title"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="draftToast.subtitle"
                  :rules="subtitleRules"
                  label="Subtitle"
                  required
                ></v-text-field>
                <v-checkbox
                  v-model="draftToast.live"
                  label="Live"
                  required
                ></v-checkbox>
              </v-form>
            </v-card-text>

            <v-card-actions>
              <v-btn
                text
                @click.native="resetForm()"
              >
                Reset
              </v-btn>
              <v-btn
                @click.native="addToast()"
                :disabled="valid === false"
              >
                Add
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col
          v-for="(toast, index) in toasts"
          :key="toast.id"
          :cols="4"
        >
          <v-card
            :elevation="6"
          >
            <v-card-title>
              {{ toast.title }}
            </v-card-title>

            <v-card-subtitle>
              {{ toast.subtitle }}
            </v-card-subtitle>

            <v-card-actions>
              <v-switch
                v-model="toast.live"
                label="Live"
                required
              ></v-switch>
              <v-btn
                text
              >
                Edit
              </v-btn>
              <v-dialog
                v-model="dialog"
                persistent
                max-width="290"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="red"
                    dark
                    v-bind="attrs"
                    v-on="on"
                  >
                    Delete
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title class="headline">
                    Delete {{ index }}?
                  </v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="darken-1"
                      text
                      @click="dialog = false"
                    >
                      Disagree
                    </v-btn>
                    <v-btn
                      color="red darken-1"
                      text
                      @click="deleteModal(index)"
                    >
                      Agree
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    defaultToast: {
      live: true,
      subtitle: null,
      title: null,
    },
    dialog: false,
    draftToast: {
      live: true,
      subtitle: null,
      title: null,
    },
    selectedToast: null,
    toasts: [],
    valid: false,
    subtitleRules: [
      v => !!v || 'Subtitle is required',
    ],
    titleRules: [
      v => !!v || 'Title is required',
    ]
  }),
  methods: {
    addToast() {
      const toastsRep = nodecg.Replicant('toasts', 'nodecg-toaster');

      this.toasts.push(this.draftToast)
      this.resetForm()
    },
    deleteToast(index) {
      console.log(index)
      this.dialog = false
    },
    resetForm() {
      this.$refs.form.resetValidation()
      this.draftToast = { ...this.defaultToast }
    },
  },
  created() {
    const toastsRep = nodecg.Replicant('toasts', 'nodecg-toaster');
    NodeCG.waitForReplicants(toastsRep).then(() => {
      nodecg.readReplicant('toasts', 'nodecg-toaster', (value) => {
        this.toasts = value;
      })
    })
  },
  watch: {
    toasts(items) {
      const toastsRep = nodecg.Replicant('toasts', 'nodecg-toaster');
      toastsRep.value = items
    }
  }
}
</script>

<style>

</style>