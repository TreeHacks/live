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
      <div className="h-[25vh] md:h-[45vh] relative">
        <HeaderArt />
        <div className="w-screen h-full flex items-center justify-center text-white dark:bg-black/50">
          <div className="text-center mt-12">
            <div className="text-5xl md:text-9xl font-semibold font-mono">
              <Countdown />
            </div>
            <div className="font-medium text-2xl md:text-4xl">
              until hacking begins
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 max-w-5xl mx-auto sm:mt-12 mt-6">
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
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="border border-black/10 dark:border-white/10 aspect-square flex flex-col items-center justify-center rounded-xl text-sm">
              <FontAwesomeIcon icon={faCode} size="xl" />
              <div>Devpost</div>
            </div>
            <div className="border border-black/10 dark:border-white/10 aspect-square flex flex-col items-center justify-center rounded-xl text-sm">
              <FontAwesomeIcon icon={faTrophy} size="xl" />
              <div>Prizes</div>
            </div>
            <div className="border border-black/10 dark:border-white/10 aspect-square flex flex-col items-center justify-center rounded-xl text-sm">
              <FontAwesomeIcon icon={faQuestion} size="xl" />
              <div>FAQs</div>
            </div>
            <div className="border border-black/10 dark:border-white/10 aspect-square flex flex-col items-center justify-center rounded-xl text-sm">
              <FontAwesomeIcon icon={faBook} size="xl" />
              <div>Resources</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
