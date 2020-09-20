<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card v-for="telework in props.teleworks" :key="telework.created" class="tele-card">
      <q-img
        :src=telework.thumbnailUrl
        spinner-color="white"
        class="tele-card-image"
      />

      <q-card-section>
        <div class="text-overline text-theme-blue">saitoh</div>
        <div class="text-h5 q-mb-xs tele-card-title">{{telework.title}}</div>
        <div class="text-caption tele-card-detail" v-html="telework.detail">
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api'
import { TeleworkDataInterface } from 'src/modules/models/teleworkdata'

type Props = {
  teleworks: TeleworkDataInterface[];
};

export default defineComponent({
  name: 'TeleworkcardComponent',
  props: {
    teleworks: Object
  },
  setup (props: Props, ctxt: SetupContext) {
    const expanded = false
    return { props, expanded }
  }
})
</script>
