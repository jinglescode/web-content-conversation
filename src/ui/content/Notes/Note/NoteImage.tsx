import { useState } from "react";
import NoteLink from "./NoteLink";

export default function NoteImage({ src }: { src: string }) {
  const [hasError, setHasError] = useState<boolean>(false);

  return (
    <>
      {hasError ? (
        <NoteLink url={src}>{src}</NoteLink>
      ) : (
        <img
          src={src}
          alt={src}
          loading="lazy"
          decoding="async"
          style={{ contentVisibility: "auto" }}
          className="object-cover w-full h-auto rounded-xl"
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            console.log("err image", src);
            setHasError(true);
          }}
        />
      )}
    </>
  );
}
