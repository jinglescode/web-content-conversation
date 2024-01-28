import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Callout, Inset } from "@radix-ui/themes";
import { useEffect } from "react";

import { HIGHLIGHT_COLOR } from "~constants/radix";
import { useAppStore } from "~lib/zustand/app";

export default function Toast() {
  const toast = useAppStore((state) => state.toast);
  const setToast = useAppStore((state) => state.setToast);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(undefined);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  if (toast == undefined) return undefined;

  return (
    <Inset clip="padding-box" side="bottom">
      <Callout.Root color={HIGHLIGHT_COLOR}>
        <Callout.Icon>
          <InfoCircledIcon />
        </Callout.Icon>
        <Callout.Text>{toast}</Callout.Text>
      </Callout.Root>
    </Inset>
  );
}
