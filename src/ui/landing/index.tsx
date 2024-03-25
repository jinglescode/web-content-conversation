import Demo from "./Demo";
import Header from "./Header";
import Hero from "./Hero";

export default function UiLanding() {
  return (
    <div
      className="h-screen flex flex-col items-center"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "0px",
        gap: "64px",

        background: "#0066FF",
        borderRadius: "0px",
      }}
    >
      <Header />
      <Hero />
      <Demo />
    </div>
  );
}
