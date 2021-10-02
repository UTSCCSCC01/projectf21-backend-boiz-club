import * as React from 'react';
import {Text, Row, Column, Button, Avatar, Modal, useToast} from 'native-base';
import {FontAwesome5} from "@expo/vector-icons";
import * as DocumentPicker from 'expo-document-picker';
import {useEffect, useState} from "react";

type AccountProps = {
    showVerifyModal: boolean,
    setShowVerifyModal: (x: boolean) => void
}

export default function Account() {
    // Modal shown when user wants to upload government identification
    const [showVerifyModal, setShowVerifyModal] = useState(false);

    return (
        <Column size={2} space={10} alignItems="center" padding="10">
            <UserDetails/>
            <UserButtons {...{showVerifyModal, setShowVerifyModal}}/>
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

const UserButtons = ({showVerifyModal, setShowVerifyModal}: AccountProps) => (
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
            <Button
                size="lg"
                key="verifyAccountBtn"
                width="70%"
                onPress={() => setShowVerifyModal(true)}
                marginBottom={7}
                style={{justifyContent: "flex-start"}}
                startIcon={<FontAwesome5 style={{color: "white"}} name="user-check"
                                         size={18}/>}
                endIcon={<FontAwesome5 style={{color: "white"}} name="chevron-right"
                                       size={18}/>}
            >
                Verify Account
            </Button>
            <VerifyAccountModal {...{showVerifyModal, setShowVerifyModal}}/>
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

const VerifyAccountModal = ({showVerifyModal, setShowVerifyModal}: AccountProps) => {
    const [file, setFile] = useState("");
    const toast = useToast();

    const pickDocument = async () => {
        await DocumentPicker.getDocumentAsync().then(resp => setFile(resp.type == "success" ? resp.name : ""));
    }

    useEffect(() => {
        setFile("")
    }, [])

    const onPressSaveId = () => {
        setShowVerifyModal(false)

        if (file !== "")
            toast.show({
                status: "success",
                title: "Verification request has been sent.",
                placement: "top"
            })
    }

    const onPressCancel = () => {
        setShowVerifyModal(false)
    }

    return (
        <Modal isOpen={showVerifyModal} onClose={() => setShowVerifyModal(false)} size="md">
            <Modal.Content>
                <Modal.CloseButton onPress={() => setFile("")}/>
                <Modal.Header>
                    Verify Account
                </Modal.Header>
                <Modal.Body>
                    <Column space={3}>
                        <Text>
                            Upload any legal canadian government issued identification like a passport, driving license,
                            or health card.
                        </Text>
                        <Text bold>
                            Note: All data is encrypted and your images will be stored safely and
                            in accordance with security standards.
                        </Text>
                        <Button onPress={pickDocument}>
                            {file == "" ? "Upload File" : file}
                        </Button>
                    </Column>
                </Modal.Body>
                <Modal.Footer>
                    <Button.Group space={2}>
                        <Button variant="ghost" colorScheme="blueGray"
                                onPress={onPressCancel}>
                            Cancel
                        </Button>
                        <Button onPress={onPressSaveId}>
                            Save
                        </Button>
                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
        </Modal>)
}