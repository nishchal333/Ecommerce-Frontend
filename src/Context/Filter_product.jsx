import { createContext, useContext , useReducer,useEffect} from "react";

import reducer from "../Reducer/Filter_Reducer";
import { useProductcontext } from "./Context";

const FilterContext = createContext();

const initialState = {
    filter_products: [],
    all_products: [],
    grid_view: true,
    sorting_value:"lowest",
    filters:{
      text: "",
      category:"All",
      company:"All",
      colors: "All",
      maxPrice: 0,
      price: 0,
      minPrice: 0,
    },
  
}
export const FilterContextProvider = ({ children }) => {
 
    const {products} = useProductcontext();
 const [state, dispatch] = useReducer(reducer, initialState);
// to set grid views
 const setGridView = () => {
    return dispatch({ type: "SET_GRID_VIEW" });
  };

// to set List views
const setListView = () => {
  return dispatch({ type: "SET_LIST_VIEW" });
};

// sorting function 
const sorting =(event) =>{
  let uservalue = event.target.value;
dispatch({type: "GET_SORT_VALUE" , payload: uservalue });
}

// update the filter values
const updateFilterValue = (event) => {
  let name = event.target.name;
  let value = event.target.value;

  return dispatch({ type: "UPDATE_FILTERS_VALUE", payload: { name, value } });
};


// to sort the product
useEffect(() => {
  dispatch({ type: "FILTER_PRODUCTS" });
  dispatch({ type: "SORTING_PRODUCTS" });
}, [products, state.sorting_value, state.filters]);

// to clear the filter 
const clearFilters =() =>{
  dispatch({type: "CLEAR_FILTERS"});
}

// to sort the filter
 useEffect(() => {
    dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: products });
  }, [products]);



    return (
        <FilterContext.Provider
          value={{ ...state ,setGridView,setListView,sorting, updateFilterValue,clearFilters}}>
          {children}
        </FilterContext.Provider>
      );
    
};
export const useFilterContext = () => {
    return useContext(FilterContext);
  };