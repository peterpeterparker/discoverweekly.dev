import React, {useRef, useState, useEffect} from 'react';
import {Canvas, useFrame, useThree} from 'react-three-fiber';
import {OrbitControls} from '@react-three/drei';

import styles from './Background.module.scss';

const z = (x, y, factor) => {
  return Math.sin(x * 0.4 + y * 0.02 + factor * 0.6);
};

const Sphere = (props) => {
  const mesh = useRef();

  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    mesh.current.position.z = z(mesh.current.position.x, mesh.current.position.y, time);
  });

  return (
    <mesh
      {...props}
      ref={mesh}
      castShadow={true}
      scale={active ? [0.25, 0.25, 0.25] : [0.1, 0.1, 0.1]}
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
  });

  return <perspectiveCamera {...props} />;
};

export const Background = () => {
  const [meshs, setMeshs] = useState();

  const elements = Array.from(Array(60).keys());

  useEffect(() => {
    const spheres = [];

    elements.forEach((x) =>
      elements.forEach((y) => {
        const posX = x - elements.length / 2;
        const posY = y - elements.length / 2;
        spheres.push({x: posX, y: posY, z: z(posX, posY, 0)});
      })
    );

    setMeshs(spheres);
  }, []);

  return <div className={styles.container}>{meshs && meshs.length > 0 ? renderScene() : undefined}</div>;

  function renderScene() {
    return (
      <Canvas shadowMap>
        <Camera position={[0, 250, 50]} far={50} />

        <ambientLight intensity={1} />
        <spotLight position={[10, 10, 10]} angle={0.15} />

        <group position={[0, 0, 0]}>
          {meshs.map((sphere, i) => {
            return <Sphere position={[sphere.x, sphere.y, sphere.z]} key={`sphere-${i}`}/>;
          })}
        </group>

        <OrbitControls enabled={false}/>
      </Canvas>
    );
  }
};
