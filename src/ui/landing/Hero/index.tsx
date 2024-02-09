import { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import icon from "../../../../assets/icon.svg";
import heroImage from "../../../../assets/landing-hero.png";
import chromestore from "../../../../assets/chrome-web-store.png";
import Image from "next/image";
import Link from "next/link";
import { DONATE_URL, GITHUB_URL } from "~constants/global";

const navigation = [
  { name: "GitHub Repo", href: GITHUB_URL },
  { name: "Donate", href: DONATE_URL },
];

export default function Hero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <div className="mx-auto max-w-7xl">
          <div className="px-6 pt-6 lg:max-w-2xl lg:pl-8 lg:pr-0">
            <nav
              className="flex items-center justify-between lg:justify-start gap-2"
              aria-label="Global"
            >
              <Image
                className="h-8 w-auto"
                src={icon}
                width={32}
                height={32}
                alt="Satcom"
              />
              <span className="text-xl">Satcom</span>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700 lg:hidden"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
              <div className="hidden lg:ml-12 lg:flex lg:gap-x-14">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-sm font-semibold leading-6 text-gray-900"
                    target="_blank"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </div>
      </header>

      <div className="relative h-screen">
        <div className="mx-auto max-w-7xl">
          <div className="relative z-10 pt-14 lg:w-full lg:max-w-2xl">
            <svg
              className="absolute inset-y-0 right-8 hidden h-full w-80 translate-x-1/2 transform fill-white lg:block"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="0,0 90,0 50,100 0,100" />
            </svg>

            <div className="relative px-6 py-32 sm:py-40 lg:px-8 lg:py-56 lg:pr-0">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
                <div className="hidden sm:mb-10 sm:flex">
                  {/* <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-500 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                    Announcement{" "}
                    <Link
                      href="#"
                      className="whitespace-nowrap font-semibold text-indigo-600"
                      target="_blank"
                    >
                      <span className="absolute inset-0" aria-hidden="true" />
                      Read more <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </div> */}
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  Adding collaborative layer to your Internet browsing
                  experience
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Enabling collaborative knowledge sharing by integrating web
                  content and online discussions, transforming the way we engage
                  with information on the web.
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <Link
                    href="https://chromewebstore.google.com/detail/satcom/lhoejonhkpkgnhaamjcplefkkomlldgi"
                    target="_blank"
                  >
                    <Image
                      className="w-auto h-16"
                      src={chromestore}
                      width={206}
                      height={58}
                      alt="chrome web store"
                    />
                  </Link>
                  {/* <a
                    href="#"
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Start
                  </a>
                  <a
                    href="#"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Learn more <span aria-hidden="true">→</span>
                  </a> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <Image
            className="aspect-[3/2] object-cover lg:aspect-auto lg:h-full lg:w-full"
            src={heroImage}
            width={512}
            height={512}
            alt="demo"
          />
        </div>
      </div>
    </div>
  );
}
