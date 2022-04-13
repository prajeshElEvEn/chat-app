import React, { useEffect } from 'react'
import { Container, Box, Text, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Signup from '../components/authentication/Signup'
import Login from '../components/authentication/Login'
import { useHistory } from 'react-router-dom'

const HomePage = () => {
    const history = useHistory()

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('userInfo'))

        if (user) {
            history.push('/chats')
        }
    }, [history])

    return (
        <Container maxW='xl' centerContent bg={'gray.50'}>
            <Box
                bg={'blue.100'}
                p={3}
                borderRadius={'lg'}
                w={'100%'}
                m={'3rem 0 1rem 0'}
                d='flex'
                justifyContent='center'
            >
                <Text
                    fontSize='2xl'
                    fontWeight={'bold'}
                    color={'blue.500'}
                    fontFamily='Work sans'
                >
                    Chat App
                </Text>
            </Box>
            <Box
                bg={'blue.100'}
                borderRadius='lg'
                width={'100%'}
                p={4}
            >
                <Tabs variant='soft-rounded' colorScheme='green'>
                    <TabList mb={'1rem'}>
                        <Tab
                            w={'50%'}
                        >
                            Login
                        </Tab>
                        <Tab
                            w={'50%'}
                        >
                            Sign Up
                        </Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Login />
                        </TabPanel>
                        <TabPanel>
                            <Signup />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Container >
    )
}

export default HomePage