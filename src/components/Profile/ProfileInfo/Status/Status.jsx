import React from "react";

class Status extends React.Component {
    state = {
        editMode: false
    }
    activateEditMode = () => {
        this.setState({
            editMode: true
        })
        // this.state.editMode = true
        // // this.forceUpdate()
    }
    deActivateEditMode = () => {
        this.setState({
            editMode: false
        })
    }

    render() {
        return (
            <div>
                {!this.state.editMode ?
                    <div>
                        <span onDoubleClick={this.activateEditMode}>{this.props.status}</span>
                    </div>
                    :
                    <div>
                        <input autoFocus={true} value={this.props.status} onBlur={this.deActivateEditMode}/>
                    </div>
                }
            </div>

        )
    }
}

export default Status
