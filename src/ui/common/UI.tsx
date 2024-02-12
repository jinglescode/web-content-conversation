import { Theme } from "@radix-ui/themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ACCENT_COLOR } from "~constants/radix";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
    },
  },
});

export default function UI({ children }) {
  return (
    <div className="dark">
      <Theme
        appearance="dark"
        accentColor={ACCENT_COLOR}
        grayColor="slate"
        panelBackground="translucent"
        scaling="100%"
        radius="full"
      >
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </Theme>
    </div>
  );
}
