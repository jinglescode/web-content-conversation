import { Link as RadixLink } from "@radix-ui/themes";

export default function Link({
  children,
  href,
  target = "_blank",
  className,
}: {
  children: React.ReactNode;
  href: string;
  target?: string;
  className?: string;
}) {
  return (
    <RadixLink
      href={href}
      className={className ? className : "cursor-pointer outline-none"}
      target={target}
      rel="noreferrer"
      style={{
        overflowWrap: "anywhere",
        whiteSpace: "pre-line",
        wordBreak: "break-all",
        display: "inline-flex",
      }}
    >
      {children}
    </RadixLink>
  );
}
