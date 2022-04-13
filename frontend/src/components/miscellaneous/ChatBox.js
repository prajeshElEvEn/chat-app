import { Box } from '@chakra-ui/react'
import React from 'react'
import { ChatState } from '../../context/chatProvider'
import SingleChat from './SingleChat'

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
    const { selectedChat } = ChatState()

    return (
        <Box
            d={
                {
                    base: selectedChat ? 'flex' : 'none', md: 'flex'
                }
            }
            alignItems={'center'}
            flexDir={'column'}
            p={'3'}
            bg={'blue.50'}
            w={
                {
                    base: '100%', md: '68%'
                }
            }
            borderRadius={'lg'}
        >
            <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        </Box>
    )
}

export default ChatBox