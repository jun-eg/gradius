import type { UserId } from '$/commonTypesWithClient/branded';
import type { PlayerModel } from '$/commonTypesWithClient/models';
import { playersRepository } from '../playersRepository';

export type MoveDirection = {
  move: { x: 1 | -1 | 0; y: 1 | -1 | 0 };
};

//stateは、フロントの処理をserverに移動する必要在り
//そもそも処理自体の修正が必要
export type GameState = 'wait_start' | 'playing' | 'stop' | 'gameover' | 'continue';
export let game_state: GameState = 'wait_start';
const game_state_list: GameState[] = ['wait_start', 'playing', 'stop'];
export const change_state = {
  change_game_state: async (change_state: number) => {
    game_state = game_state_list[change_state];
    return game_state;
  },
};

type Player_Info = {
  pos: { x: number; y: number };
  speed: number;
  hp: number;
  scole: number;
  // userid: UserId;
};

//仮初期値
//playerを画面の左真ん中からスタートさせるには以下の初期値が適切
//＊stageサイズによって変更する必要在り
//変数にして自動で調節するようにしてもいいかも
const player_first_pos: number[] = [100, 300];
const player_speed = 10;
const player_hp = 100;
const player_scole = 0;
const player_size = { width: 200, height: 70 };

export const player_info: Player_Info = {
  pos: { x: player_first_pos[0], y: player_first_pos[1] },
  speed: player_speed,
  hp: player_hp,
  scole: player_scole,
};

export const playerUsecase = {
  moveplayer: async (id: UserId, move_direction: MoveDirection): Promise<PlayerModel | null> => {
    const player: PlayerModel | null = await playersRepository.getUnique(id);
    if (player === null) return null;
    const moved_player: PlayerModel = {
      ...player,
      position: {
        //最大値、最小値はgame画面サイズにより変更する、もしくはコンバの  stageサイズに合わせる
        x: Math.min(
          Math.max(player.position.x + move_direction.move.x * player.speed, 0),
          1800 - 250
        ),
        y: Math.min(
          Math.max(player.position.y + move_direction.move.y * player.speed, 0),
          780 - 75
        ),
      },
    };
    await playersRepository.save(moved_player);
    return moved_player;
  },
  get: async (userId: UserId, userName: string): Promise<PlayerModel[] | null> => {
    const players: PlayerModel[] = (await playersRepository.getAll()) ?? [];
    const isExist = players.some((player) => player.id === userId);
    if (!isExist) {
      const newPlayer: PlayerModel = {
        id: userId,
        player_name: userName,
        position: {
          x: player_first_pos[0],
          y: player_first_pos[1],
        },
        speed: player_speed,
        hp: player_hp,
        scole: player_scole,
        size: { width: player_size.width, height: player_size.height },
      };
      await playersRepository.save(newPlayer);
      return await playersRepository.getAll();
    }
    return players;
  },
};
