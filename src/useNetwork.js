import {useEffect, useState} from "react";

export const useNetwork = (onChange) => {
    const [status, setStatus] = useState(navigator.onLine); //navigator.onLine는 네트워크가 온라인이면 true 오프라인이면 false를 반환한다.
    const handleChange = () => {
        if (typeof onChange === "function") {    //온체인지(useNetwork의 전달인자)가 함수일때
            onChange(navigator.onLine);          //온체인지 함수의 argument는  navigator.onLine 에 따라서 t/f 를 반환한다
        }                                       //navigator는 브라우저와 관련된 정보를 컨트롤 한다. 브라우저에 대한 버전, 정보, 종류 등 관련된 정보이다.
        setStatus(navigator.onLine);            //status를 t/f 로 바꿔준다.
    };
    useEffect(() => {
        window.addEventListener("online", handleChange); //컴포넌트 렌더 상태일땐 이것들
        window.addEventListener("offline", handleChange);

        return () => {
            window.removeEventListener("online", handleChange);  //useEffect안에서 리턴은 컴포넌트가 렌더X 일때
            window.removeEventListener("offline", handleChange);
        };
    }, []);
    return status;  //결과적으로 status를 반환한다.(네트워크 상태의 true/false)
};
/*
* const handleNetworkChange = online => {
*   console.log(online ? "We just went online" : "We are offline");  //이함수는 useNetwork의 Argument로 사용될 것이기때문에 함수 내용은 true일때와 false일때의 함수를 넣어준다.
* };
* const onLine = useNetwork(handleNetworkChange); //useNetwork를 사용했기 때문에 선언된 onLine은 true/false 로 반환된다.
*                                                 //html에서만 바뀌는 것을 바라지않고 상태를 나타낼 수 있는 console이라던가 추가적인 함수를 만들기 위해서 argument에 새로운 함수를 넣어줬다.
* <h1>{onLine ? "Online" : "Offline"}</h1>
*
*/