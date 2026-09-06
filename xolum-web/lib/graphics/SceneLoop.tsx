'use client';
import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';

/** A single paced render loop. Pauses also stop useFrame and the scene clock. */
export function SceneLoop({ running, fps }: { running: boolean; fps: number }) {
  const advance = useThree(s => s.advance);
  const clock = useThree(s => s.clock);
  useEffect(() => {
    if (!running || fps <= 0) return;
    let id = 0;
    let previous = performance.now();
    let next = previous;
    let elapsed = clock.elapsedTime;
    function tick(now: number) {
      if (now >= next) {
        elapsed += Math.min((now - previous) / 1000, 0.1);
        previous = now;
        next += 1000 / fps;
        if (next < now - 1000 / fps) next = now + 1000 / fps;
        advance(elapsed);
      }
      id = requestAnimationFrame(tick);
    }
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [running, fps, advance, clock]);
  return null;
}
