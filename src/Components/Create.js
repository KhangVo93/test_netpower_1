import { Button, TextField, Input } from "@mui/material"
import { Modal, ModalBody, ModalFooter, ModalHeader, Label, Row, Col } from "reactstrap"

const Create = ({ openCreate, setOpenCreate }) => {
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
                            <TextField variant="standard"></TextField>
                        </Col>
                    </Row>
                    <Row className='mt-2 p-2'>
                        <Col>
                            <Label>First Name</Label>
                        </Col>
                        <Col>
                            <TextField variant="standard"></TextField>
                        </Col>
                    </Row>
                    <Row className='mt-2 p-2'>
                        <Col>
                            <Label>Last Name</Label>
                        </Col>
                        <Col>
                            <TextField variant="standard"></TextField>
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
                    <Button variant="contained" onClick={() => setOpenCreate(false)}>OK</Button>
                    <Button variant="contained" color='error' onClick={() => setOpenCreate(false)}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}
export default Create