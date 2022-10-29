const useNotification = (title, options) => {
    if (!("Notification" in window)) { //Notification옵션을 웹에서만 실행되도록 만든 것.
        return;
    }
    const fireNotif = () => {
        if (Notification.permission !== "granted") { //허용이 안되어있다면?
            Notification.requestPermission().then((permission) => { //알람 승인요청을 보낸다는 뜻.
                if (permission === "granted") {                                       //만약 허용됐다면?
                    new Notification(title, options);                                 //알람을 보낸다. (title,options)
                } else {                                                              //아니면 끝.
                    return;
                }
            });
        } else {
            new Notification(title, options);                                       //그렇다면 반대로 이건 허용이 되었다는 거니까 바로 알람을 보낸다.
        }
    };
    return fireNotif;
};

// eslint-disable-next-line react-hooks/rules-of-hooks
const triggerNotif = useNotification("Can I steal your kimch?", {
    body: "I love kimch dont you"                                                  //전달인자 1은 타이틀을 반환, 2번째는 옵션들이 있다.
});                                                                                //Notification은 API를 사용하기때문에 https://developer.mozilla.org/ko/docs/Web/API/Notification 확인하자

/*

   <button onClick={triggerNotif}>hello</button>

*/