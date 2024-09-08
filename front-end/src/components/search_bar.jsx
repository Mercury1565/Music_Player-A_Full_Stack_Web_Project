import {SearchBarContainerStyle, SearchBarStyle} from "../styles/search_bar";

import { GlobalIconStyle } from "../styles/icons";
import { search_icon } from "../assets/assets";
import { useDispatch } from "react-redux";

const SearchBar = () => {
    const dispatch = useDispatch();

    const handleSearch = (event) => {
        const searchText = event.target.value;
        if (searchText !== "") {
            dispatch({ type: 'music/searchMusic', payload: searchText });
        }
    };

    return (
        <SearchBarContainerStyle>
            <GlobalIconStyle src={search_icon} alt="search icon"/>
            <SearchBarStyle type="text" placeholder="Search Music, Artist, Genre..." onChange={handleSearch}/>
        </SearchBarContainerStyle>
    );
}

export default SearchBar;