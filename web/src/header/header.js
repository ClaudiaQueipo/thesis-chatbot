import { Component } from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import './../msmO.css'

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
                        <p>Hola mi nombre es Shelby Bot tu asistente universitario fui creado con el proposito de ayudar a los estudiantes de nuevo ingreso
                            a elegir una carrera universitaria. Fui creado por los estudiantes Claudia Queipo Garcia y Luis Andres Licea Berenguer junto con el 
                            tutor Msc Dionnis Lopes Ramos en la Facultad de Ingenieria Telecomunicaciones, Biomedica e Informatica FITIB
                        </p>
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