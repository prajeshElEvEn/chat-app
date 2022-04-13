import { useState } from "react"
import React from 'react'
import { Box, Button, Tooltip, Text, Menu, MenuButton, MenuList, Avatar, MenuItem, MenuDivider, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, Input, useToast, Spinner } from "@chakra-ui/react"
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { ChatState } from '../../context/chatProvider'
import ProfileModal from "./ProfileModal"
import { useHistory } from "react-router-dom"
import { useDisclosure } from '@chakra-ui/hooks'
import axios from "axios"
import ChatLoading from "./ChatLoading"
import UserListItem from "../UserAvatar/UserListItem"

const SideDrawer = () => {
    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingChat, setLoadingChat] = useState()
    const { user, setSelectedChat, chats, setChats } = ChatState()
    const history = useHistory()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()

    const logoutHandler = () => {
        localStorage.removeItem('userInfo')
        history.push('/')
    }

    const handleSearch = async () => {
        if (!search) {
            toast({
                title: 'Please enter a search query.',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'top-left',
            })
            return
        }

        try {
            setLoading(true)

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                }
            }

            const { data } = await axios.get(`/api/user?search=${search}`, config)

            setLoading(false)
            setSearchResult(data)
        } catch (error) {
            toast({
                title: 'Something went wrong.',
                description: 'Could not search for user.',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom-left',
            })
        }
    }

    const accessChat = async (userId) => {
        try {
            setLoadingChat(true)

            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                }
            }

            const { data } = await axios.post('/api/chat', { userId }, config)

            if (!chats.find((c) => c._id === data._id)) {
                setChats([data, ...chats])
            }
            setSelectedChat(data)
            setLoadingChat(false)
            onClose()
        } catch (error) {
            toast({
                title: 'Something went wrong.',
                description: error.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom-left',
            })
        }
    }

    return (
        <>
            <Box
                d='flex'
                justifyContent='space-between'
                alignItems={'center'}
                bg={'blue.50'}
                w='100%'
                padding={'0.5rem 2rem'}
                color={'blue.500'}
            >
                <Tooltip
                    label='Search Users to chat'
                    hasArrow
                    placement='bottom-end'
                >
                    <Button
                        variant={'ghost'}
                        onClick={onOpen}
                    >
                        <box-icon name='search' color='blue' ></box-icon>
                        <Text
                            d={{ base: 'none', md: 'flex' }}
                            px={'4'}
                        >
                            Search User
                        </Text>
                    </Button>
                </Tooltip>
                <Text
                    size="2xl"
                    fontFamily={'Work Sans'}
                    fontWeight={'bold'}
                >
                    Chat App
                </Text>
                <div>
                    <Menu>
                        <MenuButton p={'1'}>
                            <BellIcon fontSize={'2xl'} m={'1'} />
                        </MenuButton>
                        {/* <MenuList>

                        </MenuList> */}
                    </Menu>
                    <Menu>
                        <MenuButton
                            as={Button}
                            rightIcon={<ChevronDownIcon />}
                        >
                            <Avatar
                                size={'sm'}
                                cursor='pointer'
                                name={user.name}
                                src={user.pic}
                            />
                        </MenuButton>
                        <MenuList>
                            <ProfileModal user={user}>
                                <MenuItem>My Profile</MenuItem>
                            </ProfileModal>
                            <MenuDivider />
                            <MenuItem
                                onClick={logoutHandler}
                            >
                                Logout
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </div>
            </Box>

            <Drawer
                placement="left"
                onClose={onClose}
                isOpen={isOpen}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader>
                        Search Users
                    </DrawerHeader>
                    <DrawerBody>
                        <Box
                            d='flex'
                            gap={'1rem'}
                            pb={'1rem'}
                        >
                            <Input
                                placeholder="Search by name or email"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Button
                                onClick={handleSearch}
                            >
                                Go
                            </Button>
                        </Box>
                        {
                            loading ? (
                                <ChatLoading />
                            ) : (
                                searchResult?.map(user => (
                                    <UserListItem
                                        key={user._id}
                                        user={user}
                                        handleFunction={() => accessChat(user._id)}
                                    />
                                ))
                            )
                        }
                        {loadingChat && <Spinner ml={'auto'} d={'flex'} />}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default SideDrawer