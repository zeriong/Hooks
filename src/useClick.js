import {useEffect, useRef} from "react";

export const useClick = onClick => { //useClick의 전달인자(argument)는 onClick이다.
    if (typeof onClick !== "function") {
        return;
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const element = useRef();  //useRef 는 레퍼런스를 사용한다. 레퍼런스는 component의 한 부분을 선택해준다..
                               // 쿼리셀렉터처럼 요소를 선택해서 가져와주는 역할이라고 보면 된다.
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(()=>{
        if (element.current) {
            element.current.addEventListener("click", onClick); //wrap function 의 element커렌트가 있으면 클릭시 전달인자의 함수를 실행한다.
        }
        return () => {
            if (element.current) {
                element.current.removeEventListener("click", onClick);  //useEffect에서 return은 해당함수가 속한 요소나 함수가 Unmount 됐을때 실행한다는 뜻
            }
        };
    }, []);
    return element; //useClick은 element를 반환한다. 고로 useClick훅을 사용한 함수는 useRef로 지정된 상태가 되고, 이 후 이useEffect 부분에서처럼 이벤트가 실행된다.
};
/*
* const sayHello = () => consloe.log("say hello");
* const title = useClick(sayHello);
* <h1 ref={title}> Hi </h1>          //ref로 title을 가져왔다. title은 유스클릭훅이고 클릭시 sayHello함수를 반환하는 훅이다.
*/