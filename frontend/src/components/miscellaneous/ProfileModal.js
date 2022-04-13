import React from 'react'
import { useDisclosure } from '@chakra-ui/hooks'
import { IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Image, Text } from '@chakra-ui/react'
import { ViewIcon } from '@chakra-ui/icons'

const ProfileModal = ({ user, children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            {
                children ? (
                    <span onClick={onOpen}>
                        {children}
                    </span>
                ) : (
                    <IconButton
                        d={{ base: 'flex' }}
                        icon={<ViewIcon />}
                        onClick={onOpen}
                    />
                )
            }

            <Modal
                size={'lg'}
                isOpen={isOpen}
                onClose={onClose}
                isCentered
            >
                <ModalOverlay />
                <ModalContent
                    h={'30rem'}
                    bg={'blue.50'}
                    color={'blue.500'}
                >
                    <ModalHeader
                        d={'flex'}
                        justifyContent={'center'}
                        fontFamily={'Work Sans'}
                        fontWeight={'bold'}
                        fontSize={'2xl'}
                    >
                        {user.name}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody
                        d={'flex'}
                        flexDirection={'column'}
                        alignItems={'center'}
                        justifyContent={'center'}
                    // bg={'blue.100'}
                    >
                        <Image
                            borderRadius='full'
                            boxSize={'150px'}
                            src={user.pic}
                            alt={user.name}
                        />
                        <Text
                            p={'1rem'}
                            fontFamily={'Work Sans'}
                            fontWeight={'medium'}
                            fontSize={{ base: '1rem', md: '1.2rem' }}
                        >
                            {user.email}
                        </Text>
                    </ModalBody>

                    {/* <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter> */}
                </ModalContent>
            </Modal>
        </>
    )
}

export default ProfileModal