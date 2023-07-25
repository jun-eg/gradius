//ここにゲーム画面をつくる
import type { PlayerModel } from '$/commonTypesWithClient/models';
import type { Enemy_Info } from '$/repository/Usecase/enemyUsecase';
import type { Laser_Info } from '$/repository/Usecase/laserUsecase';
import { useEffect, useRef, useState } from 'react';
import { Image, Layer, Rect, Stage } from 'react-konva';
import { Loading } from 'src/components/Loading/Loading';
import { apiClient } from 'src/utils/apiClient';
import styles from './gradius_game_screen.module.css';
// import enemy01 from '../../../public/images/enemy01.png';
// import fighter from '../../../public/images/fighter.png';

const App = () => {
  const [fight_position, setfight_position] = useState<PlayerModel[]>();
  const [enemieies_info, setenemieies_info] = useState<Enemy_Info[]>([]);
  const [laseies_info, setlaseies_info] = useState<Laser_Info[]>([]);
  const [background_pos, setbackground_pos] = useState(0);
  const [isFighterLoaded, setIsFighterLoaded] = useState(false);
  const fighterImgRef = useRef(new window.Image());
  const enemyImgRef = useRef(new window.Image());
  enemyImgRef.current.src = '/images/enemy_spacecraft.png';

  const fetchPlayers = async () => {
    const res = await apiClient.player.$get();
    if (res !== null) {
      setfight_position(res);
    }
  };

  const fetchBord = async () => {
    const new_enemies_info = await apiClient.enemy.$get();
    const new_laseies_info = await apiClient.laser.$get();
    setenemieies_info(new_enemies_info);
    setlaseies_info(new_laseies_info);
    setbackground_pos((pre_background_pos) => pre_background_pos - 1);
  };

  useEffect(() => {
    const cancellid = setInterval(fetchBord, 10);
    return () => {
      clearInterval(cancellid);
    };
  }, []);
  useEffect(() => {
    const cancellid = setInterval(fetchPlayers, 10);
    return () => {
      clearInterval(cancellid);
    };
  }, []);

  useEffect(() => {
    fighterImgRef.current.src = '/images/space_uchusen_bokan.png'; // 画像ファイルの相対パスを指定
    fighterImgRef.current.onload = () => {
      setIsFighterLoaded(true);
    };
  }, []);
  //localhost:3000/gradius_game_screen/
  if (!isFighterLoaded || !fight_position) return <Loading visible />;
  return (
    <Stage
      width={1200}
      height={800}
      className={styles.container}
      style={{ backgroundPosition: `${background_pos}px 0` }}
    >
      <Layer>
        {/* <Image
          image={fighterImgRef.current}
          width={fighterImgRef.current.width}
          height={fighterImgRef.current.height}
          x={}
          y={fight_position[1]}
        /> */}
        {fight_position.map((fighter, index) => (
          <Image
            image={fighterImgRef.current}
            width={fighter.size.width}
            height={fighter.size.height}
            key={index}
            id={`fighter_${index}`}
            x={fighter.position.x}
            y={fighter.position.y}
          />
        ))}
      </Layer>
      <Layer>
        {enemieies_info.map((enemy, index) => (
          <Image
            image={enemyImgRef.current}
            width={50}
            height={50}
            key={index}
            id={`enemy_${index}`}
            x={enemy.pos.x}
            y={enemy.pos.y}
          />
        ))}
        {laseies_info.map((laser, index) => (
          <Rect
            key={index}
            id={`laser_${index}`}
            fill="blue"
            width={20}
            height={20}
            x={laser.pos.x}
            y={laser.pos.y}
          />
        ))}
      </Layer>
    </Stage>
  );
};
export default App;
