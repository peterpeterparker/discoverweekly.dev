import {z} from "../utils/scene.utils";

export const getSpheres = () => {
  const elements = Array.from(Array(30).keys());

  const spheres = [];

  elements.forEach((x) =>
    elements.forEach((y) => {
      const posX = x - elements.length / 2;
      const posY = y - elements.length / 2;
      spheres.push({x: posX, y: posY, z: z(posX, posY, 0)});
    })
  );

  return spheres;
};
