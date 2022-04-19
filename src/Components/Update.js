import { Button, TextField, Input } from '@mui/material'
import { Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Col } from 'reactstrap'
const Update = ({ openUpdate, setOpenUpdate, objUser }) => {
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
                            <TextField value={objUser.first_name} variant='standard'></TextField>
                        </Col>
                    </Row>
                    <Row className='mt-2 p-2'>
                        <Col>
                            <Label>Last Name</Label>
                        </Col>
                        <Col>
                            <TextField value={objUser.last_name} variant='standard'></TextField>
                        </Col>
                    </Row>
                    <Row className='mt-2 p-2'>
                        <Col>
                            <Label>Email</Label>
                        </Col>
                        <Col>
                            <TextField value={objUser.email} variant='standard'></TextField>
                        </Col>
                    </Row>
                    <Row className='mt-2 p-2'>
                        <Col>
                            <Label>Avatar</Label>
                        </Col>
                        <Col>
                            <Input accept="image/*" id="contained-button-file" multiple type="file" />
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button variant='contained' onClick={() => setOpenUpdate(false)}>Update</Button>
                    <Button variant='contained' color='error' onClick={() => setOpenUpdate(false)}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default Update