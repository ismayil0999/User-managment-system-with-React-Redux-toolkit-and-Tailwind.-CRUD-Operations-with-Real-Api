import Body from "./spesific/Body"
import Header from "./spesific/Header"
import Pagination from "./spesific/Pagination"

function Home(){
    return(
        <div className="w-[90%]   max-[612px]:w-full  flex flex-col items-center justify-center rounded-t-[10px] lg:border-[2px] lg:border-[#F0F0F0] lg:rounded-[10px] ">
<Header/>
<Body/>
<Pagination/>
        </div>
    )
}

export default Home