import {
  Text,
  Button,
  IconButton,
  IconButtonProps,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";

type SettingsButtonProps = Omit<IconButtonProps, "aria-label">;

export const SettingsButton: React.FC<SettingsButtonProps> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const SettingsButtonClicked = () => {
    console.log("Settings button clicked");
    onOpen();
  };

  return (
    <>
      <IconButton
        aria-label={""}
        size="md"
        onClick={SettingsButtonClicked}
        fontSize="lg"
        variant="ghost"
        color="current"
        marginLeft="2"
        icon={<SettingsIcon />}
        {...props}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Hello World!</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
