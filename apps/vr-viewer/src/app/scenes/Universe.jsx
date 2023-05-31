import Character from 'components/Character';
import Light from 'components/Light';
import Skybox from 'components/Skybox';
import Terrain from 'components/Terrain';

const Universe = () => {
  return (
    <>
      <Skybox />
      <Light />
      <Terrain />
      <Character />
    </>
  );
};

export default Universe;
