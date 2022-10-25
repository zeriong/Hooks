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
            onCancel(); //else 리젝션은 취소했을때 function이기에 필없음 안써두 댐
        }
    }
    return confirmAction;
}