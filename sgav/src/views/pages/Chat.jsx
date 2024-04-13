import ChatComponent from '../../components/chat/ChatComponent'
import NavigationBar from '../../components/navigation-bar/NavigationBar'
import { Card, CardBody } from '@nextui-org/react'

export default function Chat() {
    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
            <NavigationBar />
            <div style={{ flex: 1, margin: "50px" }}>
                <Card style={{ height: "100%" }}>
                    <CardBody>
                        <ChatComponent />
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}
