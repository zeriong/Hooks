import {useEffect, useRef} from "react";

export const useFadeIn = (duration = 1, delay = 0) => {
    if (typeof duration !== "number" || typeof delay !== "number") {
        return;
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const element = useRef(); //element는 current 객체를 가지고 있게 된다. useRef를 사용했기때문에 변수나 속성이 수정되어도 리렌더되지않고 저장된다. 컴포넌트에서 ref={element} 하면 접근가능
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (element.current) { //element가 useRef를 사용하여 current를 가지고 있다면,
            const { current } = element;  //구조분해문법을 이용하여 element에서 current를 가져온다.
            current.style.transition = `opacity ${duration}s ease-in-out ${delay}s`; // 가져온 current에 접근하여 스타일을 바꾼거다.
            current.style.opacity = 1;
        }
    }, []);
    return { ref: element, style: { opacity: 0 } }; //ref = element, 스타일 오퍼시티0을 반환하기때문에, 컴포넌트에 useFadeIn 훅이 사용되면
};                                                  // 컴포넌트 속성에 ref={element} 가 추가돼서 useFadeIn안에 element속성이 그대로 반영된다.
/*
* const fadeInH1 = useFadeIn(1, 2);  // 1전달인자 = duration , 2전달인자 = delay 다.
* const fadeInP = useFadeIn(5, 10);
*
* <h1 {...fadeInH1}>hello</h1>
* <p {...fadeInP}>holly sheet</p>
*
*
*/