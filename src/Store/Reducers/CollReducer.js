const InitialValues={
    Coll:"",
    lang:"EN"
}
function CollReducer(state=InitialValues,action){
    switch(action.type){
        case "CHANGECOLL":
        return{
            ...state,
            Coll:action.payload
        }
        default:
            return state
    }
}
export default CollReducer;