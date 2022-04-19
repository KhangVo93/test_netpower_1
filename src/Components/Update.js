import { Button, TextField, Input } from '@mui/material'
import { Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Col } from 'reactstrap'
import { useEffect, useState } from 'react'
import axios from 'axios'
const Update = ({ openUpdate, setOpenUpdate, idUser }) => {

    const [firstName, setFirstName] = useState(null)
    const [lastName, setLastName] = useState(null)
    const [emailOld, setEmailOld] = useState(null)
    const [email, setEmail] = useState(null)
    const [avatar, setAvatar] = useState(null)

    const [arrEmail, setArrEmail] = useState([])
    const getDataById = () => {
        axios.get(`https://reqres.in/api/users?id=${idUser}`)
            .then((data) => {
                setFirstName(data.data.data.first_name)
                setLastName(data.data.data.last_name)
                setEmail(data.data.data.email)
                setEmailOld(data.data.data.email)
                setAvatar(data.data.data.avatar)
            })
    }

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

                if (arrEmail.includes(email) && emailOld != email) {
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
        return true
    }

    const checkEmail = (paramEmail) => {
        const vRE = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return vRE.test(String(paramEmail).toLowerCase());
    }

    const onClickUpdate = () => {
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
            axios.put(`https://reqres.in/api/users?id=${idUser}`, body.body, body.headers)
                .then(() => {
                    alert("Update success")
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
        getDataById()
        checkDuplicateEmail()
    }, [idUser])
    return (
        <>
            <Modal isOpen={openUpdate} toggle={() => setOpenUpdate(false)}>
                <ModalHeader>
                    Update user
                </ModalHeader>
                <ModalBody>
                    <Row className='mt-2 p-2'>
                        <Col>
                            <Label>First Name</Label>
                        </Col>
                        <Col>
                            <TextField value={firstName} variant='standard' onChange={(event) => setFirstName(event.target.value)}></TextField>
                        </Col>
                    </Row>
                    <Row className='mt-2 p-2'>
                        <Col>
                            <Label>Last Name</Label>
                        </Col>
                        <Col>
                            <TextField value={lastName} variant='standard' onChange={(event) => setLastName(event.target.value)}></TextField>
                        </Col>
                    </Row>
                    <Row className='mt-2 p-2'>
                        <Col>
                            <Label>Email</Label>
                        </Col>
                        <Col>
                            <TextField value={email} variant='standard' onChange={(event) => setEmail(event.target.value)}></TextField>
                        </Col>
                    </Row>
                    <Row className='mt-2 p-2'>
                        <Col>
                            <Label>Avatar</Label>
                        </Col>
                        <Col>
                            <img src={avatar} alt='ok' style={{ width: 50, height: 50 }} />
                            <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={(event) => setAvatar(event.target.value)} />
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button variant='contained' onClick={onClickUpdate}>Update</Button>
                    <Button variant='contained' color='error' onClick={() => setOpenUpdate(false)}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default Update