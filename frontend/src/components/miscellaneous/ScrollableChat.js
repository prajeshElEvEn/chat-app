import { Avatar, Tooltip } from '@chakra-ui/react'
import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from '../../config/ChatLogics'
import { ChatState } from '../../context/chatProvider'

const ScrollableChat = ({ messages }) => {
    const { user } = ChatState()

    return (
        <ScrollableFeed>
            {
                messages && messages.map((m, i) => (
                    <div
                        style={{ display: 'flex' }}
                        key={m._id}
                    >
                        {
                            (isSameSender(messages, m, i, user._id)
                                || isLastMessage(messages, i, user._id)
                            ) && (
                                <Tooltip
                                    label={m.sender.name}
                                    placement="bottom-start"
                                    hasArrow
                                >
                                    <Avatar
                                        name={m.sender.name}
                                        src={m.sender.pic}
                                        size="sm"
                                        cursor={'pointer'}
                                        // m={'0 1rem 1rem 0'}
                                        mr={1}
                                        mt='1rem'
                                    />
                                </Tooltip>
                            )
                        }
                        <span
                            style={{
                                backgroundColor: `${m.sender._id === user._id ? '#bee3f8' : '#b9f5d0'
                                    }`,
                                borderRadius: '0.5rem',
                                padding: '0.5rem 0.8rem',
                                maxWidth: '75%',
                                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                            }}
                        >
                            {m.content}
                        </span>
                    </div>
                ))
            }
        </ScrollableFeed>
    )
}

export default ScrollableChat