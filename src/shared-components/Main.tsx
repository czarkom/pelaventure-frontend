import { CssBaseline } from "@mui/material";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";


export default function Main(props: { disableCustomTheme?: boolean }) {
    return (
        <div className="h-screen flex flex-col">
            <Navbar />
            <div className="flex-1">
                <Outlet />
            </div>
        </div>
    );
}