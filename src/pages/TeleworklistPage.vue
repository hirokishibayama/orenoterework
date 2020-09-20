<template>
  <q-page padding>
      <teleworklist-component></teleworklist-component>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import TeleworklistComponent from 'src/components/TeleworklistComponent.vue'
export default defineComponent({
  name: 'TeleworklistPage',
  components: {
    TeleworklistComponent
  }
})
</script>
