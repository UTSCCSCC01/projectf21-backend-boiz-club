import * as React from 'react';
import {Text, Row, Column, Button, Avatar} from 'native-base';
import {FontAwesome5} from "@expo/vector-icons";

export default function Account() {
    return (
        <Column size={2} space={10} alignItems="center" padding="10">
            <UserDetails/>
            <UserButtons/>
        </Column>
    );
}

const UserDetails = () => (
    <>
        <Row space={5} padding={5}>
            <Column>
                <Avatar bg="lightBlue.400" size="xl">
                    PY
                </Avatar>
            </Column>
            <Column alignItems="center">
                <Text bold fontSize="2xl">
                    Payam Yektamaram
                    &nbsp;
                    <FontAwesome5 name="check-circle" size={24} color="blue"/>
                </Text>
                <Text fontSize="xl">
                    <FontAwesome5 name="map-pin" color="red" size={20} style={{padding: 10}}/>
                    &nbsp;
                    Toronto, Canada
                </Text>
                <Text fontSize="lg">
                    3 <FontAwesome5 name="dog" size={24} color="blue"/>
                    3 <FontAwesome5 name="cat" size={24} color="purple"/>
                </Text>
            </Column>
        </Row>
    </>
)

const UserButtons = () => (
    <>
        <Row>
            <Button size="lg" key="personalInformationBtn" width="70%" style={{justifyContent: "flex-start"}}
                    marginBottom={7}
                    startIcon={<FontAwesome5 style={{color: "white"}} name="home"
                                             size={18}/>}
                    endIcon={<FontAwesome5 style={{color: "white"}} name="chevron-right"
                                           size={18}/>}>
                Personal Information
            </Button>
        </Row>
        <Row>
            <Button size="lg" key="paymentInformationBtn" width="70%" style={{justifyContent: "flex-start"}}
                    marginBottom={7}
                    startIcon={<FontAwesome5 style={{color: "white"}} name="credit-card"
                                             size={18}/>}
                    endIcon={<FontAwesome5 style={{color: "white"}} name="chevron-right"
                                           size={18}/>}
            >
                Payment Information
            </Button>
        </Row>
        <Row>
            <Button size="lg" key="verifyAccountBtn" width="70%" style={{justifyContent: "flex-start"}} marginBottom={7}
                    startIcon={<FontAwesome5 style={{color: "white"}} name="user-check"
                                             size={18}/>}
                    endIcon={<FontAwesome5 style={{color: "white"}} name="chevron-right"
                                           size={18}/>}
            >
                Verify Account
            </Button>
        </Row>
        <Row>
            <Button size="lg" key="notificationsBtn" width="70%" style={{justifyContent: "flex-start"}} marginBottom={7}
                    startIcon={<FontAwesome5 style={{color: "white"}} name="bell"
                                             size={18}/>}
                    endIcon={<FontAwesome5 style={{color: "white"}} name="chevron-right"
                                           size={18}/>}
            >
                Notifications
            </Button>
        </Row>
        <Row>
            <Button size="lg" key="messagesBtn" width="70%" style={{justifyContent: "flex-start"}} marginBottom={7}
                    startIcon={<FontAwesome5 style={{color: "white"}} name="envelope"
                                             size={18}/>}
                    endIcon={<FontAwesome5 style={{color: "white"}} name="chevron-right"
                                           size={18}/>}>
                Messages
            </Button>
        </Row>
        <Row>
            <Button size="lg" key="logOutBtn" width="70%" style={{justifyContent: "flex-start"}}
                    startIcon={<FontAwesome5 style={{color: "white"}} name="sign-out-alt"
                                             size={18}/>}
                    endIcon={<FontAwesome5 style={{color: "white"}}
                                           name="chevron-right"
                                           size={18}/>}>
                Log out
            </Button>
        </Row>
    </>
)