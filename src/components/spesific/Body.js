import React, { useEffect, useState } from "react";
import Button from "../common/Button";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUser, getUsers } from "../../redux/userdata";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CircularIndeterminate from "./Progress";
import { CircularProgress } from "@mui/material";
function Body() {
    const { users, loading, skip, searchTerm, error } = useSelector(state => state.data);
    const dispatch = useDispatch()
    const [deleteLoading, setDeleteLoading] = useState({});

    useEffect(() => {
        dispatch(getUsers({ skip: skip, searchValue: searchTerm }))
    }, [dispatch, skip, searchTerm])

    const UserDelete = async (id) => {
        try {
            //Funksiya çağırıldıqda serverdən cavab gələnə qədər buton içində Progress göstərmək üçün.
            //Bütün butonlarda eyni anda progress görünməməsi üçün klik olunan butonun id-sinə görə state-i true və ya false edirik
            setDeleteLoading(({
                [id]: true
            }));
            await dispatch(deleteUser(id))
            dispatch(getUsers({
                skip: skip,
                searchValue: searchTerm
            }))
        } catch (error) {
            console.log(error)
        } finally {
            setDeleteLoading(({
                [id]: false
            }));
        }
    }

    if (loading) {
        return (
            <div className="h-[470px] flex flex-col gap-[30px] justify-center items-center">
                <CircularIndeterminate />
                <h3 className="font-bold text-xl">Loading users...</h3>
            </div>
        );
    }

    if (error != null) {
        return (
            <div className="h-[470px] flex items-center">
                <h3 className="font-bold text-xl text-center">{error}</h3>
            </div>
        );
    }

    return (
        <div className="flex flex-col max-[612px]:h-full h-[470px] w-full justify-start  overflow-scroll hidden-scroll">
            {
                users.length > 0 ? (
                    <table className="table relative w-full flex justify-center overflow-y-scroll pb-[30px]">
                        <thead>
                            <tr>
                                <th className=" border-2 border-[#F8F8F8] text-start p-2">ID</th>
                                <th className=" border-2 border-[#F8F8F8] text-start p-2">Name</th>
                                <th className=" border-2 border-[#F8F8F8] text-start p-2">Surname</th>
                                <th className=" border-2 border-[#F8F8F8] text-start p-2">Email</th>
                                <th className=" border-2 border-[#F8F8F8] text-start p-2">Phone</th>
                                <th className=" border-2 border-[#F8F8F8] text-start p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={index} className="border-2 border-[#F0F0F0]">
                                    <td className="w-auto  p-2" data-label="Id">{user._id}</td>
                                    <td className="w-auto  p-2 truncate" data-label="Name">
                                        {user.name}
                                    </td>
                                    <td className="w-auto p-2 truncate" data-label="Surname">{user.lastname}</td>
                                    <td className="w-auto  p-2 truncate" data-label="Email">{user.email}</td>
                                    <td className="w-auto  h-[35px] p-2 truncate" data-label="Phone">{user.phone}</td>
                                    <td className="flex gap-[10px] justify-center ">
                                        <Link to={`/updateUser/${user._id}`}>
                                            <Button
                                                background="bg-blue-600"
                                                height="h-[30px]"
                                                icon={<EditIcon />}
                                            />
                                        </Link>
                                        <Button
                                            icon={deleteLoading[user._id]===true ? <CircularProgress fontSize="small" style={{ color: "white", width: "20px", height: "20px" }} /> : <DeleteIcon />}
                                            height="h-[30px]"
                                            background="bg-red-600"
                                            onClick={() => { UserDelete(user._id) }}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="w-full h-full items-center justify-center mt-[100px]">
                        <h1 className="text-center w-full font-bold text-[18px]">User dont found for display</h1>
                    </div>
                )
            }
        </div>
    );
}

export default Body;
