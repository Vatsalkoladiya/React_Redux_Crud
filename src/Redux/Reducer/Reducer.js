import { Type } from "../Connstant/Constant";

const initialState = {
    Data : []
};

const Reducer = (state = initialState, action) => {
switch (action.type) {
  case Type.CREATE_DATA:
    return {
      ...state,
      Data: [...state.Data, action.payload],
    };
    case Type.DELETE_DATA :
        return {
          ...state,
          Data: action.payload,
        };
  default:
    return state;
}
};
export default Reducer;
