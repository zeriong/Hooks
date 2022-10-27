import {useState} from "react";

export const useTabs = (initialTab, allTabs) => {
    if (!allTabs || !Array.isArray(allTabs)) {  //유효성 검사. 거짓이거나 객체가 아니면~ 빈함수 리턴. (함수브레이크)
        return;
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [currentIndex, setCurrentIndex] = useState(initialTab);
    return {
        currentItem: allTabs[currentIndex],
        changeItem: setCurrentIndex

        //useTabs 는 위와 같은 object형으로 currentItem,changeItem를 반환한다.
        //currentItem은 useTabs에 두번째 인자인 allTabs[ (useTabs->useState에서 initialTab숫자) ] 가된다.
        //changeItem은 useState에서 set/function이므로 changeItem은 반드시 함수형태로서 currentIndex로 reRender시킨다
    };
}
/*
* const {currentItem, changeItem} = useTabs(1, content);  // {currentItem, changeItem} = {currentItem, changeItem}(useTabs의 반환값) 이름도 같고 위치도 같기때문에 컴포넌트에 넣으면 더 가독성이 좋아서인 듯 하다
* <div className="App">
*      {content.map((section, index) => (         // array.map( (item(적용요소자체), index(배열순서로 배열마다 각각번호를 달아줌))=>{ 컴포넌트 } )
*        <button onClick={ ()=> changeItem(index) }>{section.tab}</button> //changeItem은 useState 의 set/fuction이기때문에 클릭시 currentIndex를 .map에서 받은 index 순번으로 바꿔준다.
*      ))}                                                                 // (index)예시: section1 을 클릭하면 배열0번째 이기때문에 index도 0이다. section2 는 1번째 배열이므로 index는 1
*      <div>{currentItem.content}</div>                    //이후에 changeItem = setCurrentIndex(useState set/function) = currentIndex 해당 index값으로 바꿔줌
*     </div>                                               //그렇게되면 currentItem = allTabs[ currentIndex(mpa의 index값) ].content 가 출력된다.
*
*/