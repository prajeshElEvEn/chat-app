import { Box } from '@chakra-ui/react'
import React, { useState } from 'react'
import ChatBox from '../components/miscellaneous/ChatBox'
import MyChats from '../components/miscellaneous/MyChats'
import SideDrawer from '../components/miscellaneous/SideDrawer'
import { ChatState } from '../context/chatProvider'

const ChatPage = () => {
    const { user } = ChatState()
    const [fetchAgain, setFetchAgain] = useState(false)

    return (
        <div style={
            { width: '100%' }
        }>
            {user && <SideDrawer />}
            <Box
                d='flex'
                justifyContent={'space-between'}
                w='100%'
                h='91.5vh'
                p={'1rem'}
            >
                {user && <MyChats fetchAgain={fetchAgain} />}
                {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
            </Box>
        </div>
    )
}

export default ChatPage