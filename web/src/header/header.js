import { Component } from "react";
import { motion } from "framer-motion";
import { useState } from "react";

function Header(){
    const [isOn, setIsOn] = useState(false);
    const toggleSwitch = () => {setIsOn(!isOn)
      document.body.classList.toggle('dark');
    };
    
        return(
            <>
                <header>
                    <h2>Conversation with Bot</h2>

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