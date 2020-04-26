import React from "react";
import Photo from "./Photo";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import database from "../../../firebase";
import {setPhotoDataAC, sliderIsOpenAC} from "../../../Redux/Reducer/profile-reducer";
import {toggleIsFetchingAC} from "../../../Redux/Reducer/user-reducer";
import {Sugar} from "react-preloaders";

class PhotoAPIContainer extends React.Component {
    componentDidMount() {
        let userID = +this.props.match.params.userID
        if (!userID) {
            userID = 1
        }
        this.props.setToggleFetching(true)
        database.ref('database/profile/').orderByChild('userID').equalTo(userID).on('value', (snap) => {
            let data = []
            snap.forEach(u => {
                data.push(u.val())
                this.props.setToggleFetching(false)
            })
            let rowOrder = 0
            let setRowOrder = (index) => {
                if (index == 0 || index % 4 == 0) {
                    rowOrder = 3
                } else if (index == 1 || index % 5 == 0) {
                    rowOrder = 1
                } else {
                    rowOrder = 2
                }
                return rowOrder
            }
            const newData = data[0].photo.map((v, indexV) => ({...v, rows: setRowOrder(indexV)}))
            this.props.setPhotoData(newData)

        });
    }

    render() {
        return (
            <>

                <Sugar customLoading={this.props.isFetching} background="blur"/>
                <Photo photoData={this.props.photoData} sliderIsOpen={this.props.sliderIsOpen}
                       sliderAutoplay={this.props.sliderAutoplay}
                       setSlider={this.props.setSliderIsOpen}/>
            </>
        )
    }
}


let mapStateToProps = (state) => {
    return {
        photoData: state.profilePage.photoData,
        isFetching: state.usersPage.isFetching,
        sliderIsOpen:state.profilePage.sliderIsOpen,
        sliderAutoplay:state.profilePage.sliderAutoplay
    }
}

const withURLPhotoAPIContainer = withRouter(PhotoAPIContainer)

const PhotoContainer = connect(mapStateToProps, {
    setPhotoData: setPhotoDataAC,
    setToggleFetching: toggleIsFetchingAC,
    setSliderIsOpen:sliderIsOpenAC
})(withURLPhotoAPIContainer)
export default PhotoContainer
