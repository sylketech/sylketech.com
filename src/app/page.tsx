import Link from "next/link";

export default function HomePage() {
  return (
    <main className="bg-brand-pale-white dark:bg-brand-graphite px-8 py-6 h-dvh flex items-center justify-center">
      <div className="max-w-xl space-y-6">
        <h1 className="flex flex-col md:flex-row text-3xl font-semibold leading-7 select-none text-brand-graphite dark:text-brand-pale-white">
          SYLKE TECH
        </h1>
        <p className="text-gray-700 dark:text-gray-300">
          Free and open source building blocks for secure, privacy-first web applications.
        </p>
        <Link
          href="https://github.com/sylketech"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-600 transition-colors"
        >
          GitHub
        </Link>
      </div>
    </main>
  );
}
