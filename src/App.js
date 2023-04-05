import logo from './logo.svg';
import './App.css';
import Login from './component/Login'
import { ChakraProvider } from '@chakra-ui/react'
function App() {
  return (
      
    <ChakraProvider>
   <>
   <Login></Login></>
     
     </ChakraProvider>
  );
}

export default App;
