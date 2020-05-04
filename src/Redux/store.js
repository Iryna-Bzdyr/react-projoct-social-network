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
//
//
// // users: [
//     1:{id:1, followed:false, status:"Am Thankful To Those Person Who Leave Me In Bad Situation Because Only Due To Them I Meet With My Good Situation.", fullName:{firstName:"Brad", lastName:"Pitt"}, location:{country:"USA",city:"New York"}, photo:"https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/brad-pitt-attends-the-premiere-of-20th-century-foxs-ad-news-photo-1580754081.jpg?crop=0.668xw:1.00xh;0.240xw,0&resize=480:*"},
//     2:{id:2, followed:true, status:"It Is Your Planning Which Give You Confidence To Go Ahead", fullName:{firstName:"Jennifer", lastName:"Aniston"}, location:{country:"Ukraine",city:"Lviv"}, photo: "https://media1.popsugar-assets.com/files/thumbor/ptdgPx5tCvvD9kUsU7pQFMUkBIA/207x134:1865x1792/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2019/09/09/028/n/1922398/066318895d76e2ef0c31d8.46065434_/i/Jennifer-Aniston.jpg"},
//     3:{id:3, followed:true, status:"NEVER STOP BEING A GOOD PERSON BECAUSE OF BAD PEOPLE", fullName:{firstName:"Charley", lastName:"Hunnam"}, location:{country:"Ukraine",city:"Kyiv"}, photo: "https://proxy11.online.ua/parni/r3-c8dd8cfb6c/middle_58e1fcf9addf0.jpg"},
//     4:{id:4, followed:false, status:"Until You Are In Comfort Zone You Can not think different from common people", fullName:{firstName:"Kendall", lastName:"Jenner"}, location:{country:"Poland",city:"Warsaw"}, photo: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/kendal-jenner-attends-the-amfar-cannes-gala-2019-at-hotel-news-photo-1582902260.jpg?crop=1.00xw:0.667xh;0,0.0250xh&resize=480:*"},
//     5:{id:5, followed:true, status:"You Can Only Success In Your Life When Your Think To Do Converted Into Try To Do.", fullName:{firstName:"Jessica", lastName:"Biel"}, location:{country:"Great Britain",city:"London"}, photo: "https://www.biography.com/.image/t_share/MTE4MDAzNDEwODAwMTgyNzk4/jessica-biel-16730224-1-402.jpg"},
//     6:{id:6, followed:false, status:"FIND YOUR OWN PATH", fullName:{firstName:"Jared", lastName:"Leto"}, location:{country:"France",city:"Paris"}, photo: "https://www.elleman.pl/media/cache/default_view/uploads/media/default/0005/33/morbius-zwiastun-filmu-z-jaredem-leto-jako-wampirem-mroczniejszy-marvel_1.jpeg"},
//     7:{id:7, followed:true, status:"All We Need Is Equality", fullName:{firstName:"Leonardo", lastName:"Dicaprio"}, location:{country:"Japan",city:"Tokyo"}, photo: "https://img.etimg.com/thumb/msid-60043666,width-643,imgsize-99995,resizemode-4/leonardo-dicaprio-to-play-his-namesake-leonardo-da-vinci-in-upcoming-biopic.jpg"},
//     8:{id:8, followed:true, status:"If You Have Availability To Think Big then Only You Can Achieve Big.", fullName:{firstName:"Chris", lastName:"Pine"}, location:{country:"Italy",city:"Roma"}, photo: "https://autogear.ru/misc/i/gallery/2369/396349.jpg"}
//
// // ]
//
//
// // let users = [{
// //     1:{id:1, followed:false, status:"Am Thankful To Those Person Who Leave Me In Bad Situation Because Only Due To Them I Meet With My Good Situation.", fullName:{firstName:"Brad", lastName:"Pitt"}, location:{country:"USA",city:"New York"}, photo:"https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/brad-pitt-attends-the-premiere-of-20th-century-foxs-ad-news-photo-1580754081.jpg?crop=0.668xw:1.00xh;0.240xw,0&resize=480:*"},
// //     2:{id:2, followed:true, status:"It Is Your Planning Which Give You Confidence To Go Ahead", fullName:{firstName:"Jennifer", lastName:"Aniston"}, location:{country:"Ukraine",city:"Lviv"}, photo: "https://media1.popsugar-assets.com/files/thumbor/ptdgPx5tCvvD9kUsU7pQFMUkBIA/207x134:1865x1792/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2019/09/09/028/n/1922398/066318895d76e2ef0c31d8.46065434_/i/Jennifer-Aniston.jpg"},
// //     3:{id:3, followed:true, status:"NEVER STOP BEING A GOOD PERSON BECAUSE OF BAD PEOPLE", fullName:{firstName:"Charley", lastName:"Hunnam"}, location:{country:"Ukraine",city:"Kyiv"}, photo: "https://proxy11.online.ua/parni/r3-c8dd8cfb6c/middle_58e1fcf9addf0.jpg"},
// //     4:{id:4, followed:false, status:"Until You Are In Comfort Zone You Can not think different from common people", fullName:{firstName:"Kendall", lastName:"Jenner"}, location:{country:"Poland",city:"Warsaw"}, photo: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/kendal-jenner-attends-the-amfar-cannes-gala-2019-at-hotel-news-photo-1582902260.jpg?crop=1.00xw:0.667xh;0,0.0250xh&resize=480:*"},
// //     5:{id:5, followed:true, status:"You Can Only Success In Your Life When Your Think To Do Converted Into Try To Do.", fullName:{firstName:"Jessica", lastName:"Biel"}, location:{country:"Great Britain",city:"London"}, photo: "https://www.biography.com/.image/t_share/MTE4MDAzNDEwODAwMTgyNzk4/jessica-biel-16730224-1-402.jpg"},
// //     6:{id:6, followed:false, status:"FIND YOUR OWN PATH", fullName:{firstName:"Jared", lastName:"Leto"}, location:{country:"France",city:"Paris"}, photo: "https://www.elleman.pl/media/cache/default_view/uploads/media/default/0005/33/morbius-zwiastun-filmu-z-jaredem-leto-jako-wampirem-mroczniejszy-marvel_1.jpeg"},
// //     7:{id:7, followed:true, status:"All We Need Is Equality", fullName:{firstName:"Leonardo", lastName:"Dicaprio"}, location:{country:"Japan",city:"Tokyo"}, photo: "https://img.etimg.com/thumb/msid-60043666,width-643,imgsize-99995,resizemode-4/leonardo-dicaprio-to-play-his-namesake-leonardo-da-vinci-in-upcoming-biopic.jpg"},
// //     8:{id:8, followed:true, status:"If You Have Availability To Think Big then Only You Can Achieve Big.", fullName:{firstName:"Chris", lastName:"Pine"}, location:{country:"Italy",city:"Roma"}, photo: "https://autogear.ru/misc/i/gallery/2369/396349.jpg"}
// //
// // }]
// //
// // let profile=[
//     {
//         1:{
//             userID:1,
//             post:[
//                 {
//                     id:1,
//                     text:'Hello World',
//                     likes:2
//                 },
//                 {
//                     id:2,
//                     text:'Hello World',
//                     likes:4
//                 }
//             ],
//             photo:[
//                 {
//                     id:1,
//                     url:'https://i.pinimg.com/originals/3a/9f/02/3a9f0210ff7d1e83039ff237c81bacae.jpg',
//                     likes:4
//                 },
//                 {
//                     id:2,
//                     url:'https://lh3.googleusercontent.com/proxy/gXn-Z2qng6aEp8mhx8Fd5LWTaNTSxpUKs9fBTKXz0q8f_8bXNG-0uQTEWihgoufD4ytY8znOSTWnv_3qTnHMrfKAD9aOYEMerfczu5x7cJsGhQqcVCGgFd1R9uzdOySI4BdZNkpuuIobZdVMSojcQmBKUfRF5NaAI3VWQhgn',
//                     likes:4
//                 },
//                 {
//                     id:3,
//                     url:'https://pbs.twimg.com/media/DrkeOQ3U8AYk81m.jpg',
//                     likes:10
//                 },
//             ],
//             friends:[
//
//             ],
//             groups:[
//
//             ],
//             activity:[
//
//             ],
//             status:'',
//
//         },
//         2:{
//             userID:1,
//             post:[
//                 {
//                     id:1,
//                     text:'Your limitation—it’s only your imagination.',
//                     likes:2
//                 },
//                 {
//                     id:2,
//                     text:'Push yourself, because no one else is going to do it for you.',
//                     likes:4
//                 },
//                 {
//                     id:3,
//                     text:'Sometimes later becomes never. Do it now.',
//                     likes:2
//                 }
//             ],
//             photo:[
//                 {
//                     id:1,
//                     url:'https://www.whoa.in/20140224-Whoa/Beautiful-Natural-Sunrise-with-Orange-Background-HD-Wallpaper.jpg',
//                     likes:4
//                 },
//                 {
//                     id:2,
//                     url:'https://thewallpaper.co/wp-content/uploads/2016/10/HD-Nature-Backgrounds-windows-apple-mac-wallpapers-4k-best-wallpaper-ever-wallpaper-for-iphone-free-download-1920x1080.jpg',
//                     likes:4
//                 },
//                 {
//                     id:3,
//                     url:'https://i.pinimg.com/originals/ca/a2/65/caa2654e79e2dc88c6a3c18e1a353452.jpg',
//                     likes:10
//                 },
//                 {
//                     id:4,
//                     url:'https://s1.1zoom.me/big0/24/Scenery_Seasons_Winter_469080.jpg',
//                     likes:25
//                 },
//             ],
//             friends:[
//
//             ],
//             groups:[
//
//             ],
//             activity:[
//
//             ],
//             status:'',
//
//         },
//         3:{
//             userID:1,
//             post:[
//                 {
//                     id:1,
//                     text:' Great things never come from comfort zones.',
//                     likes:2
//                 },
//                 {
//                     id:2,
//                     text:'Dream it. Wish it. Do it.',
//                     likes:4
//                 }
//             ],
//             photo:[
//                 {
//                     id:1,
//                     url:'https://www.ecopetit.cat/wpic/mpic/35-351275_hd-nature-wallpaper-plant-fresh-air-high-resolution.jpg',
//                     likes:4
//                 },
//                 {
//                     id:2,
//                     url:'https://lh3.googleusercontent.com/proxy/gXn-Z2qng6aEp8mhx8Fd5LWTaNTSxpUKs9fBTKXz0q8f_8bXNG-0uQTEWihgoufD4ytY8znOSTWnv_3qTnHMrfKAD9aOYEMerfczu5x7cJsGhQqcVCGgFd1R9uzdOySI4BdZNkpuuIobZdVMSojcQmBKUfRF5NaAI3VWQhgn',
//                     likes:4
//                 },
//                 {
//                     id:3,
//                     url:'https://www.pixelstalk.net/wp-content/uploads/2016/07/Desktop-autumn-hd-wallpaper-3D.jpg',
//                     likes:10
//                 },
//             ],
//             friends:[
//
//             ],
//             groups:[
//
//             ],
//             activity:[
//
//             ],
//             status:'',
//
//         },
//         4:{
//             userID:1,
//             post:[
//                 {
//                     id:1,
//                     text:'Success doesn’t just find you. You have to go out and get it.',
//                     likes:2
//                 },
//                 {
//                     id:2,
//                     text:'The harder you work for something, the greater you’ll feel when you achieve it.',
//                     likes:4
//                 }
//             ],
//             photo:[
//                 {
//                     id:1,
//                     url:'https://i.ytimg.com/vi/xgTwHQjQsPc/maxresdefault.jpg',
//                     likes:4
//                 },
//                 {
//                     id:2,
//                     url:'https://lh3.googleusercontent.com/proxy/gXn-Z2qng6aEp8mhx8Fd5LWTaNTSxpUKs9fBTKXz0q8f_8bXNG-0uQTEWihgoufD4ytY8znOSTWnv_3qTnHMrfKAD9aOYEMerfczu5x7cJsGhQqcVCGgFd1R9uzdOySI4BdZNkpuuIobZdVMSojcQmBKUfRF5NaAI3VWQhgn',
//                     likes:4
//                 },
//                 {
//                     id:3,
//                     url:'https://images-na.ssl-images-amazon.com/images/I/91eEfPOs3ML.jpg',
//                     likes:10
//                 },
//             ],
//             friends:[
//
//             ],
//             groups:[
//
//             ],
//             activity:[
//
//             ],
//             status:'',
//
//         },
//         5:{
//             userID:1,
//             post:[
//                 {
//                     id:1,
//                     text:'Don’t stop when you’re tired. Stop when you’re done.',
//                     likes:2
//                 },
//                 {
//                     id:2,
//                     text:'Wake up with determination. Go to bed with satisfaction.',
//                     likes:4
//                 },
//                 {
//                     id:3,
//                     text:'Do something today that your future self will thank you for.',
//                     likes:25
//                 }
//             ],
//             photo:[
//                 {
//                     id:1,
//                     url:'https://i.pinimg.com/originals/3a/9f/02/3a9f0210ff7d1e83039ff237c81bacae.jpg',
//                     likes:4
//                 },
//                 {
//                     id:2,
//                     url:'https://lh3.googleusercontent.com/proxy/gXn-Z2qng6aEp8mhx8Fd5LWTaNTSxpUKs9fBTKXz0q8f_8bXNG-0uQTEWihgoufD4ytY8znOSTWnv_3qTnHMrfKAD9aOYEMerfczu5x7cJsGhQqcVCGgFd1R9uzdOySI4BdZNkpuuIobZdVMSojcQmBKUfRF5NaAI3VWQhgn',
//                     likes:4
//                 },
//                 {
//                     id:3,
//                     url:'https://pbs.twimg.com/media/DrkeOQ3U8AYk81m.jpg',
//                     likes:10
//                 },
//             ],
//             friends:[
//
//             ],
//             groups:[
//
//             ],
//             activity:[
//
//             ],
//             status:'',
//
//         },
//         6:{
//             userID:1,
//             post:[
//                 {
//                     id:1,
//                     text:'Little things make big days.',
//                     likes:2
//                 },
//                 {
//                     id:2,
//                     text:'It’s going to be hard, but hard does not mean impossible.',
//                     likes:4
//                 }
//             ],
//             photo:[
//                 {
//                     id:1,
//                     url:'https://wallpaperaccess.com/full/1204217.jpg',
//                     likes:4
//                 },
//                 {
//                     id:2,
//                     url:'https://2.bp.blogspot.com/-oI74LXWvLLs/VS8Aw_gheII/AAAAAAAAAEA/L98qaFheqpk/s1600/Images%2Bde%2Bla%2Bnature%2Bpittoresque%2Bde%2Bla%2Btechnologie%2BHD.jpg',
//                     likes:4
//                 },
//                 {
//                     id:3,
//                     url:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQRpoz5mcLL8_kQDeUBPyxpBNMFHgwjfS3wEaUX4CcY2AULjDr2&usqp=CAU',
//                     likes:10
//                 },
//                 {
//                     id:4,
//                     url:'https://www.pixelstalk.net/wp-content/uploads/2016/07/1080p-HD-Image-Nature-Desktop.jpg',
//                     likes:10
//                 },
//             ],
//             friends:[
//
//             ],
//             groups:[
//
//             ],
//             activity:[
//
//             ],
//             status:'',
//
//         },
//         7:{
//             userID:1,
//             post:[
//                 {
//                     id:1,
//                     text:'Don’t wait for opportunity. Create it.',
//                     likes:2
//                 },
//                 {
//                     id:2,
//                     text:'Sometimes we’re tested not to show our weaknesses, but to discover our strengths.',
//                     likes:4
//                 },
//                 {
//                     id:3,
//                     text:'The key to success is to focus on goals, not obstacles.',
//                     likes:4
//                 }
//             ],
//             photo:[
//                 {
//                     id:1,
//                     url:'https://i.pinimg.com/originals/3a/9f/02/3a9f0210ff7d1e83039ff237c81bacae.jpg',
//                     likes:4
//                 },
//                 {
//                     id:2,
//                     url:'https://lh3.googleusercontent.com/proxy/gXn-Z2qng6aEp8mhx8Fd5LWTaNTSxpUKs9fBTKXz0q8f_8bXNG-0uQTEWihgoufD4ytY8znOSTWnv_3qTnHMrfKAD9aOYEMerfczu5x7cJsGhQqcVCGgFd1R9uzdOySI4BdZNkpuuIobZdVMSojcQmBKUfRF5NaAI3VWQhgn',
//                     likes:4
//                 },
//                 {
//                     id:3,
//                     url:'https://pbs.twimg.com/media/DrkeOQ3U8AYk81m.jpg',
//                     likes:10
//                 },
//             ],
//             friends:[
//
//             ],
//             groups:[
//
//             ],
//             activity:[
//
//             ],
//             status:'',
//
//         },
//         8:{
//             userID:1,
//             post:[
//                 {
//                     id:1,
//                     text:'Dream it. Believe it. Build it.',
//                     likes:2
//                 },
//                 {
//                     id:2,
//                     text:' Don’t wait for opportunity. Create it.',
//                     likes:4
//                 }
//             ],
//             photo:[
//                 {
//                     id:1,
//                     url:'https://i.pinimg.com/originals/3a/9f/02/3a9f0210ff7d1e83039ff237c81bacae.jpg',
//                     likes:4
//                 },
//                 {
//                     id:2,
//                     url:'https://lh3.googleusercontent.com/proxy/gXn-Z2qng6aEp8mhx8Fd5LWTaNTSxpUKs9fBTKXz0q8f_8bXNG-0uQTEWihgoufD4ytY8znOSTWnv_3qTnHMrfKAD9aOYEMerfczu5x7cJsGhQqcVCGgFd1R9uzdOySI4BdZNkpuuIobZdVMSojcQmBKUfRF5NaAI3VWQhgn',
//                     likes:4
//                 },
//                 {
//                     id:3,
//                     url:'https://pbs.twimg.com/media/DrkeOQ3U8AYk81m.jpg',
//                     likes:10
//                 },
//             ],
//             friends:[
//
//             ],
//             groups:[
//
//             ],
//             activity:[
//
//             ],
//             status:'',
//
//         },
//     }
// ]
//
//
// let loginData = {
//     1: {
//         resultCode: 1,
//         data: {
//             userID: 1,
//             login: 'b.pitt@gmail.com',
//             password: 'bpitt1234'
//         },
//         messages: []
//     },
//     2: {
//         resultCode: 1,
//         data: {
//             userID: 2,
//             login: 'j.aniston@gmail.com',
//             password: 'janiston1234'
//         },
//         messages: []
//     },
//     3: {
//         resultCode: 1,
//         data: {
//             userID: 3,
//             login: 'c.hunnam@gmail.com',
//             password: 'chunnam1234'
//         },
//         messages: []
//     },
//     4: {
//         resultCode: 1,
//         data: {
//             userID: 4,
//             login: 'k.jenner@gmail.com',
//             password: 'kjenner1234'
//         },
//         messages: []
//     },
//     5: {
//         resultCode: 1,
//         data: {
//             userID: 5,
//             login: 'j.biel@gmail.com',
//             password: 'jbiel1234'
//         },
//         messages: []
//     },
//     6: {
//         resultCode: 1,
//         data: {
//             userID: 6,
//             login: 'j.leto@gmail.com',
//             password: 'jleto1234'
//         },
//         messages: []
//     },
//     7: {
//         resultCode: 1,
//         data: {
//             userID: 7,
//             login: 'l.dicaprio@gmail.com',
//             password: 'ldicaprio1234'
//         },
//         messages: []
//     },
//     8: {
//         resultCode: 1,
//         data: {
//             userID: 1,
//             login: 'c.pine@gmail.com',
//             password: 'cpine1234'
//         },
//         messages: []
//     }
//
// }