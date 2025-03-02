import React, { useState, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { Menu, MenuItem, IconButton, Avatar, Badge, TextField } from '@mui/material';
import ColorModeIconDropdown from '../shared-theme/ColorModeIconDropdown';
import userImage from '../assets/account_thumbnail_test.jpg';
import PelaventureIcon from './PelaventureIcon';
import NotificationsIcon from "@mui/icons-material/Notifications";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface NavbarProps {
    // Add any props you might want to pass to Navbar
}

const Navbar: React.FC<NavbarProps> = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: MouseEvent<HTMLElement>): void => {
        setAnchorEl(event.currentTarget); // Open dropdown
    };

    const handleClose = (): void => {
        setAnchorEl(null); // Close dropdown
    };

    return (
        <nav className="bg-gray-800 text-white shadow-md p-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <div className='flex items-center'>
                        <PelaventureIcon />
                        <h1 className="text-xl font-semibold mr-12">Pelaventure</h1>
                    </div>
                    <div className="flex items-center space-x-6">
                        <Link to="/" className="hover:text-gray-400">Home</Link>
                        <Link to="/dashboard" className="hover:text-gray-400">Dashboard</Link>
                        <Link to="/explore" className="hover:text-gray-400">Explore</Link>
                        <Link to="/trending" className="hover:text-gray-400">Trending</Link>
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <TextField
                        placeholder="Ask me anything"
                        variant="outlined"
                        size="small"
                        className="bg-none rounded w-96"
                        InputProps={{
                            style: { fontSize: "0.875rem" }, // Adjust input text size
                        }}
                    />
                    <Badge badgeContent={4} color="error">
                        <IconButton className="text-white">
                            <NotificationsIcon />
                        </IconButton>
                    </Badge>
                    <div className="flex items-center space-x-1 cursor-pointer" onClick={handleClick}>
                        <Avatar alt="Maciej Czarkowski" src={userImage} />
                        <KeyboardArrowDownIcon />
                    </div>

                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>Settings</MenuItem>
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </Menu>

                    <ColorModeIconDropdown />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
