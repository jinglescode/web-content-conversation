import { Tabs } from "@radix-ui/themes";
import FeedContent from "./FeedContent";

export default function FeedTabContainer() {
  return (
    <Tabs.Root defaultValue="page">
      <Tabs.List>
        <Tabs.Trigger value="page">Page</Tabs.Trigger>
        <Tabs.Trigger value="global">Website</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="page">
        <FeedContent isGlobal={false} />
      </Tabs.Content>
      <Tabs.Content value="global">
        <FeedContent isGlobal={true} />
      </Tabs.Content>
    </Tabs.Root>
  );
}
