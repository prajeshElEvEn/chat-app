import { useToast, Box, Button, Stack, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { ChatState } from '../../context/chatProvider'
import axios from 'axios'
import { AddIcon } from '@chakra-ui/icons'
import ChatLoading from './ChatLoading'
import { getSender } from '../../config/ChatLogics'
import GroupChatModal from './GroupChatModal'

const MyChats = ({ fetchAgain }) => {
    const [loggedUser, setLoggedUser] = useState()
    const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState()

    const toast = useToast()

    const fetchChats = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                }
            }

            const { data } = await axios.get('/api/chat', config)
            // console.log(data)
            setChats(data)
        } catch (error) {
            toast({
                title: 'Something went wrong.',
                description: 'Could not fetch chats.',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom-left',
            })
        }
    }

    useEffect(() => {
        setLoggedUser(JSON.parse(localStorage.getItem('userInfo')))
        fetchChats()
    }, [fetchAgain])

    return (
        <Box
            d={
                {
                    base: selectedChat ? 'none' : 'flex', md: 'flex'
                }
            }
            flexDir={'column'}
            alignItems={'center'}
            p={'3'}
            bg={'blue.50'}
            w={
                { base: '100%', md: '30%' }
            }
            borderRadius={'lg'}
        >
            <Box
                p='3'
                fontFamily={'Work Sans'}
                d='flex'
                w={'100%'}
                justifyContent='space-between'
                alignItems={'center'}
                fontSize={{
                    base: '28px', md: '30px'
                }}
                color={'blue.500'}
                fontWeight={'bold'}
            >
                My Chats
                <GroupChatModal>
                    <Button
                        d='flex'
                        bg={'blue.500'}
                        color={'white'}
                        rightIcon={<AddIcon />}
                        fontSize={
                            { base: '17px', md: '10px', lg: '17px' }
                        }
                    >
                        New Group Chat
                    </Button>
                </GroupChatModal>
            </Box>
            <Box
                d={'flex'}
                flexDir={'column'}
                w={'100%'}
                h={'100%'}
                p={'3'}
                bg={'#f8f8f8'}
                borderRadius={'lg'}
                overflowY={'hidden'}
            >
                {chats ? (
                    <Stack
                        overflowY={'scroll'}
                    >
                        {chats.map((chat) => (
                            <Box
                                onClick={() => setSelectedChat(chat)}
                                cursor='pointer'
                                bg={selectedChat === chat ? '#38b2ac' : '#e8e8e8'}
                                color={selectedChat === chat ? 'white' : 'black'}
                                p={'2'}
                                borderRadius={'lg'}
                                key={chat._id}
                            >
                                <Text>
                                    {!chat.isGroupChat ? (getSender(loggedUser, chat.users)) : (chat.chatName)}
                                </Text>
                            </Box>
                        ))}
                    </Stack>
                ) : (<ChatLoading />)}
            </Box>
        </Box>
    )
}

export default MyChats