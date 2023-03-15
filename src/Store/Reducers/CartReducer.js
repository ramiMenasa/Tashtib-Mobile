const InitialValues = {
    counter: 0,
}
export default function CartReducer(state = InitialValues, action) {
    switch (action.type) {        
        case 'CHANGE_COUNT':
            return {
                ...state,
                counter: action.payload
            }

    
        default:
            return state
    }

}