import { useState ,useRef } from "react";
import WebCam from 'react-webcam'


import register from './register.png'
import validator from 'validator'
import style from './style'
import Auth from './Auth'
import {
  Input,
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
              <input type='text' onChange={handleEmail} className={`w-[300px] p-2 h-[35px] bg-slate-200 font-medium rounded-[10px] font-poppins border-slate-600`}></input>
              {error && <p className={`text-red-600 font-poppins`}>Enter a valid mail</p>}
            </ModalBody>
            <ModalFooter>
              <Button onClick={()=>setCount(count+1)}>Next</Button>
            </ModalFooter>
            </>)

   case 1:
    return (<>
          <ModalBody className={`${style.flexCenter} flex-col`}>
          
              <Text className={`font-poppins font-semibold text-center `}>Login With biometric</Text>
              <img src={register} className={`w-[70%] center`}></img>
             <div >
                <input type="radio" className={`font-poppins font-medium `}  name="a" value="FACE" onChange={(e)=>setType(e.target.value)}/>
              <label htmlFor="html" className={''}>FaceID</label>
              <input type="radio" value="FINGERPRINT" className={`font-poppins ml-4` }  name="a" onChange={(e)=>setType(e.target.value)}/>
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
             <ModalHeader className={`mb-4`}>{type}</ModalHeader>
             <ModalBody className={'flex justify-center flex-col p-4'}>

              {type=="FINGERPRINT"? <><p  className={'font-thin p-4 text-red-500'}>Note:As of now, the fingerprint template is uploaded as  file instead of scanning from biometric reader</p><Input type='file' name='fingerprint_template' onChange={(e)=>{setImg(e.target.files[0])}}></Input></>
                       :FaceComponent(img,webref,takePicture)}
              
              
              
              
            </ModalBody>
            <div className={`flex flex-row justify-around m-4`}>
              {/* <form method='post' action="http://127.0.0.1:5000/authenticate" >
              <input hidden type='file'  name="actualImage" ref={ipfsImg}></input>
              <input hidden type='file'  name="chunkFiles" ref={base64ToImage(img)}></input>
              <input hidden type='text'  name="action" value={type}></input> */}
            <Button colorScheme='teal' variant='outline' onClick={()=>setCount(count-1)}>Back</Button>
            <Button colorScheme='teal' variant='solid' onClick={(e)=>{Auth(img,email,type)}}>Verify</Button>
            {/* <Button colorScheme='teal' variant='solid' type='submit'>Verify</Button></form> */}
            </div>
            
            </>)
    }
}

function FaceComponent(img,webref,takePicture){
  return img==0? <><WebCam className={`w-[400px] h-[200px] `} ref={webref}></WebCam><div className={`py-5 flex justify-center align-middle`}><Button align='center' colorScheme='red' className={`w-[100px] `} onClick={takePicture}>Take picture</Button></div></>:<img src={img} className={`w-[400px] h-[200px] `} ></img>
}
function FingerprintComponent(){
  return <></>
}
export default LoginForm;