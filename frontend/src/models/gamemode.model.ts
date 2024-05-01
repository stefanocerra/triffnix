export interface Gamemode {
  id: string;
  name: string;
  isActive: boolean;
  fk_players: string[]
}
