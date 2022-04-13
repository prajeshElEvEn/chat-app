import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box, IconButton, Text } from '@chakra-ui/react'
import React from 'react'
import { getSender, getSenderFull } from '../../config/ChatLogics'
import { ChatState } from '../../context/chatProvider'
import ProfileModal from './ProfileModal'
import UpdateGroupChatModal from './UpdateGroupChatModal'

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
    const { user, selectedChat, setSelectedChat } = ChatState()

    return (
        <>
            {
                selectedChat ? (
                    <>
                        <Text
                            fontSize={{
                                base: '28px', md: '30px'
                            }}
                            p={3}
                            w='100%'
                            fontFamily={'work sans'}
                            fontWeight={'bold'}
                            color={'blue.500'}
                            bg={'blue.50'}
                            d='flex'
                            justifyContent={{ base: 'space-between' }}
                            alignItems={'center'}
                        >
                            <IconButton
                                d={{ base: 'flex', md: 'none' }}
                                icon={<ArrowBackIcon />}
                                onClick={() => setSelectedChat('')}
                            />
                            {
                                !selectedChat.isGroupChat ? (
                                    <>
                                        {getSender(user, selectedChat.users)}
                                        <ProfileModal user={getSenderFull(user, selectedChat.users)} />
                                    </>
                                ) : (
                                    <>
                                        {selectedChat.chatName.toUpperCase()}
                                        <UpdateGroupChatModal
                                            fetchAgain={fetchAgain}
                                            setFetchAgain={setFetchAgain}
                                        />
                                    </>
                                )
                            }
                        </Text>
                        <Box
                            d={'flex'}
                            flexDir={'column'}
                            justifyContent='flex-end'
                            p={3}
                            w='100%'
                            h={'100%'}
                            borderRadius={'lg'}
                            overflowY={'hidden'}
                            bg={'#e8e8e8'}
                        >

                        </Box>
                    </>
                ) : (
                    <Box
                        d='flex'
                        alignItems={'center'}
                        justifyContent={'center'}
                        h='100%'
                    >
                        <Text
                            fontSize='3xl'
                            fontFamily={'Work Sans'}
                        >
                            Select a chat to start chatting
                        </Text>
                    </Box>
                )
            }
        </>
    )
}

export default SingleChat