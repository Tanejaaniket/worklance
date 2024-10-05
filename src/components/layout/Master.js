import Footer from "./Footer";
import Header from "./Header";
import {Outlet} from "react-router-dom";

export default function Master(){
    return(
        <>
            <Header/>
            <Outlet/>
            <Footer/>
        </>
    )
}