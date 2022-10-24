import {useEffect, useRef} from "react";

export const useClick = onClick => {
    if (typeof onClick !== "function") {
        return;
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const element = useRef();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(()=>{
        if (element.current) {
            element.current.addEventListener("click", onClick);
        }
        return () => {
            if (element.current) {
                element.current.removeEventListener("click", onClick);
            }
        };
    }, []);
    return element;
};