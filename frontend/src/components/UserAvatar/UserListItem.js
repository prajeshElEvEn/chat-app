import { Avatar, Box, Text } from '@chakra-ui/react'
import React from 'react'

const UserListItem = ({ user, handleFunction }) => {
    return (
        <Box
            onClick={handleFunction}
            curson='pointer'
            bg='#e8e8e8'
            _hover={{
                background: '#38b2ac',
                color: 'white'
            }}
            w='100%'
            d='flex'
            alignItems={'center'}
            color='black'
            borderRadius={'lg'}
        >
            <Avatar
                size={'sm'}
                cursor='pointer'
                name={user.name}
                src={user.pic}
            />
            <Box>
                <Text>
                    {user.name}
                </Text>
                <Text
                    fontSize='xs'
                >
                    {user.email}
                </Text>
            </Box>
        </Box>
    )
}

export default UserListItem