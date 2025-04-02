import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setTimeLeft, setSessionLeft, toggleRunning, reset } from "./../../redux/slice/pomodoroSlice";
import Setting from "./Setting";
import CircularProgress from "./CircularProgress";

const Pomodoro = () => {
    const dispatch = useDispatch();

    const {
        sessions, pomodoroTime, shortBreakTime,
        longBreakTime, autoStart, longactivate,
        mode, sessionLeft, timeLeft, isRunning
    } = useSelector((state) => state.pomodoro);

    const victory = new Audio("./Victory.mp3");
    const breakSound = new Audio("./Bell.mp3");

    useEffect(() => {
        if (mode === "pomodoro") {
            dispatch(setTimeLeft(pomodoroTime));
        } else if (mode === "short") {
            dispatch(setTimeLeft(shortBreakTime));
        } else if (mode === "long") {
            dispatch(setTimeLeft(longBreakTime));
        }
    }, [mode, dispatch, pomodoroTime, shortBreakTime, longBreakTime]);

    useEffect(() => {
        if (sessionLeft === 0 && mode === "pomodoro") {
            victory.play();
            dispatch(reset());
        }
    }, [sessionLeft, mode, dispatch]);

    useEffect(() => {
        if (!isRunning) return;

        const interval = setInterval(() => {
            dispatch(setTimeLeft(timeLeft > 0 ? timeLeft - 1 : 0));
        }, 1000);

        if (timeLeft === 1 && sessionLeft > 0) {
            breakSound.play();
        }

        if (timeLeft === 0) {
            if (mode === "pomodoro" && (sessions - sessionLeft + 1) % longactivate === 0) {
                dispatch(setSessionLeft(sessionLeft - 1));
                dispatch(setMode("long"));
            } else if (mode === "pomodoro") {
                dispatch(setSessionLeft(sessionLeft - 1));
                dispatch(setMode("short"));
            } else {
                dispatch(setMode("pomodoro"));
            }

            if (!autoStart) {
                dispatch(toggleRunning());
            }
        }
        return () => clearInterval(interval);
    }, [isRunning, timeLeft, sessionLeft, mode, autoStart, dispatch]);

    return (
        <div className="h-screen w-screen bg-[#1e2140] flex flex-col items-center justify-center relative gap-10">
            <div className="text-5xl text-[#dce0fe]"><h1>PoMoDoRo</h1></div>

            <div className="circle flex p-2 justify-center items-center rounded-full font-bold bg-[#181818]">
                <div onClick={() => dispatch(setMode("pomodoro"))} className={`px-5 h-full rounded-full flex text-center items-center ${mode === "pomodoro" ? " bg-[#c95250] text-[#242424]" : "text-zinc-400"}`}>Pomodoro</div>
                <div onClick={() => dispatch(setMode("short"))} className={`px-5 py-3 rounded-full flex text-center ${mode === "short" ? " bg-[#38868a] text-[#242424]" : "text-zinc-400"}`}>Short Break</div>
                <div onClick={() => dispatch(setMode("long"))} className={`px-5 py-3 rounded-full flex text-center ${mode === "long" ? " bg-[#397097] text-[#242424]" : "text-zinc-400"}`}>Long Break</div>
            </div>

            <div className="h-90 w-90 md:h-100 md:w-100 rounded-full bg-[#272b51] flex justify-center items-center">
                <CircularProgress />
            </div>

            <div className="flex gap-8">
                <button className="hover:scale-110" onClick={() =>  dispatch(reset())}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" color="#dce0fe" fill="none">
                        <path d="M5.04798 8.60657L2.53784 8.45376C4.33712 3.70477 9.503 0.999914 14.5396 2.34474C19.904 3.77711 23.0904 9.26107 21.6565 14.5935C20.2227 19.926 14.7116 23.0876 9.3472 21.6553C5.36419 20.5917 2.58192 17.2946 2 13.4844" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 8V12L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <button className="text-[#dce0fe] text-4xl p-4 rounded-full bg-[#272b51] hover:border-1" onClick={() => dispatch(toggleRunning())}>
                    {isRunning ? "P A U S E" : "S T A R T"}
                </button>
                <Setting />
            </div>
        </div>
    );
};

export default Pomodoro;