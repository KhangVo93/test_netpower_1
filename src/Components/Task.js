import { Button, Pagination } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { Row } from "reactstrap"
import Create from "./Create"
import Delete from "./Delete"
import Update from "./Update"

const Task = () => {

    const [arrData, setArrData] = useState([])
    const [totalPage, setTotalPage] = useState(null)
    const [page, setPage] = useState(1)
    const [idUser, setIdUser] = useState(null)
    const [objUser, setObjUser] = useState({
        email: "",
        first_name: "",
        last_name: "",
        avatar: ""
    })
    const [openCreate, setOpenCreate] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [openUpdate, setOpenUpdate] = useState(false)

    const getData = () => {
        axios.get(`https://reqres.in/api/users?page=${page}`)
            .then((data) => {
                setArrData(data.data.data)
                setTotalPage(data.data.total_pages)
                setPage(data.data.page)
            })
            .catch((err) => {
                console.log(err.message)
            })
    }

    const onClickCreate = () => {
        setOpenCreate(true)
    }

    const onClickDelete = (paramId) => {
        setOpenDelete(true)
        setIdUser(paramId)
    }

    const onClickUpdate = (paramFirstName, paramLastName, paramEmail, paramAvatar) => {
        setObjUser({
            first_name: paramFirstName,
            last_name: paramLastName,
            email: paramEmail,
            avatar: paramAvatar
        })
        setOpenUpdate(true)
    }
    useEffect(() => {
        getData()
    }, [page])
    return (
        <>
            <div style={{ textAlign: 'center' }}>
                <h1>Test</h1>
            </div>
            <Row className="mt-2 p-2">
                <table style={{ width: '100%', textAlign: 'center' }}>
                    <thead className="p-2 mt-2">
                        <tr className="bg-primary">
                            <th>ID</th>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Avatar</th>
                            <th style={{ width: '20%' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {arrData.map((item, index) => {
                            return (

                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.email}</td>
                                    <td>{item.first_name}</td>
                                    <td>{item.last_name}</td>
                                    <td>
                                        <img src={item.avatar} alt='avatar' style={{ width: 120, height: 120 }} />
                                    </td>
                                    <td>
                                        <Button style={{ marginRight: 10 }} onClick={onClickCreate} color="success" variant='contained'>Create</Button>
                                        <Button style={{ marginRight: 10 }} onClick={() => onClickDelete(item.id)} color="error" variant='contained'>Delete</Button>
                                        <Button style={{ marginRight: 10 }} onClick={() => onClickUpdate(item.first_name, item.last_name, item.email, item.avatar)} color="warning" variant='contained'>Update</Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </Row>
            <Row className="mt-2 p-2 text-center">
                <Pagination count={totalPage} page={page} variant='outlined' onChange={(event, value) => setPage(value)} size='large' />

            </Row>
            <Create openCreate={openCreate} setOpenCreate={setOpenCreate} />
            <Delete idUser={idUser} openDelete={openDelete} setOpenDelete={setOpenDelete} />
            <Update openUpdate={openUpdate} setOpenUpdate={setOpenUpdate} objUser={objUser} />
        </>
    )
}

export default Task