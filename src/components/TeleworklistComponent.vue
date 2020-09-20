<template>
    <q-page>
<teleworkcard-component v-bind:teleworks="teleworks"></teleworkcard-component>

        <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn fab icon="add" class="add-button" @click="dialog = true"/>
        </q-page-sticky>
        <q-dialog
      v-model="dialog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <q-bar
      class="background-white">
          <q-space />
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

    <q-form class="q-gutter-md">
      <q-list padding>
        <q-item><div class="modal-title">New Telework</div></q-item>
      <q-item v-ripple>
        <q-item-section>
          <q-item-label caption class="modal-section">
              Thumbnail
          </q-item-label>
            <q-item>
                <FirebaseUploaderComponent
                  label="Upload a Photo"
                  path="thumbnails/"
                  auto-upload
                  flat
                  square
                  color="blue-grey-6"
                  @upload="uploaded"
                  multiple
                >
                </FirebaseUploaderComponent>
            </q-item>
        </q-item-section>
      </q-item>
        <q-item>
          <q-item-section>
            <q-item-label caption class="modal-section">
              Telework ID
            </q-item-label>
            <q-item-label class="modal-disable">
              {{teleworkData.teleworkId}}
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label caption class="modal-section">
              User ID
            </q-item-label>
            <q-item-label class="modal-disable">
              {{teleworkData.userId}}
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-ripple>
          <q-item-section>
            <q-item-label caption class="modal-section">
              Title
            </q-item-label>
            <q-item>
              <q-input
                standout="bg-white text-black"
                color="grey-10"
                bg-color="grey-1"
                filled
                placeholder="( Title for your telework style )"
                class="full-width"
                v-model="teleworkData.title"
              />
            </q-item>
          </q-item-section>
        </q-item>
        <q-item v-ripple>
          <q-item-section>
            <q-item-label caption class="modal-section">
              Detail
            </q-item-label>
            <q-item>
              <q-editor
                v-model="teleworkData.detail"
                standout="bg-white text-black"
                color="grey-10"
                bg-color="grey-1"
                class="full-width"
                filled
                min-height="10rem" />
            </q-item>
          </q-item-section>
        </q-item>
        <q-item v-ripple>
          <q-btn
            label="SAVE"
            type="submit"
            class="full-width bg-blue-theme"
            @click="createTeleworkData(teleworkData)"
          />
        </q-item>
      </q-list>
    </q-form>
      </q-card>
    </q-dialog>

    <q-dialog v-model="alert.isVisible">
      <q-card>
        <q-card-section>
          <div class="text-h6">Error</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          {{alert.message}}
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="OK"
            class="bg-blue-theme"
            v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    </q-page>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api'
import TeleworkModule from 'src/modules/TeleworkModule'
import FirebaseUploaderComponent from 'src/components/FirebaseUploader.vue'
import TeleworkcardComponent from 'src/components/TeleworkcardComponent.vue'
export default defineComponent({
  name: 'TeleworklistComponent',
  components: {
    FirebaseUploaderComponent,
    TeleworkcardComponent
  },
  setup (props: any, ctxt: SetupContext) {
    const teleworkModule = TeleworkModule(ctxt)
    return { ...teleworkModule }
  }
})
</script>
