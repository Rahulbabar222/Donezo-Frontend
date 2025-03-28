import { createContext, useState, useEffect } from "react";

export const UiContext = createContext();

export const UiProvider = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setIsSidebarOpen(false);
            } else {
                setIsSidebarOpen(true);
            }
        };

        // Set initial state based on screen size
        handleResize();

        // Attach event listener
        window.addEventListener("resize", handleResize);

        // Cleanup event listener on unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <UiContext.Provider value={{ toggleSidebar, isSidebarOpen }}>
            {children}
        </UiContext.Provider>
    );
};