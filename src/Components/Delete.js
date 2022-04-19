import { Button } from "@mui/material"
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"

const Delete = ({ openDelete, setOpenDelete, idUser }) => {
    return (
        <>
            <Modal isOpen={openDelete} toggle={() => setOpenDelete(false)}>
                <ModalHeader>Delete user</ModalHeader>
                <ModalBody>
                    Do you want to delete the User {idUser}
                </ModalBody>
                <ModalFooter>
                    <Button variant="contained" onClick={() => setOpenDelete(false)}>Confirm</Button>
                    <Button variant="contained" color='error' onClick={() => setOpenDelete(false)}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}
export default Delete