import {useEffect, useState} from "react";

export const useScroll = () => {
    const [state, setState] = useState({
        x: 0,
        y: 0
    });
    const onScroll = () => {
        setState({ y: window.scrollY, x: window.screenX }); //set fuction 으로 각 키에 벨류를 할당시킨다.
    };
    useEffect(() => {
        window.addEventListener("scroll", onScroll);                  //컴포넌트 렌더시 이벤트추가
        return () => window.removeEventListener("scroll", onScroll);  //컴포넌트 렌더X 일때 이벤트 삭제
    }, []);
    return state;
};
/*
* const { y } = useScroll(); //구조분해 문법으로 useScroll에서 y를 가져온다. 이후에 y를 사용하면 y의 벨류가 나온다.
*
* <div className="App" style={{ height: "1000vh" }}>
*     <h1 style={{ position: "fixed", color: y > 100 ? "red" : "blue" }}>hi</h1> //여기서 y를 언급했고, Y : window.scrollY 이기때문에
* </div>                                                                         //스크롤 위치에 따른 숫자를 반환한다.
*/