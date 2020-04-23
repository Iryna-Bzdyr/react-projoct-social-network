import React from "react";
import Photo from "./Photo";
import {connect} from "react-redux";
import {setUsersAC} from "../../../Redux/Reducer/user-reducer";
import {withRouter} from "react-router-dom";
import database from "../../../firebase";
import {setPhotoDataAC} from "../../../Redux/Reducer/profile-reducer";


class PhotoAPIContainer extends React.Component{
componentDidMount() {
    let userID = +this.props.match.params.userID
    if(!userID){
        userID =1
    }
    database.ref('database/profile/').orderByChild('userID').equalTo(userID).on('value', (snap) => {
        let data = []
        snap.forEach(u=>{
            data.push(u.val())
        })
        this.props.setPhotoData(data[0].photo)
    });
}

    render() {
        return (
            <Photo photoData={this.props.photoData}/>
        )
    }
}


let mapStateToProps =(state)=>{
    return {
        photoData:state.profilePage.photoData

    }
}

const withURLPhotoAPIContainer = withRouter(PhotoAPIContainer)

const PhotoContainer = connect(mapStateToProps,{
    setPhotoData:setPhotoDataAC
})(withURLPhotoAPIContainer)
export default PhotoContainer