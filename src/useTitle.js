import {useEffect, useState} from "react";

export const useTitle = initialTitle => {
    const [title, setTitle] = useState(initialTitle);
    const updateTitle = ()=> {
        const htmlTitle = document.querySelector("title");
        htmlTitle.innerText = title;
    };
    useEffect(updateTitle, [title]);
    return setTitle;
}
/*
* const titleUpdater = useTitle("loading...");
* 타이틀의 디폴트를 이걸로 바꿔 줄 수 있다. loading...
*
* setTimeout(()=> titleUpdater("Home"),5000);
* 이걸 추가하면 5초 후에 타이틀이 loading... => Home 으로 바뀐다.
*/