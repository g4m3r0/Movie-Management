export function handleError(message){
    if(message.includes("Error:")){ //env.ALERT_ERROR == "true" && 
        alert(message);
    }
}

export function checkLogin(){
    var tmpUserName = window.sessionStorage.getItem('username');

    if (tmpUserName == null || tmpUserName == undefined || tmpUserName == 'undefined') {
        return false;
    } else {
        return true;
    }
}