import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const Signup = () => {
    const [show, setShow] = useState(false)
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmpassword, setConfirmpassword] = useState()
    const [pic, setPic] = useState()
    const [loading, setLoading] = useState(false)
    const toast = useToast()
    const history = useHistory()

    const handleClick = () => {
        setShow(!show)
    }

    const postDetails = (pics) => {
        setLoading(true)
        if (pics === undefined) {
            toast({
                title: 'Please select an Image.',
                // description: "We've created your account for you.",
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            })
            return
        }

        if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
            const data = new FormData()
            data.append('file', pics)
            data.append('upload_preset', 'chat-app')
            data.append('cloud_name', 'eleven-cloud')
            fetch('https://api.cloudinary.com/v1_1/eleven-cloud/image/upload', {
                method: 'post',
                body: data,
            })
                .then((res) => res.json())
                .then(data => {
                    setPic(data.url.toString())
                    console.log(data)
                    setLoading(false)
                })
                .catch((err) => {
                    console.log(err)
                    setLoading(false)
                })
        } else {
            toast({
                title: 'Please select an Image.',
                // description: "We've created your account for you.",
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            })
        }
    }

    const submitHandler = async () => {
        setLoading(true)
        if (!name || !email || !password || !confirmpassword) {
            toast({
                title: 'Please fill all the fields.',
                // description: "We've created your account for you.",
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            })
            setLoading(false)
            return
        }
        if (password !== confirmpassword) {
            toast({
                title: 'Passwords do not match.',
                // description: "We've created your account for you.",
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            })
            return
        }

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
            const { data } = await axios.post(
                '/api/user',
                { name, email, password, pic },
                config
            )
            toast({
                title: 'Successfully created account.',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            })
            localStorage.setItem('userInfo', JSON.stringify(data))
            setLoading(false)
            history.push('/chats')
        } catch (error) {
            toast({
                title: 'Error creating account.',
                description: error.response.data.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            })
            setLoading(false)
        }
    }

    return (
        <VStack spacing={'5px'}>
            <FormControl id='first-name' isRequired>
                <FormLabel>
                    Name
                </FormLabel>
                <Input
                    placeholder='Enter your name...'
                    bg={'gray.50'}
                    onChange={
                        (e) => {
                            setName(e.target.value)
                        }
                    }
                />
            </FormControl>
            <FormControl id='email' isRequired>
                <FormLabel>
                    Email
                </FormLabel>
                <Input
                    placeholder='Enter your email...'
                    bg={'gray.50'}
                    onChange={
                        (e) => {
                            setEmail(e.target.value)
                        }
                    }
                />
            </FormControl>
            <FormControl id='password' isRequired>
                <FormLabel>
                    Password
                </FormLabel>
                <InputGroup>
                    <Input
                        type={show ? 'text' : 'password'}
                        placeholder='Enter your password...'
                        bg={'gray.50'}
                        onChange={
                            (e) => {
                                setPassword(e.target.value)
                            }
                        }
                    />
                    <InputRightElement width={'4.5rem'}>
                        <Button height={'1.75rem'} size='sm' onClick={handleClick}>
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl id='password' isRequired>
                <FormLabel>
                    Confirm Password
                </FormLabel>
                <InputGroup>
                    <Input
                        type={show ? 'text' : 'password'}
                        placeholder='Confirm your password...'
                        bg={'gray.50'}
                        onChange={
                            (e) => {
                                setConfirmpassword(e.target.value)
                            }
                        }
                    />
                    <InputRightElement width={'4.5rem'}>
                        <Button height={'1.75rem'} size='sm' onClick={handleClick}>
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl id='pic'>
                <FormLabel>
                    Upload your picture
                </FormLabel>
                <Input
                    type={'file'}
                    p={'1.5'}
                    bg={'gray.50'}
                    accept="image/*"
                    onChange={
                        (e) => {
                            postDetails(e.target.files[0])
                        }
                    }
                />
            </FormControl>
            <Button
                width={'100%'}
                colorScheme='blue'
                onClick={submitHandler}
                style={
                    { marginTop: '1rem' }
                }
                isLoading={loading}
            >
                Sign Up
            </Button>
        </VStack>
    )
}

export default Signup