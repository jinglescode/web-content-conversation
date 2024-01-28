import { Link } from "@radix-ui/themes";

export default function NoteLink({
  url,
  label,
}: {
  url: string;
  label: string;
}) {
  return (
    <Link
      href={url}
      target="_blank"
      rel="noreferrer"
      style={{
        overflowWrap: "anywhere",
        whiteSpace: "pre-line",
        wordBreak: "break-all",
      }}
    >
      {label}
    </Link>
  );
}
