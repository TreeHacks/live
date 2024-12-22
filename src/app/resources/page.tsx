import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBook,
  faCode,
  faQuestion,
  faTrophy,
} from '@fortawesome/free-solid-svg-icons';
import HeaderArt from '../components/HeaderArt';
import Countdown from '../components/Countdown';
import Link from 'next/link';

const HACK_PACKS = [
  {
    title: 'Mobile App (React Native)',
    url: 'https://github.com/TreeHacks/hackpack-react-native',
  },
  {
    title: 'iOS App (Swift)',
    url: 'https://github.com/TreeHacks/hackpack-swift-ui',
  },
  {
    title: 'Android App (Kotlin)',
    url: 'https://github.com/TreeHacks/hackpack-android-kotlin',
  },
  {
    title: 'Computer Vision (ML)',
    url: 'https://github.com/TreeHacks/computer-vision-hackpack',
  },
  {
    title: 'Web & Firebase',
    url: 'https://github.com/TreeHacks/hackpack-web-firebase',
  },
  {
    title: 'Hardware',
    url: 'https://github.com/TreeHacks/hardware_hackpack',
  },
  {
    title: 'Botnet',
    url: 'https://github.com/TreeHacks/botnet-hackpack',
  },
  {
    title: 'Chrome Extension',
    url: 'https://github.com/TreeHacks/hackpack-chrome-ext',
  },
  {
    title: 'iOS ARKit',
    url: 'https://github.com/TreeHacks/hackpack-arkit',
  },
  {
    title: 'iOS ResearchKit',
    url: 'https://github.com/TreeHacks/hackpack-researchkit',
  },
  {
    title: 'Machine Learning',
    url: 'https://github.com/TreeHacks/hackpack-researchkit',
  },
  {
    title: 'Web API',
    url: 'https://github.com/TreeHacks/hackpack-web-api',
  },
  {
    title: 'NextJS',
    url: 'https://github.com/TreeHacks/hackpack-web-next',
  },
];

function HackPack({ title, url }: { title: string; url: string }) {
  return (
    <Link
      href={url}
      target="_blank"
      className="transform rounded-lg border border-black/10 bg-theme-200 p-2 transition hover:scale-105 dark:border-white/10"
    >
      {title}
    </Link>
  );
}

export default function Home() {
  return (
    <div>
      <div className="relative h-[25vh] md:h-[45vh]">
        <HeaderArt />
        <div className="flex h-full w-screen items-center justify-center text-white dark:bg-black/50">
          <div className="mt-12 text-center">
            <div className="text-5xl font-semibold md:text-9xl">Resources</div>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-6 grid max-w-5xl grid-cols-1 gap-6 px-4 sm:mt-12 md:grid-cols-2">
        <div className="col-span-1">
          <h1 className="text-3xl font-semibold">Useful Links</h1>
          <p className="mt-2">
            Here&apos;s a collection of useful links for use during the event.
          </p>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2"></div>
        </div>
        <div className="col-span-1">
          <h1 className="text-3xl font-semibold">Hack Packs</h1>
          <p className="mt-2">
            Quickly start your project with one of our pre-made hack pack
            templates.
          </p>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            {HACK_PACKS.map((hackPack) => (
              <HackPack key={hackPack.title} {...hackPack} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
