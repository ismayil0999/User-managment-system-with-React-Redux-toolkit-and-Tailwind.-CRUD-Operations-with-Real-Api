function Button({title,background,onClick,icon,height}){
    return(
        <button onClick={onClick} className={`${background} w-auto pl-4 pr-4 outline-0 border-0 ${height} flex items-center justify-center font-bold text-white rounded-[5px]`}>{icon || title}</button>
    )
}
export default Button