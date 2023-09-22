import React from 'react'

import {
    Flex,
    Heading,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react'

import Controls from './Controls'

interface Props {
    isOpen: boolean
    onClose: () => void
}
const ControlsModal: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
      <Modal
          isOpen={isOpen}
          onClose={onClose}
          size='4xl'

          isCentered
      >
          <ModalOverlay />
          <ModalContent
              bg='#1A202C'
          >
              <ModalHeader>
                  <Heading
                      fontSize="2xl"
                      fontWeight="bold"
                      color='blue.200'
                      textAlign='center'
                  >
                      Controls
                  </Heading>
              </ModalHeader>
              <ModalBody>
                  <Flex
                      flexDirection={{ base: 'column', md: 'row' }}
                      w='100%'
                      gap={4}
                      flexWrap='wrap'
                  >
                      <Controls />
                  </Flex>
              </ModalBody>
              <ModalFooter />
          </ModalContent>
      </Modal>
  )
}

export default ControlsModal