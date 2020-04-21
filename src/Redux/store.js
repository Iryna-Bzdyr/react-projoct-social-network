import profileReducer from "./Reducer/profile-reducer";
import dialogsReducer from "./Reducer/dialogs-reducer";

let store = {
    _state: {
        messagesPage: {
            DialogsData: [
                {id: 1, name: 'Item 1'},
                {id: 2, name: 'Item 2'},
                {id: 3, name: 'Item 3'},
                {id: 4, name: 'Item 4'},
                {id: 5, name: 'Item 5'}
            ],
            MassageData: [
                {id: 1, text: 'Hello'},
                {id: 2, text: 'How are you'},
                {id: 3, text: 'What time is it'},
            ],
            newMessageText: '',
        },
        profilePage: {
            postData: [
                {id: 1, post: 'Hi. how are you', likesCount: 12},
                {id: 2, post: 'It"s my first post', likesCount: 35}
            ],
            searchBar: [
                {id: 1, name: 'Activity'},
                {id: 2, name: 'MyPost'},
                {id: 3, name: 'Friends'},
                {id: 4, name: 'Groups'},
                {id: 5, name: 'Forums'},
            ],
            newPostText: 'it-kamasutra'
        }
    },
    _callSubscriber() {
    },

    getState() {
        return this._state
    },
    subscribe(observer) {
        this._callSubscriber = observer
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.messagesPage = dialogsReducer(this._state.messagesPage, action)
        this._callSubscriber(this._state)
    }
}

export default store
window.store = store


// users: [
//     {id:1, followed:false, status:"Am Thankful To Those Person Who Leave Me In Bad Situation Because Only Due To Them I Meet With My Good Situation.", fullName:{firstName:"Brad", lastName:"Pitt"}, location:{country:"USA",city:"New York"}, photo:"https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/brad-pitt-attends-the-premiere-of-20th-century-foxs-ad-news-photo-1580754081.jpg?crop=0.668xw:1.00xh;0.240xw,0&resize=480:*"},
//     {id:2, followed:true, status:"It Is Your Planning Which Give You Confidence To Go Ahead", fullName:{firstName:"Jennifer", lastName:"Aniston"}, location:{country:"Ukraine",city:"Lviv"}, photo: "https://media1.popsugar-assets.com/files/thumbor/ptdgPx5tCvvD9kUsU7pQFMUkBIA/207x134:1865x1792/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2019/09/09/028/n/1922398/066318895d76e2ef0c31d8.46065434_/i/Jennifer-Aniston.jpg"},
//     {id:3, followed:true, status:"NEVER STOP BEING A GOOD PERSON BECAUSE OF BAD PEOPLE", fullName:{firstName:"Charley", lastName:"Hunnam"}, location:{country:"Ukraine",city:"Kyiv"}, photo: "https://proxy11.online.ua/parni/r3-c8dd8cfb6c/middle_58e1fcf9addf0.jpg"},
//     {id:4, followed:false, status:"Until You Are In Comfort Zone You Can not think different from common people", fullName:{firstName:"Kendall", lastName:"Jenner"}, location:{country:"Poland",city:"Warsaw"}, photo: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/kendal-jenner-attends-the-amfar-cannes-gala-2019-at-hotel-news-photo-1582902260.jpg?crop=1.00xw:0.667xh;0,0.0250xh&resize=480:*"},
//     {id:5, followed:true, status:"You Can Only Success In Your Life When Your Think To Do Converted Into Try To Do.", fullName:{firstName:"Jessica", lastName:"Biel"}, location:{country:"Great Britain",city:"London"}, photo: "https://www.biography.com/.image/t_share/MTE4MDAzNDEwODAwMTgyNzk4/jessica-biel-16730224-1-402.jpg"},
//     {id:6, followed:false, status:"FIND YOUR OWN PATH", fullName:{firstName:"Jared", lastName:"Leto"}, location:{country:"France",city:"Paris"}, photo: "https://www.elleman.pl/media/cache/default_view/uploads/media/default/0005/33/morbius-zwiastun-filmu-z-jaredem-leto-jako-wampirem-mroczniejszy-marvel_1.jpeg"},
//     {id:7, followed:true, status:"All We Need Is Equality", fullName:{firstName:"Leonardo", lastName:"Dicaprio"}, location:{country:"Japan",city:"Tokyo"}, photo: "https://img.etimg.com/thumb/msid-60043666,width-643,imgsize-99995,resizemode-4/leonardo-dicaprio-to-play-his-namesake-leonardo-da-vinci-in-upcoming-biopic.jpg"},
//     {id:8, followed:true, status:"If You Have Availability To Think Big then Only You Can Achieve Big.", fullName:{firstName:"Chris", lastName:"Pine"}, location:{country:"Italy",city:"Roma"}, photo: "https://autogear.ru/misc/i/gallery/2369/396349.jpg"}
//
// ]


