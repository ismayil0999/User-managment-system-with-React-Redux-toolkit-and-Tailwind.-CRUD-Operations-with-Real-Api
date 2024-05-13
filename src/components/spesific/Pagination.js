import Button from "../common/Button"
import { increaseSkip,decreaseSkip } from "../../redux/userdata";
import { useDispatch } from "react-redux";
function Pagination(){
    const dispatch=useDispatch()
    return(
<div className="h-[50px] max-[612px]:fixed bottom-0 p-[20px] w-full flex items-center rounded-b-[10px] max-[612px]:rounded-b-[0px] justify-between bg-[#170b83dc]">
    <Button title="< Prev" background="transparent" onClick={()=>{dispatch(decreaseSkip())}}/>
    <Button title="Next >" background="transparent" onClick={()=>{dispatch(increaseSkip())}}/>
</div>
    )
}
export default Pagination