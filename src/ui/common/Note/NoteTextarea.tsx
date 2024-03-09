import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  IconButton,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
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
  size = "2",
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
  size?: "2" | "3";
}) {
  return (
    <Flex direction="column" gap="1" justify="between" className="w-full">
      <TextField.Root>
        <TextField.Input
          placeholder={placeholder}
          size={size}
          radius="large"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
        <TextField.Slot pr="3">
          <IconButton
            size="2"
            variant="ghost"
            onClick={() => buttonOnClick()}
            disabled={disabledButton}
          >
            <PaperAirplaneIcon height="16" width="16" />
          </IconButton>
        </TextField.Slot>
      </TextField.Root>
    </Flex>
  );

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
