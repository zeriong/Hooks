import {useRef} from "react";

export const useFullscreen = (callback) => {
    const element = useRef();
    const runCd = (isFull) => {
        if (callback && typeof callback === "function") {  //웹사이트 마다 유효성을 검사하기 위해서 runCd를 선언하여 useFullscreen의 매게변수로 대입할 수 있도록 해줬다.
            callback(isFull);                              //아래 보면 runCd(true/false)로 유효성을 검사한다.
        }
    };
    const triggerFull = () => {
        const El_Curt = element.current;  // 더 간략하게 쓰기 위해서 선언해준 변수.
        if (El_Curt) {
            if (El_Curt.requestFullscreen) {
                El_Curt.requestFullscreen();
            } else if (El_Curt.MozRequestFullscreen) {  //파이어폭스 = moz , 오페라 = webkit , 마이크로소프트 = ms
                El_Curt.MozRequestFullscreen();
            } else if (El_Curt.webkitRequestFullscreen) {
                El_Curt.webkitRequestFullscreen();
            } else if (El_Curt.msRequestFullscreen) {
                El_Curt.msRequestFullscreen();
            }
            runCd(true);
        }
    };
    const exitFull = () => {
        if (document.exitFullscreen) {  //이상하게 풀스크린 취소는 document에 접근하여 취소해야 한다. 매커니즘상 그런거니까 이해보단 받아들이자.
            document.exitFullscreen();
        } else if (document.MozCancelFullscreen) {  //파이어폭스 = moz , 오페라 = webkit , 마이크로소프트 = ms
            document.MozCancelFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        runCd(false);
    };
    return { element, triggerFull, exitFull };
};
/*

  const onFullS = (isFull) => {
    console.log(isFull ? "We are Full" : "We are Small");
  };

  const { element, triggerFull, exitFull } = useFullscreen(onFullS);     //위에 선언된 함수 onFulls 는 boolean값을 받아 오기 때문에 useFullscreen의 매게변수로 적합하다.
                                                                         //구조분해문법을 이용하여 useFullscreen에서 각각 반환값을 가져와서 쓴다.
  <div className="App" style={{ height: "1000vh" }}>
      <div ref={element}>    //exitFull 버튼을 만들어주기 위해서 img와 버튼을 같이 div로 감싸서 전체화면으로 만들어줬다. 그 이후 ref는 전체화면이 될 요소에 추가해주면 끝.
          <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvY45643weBzB7-9Xz-ZlV3HZTQVO3ZiPmBg&usqp=CAU"   //압둘알리사진이다.
              alt="앗살라말라이꿍~"
          />
          <button onClick={exitFull}>Exit fullscreen</button>
      </div>
      <button onClick={triggerFull}>Make fullscreen</button>
  </div>

 */