import { Circle, Layer, Rect, Stage } from 'react-konva';

const Home = () => {
  return (
    <Stage width={500} height={500}>
      <Layer>
        <Rect stroke="black" strokeWidth={1} x={0} y={0} width={500} height={500} />
        <Circle fill="red" x={200} y={200} radius={150} />{' '}
      </Layer>
    </Stage>
  );
};

export default Home;
