import {defineStore} from 'pinia';
import PocketBase from 'pocketbase';
import {computed, ref} from 'vue';
import {Gamemode} from 'src/models/gamemode.model';


const origin = window.origin.includes('localhost') ? 'http://127.0.0.1:8090' : window.origin;
const pb = new PocketBase(origin);

export const useGamemodeStore = defineStore('gamemode', () => {

  const gamemodes = ref(new Array<Gamemode>());

  // Quelle Pocketbase, 15.4.2024: https://pocketbase.io/docs/api-realtime/
  pb.collection<Gamemode>('gamemodes').subscribe('*', (e) => {
    if (e.action === 'update') {

      console.log('game delete e', e)
      console.log('game delete', e.action)
      const gamemodeIdx = gamemodes.value.findIndex(gamemode => gamemode.id === e.record.id);
      gamemodes.value[gamemodeIdx] = e.record;
    }
  })

  // Quelle Pinia, 16.04.2024: https://pinia.vuejs.org/core-concepts/
  const activeGameName = computed(() => {
      const activeGame = gamemodes.value.filter(gamemode => gamemode.isActive);
      if (activeGame.length !== 0) {
        return activeGame[0].name;
      } else {
        return ''
      }
  })

  const activeGame = computed(() => {
    return gamemodes.value.filter(gamemode => gamemode.isActive);
  })

  function getGamemodes() {
    pb.collection<Gamemode>('gamemodes').getFullList().then((result) => {
      gamemodes.value = result;
    });
  }

  return { getGamemodes, gamemodes, activeGameName, activeGame }
})
