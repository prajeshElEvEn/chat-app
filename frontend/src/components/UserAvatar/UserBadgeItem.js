import { CloseIcon } from '@chakra-ui/icons'
import { Box } from '@chakra-ui/react'
import React from 'react'

const UserBadgeItem = ({ user, handleFunction }) => {
    return (
        <Box
            p={'2'}
            borderRadius={'20px'}
            variant='solid'
            bg={'purple.50'}
            color={'purple.500'}
            cursor={'pointer'}
            onClick={handleFunction}
            fontSize={'0.8rem'}
            // fontWeight={'bold'}
            m={'0 0.5rem 1rem 0'}
            _hover={{
                background: 'purple.100',
            }}
        >
            {user.name}
            <CloseIcon
                ml={'0.5rem'}
                // fontWeight={'bold'}
                fontSize={'0.6rem'}
            />
        </Box>
    )
}

export default UserBadgeItem