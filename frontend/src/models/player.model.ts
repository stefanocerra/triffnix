export interface Player {
  id: string;
  playerName: string;
  isWinner: boolean;
  inGame: boolean;
  onMove: boolean;
  gameData: {
    throws: number;
    totalPoints: number;
    pointsPreRound: number;
  };
  fk_gamemode: string;
}
