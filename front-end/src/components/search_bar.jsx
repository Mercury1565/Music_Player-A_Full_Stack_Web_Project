import {SearchBarContainerStyle, SearchBarStyle} from "../styles/search_bar";

import { GlobalIconStyle } from "../styles/icons";
import { search_icon } from "../assets/assets";

const SearchBar = () => {
    return (
        <SearchBarContainerStyle>
            <GlobalIconStyle src={search_icon} alt="search icon"/>
            <SearchBarStyle type="text" placeholder="Search Music, Artist, Genre..."/>
        </SearchBarContainerStyle>
    );
}

export default SearchBar;