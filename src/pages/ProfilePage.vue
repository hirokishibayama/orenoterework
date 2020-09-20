<template>
  <q-page padding>
      <profile-component></profile-component>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import ProfileComponent from 'src/components/ProfileComponent.vue'
export default defineComponent({
  name: 'ProfilePage',
  components: {
    ProfileComponent
  }
})
</script>
