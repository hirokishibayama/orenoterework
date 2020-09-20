<template>
  <q-layout view="hHh lpR fFf">

    <q-header reveal class="bg-blue-theme font-kumbh" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          Oreno Telework
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script lang="ts">

import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'LoginLayout',
  setup () {
    return { }
  }
})
</script>
