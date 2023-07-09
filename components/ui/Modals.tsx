"use client";

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

interface ModalProps {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const Modals = ({
  title,
  description,
  isOpen,
  onClose,
  children,
}: ModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay backdropFilter={"auto"} backdropBlur={"sm"} />
      <ModalContent alignSelf={"center"} maxW={"500px"} >
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontSize={"sm"} color={"gray"} mt={-7} mb={4}>
            {description}
          </Text>
          {children}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Modals;
