import { Link } from "@radix-ui/themes";

export default function NoteLink({
  children,
  url,
}: {
  children: React.ReactNode;
  url: string;
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
      {children}
    </Link>
  );
}
