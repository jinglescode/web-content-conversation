import {
  Cross1Icon,
  GearIcon,
  GlobeIcon,
  ReaderIcon,
} from "@radix-ui/react-icons";
import { Avatar, Box, Button, Flex, Text } from "@radix-ui/themes";
import { useNostrStore } from "~lib/zustand/nostr";
import { useSidePanelStore } from "~lib/zustand/sidepanel";
import { SidePanelScreens } from "~types/sidepanel/SidePanelScreens";
import UserAvatar from "~ui/common/UserAvatar";

export default function TopBar() {
  const user = useNostrStore((state) => state.user);
  const currentTab = useSidePanelStore((state) => state.currentTab);
  const currentScreen = useSidePanelStore((state) => state.currentScreen);
  const setCurrentScreen = useSidePanelStore((state) => state.setCurrentScreen);

  if (currentTab === undefined) return <></>;

  return (
    <Flex gap="2" justify="between" className="">
      <Box>
        <Flex gap="1">
          <Text
            as="div"
            size="2"
            weight="bold"
            className="text-ellipsis overflow-hidden h-10"
          >
            {currentScreen == SidePanelScreens.Menu &&
              `Satcom - Adding collaborative layer to you Internet browsing experience`}
            {currentScreen == SidePanelScreens.Feed && (
              <div
                onClick={() => setCurrentScreen(SidePanelScreens.GlobalFeed)}
              >
                {currentTab.title}
              </div>
            )}
            {currentScreen == SidePanelScreens.GlobalFeed && (
              <div
                onClick={() => setCurrentScreen(SidePanelScreens.Feed)}
              >{`Global Feed - ${currentTab.domain}`}</div>
            )}
            {currentScreen == SidePanelScreens.NewNote &&
              `New Note - ${currentTab.title}`}
          </Text>
        </Flex>
      </Box>
      <Button
        variant="soft"
        onClick={() => {
          if (currentScreen != SidePanelScreens.Menu) {
            setCurrentScreen(SidePanelScreens.Menu);
          } else {
            setCurrentScreen(SidePanelScreens.Feed);
          }
        }}
      >
        {currentScreen == SidePanelScreens.Menu ? <Cross1Icon /> : <GearIcon />}
      </Button>
    </Flex>
  );
}
