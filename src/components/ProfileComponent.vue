<template>
  <q-page>
    <q-form class="q-gutter-md">
      <q-list padding>
        <q-item><div class="modal-title">User Settings</div></q-item>
      <q-item v-ripple>
        <q-item-section>
          <q-item-label caption class="modal-section">
              Thumbnail
          </q-item-label>
            <q-item>
                <q-img
                    :src=userData.thumbnailUrl
                    spinner-color="white"
                    class="prof-image"
                />
            </q-item>
            <q-item>
                <FirebaseUploaderComponent
                  label="Upload a Photo"
                  path="thumbnails/"
                  auto-upload
                  no-thumbnails
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
        <q-item v-ripple>
          <q-item-section>
            <q-item-label caption class="modal-section">
              User ID
            </q-item-label>
            <q-item-label>
              {{userData.userId}}
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-ripple>
          <q-item-section>
            <q-item-label caption class="modal-section">
              Display Name
            </q-item-label>
            <q-item>
              <q-input
                standout="bg-white text-black"
                color="grey-10"
                bg-color="grey-1"
                filled
                class="full-width"
                v-model="userData.displayName"
              />
            </q-item>
          </q-item-section>
        </q-item>
        <q-item v-ripple>
          <q-item-section>
            <q-item-label caption class="modal-section">
              Message
            </q-item-label>
            <q-item>
              <q-input
                standout="bg-white text-black"
                color="grey-10"
                bg-color="grey-1"
                class="full-width"
                filled
                type="textarea"
                v-model="userData.message"
              />
            </q-item>
          </q-item-section>
        </q-item>
        <q-item v-ripple>
          <q-btn
            label="SAVE"
            type="submit"
            class="full-width bg-blue-theme"
            @click="saveUserData(userData)"
          />
        </q-item>
        <q-separator color="gray" inset />
        <q-item v-ripple>
          <q-btn
            class="full-width"
            label="SIGNOUT"
            color="deep-orange-3"
            @click="signout"
          />
        </q-item>
      </q-list>
    </q-form>
  </q-page>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/ban-types */
import { defineComponent, SetupContext } from '@vue/composition-api'
import FirebaseUploaderComponent from 'src/components/FirebaseUploader.vue'
import AuthModule from 'src/modules/AuthModule'
import ProfileModule from 'src/modules/ProfileModule'
export default defineComponent({
  name: 'ProfileComponent',
  components: {
    FirebaseUploaderComponent
  },
  setup (props: {}, ctxt: SetupContext) {
    const authModule = AuthModule(ctxt)
    const profileModule = ProfileModule(ctxt)
    return { ...authModule, ...profileModule }
  }
})
</script>
