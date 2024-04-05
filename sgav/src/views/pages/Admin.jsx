import LogsDash from "../../components/admin-dash/LogsDash";
import UserDash from "../../components/admin-dash/UserDash";
import NavigationBar from "../../components/navigation-bar/NavigationBar";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";


export default function Admin() {
    return (
        <div>
            <NavigationBar />
            <div style={{ margin: "50px" }}>
                <div className="flex w-full flex-col">
                    <Tabs aria-label="Dynamic tabs" >

                        <Tab key="logs" title="Logs">
                            <Card>
                                <CardBody>
                                    <LogsDash />
                                </CardBody>
                            </Card>
                        </Tab>
                        <Tab key="users" title="Usuarios">
                            <Card>
                                <CardBody>
                                    <UserDash />
                                </CardBody>
                            </Card>
                        </Tab>
                    </Tabs>
                </div>

            </div>
        </div>
    )
}
