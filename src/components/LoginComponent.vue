<template>
  <q-page class='flex flex-center'>
    <div id='firebaseui-auth-container'></div>
  </q-page>
</template>

<script lang='ts'>
/* eslint-disable @typescript-eslint/ban-types */
import { defineComponent, SetupContext, onMounted } from '@vue/composition-api'
import AuthModule from 'src/modules/AuthModule'
export default defineComponent({
  name: 'LoginComponent',
  setup (props: {}, ctxt: SetupContext) {
    const authModule = AuthModule(ctxt)
    onMounted(() => {
      authModule.startUi()
    })
    return {}
  }
})
</script>
