import React, {useRef, useState, useEffect} from 'react';
import {Canvas, useFrame, useThree} from 'react-three-fiber';
import {OrbitControls, Stars} from '@react-three/drei';

import styles from './Background.module.scss';

const Box = (props) => {
  const mesh = useRef();

  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    mesh.current.position.z = Math.sin(mesh.current.position.x * 0.2 + mesh.current.position.x * 0.15 + time * 0.2);
  });

  return (
    <mesh
      {...props}
      ref={mesh} castShadow={true}
      scale={active ? [0,15, 0,15, 0,15] : [0.1, 0.1, 0.1]}
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}>
      <sphereGeometry attach="geometry" args={[1, 16, 16]} />
      <meshStandardMaterial roughness={0.1} metalness={0.1} attach="material" color={hovered ? '#ec407a' : '#f4511e'} />
    </mesh>
  );
};

const Camera = (props) => {
  const {camera} = useThree();

  useFrame((state) => {
    const rate = -0.03;
    camera.position.y = Math.max(camera.position.y + rate, -30);

    console.log(camera.position.y);
  });

  return <perspectiveCamera {...props} />;
};

export const Background = () => {
  const [meshs, setMeshs] = useState();

  let i, j, k, l, star, starsMaterial, starField;
  const space = 35;

  useEffect(() => {
    const tmp = [];

    for (i = k = -30; k <= 30; i = ++k) {
      for (j = l = -30; l <= 30; j = ++l) {
        tmp.push({
          x: i,
          y: j,
          z: Math.random() * 10,
        });
      }
    }

    setMeshs(tmp);
  }, []);

  return <div className={styles.container}>{meshs && meshs.length > 0 ? renderScene() : undefined}</div>;

  function renderScene() {
    return (
      <Canvas shadowMap>
          <Camera position={[0, 250, 50]} far={50} />

          <ambientLight intensity={1} />
          <spotLight position={[10, 10, 10]} angle={0.15} />

          <group position={[0, 0, 0]}>
          {meshs.map((box, i) => {
            return <Box position={[box.x, box.y, box.z]} key={'yolo-' + i} />;
          })}

          {/*<Box position={[meshs[0].x, meshs[0].y, meshs[0].z]} />*/}
          {/*<Box position={[-0.175, 0.615747330874139, -0.14]} />*/}
        </group>

        <OrbitControls />
      </Canvas>
    );
  }
};
