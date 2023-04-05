import { useState ,useRef } from "react";
import WebCam from 'react-webcam'

import base64ToImage from './base64ToImage';
import register from './register.png'
import validator from 'validator'
import style from './style'
import Auth from './Auth'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Button,Text,
    ModalCloseButton,
  } from '@chakra-ui/react'


function LoginForm()
{  const [img,setImg] = useState(0)
    const webref = useRef()
    const [error ,setError] = useState(false)
    const[email,setEmail] =useState("")
    const[type,setType] =useState()
    const [count,setCount] = useState(0);

    const[action,setAction] = useState('FACE')
    const [ipfsImg,setIpfsImg] = useState(0)


    function handleEmail(e)
    {
                 e.preventDefault();

                 setEmail(e.target.value)

    if(!validator.isEmail(email))
    {

               setError(true)
            
            
    }
    else
    {           setError(false)
     
    }
    }
   
    function takePicture()
    { 
        console.log(webref.current)
     setImg(webref.current.getScreenshot())
    }
   
   
   switch(count){
   case 0:
    return (<>
               <ModalHeader className={`mb-6`}>Login</ModalHeader>
             <ModalBody>

              <Text className={`font-poppins font-semibold `}>Email address </Text>
              <input type='email' onChange={handleEmail} className={`w-[300px] p-2 h-[35px] bg-slate-200 font-medium rounded-[10px] font-poppins border-slate-600`}></input>
              {error && <p className={`text-red-600 font-poppins`}>Enter a valid mail</p>}
            </ModalBody>
            <ModalFooter>
              <Button onClick={()=>setCount(count+1)}>Next</Button>
            </ModalFooter>
            </>)

   case 1:
    return (<>
          <ModalBody className={`${style.flexCenter} flex-col`}>
          
              <Text className={`font-poppins font-semibold text-center hoverr`}>Login With biometric</Text>
              <img src={register} className={`w-[70%] center`}></img>
             <div >
                <input type="radio" className={`font-poppins font-medium`}  name="a" value="face" onChange={(e)=>setType(e.target.value)}/>
              <label htmlFor="html" className={''}>FaceID</label>
              <input type="radio" value="finger" className={`font-poppins ml-4` }  name="a" onChange={(e)=>setType(e.target.value)}/>
               <label htmlFor="css" >Fingerprint</label>
             </div>
            </ModalBody>
            <div className={`flex flex-row justify-around m-4`}>
            <Button colorScheme='teal' variant='outline' onClick={()=>setCount(count-1)}>Back</Button>
            <Button colorScheme='teal' variant='solid' onClick={()=>setCount(count+1)}>Next</Button>
            </div>
    
        </>)

        case 2:
            return(<>
             <ModalHeader className={`mb-6`}>Face Capture</ModalHeader>
             <ModalBody className={'flex justify-center flex-col p-4'}>

              <Text className={`font-poppins font-semibold `}>{type} </Text>
              {img==0? <WebCam className={`w-[400px] h-[200px] `} ref={webref}></WebCam>:<img src={img} className={`w-[400px] h-[200px] `} ></img>}
              
              <div className={`py-5 flex justify-center align-middle`}><Button align='center' colorScheme='red' className={`w-[100px] `} onClick={takePicture}>Take picture</Button></div>
              
            </ModalBody>
            <div className={`flex flex-row justify-around m-4`}>
              {/* <form method='post' action="http://127.0.0.1:5000/authenticate" >
              <input hidden type='file'  name="actualImage" ref={ipfsImg}></input>
              <input hidden type='file'  name="chunkFiles" ref={base64ToImage(img)}></input>
              <input hidden type='text'  name="action" value={type}></input> */}
            <Button colorScheme='teal' variant='outline' onClick={()=>setCount(count-1)}>Back</Button>
            <Button colorScheme='teal' variant='solid' onClick={(e)=>{Auth(img,email,action)}}>Verify</Button>
            {/* <Button colorScheme='teal' variant='solid' type='submit'>Verify</Button></form> */}
            </div>
            
            </>)
    }
}


export default LoginForm;