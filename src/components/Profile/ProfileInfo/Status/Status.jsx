import React from "react";

class Status extends React.Component {
    state = {
        editMode: false,
        status:this.props.userStatus
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
        this.props.updateStatus(this.props.currentID, this.state.status)
    }
    onStatusChange = (e) => {
        return (
            this.setState({
                status: e.currentTarget.value
            })
        )
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
      if(prevProps.userStatus !==this.props.userStatus){
          this.setState({
              status:this.props.userStatus
          })
      }
    }

    render() {
        return (
            <div>
                {!this.state.editMode ?
                    <div>
                        <span onDoubleClick={this.activateEditMode}>{this.props.userStatus}</span>
                    </div>
                    :
                    <div>
                        <input onChange={this.onStatusChange} autoFocus={true} value={this.state.status} onBlur={this.deActivateEditMode}/>
                    </div>
                }
            </div>

        )
    }
}

export default Status
