import SearchBar from "../components/search_bar";
import { GlobalContainer} from "../styles/containers"
import { my_theme } from "../styles/theme"
import { ThemeProvider } from "@emotion/react";

const SearchPage = () => {
    return(
        <ThemeProvider theme={my_theme}>
            <GlobalContainer>
                <SearchBar />
            </GlobalContainer>  
        </ThemeProvider> 
    )
}

export default SearchPage;