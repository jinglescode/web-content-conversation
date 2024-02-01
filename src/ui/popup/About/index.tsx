import { GitHubLogoIcon, LightningBoltIcon } from "@radix-ui/react-icons";
import { Flex, Avatar, Heading, Text, Link } from "@radix-ui/themes";
import { APP_DESC, APP_NAME, DONATE_URL, GITHUB_URL } from "~constants/global";

export default function About() {
  return (
    <Flex gap="2" direction="column" align="center" p="4">
      <Avatar
        size="6"
        src={chrome.runtime.getURL("assets/icon.svg")}
        radius="full"
        fallback=""
        style={{ borderRadius: "initial" }}
      />
      <Heading size="7">{APP_NAME}</Heading>
      <Text align="center">{APP_DESC}</Text>
      <Flex gap="2">
        <Link href={GITHUB_URL} target="_blank" rel="noreferrer">
          <GitHubLogoIcon height="24" width="24" />
        </Link>
        <Link href={DONATE_URL} target="_blank" rel="noreferrer">
          <LightningBoltIcon height="24" width="24" />
        </Link>
      </Flex>
    </Flex>
  );
}
