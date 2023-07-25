import { playerUsecase } from '$/repository/Usecase/playerUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async ({ user }) => ({
    status: 200,
    body: await playerUsecase.get(user.id, user.displayName ?? 'Player'),
  }),
}));
