//これじゃ動くわけないけどイメージ
// if (game_state === 'playing') {
//   setInterval(() => {
//     make_enemy();
//   }, 2000);

//   setInterval(() => {
//     move_or_delete_enemy();
//   }, 100);
// }

setInterval(() => {
  make_enemy();
}, 10000);

setInterval(() => {
  move_or_delete_enemy();
}, 100);

export let enemy_list: number[][] = [];

const make_enemy = () => {
  const enemy_pos_y: number = Math.floor(Math.random() * 690) + 1;
  enemy_list.push([1110, enemy_pos_y]);
};

const move_or_delete_enemy = () => {
  const new_enemy_list = enemy_list.map((one_enemy) => {
    one_enemy[0] -= 2;
    return one_enemy;
  });
  enemy_list = new_enemy_list.filter((one_enemy) => one_enemy[0] >= 50);
};
