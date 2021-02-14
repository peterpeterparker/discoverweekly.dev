import React, {useRef, useEffect, memo} from 'react';
import {Canvas, useFrame, useThree} from 'react-three-fiber';
import {OrbitControls} from '@react-three/drei';

import styles from './Background.module.scss';

const z = (x, y, factor) => {
  return Math.sin(x * 0.4 + y * 0.05 + factor * 0.9);
};

const Sphere = (props) => {
  const mesh = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    mesh.current.position.z = z(mesh.current.position.x, mesh.current.position.y, time);
  });

  return (
    <mesh {...props} ref={mesh}>
      <sphereGeometry attach="geometry" args={[0.1, 8, 6]} />
      <meshStandardMaterial roughness={0.1} metalness={0.1} attach="material" color="#7C3AED" />
    </mesh>
  );
};

const Camera = (props) => {
  const {camera} = useThree();

  useEffect(() => {
    camera.position.y = -30;
  }, [camera]);

  return <perspectiveCamera {...props} />;
};

const Scene = memo(({spheres}) => {
  return (
    <Canvas shadowMap>
      <Camera far={10} />

      <ambientLight intensity={1} />
      <spotLight position={[10, -100, 10]} angle={0.15} />

      <group position={[0, 0, 0]}>
        {spheres.map((sphere, i) => {
          return <Sphere position={[sphere.x, sphere.y, sphere.z]} key={`sphere-${i}`} />;
        })}
      </group>

      <OrbitControls enabled={false} />
    </Canvas>
  );
});

const Background = memo((props) => {
  return (
    <div className={`${styles.container} bg-black`}>
      <Scene {...props}></Scene>
    </div>
  );
});

export default Background;
