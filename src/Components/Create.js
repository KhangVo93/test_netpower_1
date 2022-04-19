import { Button, TextField, Input } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { Modal, ModalBody, ModalFooter, ModalHeader, Label, Row, Col } from "reactstrap"

const Create = ({ openCreate, setOpenCreate }) => {
    const [firstName, setFirstName] = useState(null)
    const [lastName, setLastName] = useState(null)
    const [email, setEmail] = useState(null)
    const [avatar, setAvatar] = useState(null)

    const [arrEmail, setArrEmail] = useState([])
    const validateData = () => {
        if (!email) {
            alert('Email not empty');
            return false
        }

        if (email) {
            if (checkEmail(email) === false) {
                alert('Email wrong format');
                return false;
            }
            else {

                if (arrEmail.includes(email)) {
                    alert('Duplicate Email')
                    return false
                }
            }
        }
        if (!firstName) {
            alert('First name not empty');
            return false
        }
        if (!lastName) {
            alert('Last name not empty');
            return false
        }
        if (!avatar) {
            alert('Avatar name not empty');
            return false
        }
        return true
    }

    const checkEmail = (paramEmail) => {
        const vRE = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return vRE.test(String(paramEmail).toLowerCase());
    }

    const onClickCreateUser = () => {
        var vali = validateData()
        if (vali) {
            const body = {
                body: {
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    avatar: avatar
                },
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }
            axios.post('https://reqres.in/api/users', body.body, body.headers)
                .then(() => {
                    alert("Create success")
                })
                .catch((err) => {
                    console.log(err.message)
                })
        }
    }

    const checkDuplicateEmail = () => {
        axios.get(`https://reqres.in/api/users?per_page=12`)
            .then((data) => {
                for (let i in data.data.data) {
                    let email = data.data.data[i].email

                    arrEmail.push(email)
                }
            })
            .catch((err) => {
                console.log(err.message)
            })
    }

    useEffect(() => {
        checkDuplicateEmail()
    }, [])
    return (
        <>
            <Modal isOpen={openCreate} toggle={() => setOpenCreate(false)}>
                <ModalHeader>Create new User</ModalHeader>
                <ModalBody>
                    <Row className='mt-2 p-2'>
                        <Col>
                            <Label>Email</Label>
                        </Col>
                        <Col>
                            <TextField variant="standard" onChange={(event) => setEmail(event.target.value)}></TextField>
                        </Col>
                    </Row>
                    <Row className='mt-2 p-2'>
                        <Col>
                            <Label>First Name</Label>
                        </Col>
                        <Col>
                            <TextField variant="standard" onChange={(event) => setFirstName(event.target.value)}></TextField>
                        </Col>
                    </Row>
                    <Row className='mt-2 p-2'>
                        <Col>
                            <Label>Last Name</Label>
                        </Col>
                        <Col>
                            <TextField variant="standard" onChange={(event) => setLastName(event.target.value)} ></TextField>
                        </Col>
                    </Row>
                    <Row className='mt-2 p-2'>
                        <Col>
                            <Label>Avatar</Label>
                        </Col>
                        <Col>
                            <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={(event) => setAvatar(event.target.value)} />
                            <img src={avatar} alt='avatar'/>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button variant="contained" onClick={onClickCreateUser}>OK</Button>
                    <Button variant="contained" color='error' onClick={() => setOpenCreate(false)}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}
export default Create