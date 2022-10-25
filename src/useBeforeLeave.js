import {useEffect} from "react";

export const useBeforeLeave = (onBefore) => {
    if (typeof onBefore !== "function") { //onBefore은 반드시 함수여야 작동
        return;
    }
    const handle = (event) => {
        const { clientY } = event; //clientY 는 마우스리브가 나간 Y값인데
        if (clientY <= 0) {       // 0일경우에만 onBefore를 실행해준다. 즉 위로 나갈때만.
            onBefore();
        }
    };
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        document.addEventListener("mouseleave", handle);                   //컴포넌트가 보일때 (Mount)
        return () => document.removeEventListener("mouseleave", handle);  //컴포넌트가 안보일때 (Unmount)
    }, []);                                                               //다른요소가 보일때(다른요소 Mount일때) 이벤트가 실행되는 것을 막아준다.
};