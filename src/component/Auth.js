import Storage from '../component/contract/Storage.json'

import ContractAddress from '../component/contract/contract.json'

import { File, FormData} from 'formdata-node'


import {ethers} from  'ethers'


import axios from 'axios'


 

import { useNavigate } from 'react-router-dom';
const Contract = ContractAddress.contractAddress;
export default  async function Auth(img,email,action)
{ 
  //  const navigate = useNavigate()
  console.log(img)
    let formData = new FormData();
  //https://ipfs.io/ipfs/QmcwNT1mQbFde9ANfEfMUvS4VUXD6YbcyreGrm8j5z39nA
   getIpfs(email).then((res)=>
   {
    console.log(res)
    return  `https://ipfs.io/ipfs/${res}`
   })
   .then((originalimg)=>{

   
    formData.set("actualimage",originalimg)
    console.log("origianl "+originalimg)
   })
   .then(()=>{return img})
   .then((res)=>{
    formData.set("chunkfiles",res)
    formData.set("action",action)
    
    console.log("chunk "+ res)

  axios.post('http://127.0.0.1:5000/authenticate',formData).then((res)=>{console.log(res)


// navigate('/home')

})})
//    const response =  axios({
//         method:'post',
//         body: formData,
//         headers: {
//             "Content-Type": "multipart/form-data"
//           },
//           processData: false, // important
//           contentType: false, // important
//         url:'http://127.0.0.1:5000/authenticate'
//     }).then(res=>console.log(res))
//     return response
//    })
}


async function getIpfs(email)
{
    if (typeof window.ethereum !== 'undefined') {
        console.log("getipfs")
        console.log(email)
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        
        const contract = new ethers.Contract(Contract,Storage.abi,provider)
        
       
            console.log(email)
           return await contract.getfile(email);
           
          
          
       
       
      } 
}
