const usePreventLeave = () => {
    const listener = (event) => {
        event.preventDefault(); //이 후에 받을 이벤트만 단독으로 받기 위해서 우선적으로 프리벤트 디폴트를 한다. 글고 어차피 기본기능 안쓸 듯 리액트니까
        event.returnValue = ""; //없으면 beforeunload 가 실행되지 않는다. 둘이 한 세트임.
    };
    const enablePrevent = () =>
        window.addEventListener("beforeunload", listener); //이벤트 추가
    const disablePrevent = () =>
        window.removeEventListener("beforeunload", listener); //이벤트 삭제
    return { enablePrevent, disablePrevent };
    /*{추가, 삭제} 사용할땐 const {추가, 삭제} = usePreventLeave();
    이 후 함수형 요소 안에 넣어줌. ex) <button onClick={추가}/> <button onClick={삭제}/>
    추가를 누르면 창 닫을때 나갈거냐 물어봄. 삭제를 누르면 이벤트가 사라져서 안물어보고 바로 꺼짐*/
};