// let users = [{
//     1:{id:1, followed:false, status:"Am Thankful To Those Person Who Leave Me In Bad Situation Because Only Due To Them I Meet With My Good Situation.", fullName:{firstName:"Brad", lastName:"Pitt"}, location:{country:"USA",city:"New York"}, photo:"https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/brad-pitt-attends-the-premiere-of-20th-century-foxs-ad-news-photo-1580754081.jpg?crop=0.668xw:1.00xh;0.240xw,0&resize=480:*"},
//     2:{id:2, followed:true, status:"It Is Your Planning Which Give You Confidence To Go Ahead", fullName:{firstName:"Jennifer", lastName:"Aniston"}, location:{country:"Ukraine",city:"Lviv"}, photo: "https://media1.popsugar-assets.com/files/thumbor/ptdgPx5tCvvD9kUsU7pQFMUkBIA/207x134:1865x1792/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2019/09/09/028/n/1922398/066318895d76e2ef0c31d8.46065434_/i/Jennifer-Aniston.jpg"},
//     3:{id:3, followed:true, status:"NEVER STOP BEING A GOOD PERSON BECAUSE OF BAD PEOPLE", fullName:{firstName:"Charley", lastName:"Hunnam"}, location:{country:"Ukraine",city:"Kyiv"}, photo: "https://proxy11.online.ua/parni/r3-c8dd8cfb6c/middle_58e1fcf9addf0.jpg"},
//     4:{id:4, followed:false, status:"Until You Are In Comfort Zone You Can not think different from common people", fullName:{firstName:"Kendall", lastName:"Jenner"}, location:{country:"Poland",city:"Warsaw"}, photo: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/kendal-jenner-attends-the-amfar-cannes-gala-2019-at-hotel-news-photo-1582902260.jpg?crop=1.00xw:0.667xh;0,0.0250xh&resize=480:*"},
//     5:{id:5, followed:true, status:"You Can Only Success In Your Life When Your Think To Do Converted Into Try To Do.", fullName:{firstName:"Jessica", lastName:"Biel"}, location:{country:"Great Britain",city:"London"}, photo: "https://www.biography.com/.image/t_share/MTE4MDAzNDEwODAwMTgyNzk4/jessica-biel-16730224-1-402.jpg"},
//     6:{id:6, followed:false, status:"FIND YOUR OWN PATH", fullName:{firstName:"Jared", lastName:"Leto"}, location:{country:"France",city:"Paris"}, photo: "https://www.elleman.pl/media/cache/default_view/uploads/media/default/0005/33/morbius-zwiastun-filmu-z-jaredem-leto-jako-wampirem-mroczniejszy-marvel_1.jpeg"},
//     7:{id:7, followed:true, status:"All We Need Is Equality", fullName:{firstName:"Leonardo", lastName:"Dicaprio"}, location:{country:"Japan",city:"Tokyo"}, photo: "https://img.etimg.com/thumb/msid-60043666,width-643,imgsize-99995,resizemode-4/leonardo-dicaprio-to-play-his-namesake-leonardo-da-vinci-in-upcoming-biopic.jpg"},
//     8:{id:8, followed:true, status:"If You Have Availability To Think Big then Only You Can Achieve Big.", fullName:{firstName:"Chris", lastName:"Pine"}, location:{country:"Italy",city:"Roma"}, photo: "https://autogear.ru/misc/i/gallery/2369/396349.jpg"}
//
// }]

