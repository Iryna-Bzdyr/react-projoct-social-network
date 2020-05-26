import React, {useState} from "react";

const StatusWithHooks =(props)=> {
    let [editMode, setEditMode] = useState(false)

    const activateMode = ()=>{
        setEditMode(true)
    }
    const deActivateMode = ()=>{
        setEditMode(false)
    }
        return (
            <div>
                {editMode ? <div>
                    <input autoFocus={true} onBlur={deActivateMode} value={props.userStatus}
                           />
                </div> : <div>
                    <span onDoubleClick={activateMode}>{props.userStatus}</span>
                </div>
                }
            </div>

        )

}

export default StatusWithHooks
