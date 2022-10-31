import defaultAxios from "axios";
// 가장먼저 axios를 인스톨 해야한다. 터미널에 npm install axios 혹은 툴의 문제해결기능을 사용 (웹스톰은 알트+엔터 누르고 해결)
// 간단하게 사용할때는 fetch를 쓰고, 이외의 확장성을 염두해봤을 땐 axios를 쓰는게 좋다.
import { useEffect, useState } from "react";

const useAxios = (opts, axiosInstance = defaultAxios) => {
    //opts 는 fetch로 치면 가져올 api를 등록할 수 있다. 당연히 배열로 많은 데이터를 가져올 것. 그리고 fetch와 다르게 바로 json화 되는게 axios의 장점이다.
    //axios는 기본적으로 인스턴스를 만들 수 있는 장점이 있다. 하지만 불러오지 않을경우 기본값으로 적용된다.

    const [state, setState] = useState({ //state의 디폴트 값은 아래 객체리터럴과 같다.
        loading: true,
        error: null,
        data: null
    });
    const [trigger, setTrigger] = useState(0);
    if (!opts.url) {  //유효성을 검사한다. 기본적으로 opts는 url이기 때문임
        return;
    }
    const refetch = () => {  //refetch 기능을 만들어주기 위함.
        setState({     //refetch 버튼을 눌렀을때 setState를 아래와 같이 실행시켜서 새로고침시킨다.
            ...state,
            loading: true
        });
        setTrigger(Date.now()); //그리고 useState로 트리거와 셋트리거를 만들어 주었고 Date.now()는 숫자가 랜덤으로 계속 발생하기때문에
    };                          //setTrigger는 누를때 마다 새로운 값으로 변한다. 즉 누를때마다 trigger가 변한다는 뜻.
                                //이 후 아래에서 useEffect를 이용하여 [](deps)에 trigger를 넣어줌으로서 누를때마다 새로고침된다.

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        axiosInstance(opts)   //일종의 fetch라고 보면 편할 것 같다... opts = api 배열이니까 opts가 로딩이되고나면
            .then((data) => {   //then으로 setState을 사용하여 state내용을 바꿔준다.
                setState({
                    ...state,
                    loading: false,
                    data
                });
            })
            .catch((error) => {    //catch 는 에러를 잡는 용으로 reject상태면 아래 함수를 실행한다.
                setState({ ...state, loading: false, error });
            });
    }, [trigger]);
    return { ...state, refetch };
    // state의 모든것과 refetch를 반환하여 이후 구조분해문법을 사용한다면 state에서 원하는 key만 입력하면 전부 빼다 쓸 수 있다.
};

/*

   const { loading, data, refetch } = useAxios({
       url: "https://yts.mx/api/v2/list_movies.json"
     });

     return (
       <div className="App" style={{ height: "1000vh" }}>
         <h1>{data && data.status}</h1>
         <h2>{loading && "Loading"}</h2>
         <button onClick={refetch}>Refetch</button>
       </div>
     );

*/