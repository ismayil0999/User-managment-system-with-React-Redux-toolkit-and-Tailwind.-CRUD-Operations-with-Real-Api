import { useDispatch, useSelector } from "react-redux";
import { changeSuccessStatus } from "../../redux/userdata";
function ErrorAlert() {
    const { errorMessage } = useSelector(state => state.data);
    const dispatch = useDispatch()
    //Error bildirimi göstərildikdən sonra bildirimi ekrandan silmək üçün bu funkisya  işə düşür
    setTimeout(() => {
        dispatch(changeSuccessStatus())
    }, 3000)
    
    return (
        <div className={`${errorMessage != null ? "flex" : "hidden"} w-full h-[40px] bg-red-600 text-white fixed top-0 left-0 z-[99999] flex items-center pl-6 font-bold`}>
            <h1>{errorMessage}</h1>
        </div>
    )
}
export default ErrorAlert