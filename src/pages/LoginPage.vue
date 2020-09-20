<template>
  <q-page padding>
      <login-component></login-component>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import LoginComponent from 'src/components/LoginComponent.vue'
export default defineComponent({
  name: 'LoginPage',
  components: {
    LoginComponent
  }
})
</script>
