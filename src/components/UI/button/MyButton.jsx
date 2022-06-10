import React from "react";
import classees from "./MyButton.module.css"

const MyButton = ({children, ...props}) => {
    return(
        <button {...props} className={classees.myBtn}>
            {children}
        </button>
    );
}

export default MyButton;