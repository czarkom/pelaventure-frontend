import { CssBaseline } from "@mui/material";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";


export default function Main(props: { disableCustomTheme?: boolean }) {
    return (
        <>
            <Navbar />
            <div className="content">
                <Outlet />
            </div>
        </>
    );
}