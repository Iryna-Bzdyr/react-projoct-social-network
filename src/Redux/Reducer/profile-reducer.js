import database, {currentUserAPI, userAPI, currentUserPhotoAPI, profileAPI} from "../../firebase";
import {toggleIsFetchingAC} from "./user-reducer";


const addPost = 'ADD-POST';
const upDateNewPostText = 'UPDATE-NEW-POST-TEXT';
const setProfileData = 'SET-PROFILE-DATA'
const setPostData = 'SET-POST-DATA'
const setPhotoData = 'SET-PHOTO-DATA'
const sliderIsOpen = 'SLIDER-IS-OPEN'
const setUserStatus = 'SET-USER-STATUS'


let initialState = {
    profileData: [],
    postData: [],
    photoData: [],
    searchBar: [
        {id: 1, name: 'Activity'},
        {id: 2, name: 'MyPost'},
        {id: 3, name: 'Friends'},
        {id: 4, name: 'Groups'},
        {id: 5, name: 'Photo'},
    ],
    newPostText: '',
    sliderIsOpen: false,
    sliderAutoplay: false,
    userStatus: ""
}


const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case setProfileData:
            return {
                ...state,
                profileData: [...action.profileData]
            }
        case setPostData: {
            return {
                ...state,
                postData: [...action.postData]
            }
        }
        case setPhotoData: {
            return {
                ...state,
                photoData: [...action.photoData]
            }
        }
        case addPost:
            let post = state.newPostText
            return {
                ...state,
                newPostText: '',
                postData: [...state.postData, {id: 5, post: post, likesCount: 5}]
            }
        case upDateNewPostText:
            return {
                ...state,
                newPostText: action.newText
            }
        case sliderIsOpen:
            return {
                ...state,
                sliderIsOpen: action.sliderIsOpen
            }
        case setUserStatus:
            return {
                ...state,
                userStatus: action.userStatus
            }
        default:
            return state
    }
}


export const setProfileDataAC = (profileData) => ({type: setProfileData, profileData: profileData})
export const setPostDataAC = (postData) => ({type: setPostData, postData: postData})
export const setPhotoDataAC = (photoData) => ({type: setPhotoData, photoData: photoData})
export const addPostActionCreator = () => ({type: addPost})
export const upDateNewPostTextActionCreator = (text) => (
    {type: upDateNewPostText, newText: text})
export const sliderIsOpenAC = (status) => ({type: sliderIsOpen, sliderIsOpen: status})
export const setUsersStatusAC = (userStatus) => ({type: setUserStatus, userStatus})

export const setUserPostThunk = (id) => (dispatch) => {
    let data = []
    profileAPI.orderByChild('userID').equalTo(id).on('value', (snap) => {
        snap.forEach(u => {
            data.push(u.val())
        })


        dispatch(setPostDataAC(data[0].post))
        dispatch(toggleIsFetchingAC(false))
    })
}


export const setUserPhotoThunk = (id) => (dispatch) => {
    let data = []
    profileAPI.orderByChild('userID').equalTo(id).on('value', (snap) => {
        snap.forEach(u => {
            console.log(u.val)
            data.push(u.val())
        })
        console.log(data)
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

        dispatch(setPhotoDataAC(newData))
    })
}


export const setUserStatusThunk = (id) => (dispath) => {
    userAPI(id).on('value', (snap) => {
        let user = []
        snap.forEach(u => {
            user.push(u.val())
        })
        dispath(setUsersStatusAC(user[0].status))
    });
}

export const updateStatusThunk = (id, status) => (dispath) => {
    currentUserAPI(id).update({status: status})
    //     .then(userAPI(id).on('value', (snap) => {
    //     let user = []
    //     snap.forEach(u=>{
    //         user.push(u.val())
    //     })
    //     dispath(setUsersStatusAC(user[0].status))
    // }))
}

