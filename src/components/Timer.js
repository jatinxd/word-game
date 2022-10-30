import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';

const timeToAnswer = 10
const Timer = forwardRef(({ nextQuestion, reduceHealth }, ref) => {
    const [seconds, setSeconds] = useState(timeToAnswer);

    useImperativeHandle(ref, () => ({

        reset() {
            setSeconds(timeToAnswer)
        }

    }));

    useEffect(() => {
        let interval = null;
        if (seconds >= 0) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds - 1)
            }, 1000)
        } else {
            reduceHealth()
            nextQuestion()
            setSeconds(timeToAnswer)
        }
        return () => clearInterval(interval);
    }, [seconds]);

    return <>{seconds}s</>
});

export default Timer;