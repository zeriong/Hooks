import {useState} from "react";

export const useInput = (initialValue, validator) => {
    const [value, setValue] = useState(initialValue);
    const onChange = event => {
        const{
            target: {value}      //전달인자 event를 가져와서 구조분해문법(destructuring)을 사용하여 인풋에 value를 쏙 빼온다.
        } = event;
        let willUpdate = true;
        if (typeof validator === "function") {
            willUpdate = validator(value);      //유효성검사 //함수면 value를 전달받아 함수로 실행
        }
        if (willUpdate) {
            setValue(value);                //유효성검사 //계속해서 value를 업데이트 한다.
        }
    };
    return {value, onChange};    //결과적으로 이 두가지를 반환하지만 밑에서 사용할땐 {...name} 으로 언팩(모두적용) 해준다.
}
/*
  const maxLen = (value) => value.length <= 10;
  const cantWord = (value) => !value.includes("@");

  const name = useInput("MR.", cantWord);    //1번째 전달인자는 초기값(Default), 2번째 전달인자 maxLen, cantWord 선택해서 적어주면 해당 validator 가 적용

  <input placeholder="Name" {...name} />     //네임으로 선언한 것이 useInput, 즉 위에서 반환된 {value, onChange} 모두 언팩한다.
*/