import {defineStore, } from 'pinia';
import PocketBase from 'pocketbase';
import {computed, ref} from 'vue';
import { Player} from 'src/models/player.model';
import {Gamemode} from 'src/models/gamemode.model';


const origin = window.origin.includes('localhost') ? 'http://127.0.0.1:8090' : window.origin;
const pb = new PocketBase(origin);

export const usePlayerStore = defineStore('players', () => {

  const players = ref(new Array<Player>());

  // Quelle Pocketbase, 15.4.2024: https://pocketbase.io/docs/api-realtime/
  pb.collection<Player>('players').subscribe('*', (e) => {
    if (e.action === 'delete') {
      players.value.splice(players.value.findIndex(player => player.id === e.record.id), 1);
    } else if (e.action === 'update') {
      const playerIdx = players.value.findIndex(player => player.id === e.record.id);
      players.value[playerIdx] = e.record
    } else {
      players.value.push(e.record);
    }
  });

  // Quelle Pinia, 16.04.2024: https://pinia.vuejs.org/core-concepts/
  const playersInGame = computed(() => {
    return players.value.filter(player => player.inGame);
  })

  const activePlayer = computed(() => {
    return players.value.find(player => player.onMove);
  })

  const winnerPlayerName = computed(() => {
    const winner =  players.value.find(player => player.isWinner);

    if (winner !== undefined) {
      return winner.playerName
    } else {
      return ''
    }
  })

  function getPlayers() {
    pb.collection<Player>('players').getFullList().then((result) => {
      players.value = result;
    });
  }

  async function createPlayer(playerName: string) {
    const playerDate: Partial<Player> = {
      'playerName': playerName,
      'isWinner': false,
      'inGame': false,
      'onMove': false,
    };

    await pb.collection('players').create(playerDate);
  }

  async function deletePlayer (playerId: string) {
    await pb.collection('players').delete(playerId);
  }

  async function startGame(gamemodeId: string) {

    const startGame: Partial<Gamemode> = {
      'isActive': true,
    };

    const gamemode = await pb.collection<Gamemode>('gamemodes').update(gamemodeId, startGame);

    if (gamemode.name === 'X01') {
      for (const player of playersInGame.value) {
        await pb.collection('players').update(player.id, {
          'inGame': true,
          'isWinner': false,
          'onMove': false,
          'fk_gamemode': gamemodeId,
          'gameData': {'throws': 0, 'totalPoints': 0, 'pointsPreRound': 6}
        });
      }
    }

    await pb.collection('players').update(playersInGame.value[0].id, {'onMove': true});

  }

  async function endGame(gamemodeId: string) {

    const startGame: Partial<Gamemode> = {
      'isActive': false,
    };

    await pb.collection('gamemodes').update(gamemodeId, startGame);

    const playerData = {
      'inGame': false,
      'isWinner': false,
      'onMove': false,
      'gameData': '{}',
      'fk_gamemode': ''
    };

    for (const player of playersInGame.value) {
      await pb.collection('players').update(player.id, playerData);
    }
  }

  async function updateGameData(gameData: object) {
    const activePlayerId = activePlayer.value!.id;

    const playerData = {
      'gameData': JSON.stringify(gameData),
    };

    await pb.collection('players').update(activePlayerId, playerData);
  }
  async function toggleNextPlayer() {

    if (playersInGame.value.length > 1) {
      const currentIndex = playersInGame.value.findIndex(player  => player.onMove === true);

      // Quelle: ChatGPT
      const nextIndex = (currentIndex + 1) % playersInGame.value.length;

      const newPlayerOnMove = playersInGame.value[nextIndex];

      await pb.collection('players').update(newPlayerOnMove.id, {'onMove': true});
      await pb.collection('players').update(playersInGame.value[currentIndex].id, {'onMove': false});
    }
  }

  async function toggleWinner(playerId: string) {
    await pb.collection('players').update(playerId, {'isWinner': true});
  }

  return {getPlayers, players, createPlayer, deletePlayer, startGame, playersInGame, endGame, updateGameData, activePlayer, toggleNextPlayer, toggleWinner, winnerPlayerName }
})
