import {
  GitHubLogoIcon,
  HomeIcon,
  LightningBoltIcon,
} from "@radix-ui/react-icons";
import {
  Flex,
  Avatar,
  Heading,
  Text,
  Link,
  Grid,
  Separator,
} from "@radix-ui/themes";
import {
  APP_DESC,
  APP_NAME,
  DONATE_URL,
  GITHUB_URL,
  HOMEPAGE_URL,
} from "~constants/global";

export default function About() {
  return (
    <Flex gap="2" direction="column" align="center" p="4">
      <Avatar
        size="6"
        src={chrome.runtime.getURL("assets/icon.svg")}
        radius="full"
        fallback="Satcom"
        style={{ borderRadius: "initial" }}
      />
      <Heading size="7">{APP_NAME}</Heading>
      <Text align="center">{APP_DESC}</Text>

      <Separator my="4" size="4" />

      <Grid columns="3" gap="4" width="auto">
        <Link href={HOMEPAGE_URL} target="_blank" rel="noreferrer">
          <Flex gap="2" direction="column" align="center">
            <HomeIcon height="24" width="24" />
            <Text>satcom.app</Text>
          </Flex>
        </Link>
        <Link href={GITHUB_URL} target="_blank" rel="noreferrer">
          <Flex gap="2" direction="column" align="center">
            <GitHubLogoIcon height="24" width="24" />
            <Text>GitHub</Text>
          </Flex>
        </Link>
        <Link href={DONATE_URL} target="_blank" rel="noreferrer">
          <Flex gap="2" direction="column" align="center">
            <LightningBoltIcon height="24" width="24" />
            <Text>Support</Text>
          </Flex>
        </Link>
      </Grid>
    </Flex>
  );
}
