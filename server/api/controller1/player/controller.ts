import { playerUsecase } from '$/repository/Usecase/playerUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  post: async ({ user, body }) => {
    const result = await playerUsecase.moveplayer(user.id, body);
    return {
      status: 202,
      body: result,
    };
  },
}));
