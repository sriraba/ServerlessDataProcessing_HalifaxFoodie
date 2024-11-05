import React from 'react';
import './App.css';
import Signup from './Components/Usermanagement/Signup';
import {Login,Security,CipherText} from './Components/Usermanagement/Login';
import LoginSuccess from './Components/Usermanagement/LoginSuccess';
import ShowCipher from './Components/Usermanagement/CipherTextDisplay'
import UploadRecipes from './Components/UploadRecipes';
import {Routes,Route} from 'react-router-dom';
import Recipes from './Components/Recipes';
import Polarity from "./Components/Polarity"
import UploadFeedback from "./Components/uploadFeedback";
import LoginInOutContainer from './Containers';
import OrderFood from './Components/OrderFood';
import VisualizeRecipe from "./Components/visualizeRecipe";
import Chat from "./ChatModule/ChatDisplay";

const App =()=> {
   return (
      <div className='App'>
          <Routes>
            <Route path="/" element={<LoginInOutContainer/>} />
            <Route path="/Signup" element={<Signup/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/security" element={<Security/>} />
            <Route path="/code" element={<CipherText/>} />
            <Route path="/home" element={<LoginSuccess/>} />
            <Route path="/uploadRecipe" element = {<UploadRecipes/>}/>
            <Route path="/recipes" element = {<Recipes/>}/>
            <Route path="/showcipher" element={<ShowCipher/>} /> 
            <Route path="/uploadFeedback" element={<UploadFeedback/>}/>      
            <Route path="/polarity" element={<Polarity/>}/>  
            <Route path="/orderfood" element={<OrderFood/>} />          
            <Route path ="/recipeVisual" element={<VisualizeRecipe/>}/> 
          
          
           

          </Routes>
      </div>
    );
}

export default App;
