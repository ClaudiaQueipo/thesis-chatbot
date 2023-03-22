import { Component } from "react";
import { motion } from "framer-motion";
import { useState, useEffect, useRef} from "react";
import './../msmO.css'
import Prueba from '../prueba'


import * as faceapi from 'face-api.js';

function Header(){
    const [isOn, setIsOn] = useState(false);
    const toggleSwitch = () => {setIsOn(!isOn)
      document.body.classList.toggle('dark');
    };

    const toogleIco = () =>{
        setIsOn(!isOn)
        document.body.classList.toggle('ico');
    };
    

    

        return(
            <>
                    <div className="IcoBot" data-isOn={isOn} onClick={toogleIco}>
                                <div className="eye1"></div>
                                <div className="eye2"></div>
                    </div>
                    <div className="cubrirPantalla"></div>
                    <div className="msmOculto">
                        
                        <Prueba></Prueba>
                    </div>
                <header>
                    

                    <h2 className="title">Conversation with Bot</h2>
                    

                    <div className="switch" id='switch' data-isOn={isOn} onClick={toggleSwitch}>
                        <motion.div className="handle" layout transition={spring} />
                    </div>
                </header>
                
            </>
        )
    
}

export default Header

const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30
  };