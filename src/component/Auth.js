import Storage from '../../utils/Storage.json'
import ContractAddress from '../../contract/contract.json'
import { File, FormData} from 'formdata-node'
import {ethers} from  'ethers'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const Contract = ContractAddress.contractAddress;
export default  async function Auth(img,email,action)
{ 
  //  const navigate = useNavigate()
  console.log(img)
  var reader = new FileReader();
                reader.readAsDataURL(img);
                reader.onload = function () 
                {
                  console.log(reader.result)
                return reader.result;
                
                }
    let formData = new FormData();
  //https://ipfs.io/ipfs/QmcwNT1mQbFde9ANfEfMUvS4VUXD6YbcyreGrm8j5z39nA
   getIpfs(email).then(async (res)=>
   {
    const url = `https://ipfs.io/ipfs/${res}`;
    return toBase64(url).then(base64=>{return base64})
   })
   .then((originalimg)=>{

    console.log(originalimg)
    formData.set("actualImage",originalimg)
    console.log("origianl "+originalimg)
   })
   .then(()=>{if(action=="FACE" )return img;
              else{
                var reader = new FileReader();
                reader.readAsDataURL(img);
                reader.onload = function () 
                {
                  console.log(reader.result)
                return reader.result;
                
                }
              }
            })
   .then((res)=>{
    formData.set("chunkFiles",res)
    formData.set("action",action)
    
    console.log("chunk "+ res)

  axios.post('http://127.0.0.1:5000/authenticate',formData).then((res)=>{
    if(res.status=='sucess'){
      console.log(res)
     alert("Succesfully Logged in")
     window.location.href="/home"
     }
     else
     {
      alert("Login Failed! Wrong Info")
     }
 


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

const toBase64 = url => fetch(url)
  .then(response => response.blob())
  .then(blob => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  }))
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
