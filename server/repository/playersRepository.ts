import type { UserId } from '$/commonTypesWithClient/branded';
import type { PlayerModel } from '$/commonTypesWithClient/models';
import { UserIdParser } from '$/service/idParsers';
import { prismaClient } from '$/service/prismaClient';
import type { Player } from '@prisma/client';
import { z } from 'zod';

const insertPlayerModel = (prisumaPlayer: Player): PlayerModel => ({
  id: UserIdParser.parse(prisumaPlayer.id),
  player_name: prisumaPlayer.player_name,
  position: {
    x: prisumaPlayer.pos_x,
    y: prisumaPlayer.pos_y,
  },
  speed: z.number().min(0).parse(prisumaPlayer.speed),
  hp: z.number().min(0).parse(prisumaPlayer.hp),
  scole: z.number().min(0).parse(prisumaPlayer.score),
  size: {
    width: z.number().min(0).parse(prisumaPlayer.size_width),
    height: z.number().min(0).parse(prisumaPlayer.size_height),
  },
});

export const playersRepository = {
  getAll: async (): Promise<PlayerModel[] | null> => {
    const prisumaPlayerInfo = await prismaClient.player.findMany();
    return prisumaPlayerInfo.map(insertPlayerModel);
  },
  getUnique: async (id: UserId): Promise<PlayerModel | null> => {
    const prisumaPlayerInfo = await prismaClient.player.findUnique({
      where: { id },
    });
    return prisumaPlayerInfo !== null ? insertPlayerModel(prisumaPlayerInfo) : null;
  },
  save: async (player: PlayerModel) => {
    await prismaClient.player.upsert({
      where: { id: player.id },
      update: {
        player_name: player.player_name,
        pos_x: player.position.x,
        pos_y: player.position.y,
        hp: player.hp,
        score: player.scole,
        size_width: player.size.width,
        size_height: player.size.height,
      },
      create: {
        id: player.id,
        player_name: player.player_name,
        pos_x: player.position.x,
        pos_y: player.position.y,
        hp: player.hp,
        speed: player.speed,
        score: player.scole,
        size_width: player.size.width,
        size_height: player.size.height,
      },
    });
  },
  delete: async (id: UserId) => {
    await prismaClient.player.delete({
      where: { id },
    });
  },
};
