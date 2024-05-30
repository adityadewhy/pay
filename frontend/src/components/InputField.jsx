import React from "react";

const InputField = ({ label, type }) => {
    return (
        <div className="relative mb-4">
            <input 
                type={type} 
                id={`floating_outlined_${label}`} 
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-black bg-white rounded-lg border border-blue-600  dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                placeholder=" " 
            />
            <label 
                htmlFor={`floating_outlined_${label}`} 
                className="absolute text-sm text-gray-500 dark:text-gray-600 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                {label}
            </label>
        </div>
    );
};

export default InputField;