export const addNewPhotoThunk = (id, url) => (dispath) => {
    database.ref('database/newData/').push({
        "users": [
            {"id":1, "followed":false, "status":"Am Thankful To Those Person Who Leave Me In Bad Situation Because Only Due To Them I Meet With My Good Situation.", "fullName":{"firstName":"Brad", "lastName":"Pitt"}, "location":{"country":"USA","city":"New York"}, "photo":"https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/brad-pitt-attends-the-premiere-of-20th-century-foxs-ad-news-photo-1580754081.jpg?crop=0.668xw:1.00xh;0.240xw,0&resize=480:*"},
            {"id":2, "followed":true, "status":"It Is Your Planning Which Give You Confidence To Go Ahead", "fullName":{"firstName":"Jennifer", "lastName":"Aniston"}, "location":{"country":"Ukraine","city":"Lviv"}, "photo": "https://media1.popsugar-assets.com/files/thumbor/ptdgPx5tCvvD9kUsU7pQFMUkBIA/207x134:1865x1792/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2019/09/09/028/n/1922398/066318895d76e2ef0c31d8.46065434_/i/Jennifer-Aniston.jpg"},
            {"id":3, "followed":true, "status":"NEVER STOP BEING A GOOD PERSON BECAUSE OF BAD PEOPLE", "fullName":{"firstName":"Charley", "lastName":"Hunnam"}, "location":{"country":"Ukraine","city":"Kyiv"}, "photo": "https://proxy11.online.ua/parni/r3-c8dd8cfb6c/middle_58e1fcf9addf0.jpg"},
            {"id":4, "followed":false, "status":"Until You Are In Comfort Zone You Can not think different from common people", "fullName":{"firstName":"Kendall", "lastName":"Jenner"}, "location":{"country":"Poland","city":"Warsaw"}, "photo": "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/kendal-jenner-attends-the-amfar-cannes-gala-2019-at-hotel-news-photo-1582902260.jpg?crop=1.00xw:0.667xh;0,0.0250xh&resize=480:*"},
            {"id":5, "followed":true, "status":"You Can Only Success In Your Life When Your Think To Do Converted Into Try To Do.", "fullName":{"firstName":"Jessica", "lastName":"Biel"}, "location":{"country":"Great Britain","city":"London"}, "photo": "https://www.biography.com/.image/t_share/MTE4MDAzNDEwODAwMTgyNzk4/jessica-biel-16730224-1-402.jpg"},
            {"id":6, "followed":false, "status":"FIND YOUR OWN PATH", "fullName":{"firstName":"Jared", "lastName":"Leto"}, "location":{"country":"France","city":"Paris"}, "photo": "https://www.elleman.pl/media/cache/default_view/uploads/media/default/0005/33/morbius-zwiastun-filmu-z-jaredem-leto-jako-wampirem-mroczniejszy-marvel_1.jpeg"},
            {"id":7, "followed":true, "status":"All We Need Is Equality", "fullName":{"firstName":"Leonardo", "lastName":"Dicaprio"}, "location":{"country":"Japan","city":"Tokyo"}, "photo": "https://img.etimg.com/thumb/msid-60043666,width-643,imgsize-99995,resizemode-4/leonardo-dicaprio-to-play-his-namesake-leonardo-da-vinci-in-upcoming-biopic.jpg"},
            {"id":8, "followed":true, "status":"If You Have Availability To Think Big then Only You Can Achieve Big.", "fullName":{"firstName":"Chris", "lastName":"Pine"}, "location":{"country":"Italy","city":"Roma"}, "photo": "https://autogear.ru/misc/i/gallery/2369/396349.jpg"}

        ]
    })
   //  let data = []
   //  profileAPI.orderByChild('userID').equalTo(id).on('value', (snap) => {
   //      snap.forEach(u => {
   //          console.log(u.val)
   //          data.push(u.val())
   //      })})
   //  // console.log(currentUserPhotoAPI(id))
   //  const photoID = Date.now()
   // let ref  = currentUserPhotoAPI(id).key()
   //  console.log(ref)
    //
   // currentUserPhotoAPI(id).key().set({
   //     id: photoID,
   //     likes: 0,
   //     url: url
   // })
    // ref.set({
    //     id: photoID,
    //     likes: 0,
    //     url: url
    // })
}

export default profileReducer
