'use client';

import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { PMREMGenerator } from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

/** Bake studio reflections once per renderer; no external HDR or per-frame cube capture. */
export function StudioEnvironment() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const previous = scene.environment;
    const room = new RoomEnvironment();
    const generator = new PMREMGenerator(gl);
    const target = generator.fromScene(room, 0.04);
    scene.environment = target.texture;
    room.dispose();
    generator.dispose();
    return () => {
      scene.environment = previous;
      target.dispose();
    };
  }, [gl, scene]);
  return null;
}
