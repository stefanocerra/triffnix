<template>
  <q-card class="border-on-move" v-if="player.onMove">
    <q-card-section class="row">
      <q-space />
      <p class="text-subtitle1">{{ player.playerName }}</p>
      <q-space />
      <q-separator vertical />
      <q-space />
      <p class="text-subtitle2">{{ 301 - player.gameData.totalPoints }}</p>
      <q-space />
    </q-card-section>
  </q-card>

  <q-card class="border" v-else>
    <q-card-section class="row">
      <q-space />
      <p class="text-subtitle1">{{ player.playerName }}</p>
      <q-space />
      <q-separator vertical />
      <q-space />
      <p class="text-subtitle2">{{ 301- player.gameData.totalPoints }}</p>
      <q-space />
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { Player } from 'src/models/player.model';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'ScoreX01Component',
  props: {
    player: {
      type: Object as PropType<Player>,
      required: true
    }
  },
})
</script>

<style scoped>
.border-on-move {
  border: 2px solid #ff6961;

}
.border {
  border: 2px solid #464646;
}
</style>
