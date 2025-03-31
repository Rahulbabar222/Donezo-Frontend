import React, { useContext, useState } from 'react'
import { TodoContext } from '../context/TodoContext.jsx';
import { UiContext } from '../context/UiContext.jsx';
import Footer from './Footer.jsx';

const LeftNav = ({ }) => {
    const { handleLabelChange, label, handleLabelAdd, labels, setFilter, settempLabel, handleLabelDelete, filter } = useContext(TodoContext);
    const { isSidebarOpen, toggleSidebar } = useContext(UiContext)

    return (
        <>
            <div>
                <button style={{ display: isSidebarOpen ? "none" : "block" }} className='absolute md:top-9 md:left-15 lg:left-17 xl:left-20 ' onClick={() => toggleSidebar()}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className='h-[30px] w-[30px] md:h-[24px] md:w-[24px] my-2 text-zinc-500 hover:scale-110 hover:text-zinc-800'>
                        <path d="M2 12C2 8.31087 2 6.4663 2.81382 5.15877C3.1149 4.67502 3.48891 4.25427 3.91891 3.91554C5.08116 3 6.72077 3 10 3H14C17.2792 3 18.9188 3 20.0811 3.91554C20.5111 4.25427 20.8851 4.67502 21.1862 5.15877C22 6.4663 22 8.31087 22 12C22 15.6891 22 17.5337 21.1862 18.8412C20.8851 19.325 20.5111 19.7457 20.0811 20.0845C18.9188 21 17.2792 21 14 21H10C6.72077 21 5.08116 21 3.91891 20.0845C3.48891 19.7457 3.1149 19.325 2.81382 18.8412C2 17.5337 2 15.6891 2 12Z" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M9.5 3L9.5 21" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                        <path d="M5 7H6M5 10H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>

            <div style={{ display: isSidebarOpen ? "block" : "none" }} className='h-[85vh] sidebar rounded-3xl p-5 my-5 space-y-5 w-screen md:w-[30vw] xl:w-[20vw] bg-[#fffbf6] block relative '>
                <div className='flex px-3'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#71717b" fill="none">
                        <path d="M11.0809 13.152L8 7L13.4196 11.2796C14.1901 11.888 14.1941 13.0472 13.4277 13.6607C12.6614 14.2743 11.5189 14.0266 11.0809 13.152Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M5 4.82C3.14864 6.63902 2 9.17385 2 11.9776C2 17.5129 6.47715 22.0001 12 22.0001C17.5228 22.0001 22 17.5129 22 11.9776C22 7.1242 18.5581 3.07656 13.9872 2.15288C13.1512 1.98394 12.7332 1.89947 12.3666 2.20022C12 2.50097 12 2.98714 12 3.95949V4.96175" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <a className='text-zinc-500 font-bold px-3' href="/pomodoro">Pomodoro</a>
                </div>
                <div className='flex gap-3'>
                    <div className="addToDo bg-[#f1ece6] rounded-full w-full flex justify-between">
                        <input onChange={handleLabelChange} value={label} type="text" placeholder='Add Label' className='placeholder:text-sm text-zinc-500 w-full focus:outline-none px-5' />
                        <button onClick={() => handleLabelAdd()} disabled={!label.trim()} className=' disabled:bg-gray-500 text-white rounded-r-full py-2 px-4 bg-[#76b7cd] hover:bg-[#8bc5da]'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#ffffff" fill="none">
                                <path d="M12.06 21.5124C11.5445 21.8375 11.2868 22 11 22C10.7132 22 10.4554 21.8374 9.94 21.5124L8.02913 20.3073C7.54415 20.0014 7.30166 19.8485 7.03253 19.8397C6.74172 19.8301 6.49493 19.9768 5.97087 20.3073C5.38395 20.6774 4.21687 21.6971 3.46195 21.2108C3 20.9133 3 20.1575 3 18.6458V8.00002C3 5.17158 3 3.75736 3.82699 2.87868C4.65399 2 5.98501 2 8.64706 2H13.3529C16.015 2 17.346 2 18.173 2.87868C19 3.75736 19 5.17158 19 8.00002V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M11 11H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M17 14V22M21 18L13 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M15 7L7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                    <button onClick={() => toggleSidebar()}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" fill="none" className='my-2 text-zinc-600 hover:scale-110 hover:text-zinc-800'>
                            <path d="M2 12C2 8.31087 2 6.4663 2.81382 5.15877C3.1149 4.67502 3.48891 4.25427 3.91891 3.91554C5.08116 3 6.72077 3 10 3H14C17.2792 3 18.9188 3 20.0811 3.91554C20.5111 4.25427 20.8851 4.67502 21.1862 5.15877C22 6.4663 22 8.31087 22 12C22 15.6891 22 17.5337 21.1862 18.8412C20.8851 19.325 20.5111 19.7457 20.0811 20.0845C18.9188 21 17.2792 21 14 21H10C6.72077 21 5.08116 21 3.91891 20.0845C3.48891 19.7457 3.1149 19.325 2.81382 18.8412C2 17.5337 2 15.6891 2 12Z" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M9.5 3L9.5 21" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                            <path d="M5 7H6M5 10H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
                <ul >
                    {labels.map(item => (
                        <li
                            onClick={() => { setFilter(item.label); settempLabel(item.label) }}
                            className={`cursor-pointer text-sm  ${filter === item.label ? "text-zinc-800 font-bold" : "text-zinc-500"} p-2  flex gap-2 relative items-center border-b-1 border-gray-300`} key={item._id} >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" color="#gray" fill="none">
                                <circle cx="1.5" cy="1.5" r="1.5" transform="matrix(1 0 0 -1 16 8.00024)" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M2.77423 11.1439C1.77108 12.2643 1.7495 13.9546 2.67016 15.1437C4.49711 17.5033 6.49674 19.5029 8.85633 21.3298C10.0454 22.2505 11.7357 22.2289 12.8561 21.2258C15.8979 18.5022 18.6835 15.6559 21.3719 12.5279C21.6377 12.2187 21.8039 11.8397 21.8412 11.4336C22.0062 9.63798 22.3452 4.46467 20.9403 3.05974C19.5353 1.65481 14.362 1.99377 12.5664 2.15876C12.1603 2.19608 11.7813 2.36233 11.472 2.62811C8.34412 5.31646 5.49781 8.10211 2.77423 11.1439Z" stroke="currentColor" strokeWidth="1.5" />
                                <path d="M7.00002 14.0002L10 17.0002" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            {item.label}
                            <button onClick={() => handleLabelDelete(item._id, item.label)} className='cursor-pointer rounded-full hover:bg-gray-100 p-1 absolute right-0'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" color="#000000" fill="none">
                                    <path d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </li>
                    ))}
                </ul>
                <Footer />
            </div>
        </>
    )
}

export default LeftNav