<template>
  <q-layout view="hHh lpR fFf" class="font-kumbh">

    <q-header reveal class="bg-white text-white" height-hint="98">
      <q-tabs align="center" style="color: rgb(6,8,31); font-weight: bold;">
        <q-route-tab to="/" label="Teleworks" />
        <q-route-tab to="/profile" label="Profile" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script lang="ts">

import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'MainLayout',
  setup () {
    return { }
  }
})
</script>
