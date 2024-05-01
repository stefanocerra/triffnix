<template>
<!--Quelle 16.04.2024: https://jsfiddle.net/yghL6so8/2/-->
<!--Quelle 16.04.2024: https://quasar.dev/layout/grid/gutter-->
<!--Quelle 16.04.2024: https://quasar.dev/vue-components/scroll-area/-->

<q-page class="q-pa-md" v-if="activeGameName === 'X01'">
  <div class="row q-col-gutter-md window-height-wo-header">
    <q-scroll-area :class="viewsClass" v-if="showScore">
      <ScoreX01Component
        class='{{ viewsClass }} q-mb-sm q-mt-sm'
        v-for="player in playersInGame"
        :key="player.id"
        :player="player"
      />
    </q-scroll-area>
    <div :class="viewsClass" v-if="showInput">
      <InputX01Component
        @thrown-number="updatePoints"
        @clicked-factor="calculateFactor"
      />
    </div>
  </div>
  <!--    Quelle 15.4.2024: https://quasar.dev/vue-directives/close-popup#closepopup-api-->
  <q-dialog v-model="dialogOpen" persistent >
    <q-card class="dialog-width">
      <q-card-section>
        <h6>{{ winnerPlayerName }}, du hast gewonnen! Gratulation!</h6>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Ok" color="primary" @click="finishGame" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</q-page>
  <div v-else>
    <h6>Kein Spiel gestartet :(</h6>
  </div>

</template>

<script lang="ts">
import {defineComponent, onBeforeMount, ref} from 'vue';
import InputX01Component from 'components/input-x01.component.vue';
import ScoreX01Component from 'components/score-x01.component.vue';
import {useGamemodeStore} from 'stores/gamemode.store';
import {storeToRefs} from 'pinia';
import {usePlayerStore} from 'stores/player.store';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'IndexPage',

  components: {
    ScoreX01Component,
    InputX01Component,
  },

  setup() {
    const Route = useRoute();
    const gamemodeStore = useGamemodeStore();
    const playerStore = usePlayerStore();
    const showScore = ref(false);
    const showInput = ref(false);
    const viewsClass = ref('col-6');
    const dialogOpen = ref(false);
    let fieldFactor = 0;

    gamemodeStore.getGamemodes();
    playerStore.getPlayers();

    const { activeGameName } = storeToRefs(gamemodeStore);
    const { playersInGame, activePlayer, winnerPlayerName} = storeToRefs(playerStore);


    onBeforeMount(() => {
      const currentRoute = Route.fullPath;

      switch (currentRoute) {
        case '/x01':
          showScore.value = true;
          showInput.value = true;
          break;
        case '/x01/score':
          showScore.value = true;
          showInput.value = false;
          break;
        case '/x01/input':
          showScore.value = false;
          showInput.value = true;
          break;
      }

      if (showScore.value && showInput.value) {
        viewsClass.value = 'col-6';
      } else {
        viewsClass.value = 'col-12';
      }
    })

    const calculateFactor = (factor: number) => {
      fieldFactor = factor;
    }

    const updatePoints = (dart: number) => {
      const gameData = activePlayer.value!.gameData;
      let dartValue = dart;

      if (fieldFactor !== 0) {
        dartValue = dartValue * fieldFactor;
        fieldFactor = 0;
      }

      if(gameData.totalPoints + dartValue === 301) {
        playerStore.toggleWinner(activePlayer.value!.id);
        dialogOpen.value = true;
      } else if (gameData.totalPoints + dartValue > 301) {
        gameData.throws = 0;
        gameData.totalPoints = gameData.pointsPreRound;
        playerStore.updateGameData(gameData);
        playerStore.toggleNextPlayer();
      } else {
        if (gameData.throws === 2) {
          gameData.throws = 0;
          gameData.totalPoints += dartValue;
          gameData.pointsPreRound = gameData.totalPoints;
          playerStore.updateGameData(gameData);
          playerStore.toggleNextPlayer();
        } else {
          gameData.throws++;
          gameData.totalPoints += dartValue;
          playerStore.updateGameData(gameData);
        }
      }
    }
    const finishGame = () => {
      playerStore.endGame(activePlayer.value!.fk_gamemode);
    }

    return { activeGameName, playersInGame, showScore, showInput, viewsClass, updatePoints, dialogOpen, finishGame, winnerPlayerName, calculateFactor }
  }
});
</script>

<style scoped>
.window-height-wo-header {
  height: calc(100vh - 66px);
}

.dialog-width {
  width: 50vw;
}
</style>
