import { Type } from "../Connstant/Constant";

export const CreateData = (Data) => {
    return {
        type : Type.CREATE_DATA,
        payload : Data
    };
}

export const EditData = (Data) => {
    return {
        type : Type.EDIT_DATA,
        payload : Data
    }
}

export const DeleteData = (Data) => {
    return {
        type : Type.DELETE_DATA,
        payload : Data
    }
}