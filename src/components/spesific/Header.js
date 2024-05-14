import Button from "../common/Button"
import Input from "../common/Input"
import { Link } from "react-router-dom"
import {changeSearchTerm} from '../../redux/userdata';
import { useDispatch} from "react-redux";
function Header(){
    const dispatch=useDispatch()
    return(
    <div className="w-full h-[70px] max-[612px]:fixed top-0 left-0 z-[999] flex  items-center justify-between bg-[#170b83dc] p-[20px] rounded-t-[10px] max-[742px]:rounded-[0px]">
<div className="basis-[50%]">
<Input
type="text"
placeholder="Search user"
onChange={(e)=>{dispatch(changeSearchTerm({searchTerm:e.currentTarget.value}))}}
/>
</div>
<div>
   <Link to="/AddNewUser">
   <Button
    title="Add new user"
    height="h-[35px]"
    background="bg-red-700"
    />
   </Link>
</div>
    </div>
    )
}
export default Header