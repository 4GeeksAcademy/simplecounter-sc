import React, { useEffect, useRef, useState } from "react";
import { FaClock } from "react-icons/fa";

const Counter = ({ initialSeconds = 0, countdown = false }) => {
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [decimalHours, setDecimalHours] = useState(0);
    const [decimalMinutes, setDecimalMinutes] = useState(0);
    const [decimalSeconds, setDecimalSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(true);
    const intervalRef = useRef(null);

    useEffect(() => {
        startTimer();
        return () => clearInterval(intervalRef.current);
    }, [seconds, minutes]);

    const startTimer = () => {
        intervalRef.current = setInterval(() => {
            setSeconds(prevSeconds => countdown ? prevSeconds - 1 : prevSeconds + 1);
        }, 1000);
        if (seconds === 10) {
            setDecimalSeconds((prev) => prev + 1);
            setSeconds(0);
        }
        if (decimalSeconds === 6) {
            setMinutes((prev) => prev + 1);
            setSeconds(0);
            setDecimalSeconds(0);
        }

        if (minutes === 10) {
            setDecimalMinutes((prev) => prev + 1);
            setMinutes(0);
        }
        if (decimalMinutes === 6) {
            setHours((prev) => prev + 1);
            setDecimalMinutes(0);
            setMinutes(0);
        }

        if (hours === 10) {
            setDecimalHours((prev) => prev + 1);
            setHours(0);
        }
    };

    const stopTimer = () => {
        clearInterval(intervalRef.current);
        setIsRunning(false);
    };

    const resumeTimer = () => {
        if (!isRunning) {
            startTimer();
            setIsRunning(true);
        }
    };

    const resetTimer = () => {
        clearInterval(intervalRef.current);
        setSeconds(0);
        setDecimalSeconds(0);
        setMinutes(0);
        setDecimalMinutes(0);
        setHours(0);
        setDecimalHours(0);
        setIsRunning(false);
    };

    return (
        <div className="counter-container">
            <div className="time-container">
                <div className="time-box"><FaClock /></div>
                <div className="time-box">{decimalHours}</div>
                <div className="time-box">{hours}</div>
                <div className="time-box">{decimalMinutes}</div>
                <div className="time-box">{minutes}</div>
                <div className="time-box">{decimalSeconds}</div>
                <div className="time-box">{seconds}</div>
            </div>
            <div className="controls">
                <button onClick={stopTimer}>Parar</button>
                <button onClick={resumeTimer}>Reanudar</button>
                <button onClick={resetTimer}>Reiniciar</button>
            </div>
        </div>
    );
};

export default Counter;
