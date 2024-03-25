import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Hero() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "0px",
        gap: "40px",
        isolation: "isolate",
        width: "946px",
        height: "802px",
        position: "relative",
      }}
    >
      <Title />
      <Bubble3 />
      <Bubble4 />
    </div>
  );
}

function Title() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "0px",
        gap: "16px",
        isolation: "isolate",
        width: "673px",
        height: "199px",
        position: "relative",
      }}
    >
      <span
        style={{
          width: "673px",
          height: "154px",
          fontFamily: "Trebuchet MS",
          fontStyle: "normal",
          fontWeight: "600",
          fontSize: "64px",
          lineHeight: "77px",
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          color: "#FFFFFF",
        }}
      >
        The internet's comment section
      </span>

      <span
        style={{
          width: "628px",
          height: "29px",
          fontFamily: "Trebuchet MS",
          fontStyle: "normal",
          fontWeight: "600",
          fontSize: "24px",
          lineHeight: "29px",
          display: "flex",
          alignItems: "center",
          color: "rgba(255, 255, 255, 0.66)",
        }}
      >
        Comment on any webpage, for anyone on NOSTR to see
      </span>

      <Link
        href="https://chromewebstore.google.com/detail/satcom/lhoejonhkpkgnhaamjcplefkkomlldgi"
        target="_blank"
      >
        <button
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "flex-start",
            padding: "16px 24px",
            gap: "16px",
            width: "307px",
            height: "51px",
            background: "rgba(255, 255, 255, 0.33)",
            borderRadius: "1000px",
          }}
        >
          <ArrowDownTrayIcon
            style={{ width: "16px", height: "16px", color: "#FFFFFF" }}
          />
          <span
            style={{
              fontFamily: "Trebuchet MS",
              fontStyle: "normal",
              fontWeight: "600",
              fontSize: "16px",
              lineHeight: "19px",
              display: "flex",
              alignItems: "center",
              color: "#FFFFFF",
            }}
          >
            Install Browser Extension
          </span>
        </button>
      </Link>

      <Bubble1 />
      <Bubble2 />
    </div>
  );
}

function Bubble1() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "8px 16px",

        position: "absolute",
        width: "115px",
        height: "38px",
        left: "-11.01px",
        top: "-19.4px",

        background: "#ECEFF7",
        borderRadius: "100px 19px 4px 100px",
        transform: "rotate(15.17deg)",
      }}
    >
      <span>⚡ Zap Zap</span>
    </div>
  );
}

function Bubble2() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "8px 16px",

        position: "absolute",
        width: "107px",
        height: "38px",
        left: "571.03px",
        top: "15.14px",

        background: "#ECEFF7",
        borderRadius: "19px 48px 48px 4px",
        transform: "rotate(-15.89deg)",
      }}
    >
      <span>Hell yeah!</span>
    </div>
  );
}

function Bubble3() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "8px 16px",

        position: "absolute",
        width: "153px",
        height: "38px",
        left: "28.99px",
        top: "66.6px",

        background: "#ECEFF7",
        borderRadius: "19px 19px 4px 19px",
        transform: "rotate(3.79deg)",
      }}
    >
      <span>Freedoooom! 💪</span>
    </div>
  );
}

function Bubble4() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "8px 16px",

        position: "absolute",
        width: "158px",
        height: "38px",
        left: "764.5px",
        top: "70.93px",

        background: "#ECEFF7",
        borderRadius: "19px 48px 48px 4px",
        transform: "rotate(-3.71deg)",
      }}
    >
      <span>Great website 😍</span>
    </div>
  );
}
