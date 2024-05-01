<template>
  <q-page class="q-pa-md row items-center justify-around">

    <q-card class="my-card card-height col-4">
      <div>
        <p class="text-subtitle2 q-pa-md">Spieler</p>
        <q-list bordered>
          <q-item clickable v-ripple v-for="player in players" :key="player.id">
            <q-item-section>{{ player.playerName }}</q-item-section>
            <q-item-section avatar>
              <q-icon @click="playerStore.deletePlayer(player.id)" color="negative" name="delete" />
            </q-item-section>
          </q-item>
        </q-list>
      </div>

      <div>
        <div class="row q-pa-md justify-between">
          <q-input v-model="newPlayer" placeholder="" hint="Spielername" />
          <div>
            <q-btn @click="createPlayer" no-caps round color="primary" icon="add" />
          </div>
        </div>
      </div>
    </q-card>

    <div class="col-4">
      <div class="column q-gutter-y-md">
        <q-btn @click="$router.push(`${activeGameName.toLowerCase()}/score`)" v-if="activeGameName !== ''" no-caps color="primary" label="Spielstand"/>
        <q-btn @click="$router.push(`${activeGameName.toLowerCase()}/input`)" v-if="activeGameName !== ''" no-caps color="primary" label="Eingabe"/>
        <q-btn @click="$router.push(`${activeGameName.toLowerCase()}`)" v-if="activeGameName !== ''" no-caps color="primary" label="Spielstand & Eingabe"/>
        <q-btn v-if="activeGameName === ''" @click="dialogOpen = true" no-caps color="primary" label="Spiel starten"/>
        <q-btn v-else disable  no-caps color="primary" label="Spiel bereits aktiv"/>
      </div>
    </div>

<!--    Quelle 15.4.2024: https://quasar.dev/vue-directives/close-popup#closepopup-api-->
    <q-dialog v-model="dialogOpen" persistent >
      <q-card class="dialog-width">
        <q-card-section>
          <h6>Spiel starten</h6>
          <q-select filled v-model="selectedGamemode" :options="formattedGamemodes" label="Spielmodus " />
        </q-card-section>
        <q-card-section>
        <q-separator inset />
        </q-card-section>
        <q-card-section>
        <p class="text-subtitle2">Spieler:</p>
          <div v-for="player in players" :key="player.id">
            <div class="row justify-between items-center">
              {{ player.playerName }}
              <q-checkbox v-model="player.inGame" />
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Abbruch" color="primary" @click="cancelGameSelection" v-close-popup />
          <q-btn flat label="Spiel starten" color="primary" @click="startGame" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
import {computed, defineComponent, ref} from 'vue';
import {usePlayerStore} from 'stores/player.store';
import {storeToRefs} from 'pinia';
import { useGamemodeStore } from 'src/stores/gamemode.store';
import { Gamemode } from 'src/models/gamemode.model';

export default defineComponent({
  name: 'IndexPage',

  components: {},

  setup() {

    const newPlayer = ref('');
    const dialogOpen = ref(false);
    const selectedGamemode = ref<Gamemode>()

    const playerStore = usePlayerStore();
    const gamemodeStore = useGamemodeStore();

    const { players } = storeToRefs(playerStore);
    const { gamemodes, activeGameName } = storeToRefs(gamemodeStore);

    playerStore.getPlayers();
    gamemodeStore.getGamemodes();

    const createPlayer = () => {
      playerStore.createPlayer(newPlayer.value);
      newPlayer.value = '';
    }

    const formattedGamemodes = computed(() => {
      return gamemodes.value!.map((gamemode: Gamemode) => {
        return { ...gamemode, label: gamemode.name };
      })
    })

    const startGame = () => {
      playerStore.startGame(selectedGamemode.value!.id)
      selectedGamemode.value = undefined;
    }

    const cancelGameSelection = () => {
      players.value.forEach(player => {
        player.inGame = false;
      })
      selectedGamemode.value = undefined;
    }

    return {
      players,
      playerStore,
      newPlayer,
      createPlayer,
      dialogOpen,
      selectedGamemode,
      formattedGamemodes,
      startGame,
      cancelGameSelection,
      activeGameName
    };
  }
});
</script>

<style scoped>
  .card-height {
    height: 50vh;
  }

  .dialog-width {
    width: 50vw;
  }
</style>
