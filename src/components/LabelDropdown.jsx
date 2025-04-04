import { useState, useEffect, useRef,useContext } from "react";
import { TodoContext } from "../context/TodoContext.jsx";

const LabelDropdown = ({text, color,size }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null); // Reference to the dropdown container
    const {labels,selectedLabel,setSelectedLabel,setisreminderopen}= useContext(TodoContext);

    // Close dropdown if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            {/* Button with SVG as dropdown trigger */}
            <button
                onClick={() => {setIsOpen(!isOpen); setisreminderopen(false)}}
                className={`flex items-center px-2 py-1 m-2 gap-2 rounded-full border-1 border-gray-600 ${isOpen ? "bg-gray-600" : ""}`}
            >
                <p className={`${text} ${isOpen ? "text-white" : color}`} >{selectedLabel}</p>

                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} fill="none" className={`${isOpen ? "text-white" : "text-gray-600"}`}>
                    <circle cx="1.5" cy="1.5" r="1.5" transform="matrix(1 0 0 -1 16 8.00024)" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2.77423 11.1439C1.77108 12.2643 1.7495 13.9546 2.67016 15.1437C4.49711 17.5033 6.49674 19.5029 8.85633 21.3298C10.0454 22.2505 11.7357 22.2289 12.8561 21.2258C15.8979 18.5022 18.6835 15.6559 21.3719 12.5279C21.6377 12.2187 21.8039 11.8397 21.8412 11.4336C22.0062 9.63798 22.3452 4.46467 20.9403 3.05974C19.5353 1.65481 14.362 1.99377 12.5664 2.15876C12.1603 2.19608 11.7813 2.36233 11.472 2.62811C8.34412 5.31646 5.49781 8.10211 2.77423 11.1439Z" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M7.00002 14.0002L10 17.0002" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            {/* Dropdown options */}
            {isOpen && (
                <ul className="absolute left-0 w-40 bg-white border-none rounded-lg shadow-md">
                    <li className="p-2 text-sm hover:bg-gray-100 cursor-pointer" onClick={() => { setSelectedLabel(""); setIsOpen(false); }}>• None (default)</li>
                    {labels.map((label) => (
                        <li
                            key={label._id}
                            className="p-2 text-sm hover:bg-gray-100 cursor-pointer"
                            onClick={() => { setSelectedLabel(label.label); setIsOpen(false); }}
                        >
                            • {label.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default LabelDropdown;