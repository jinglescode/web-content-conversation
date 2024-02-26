import { Box, Button, Checkbox, Flex, Text, TextArea } from "@radix-ui/themes";
import { HIGHLIGHT_COLOR } from "~constants/radix";
import { useSidePanelStore } from "~lib/zustand/sidepanel";

export default function NoteTextarea({
  placeholder = "Type your new post here...",
  value = "",
  onChange = () => {},
  buttonLabel = "Post",
  buttonOnClick = () => {},
  showCheckBox = false,
  disabledTextarea = false,
  disabledButton = false,
}: {
  placeholder?: string;
  value: string;
  onChange: (event: any) => void;
  buttonLabel?: string;
  buttonOnClick?: () => void;
  showCheckBox?: boolean;
  checkboxOnChange?: () => void;
  disabledTextarea?: boolean;
  disabledButton?: boolean;
}) {
  return (
    <Flex direction="column" gap="1" justify="between" className="w-full">
      <TextArea
        placeholder={placeholder}
        style={{ height: 80 }}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabledTextarea}
      />
      <Flex justify="between">
        {/* <Flex align="center" gap="2" asChild>
          <Text as="label" size="2">
            <Checkbox />
            <Text>Shorten URL</Text>
          </Text>
        </Flex> */}

        <Box></Box>

        <Button
          size="1"
          onClick={() => buttonOnClick()}
          disabled={disabledButton}
          color={HIGHLIGHT_COLOR}
        >
          {buttonLabel}
        </Button>
      </Flex>
    </Flex>
  );
}
