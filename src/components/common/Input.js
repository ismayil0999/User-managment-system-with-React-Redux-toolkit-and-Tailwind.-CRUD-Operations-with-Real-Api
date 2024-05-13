import React from 'react';
function Input({type,placeholder,onChange,value,name}) {
  return (
<input
        type={type}
        value={value}
        name={name}
        className="outline-0 w-full border-0 bg-[#F8F8F8] h-[35px] pl-2 rounded-[5px]"
        placeholder={placeholder}
        onChange={onChange}
      />
  );
}

export default Input;
