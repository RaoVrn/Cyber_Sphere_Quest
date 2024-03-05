import { useSnapshot } from 'valtio';
import { store } from '~/store';

export default function Dashboard() {
  const captures = useSnapshot(store.storedCaptures);

  return (
    <section className="h-screen flex flex-col justify-center items-center pt-20">
      <header className="flex flex-col justify-center items-center gap-2">
        <h1 className="scroll-m-20 font-extrabold tracking-tight text-3xl text-center">
          Dashboard
        </h1>

        <p className="text-lg text-gray-500 mt-2">
          You can see your captures here.
        </p>
        <button
          type="button"
          className="px-4 py-3 bg-gray-700 text-white rounded-lg w-max"
        >
          Launch Recognizer
        </button>
      </header>

      <main className="h-4/5">
        {captures.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {captures.map(capture => (
              <div
                key={capture.name}
                className="relative bg-gray-200 rounded-xl overflow-hidden"
              >
                <img
                  src={capture.capture}
                  alt="capture"
                  className="w-full h-44 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{capture.name}</h3>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-lg text-gray-500 mt-8">
            No captures yet. Try capturing your face first.
          </p>
        )}
      </main>
    </section>
  );
}
