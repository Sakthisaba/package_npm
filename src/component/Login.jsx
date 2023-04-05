import {
    FormControl,
    FormLabel,Input,
    FormErrorMessage,
    FormHelperText,Heading
  } from '@chakra-ui/react'
  import {React ,useState} from 'react'
import { useDisclosure } from '@chakra-ui/react'

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
  Text,
    ModalCloseButton,
  } from '@chakra-ui/react'
  import {
    Flex,

  
    Button,
    InputGroup,
    Stack,
    InputLeftElement,
    chakra,
    Box,
    Link,
    Avatar,


    InputRightElement
  } from "@chakra-ui/react";

import LoginForm from './LoginForm'
export default function Login()
{
    const OverlayOne = () => (
        <ModalOverlay
   
          backdropFilter='blur(10px) hue-rotate(90deg)'
        />
      )
  
    const OverlayTwo = () => (
      <ModalOverlay
        bg='none'
        backdropFilter='auto'
        backdropInvert='80%'
        backdropBlur='2px'
      />
    )
  
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [overlay, setOverlay] = useState(<OverlayOne />)


    function Auth(){

    }
    return (
        
        <Box>
        
        <Button
          mt='4'
          onClick={() => {
            setOverlay(<OverlayTwo />)
            onOpen()
          }}
          className= {`cursor-pointer font-poppins primary`} >
          Login Using <span   className='font-semibold'>BioSafe</span>
        </Button>
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
          {overlay}
          <ModalContent>
            
            <ModalCloseButton />
            <LoginForm></LoginForm>
          </ModalContent>
        </Modal>
         
        </Box>
    
    )
}