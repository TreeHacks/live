import HeaderArt from '../components/HeaderArt';

export default function FAQPage() {
  return (
    <div>
      <div className="relative h-[25vh] md:h-[45vh]">
        <HeaderArt />
        <div className="flex h-full w-screen items-center justify-center text-white dark:bg-black/50">
          <div className="mt-12 text-center">
            <div className="text-5xl font-semibold md:text-9xl">FAQs</div>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-6 max-w-5xl px-4 sm:mt-12">
        <iframe
          src="https://docs.google.com/document/d/e/2PACX-1vTblhMTCppm9vU9ouA6BQJt2mBK4srbLj5mokJ85-IghAYPyZHYt7aUkFI0BeGp2vtVZImAJtABt9mH/pub"
          className="h-[80vh] w-full rounded-xl border-0 bg-white"
        />
      </div>
    </div>
  );
}
