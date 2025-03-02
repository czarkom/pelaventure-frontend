import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";


export default function Main() {
    return (
        <div className="h-screen flex flex-col">
            <Navbar />
            <div className="flex-1">
                <Outlet />
            </div>
        </div>
    );
}