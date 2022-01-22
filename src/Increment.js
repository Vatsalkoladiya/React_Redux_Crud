import React from 'react';
import {connect} from "react-redux"
import { DecrementValue, IncrementValue } from './Redux/Action/Action';

const Increment = (props) => {
  // const changeTheNumber = useSelector((state) => state.Data);
  // const Data = useDispatch();
  const {increment,decrement,numberData} = props

    return (
      <>
        <div className="container">
          <div
            className="main"
            style={{ display: "flex", flexDirection: "column" }}
          >
            {numberData}
            <button
              onClick={() =>
                numberData < 500 ? increment() : numberData
              }
            >
              INCREMENT
            </button>
            <button
              onClick={() =>
                numberData > 0 ? decrement() : numberData
              }
            >
              DECREMENT
            </button>
          </div>
        </div>
      </>
    );
};

const mapDispatchToProps = (dispatch) => {
 return {
   increment: () => dispatch(IncrementValue()),
   decrement: () => dispatch(DecrementValue()),
 };
}

const mapStateToProps = (state) =>{
  return{
  numberData:state.Data
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Increment);
