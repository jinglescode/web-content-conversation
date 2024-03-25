import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import icon from "../../../../assets/icon.svg";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "24px",
        gap: "277px",
        width: "1280px",
        height: "86px",
      }}
    >
      <Logo />
      {/* <Menu /> */}
      <div
        style={{
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          padding: "4px",
          gap: "10px",
          margin: "0 auto",
          width: "400px",
          height: "38px",
        }}
      ></div>
      <Install />
    </div>
  );
}

function Logo() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "0px",
        gap: "16px",
        margin: "0 auto",
        width: "120px",
        height: "32px",
      }}
    >
      <Image
        className="h-8 w-auto"
        src={icon}
        width={32}
        height={32}
        alt="Satcom"
      />

      <span
        style={{
          fontFamily: "Trebuchet MS",
          fontStyle: "normal",
          fontWeight: "600",
          fontSize: "24px",
          lineHeight: "29px",

          display: "flex",
          alignItems: "center",

          color: "#FFFFFF",
        }}
      >
        Satcom
      </span>
    </div>
  );
}

function Menu() {
  return (
    <div
      style={{
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: "4px",
        gap: "10px",
        margin: "0 auto",
        width: "400px",
        height: "38px",
        background: "rgba(255, 255, 255, 0.33)",
        borderRadius: "1000px",
      }}
    >
      <MenuButton text={`About`} selected={true} />
      <MenuButton text={`NOSTR`} selected={false} />
      <MenuButton text={`FOSS`} selected={false} />
    </div>
  );
}

function MenuButton({ text, selected }) {
  return (
    <button
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: "0px",
        gap: "10px",

        width: "124px",
        height: "30px",

        background: selected ? "#FFFFFF" : "",
        borderRadius: "1000px",
      }}
    >
      <span
        style={{
          width: "41px",
          height: "21px",
          fontFamily: "Trebuchet MS",
          fontStyle: "normal",
          fontWeight: "500",
          fontSize: "14px",
          lineHeight: "150%",
          color: selected ? "#000000" : "#FFFFFF",
        }}
      >
        {text}
      </span>
    </button>
  );
}

function Install() {
  return (
    <Link
      href="https://chromewebstore.google.com/detail/satcom/lhoejonhkpkgnhaamjcplefkkomlldgi"
      target="_blank"
    >
      <button
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          padding: "4px",
          gap: "10px",

          margin: "0 auto",
          width: "120px",
          height: "38px",

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
          Install
        </span>
      </button>
    </Link>
  );
}
