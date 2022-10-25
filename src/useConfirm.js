const useConfirm = (message, callback) => {
    if(typeof callback !== 'function'){
        return;
    }
    const confirmAction = () => {
        if (confirm(message)){
            callback();
        }
    }
    return confirmAction;
}