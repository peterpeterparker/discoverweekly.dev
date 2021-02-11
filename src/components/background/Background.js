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
    // mesh.current.position.z = Math.sin(mesh.current.position.x * 0.2 + mesh.current.position.x * 0.15 + time * 0.2);
  });

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial metalness={0.1} attach="material" color={hovered ? '#ec407a' : '#f4511e'} />
    </mesh>
  );
};

function rn(start, end) {
  if (start == null) start = 0;
  if (end == null) end = 1;
  return start + Math.random() * (end - start);
}

const Camera = (props) => {
  const {camera} = useThree();

  useFrame((state) => {
    const rate = 0.03;
    // camera.position.y += (-1 * rate);
    // camera.position.z += (-1 * rate);

    // camera.lookAt(0,0,0)
  });

  return <perspectiveCamera {...props} />;
};

export const Background = () => {
  const [meshs, setMeshs] = useState();

  let i, j, k, l, star, starsMaterial, starField;
  const space = 35;

  useEffect(() => {
    const tmp = [];

    for (i = -2; i <= 2; i += 0.2) {
      for (j = -2; j <= 2; j += 0.2) {
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
      <Canvas>

          <ambientLight intensity={1} />
          <spotLight position={[10, 10, 10]} angle={0.15} />

          <group position={[0, 0, 0]}>
          {/*{meshs.map((box, i) => {*/}
          {/*  return <Box position={[box.x, box.y, box.z]} key={'yolo-' + i} />;*/}
          {/*})}*/}

          {/*<Box position={[meshs[0].x, meshs[0].y, meshs[0].z]} />*/}
          {/*<Box position={[-0.175, 0.615747330874139, -0.14]} />*/}
        </group>

          <Box position={[-1.2, 0, 0]} />
          <Box position={[1.2, 0, 0]} />

        <OrbitControls />

        <Stars
            radius={1}
            depth={50}
            count={5000}
            factor={4}
            saturation={0}
            fade={true}
        />
      </Canvas>
    );
  }
};
