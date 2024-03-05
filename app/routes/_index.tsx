import { FaceLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';
import type { MetaFunction } from '@vercel/remix';
import { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { useSnapshot } from 'valtio';
import { store } from '~/store';

export const meta: MetaFunction = () => {
  return [{ title: 'Face Recogniton' }];
};

export default function Index() {
  const webCamRef = useRef<Webcam>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const snap = useSnapshot(store);

  const [landmarker, setLandmarker] = useState<FaceLandmarker | null>(null);

  useEffect(() => {
    (async () => {
      const fileSetResolver = await FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm'
      );

      const landMarker = await FaceLandmarker.createFromOptions(
        fileSetResolver,
        {
          baseOptions: {
            modelAssetPath:
              'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',
            delegate: 'GPU',
          },
          outputFaceBlendshapes: true,
          runningMode: 'IMAGE',
          numFaces: 1,
        }
      );

      setLandmarker(landMarker);
    })();
  }, []);

  const handleCapture = () => {
    const imageSrc = webCamRef.current?.getScreenshot();
    if (imageSrc) {
      store.setCapture(imageSrc);
    }
  };

  const handleRetake = () => {
    store.setCapture(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const capture = snap.capture;

    if (!capture || !landmarker || !imageRef.current) {
      return;
    }

    const landMarkerResult = landmarker.detect(imageRef.current);

    console.log(landMarkerResult);

    const form = e.currentTarget;
    const formData = new FormData(form);

    store.addCapture({
      name: String(formData.get('name')),
      capture,
      landMarks: landMarkerResult,
    });
    store.setCapture(null);
    form.reset();
  };

  return (
    <section className="h-screen flex flex-col justify-center items-center gap-8">
      <h1 className="scroll-m-20 text-4xl font-bold tracking-tight first:mt-0">
        Register your face to get started
      </h1>
      <div className="h-1/2 aspect-video overflow-hidden flex justify-center items-center rounded-xl relative bg-gray-200 border border-gray-400">
        {snap.capture && (
          <img
            ref={imageRef}
            className="absolute z-10"
            src={snap.capture}
            alt="capture"
          />
        )}
        <canvas ref={canvasRef} className="absolute z-10 w-full h-full" />
        <Webcam
          ref={webCamRef}
          className="w-full absolute"
          mirrored
          audio={false}
          screenshotFormat="image/jpeg"
          // onUserMedia={stream => {
          //   const video = stream.getVideoTracks()[0];
          //   // const video = webCamRef.current?.video;
          //   // if (!video) {
          //   //   return;
          //   // }
          //   // video.width = video.videoWidth;
          //   // video.height = video.videoHeight;
          // }}
        />
        <button
          type="button"
          className="absolute z-10 bottom-4 right-4 px-4 py-3 bg-gray-700 text-white rounded-lg"
          onClick={snap.capture ? handleRetake : handleCapture}
        >
          {snap.capture ? 'Retake' : 'Capture'}
        </button>
      </div>
      <form className="flex gap-2" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          className="px-4 py-3 border-2 border-gray-300 rounded-lg focus-within:outline-gray-700"
          minLength={3}
          required
        />
        <button
          type="submit"
          className="px-4 py-3 bg-gray-700 text-white rounded-lg"
        >
          Register Face
        </button>
      </form>
    </section>
  );
}
