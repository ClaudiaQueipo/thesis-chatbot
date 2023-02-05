import { Component, createElement, useEffect } from "react";
import MessageResponse from "./MessageResponse";
import MessageSend from "./MessageSend";


class MessageArea extends Component{

    

    render(){
        
       
        const {msm, respuesta} = this.props
        //console.log(mostrarMsm)
       
        

        return(
            <>
                <div className="message-area" >
                    
                    <MessageSend></MessageSend>                                     
                    <MessageResponse></MessageResponse>
                </div>
            </>
        )
    }
}

export default MessageArea