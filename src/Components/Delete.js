import { Button } from "@mui/material"
import axios from "axios"
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"

const Delete = ({ openDelete, setOpenDelete, idUser }) => {
    const onClickDelete = (idUser) => {
        axios.delete(`https://reqres.in/api/users?id=${idUser}`)
            .then(() => {
                alert('Delete success')
            })
            .catch((err) => {
                console.log(err.message)
            })
    }
    return (
        <>
            <Modal isOpen={openDelete} toggle={() => setOpenDelete(false)}>
                <ModalHeader>Delete user</ModalHeader>
                <ModalBody>
                    Do you want to delete the User {idUser}
                </ModalBody>
                <ModalFooter>
                    <Button variant="contained" onClick={onClickDelete}>Confirm</Button>
                    <Button variant="contained" color='error' onClick={() => setOpenDelete(false)}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}
export default Delete