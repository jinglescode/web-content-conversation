import UiLanding from "~ui/landing";
import Head from "next/head";

export default function IndexPage() {
  return (
    <>
      <Head>
        <title>
          Satcom - Adding collaborative layer to your Internet browsing
          experience.
        </title>
        <meta
          name="description"
          content="Enabling collaborative knowledge sharing by integrating web content and online discussions, transforming the way we engage with information on the web."
        />
        <link
          rel="icon"
          href="https://raw.githubusercontent.com/jinglescode/web-content-conversation/main/assets/icon.png"
          sizes="any"
        />
        <meta name="author" content="Jingles (jingles.dev)" />
      </Head>
      <UiLanding />
    </>
  );
}
