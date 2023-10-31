import { Component } from "react";

class MessageSend extends Component{

    render(){
        
        return(
            
            <>
                <div className="MessageChatZone2">
                    <div className="Message-Send">
                        <p {...this.props}></p>
                    </div>
                </div>
            </>
        )
    }
}

export default MessageSend