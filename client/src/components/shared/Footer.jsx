import React from "react";

export default function Footer() {
    return (
        <footer className="bg-[#3B0270] text-white py-4 mt-auto">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">

                <div className="text-center md:text-left mb-2 md:mb-0">
                    <h2 className="font-bold text-lg">ShipSense</h2>
                    <p className="text-sm text-[#E9B3FB]">Delivering with trust and speed</p>
                </div>


                <div className="flex space-x-6 text-sm">
                    <a href="/about" className="hover:text-[#E9B3FB]">
                        About Us
                    </a>
                    <a href="/contact" className="hover:text-[#E9B3FB]">
                        Contact
                    </a>
                    <a href="/privacy" className="hover:text-[#E9B3FB]">
                        Privacy Policy
                    </a>
                </div>


                <div className="text-sm text-[#E9B3FB] mt-2 md:mt-0">
                    © {new Date().getFullYear()} ShipSense. All rights reserved.
                </div>
            </div>
        </footer>
    );
}