import  {countryAPI} from "../../firebase";

const setCountries = 'SET-COUNTRIES'
let initialState = {
    countries: []
}

let locationReducer = (state=initialState, action)=>{
    switch (action.type) {
        case setCountries:
            return {
                ...state,
                countries:[action.countries]
            }
        default:
            return state
    }
}

const setCountriesAC =  (countries) => ({type:setCountries, countries:countries})

export const setCountriesThunk = ()=>(dispatch)=>{
    countryAPI.on('value', (snap)=> {
        let countries = []
        let countriesArray = []
        snap.forEach(u=>{
            countriesArray.push(u.val())
        })
       countriesArray.forEach(el=>{

               countries.push(el.country)

       })
        dispatch(setCountriesAC(countries))
    });

}

export default locationReducer

