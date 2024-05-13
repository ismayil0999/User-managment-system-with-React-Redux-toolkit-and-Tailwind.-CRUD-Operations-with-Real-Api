import { useDispatch, useSelector } from "react-redux";
import { changeSuccessStatus } from "../../redux/userdata";
function SuccessAlert(){
    const { successMessage } = useSelector(state => state.data);
    const dispatch=useDispatch()
  //Success bildirimi göstərildikdən sonra bildirimi ekrandan silmək üçün bu funkisya  işə düşür
    setTimeout(()=>{
dispatch(changeSuccessStatus())
    },3000)

    return(
        <div className={`${successMessage!=null ? "flex" : "hidden"} w-full h-[40px] bg-green-500 text-white fixed top-0 left-0 z-[99999] flex items-center pl-6 font-bold`}>
<h1>{successMessage}</h1>
        </div>
    )
}
export default SuccessAlert