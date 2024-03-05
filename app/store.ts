import type { FaceLandmarkerResult } from '@mediapipe/tasks-vision';
import { proxy } from 'valtio';

interface Capture {
  name: string;
  capture: string;
  landMarks: FaceLandmarkerResult;
}

export const store = proxy({
  capture: null as string | null,
  name: 'Jatin',
  setName(name: string) {
    store.name = name;
  },
  setCapture(capture: string | null) {
    store.capture = capture;
  },
  storedCaptures: [] as Capture[],
  addCapture(capture: Capture) {
    store.storedCaptures.push(capture);
  },
});
