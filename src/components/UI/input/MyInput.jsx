import React from "react";
import classees from "./MyInput.module.css"

const MyInput = React.forwardRef((props, ref) => {
    return(
        <input ref={ref} {...props} className={classees.myInput}/>
    );
});

export default MyInput;