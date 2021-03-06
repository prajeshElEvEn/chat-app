import { Avatar, Box, Text } from '@chakra-ui/react'
import React from 'react'

const UserListItem = ({ user, handleFunction }) => {
    return (
        <Box
            onClick={handleFunction}
            cursor='pointer'
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
            p={'0.5rem 1rem'}
            mb={'1rem'}
        >
            <Avatar
                size={'sm'}
                cursor='pointer'
                name={user.name}
                src={user.pic}
                mr={'1rem'}
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