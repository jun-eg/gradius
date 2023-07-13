//ここにゲーム画面をつくる
import { useEffect, useRef, useState } from 'react';
import { Image, Layer, Rect, Stage } from 'react-konva';
import { Loading } from 'src/components/Loading/Loading';
import { apiClient } from 'src/utils/apiClient';
// import enemy01 from '../../../public/images/enemy01.png';
// import fighter from '../../../public/images/fighter.png';

const App = () => {
  const [fight_position, setfight_position] = useState([0, 0]);
  const [enemies, setenemies] = useState<number[][]>([]);
  const [isFighterLoaded, setIsFighterLoaded] = useState(false);
  // const fighterImg = new window.Image();
  // fighterImg.src = '../../../public/images/fighter.png';
  const fighterImgRef = useRef(new window.Image());

  const fetchBord = async () => {
    const newFighterPosition = await apiClient.game_screen.$get();
    const newEnemyPos = await apiClient.enemy.$get();
    setfight_position(newFighterPosition);
    setenemies(newEnemyPos);
  };

  useEffect(() => {
    fighterImgRef.current.src = '/images/fighter.png'; // 画像ファイルの相対パスを指定
    fighterImgRef.current.onload = () => {
      setIsFighterLoaded(true);
    };
  }, []);

  useEffect(() => {
    const cancellid = setInterval(fetchBord, 100);
    return () => {
      clearInterval(cancellid);
    };
  }, []);

  if (!fight_position || !isFighterLoaded) return <Loading visible />;
  return (
    <>
      <Stage width={1100} height={690}>
        <Layer>
          <Rect
            id="player"
            stroke="black"
            strokeWidth={1}
            x={fight_position[0]}
            y={fight_position[1]}
          />
          {/* <img src={fighter.src} width={fighter.width} height={fighter.height} /> */}
          <Image
            image={fighterImgRef.current}
            width={fighterImgRef.current.width}
            height={fighterImgRef.current.height}
          />
          {enemies.map((enemy, index) => (
            <Rect
              key={index}
              id={`enemy_${index}`}
              fill="black"
              width={40}
              height={40}
              x={enemy[0]}
              y={enemy[1]}
            />
          ))}
        </Layer>
        <Layer>
          <Rect id="enemy01" stroke="black" strokeWidth={1} />
        </Layer>
      </Stage>
    </>
  );
};
export default App;
