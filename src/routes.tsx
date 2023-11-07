import {Routes, Route, BrowserRouter} from "react-router-dom";
import Home from "./Pages/Home";
import Game from "./Pages/Game";

const RoutesApp = () =>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<Home/>}/>
                <Route path={'/game/:states'} element={<Game/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;