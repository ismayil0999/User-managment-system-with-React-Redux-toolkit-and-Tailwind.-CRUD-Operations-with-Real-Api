import Button from "../common/Button"
import Input from "../common/Input"
import CancelIcon from '@mui/icons-material/Cancel';
import { Link,useNavigate } from "react-router-dom";
import { useFormik} from 'formik';
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addUser, getUsers } from "../../redux/userdata";
import { useState } from "react";
function AddUser(){
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const { skip,searchTerm,adduserloading } = useSelector(state => state.data);
    const [setLoading]=useState(false)
const initialValues={
    name:"",
    lastname:"",
    phone:"",
    email:"",
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Enter a name"),
  lastname: Yup.string().required("Enter a lastname"),
  phone: Yup.number().required("Enter number"),
  email: Yup.string().email("Enter a valid email").required("Enter email")
});

const onSubmit=async(values)=>{
try{
    await dispatch(addUser(values))
    dispatch(getUsers({
        skip:skip,
        searchValue:searchTerm
    }))
    setLoading(true)
}catch(error){
    console.log(error)
}
finally{
    navigate("/")
    setLoading(false)
}
}
const formik=useFormik({
    initialValues,
    validationSchema,
    onSubmit,
})
   
    return(
       <div className="fixed top-0 left-0 z-[9999] w-full h-full bg-[#00000062] flex items-center justify-center">
         <form onSubmit={formik.handleSubmit} className="relative bg-white  flex flex-col w-[40%] max-[600px]:w-[90%] gap-[20px] p-[40px] items-center justify-center rounded-[10px]">
<Link to="/">
<CancelIcon className="absolute right-2 top-2"/>
</Link>
<Input 
type="text" 
placeholder="Name" 
name="name"
onChange={formik.handleChange}
value={formik.values.name || ""}
/>
{formik.errors.name && <p className="w-full mt-[-15px] text-red-600 font-bold">{formik.errors.name}</p>}
<Input 
type="text" 
placeholder="Last name" 
name="lastname"
onChange={formik.handleChange}
value={formik.values.lastname || ""}
/>
{formik.errors.lastname && <p className="w-full mt-[-15px] text-red-600 font-bold">{formik.errors.lastname}</p>}
<Input 
type="text" 
placeholder="Phone number" 
name="phone"
onChange={formik.handleChange}
value={formik.values.phone || ""}
/>
{formik.errors.phone && <p className="w-full mt-[-15px] text-red-600 font-bold">{formik.errors.phone}</p>}
<Input 
type="text" 
placeholder="Email" 
name="email"
onChange={formik.handleChange}
value={formik.values.email || ""}
/>
{formik.errors.email && <p className="w-full mt-[-15px] text-red-600 font-bold">{formik.errors.email}</p>}
             <Button type="submit" title={adduserloading===true ? "Wait" : "Add user"} height="h-[40px]" background="bg-blue-600"></Button>
          
        </form>
       </div>
    )
}
export default AddUser