import type { TaskId, UserId } from './branded';

export type UserModel = {
  id: UserId;
  email: string;
  displayName: string | undefined;
  photoURL: string | undefined;
};

export type TaskModel = {
  id: TaskId;
  label: string;
  done: boolean;
  created: number;
};

//まずは、playerだけ
export type PlayerModel = {
  id: UserId;
  player_name: string;
  position: { x: number; y: number };
  speed: number;
  hp: number;
  scole: number;
  size: { width: number; height: number };
};
