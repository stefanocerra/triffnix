<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>

        <q-btn
          v-if="$route.fullPath !== '/'"
          @click="$router.push('/')"
          flat round dense icon="arrow_back_ios"
        />

        <q-toolbar-title>
          Triffnix
        </q-toolbar-title>
        <div class="flex" v-if="$route.fullPath !== '/' && activeGameName === 'X01'">
          <q-toolbar-title>
            301, Straight Out
          </q-toolbar-title>
          <q-btn
            @click="cancelGame"
            flat
            class="bg-negative"
            dense
            label="Abbrechen"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { useGamemodeStore } from 'src/stores/gamemode.store';
import {defineComponent} from 'vue';
import {storeToRefs} from 'pinia';
import { usePlayerStore } from 'src/stores/player.store';

export default defineComponent({
  name: 'MainLayout',

  components: {},

  setup() {
    const gamemodeStore = useGamemodeStore();
    const playerStore = usePlayerStore();

    const { activeGameName, activeGame } = storeToRefs(gamemodeStore);

    const cancelGame = () => {
      playerStore.endGame(activeGame.value[0].id);
    }

    return { activeGameName, cancelGame }
  }
});
</script>
