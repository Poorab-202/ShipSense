import React from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User } from "lucide-react";

function Navbar() {
    return (
        <>
            <nav className="flex items-center justify-between px-6 py-3 bg-[#3B0270] text-white shadow-md">

                <div className="flex items-center space-x-2">
                    <img src="public\logo.jpg" alt="Logo" className="h-8 w-8" />
                    <span className="text-lg font-bold tracking-wide">Campus Express</span>
                </div>


                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="ghost" className="p-0 rounded-full">
                            <Avatar>
                                <AvatarImage src="profile.png" alt="Profile" />
                                <AvatarFallback className="text-black">U</AvatarFallback>
                            </Avatar>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-48 bg-[#E9B3FB] text-[#3B0270] shadow-lg rounded-xl">
                        <div className="flex flex-col space-y-2">
                            <Button variant="ghost" className="justify-start hover:bg-[#FFF1F1]">
                                <User className="mr-2 h-4 w-4" /> Profile
                            </Button>
                            <Button variant="ghost" className="justify-start text-red-600 hover:bg-[#FFF1F1]">
                                <LogOut className="mr-2 h-4 w-4" /> Log Out
                            </Button>
                        </div>
                    </PopoverContent>
                </Popover>
            </nav>
        </>
    );
}

export default Navbar;