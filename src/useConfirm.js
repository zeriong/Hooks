export const useConfirm = (message, onConfirm, onCancel) => { //온캔슬은 취소했을때 function이기에 필없음 안써두 댐
    if(!onConfirm && typeof onConfirm !== 'function'){ //콜백의 존재를 알아야해서 !onConfirm &&
        return;
    }
    if(onCancel && typeof onCancel !== 'function'){ //onCancel 존재고 뭐고 있으면 되고 안되면 안되니까 상관 무
        return
    }
    const confirmAction = () => {
        if (confirm(message)){
            onConfirm();
        } else{
            onCancel(); //마찬가지로 취소했을때 필요한 경우만 써두자
        }
    }
    return confirmAction;
}
/*
* const deleteWorld = ()=> console.log("Deleting the world...");
* const safeWorld = ()=> console.log("You safe the world!!!");
* const confirmDelete = useConfirm("Are you sure?", deleteWorld, safeWorld);
*
* <button onClick={confirmDelete}> Delete World </button>
*
* 버튼 클릭시 confirm창이 뜨고 내용은 "Are you sure?"이다
* 확인을 누르면 deleteWorld
* 취소누르면 safeWorld가 실행된다.
* useConfirm만든 argument대로 호출된다. (확인창 메시지내용,확인시 함수, 취소시 함수.)
*/