import Countdown from './components/Countdown';
import Schedule from './components/Schedule';
import HeaderArt from './components/HeaderArt';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBook,
  faCode,
  faQuestion,
  faTrophy,
} from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  return (
    <div>
      <div className="relative h-[25vh] md:h-[45vh]">
        <HeaderArt />
        <div className="flex h-full w-screen items-center justify-center text-white dark:bg-black/50">
          <div className="mt-12 text-center">
            <div className="font-mono text-5xl font-semibold md:text-9xl">
              <Countdown />
            </div>
            <div className="text-2xl font-medium md:text-4xl">
              until hacking begins
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-6 grid max-w-5xl grid-cols-1 gap-8 px-4 sm:mt-12 lg:grid-cols-3">
        <div className="col-span-2">
          <h1 className="text-3xl font-semibold">TreeHacks Schedule</h1>
          <Schedule />
        </div>
        <div className="col-span-1 mb-80">
          <h1 className="text-3xl font-semibold">Welcome!</h1>
          <p className="mt-2">
            This is your home for all things TreeHacks 2025. Click the bell icon
            next to some events on the left to be notified when they happen!
            Install the web app on your phone for the best experience.
          </p>
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="flex aspect-square flex-col items-center justify-center rounded-xl border border-black/10 text-sm dark:border-white/10">
              <FontAwesomeIcon icon={faCode} size="xl" />
              <div>Devpost</div>
            </div>
            <div className="flex aspect-square flex-col items-center justify-center rounded-xl border border-black/10 text-sm dark:border-white/10">
              <FontAwesomeIcon icon={faTrophy} size="xl" />
              <div>Prizes</div>
            </div>
            <div className="flex aspect-square flex-col items-center justify-center rounded-xl border border-black/10 text-sm dark:border-white/10">
              <FontAwesomeIcon icon={faQuestion} size="xl" />
              <div>FAQs</div>
            </div>
            <div className="flex aspect-square flex-col items-center justify-center rounded-xl border border-black/10 text-sm dark:border-white/10">
              <FontAwesomeIcon icon={faBook} size="xl" />
              <div>Resources</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
