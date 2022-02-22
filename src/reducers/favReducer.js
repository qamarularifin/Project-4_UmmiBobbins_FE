export const favParentReducer = (state, action) => {
  switch (action.type) {
    case "ADDTOFAV":
      return [action.payload, ...state];
    case "REMOVEFROMFAV":
      const filtered = state.filter((ele, i) => ele._id !== action.payload);
      return filtered;
    default:
      return state;
  }
};
