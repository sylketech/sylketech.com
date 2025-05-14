import Link from "next/link";

export default function HomePage() {
  return (
    <main className="bg-brand-graphite px-8 py-6 h-dvh flex items-center justify-center">
      <div className="max-w-xl space-y-6">
        <h1 className="flex flex-col md:flex-row text-3xl font-semibold leading-7 select-none text-brand-pale-white [&_span:last-child]:text-brand-light-gray">
          <span className="md:mr-2">SYLKE</span>
          <span>TECH</span>
        </h1>
        <p className="text-brand-light-gray">
          Free and open source building blocks for secure, privacy-first web applications.
        </p>
        <Link
          href="https://github.com/sylketech"
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-azure hover:text-brand-blue transition-colors"
        >
          GitHub
        </Link>
      </div>
    </main>
  );
}
