import env from "react-dotenv";

export function handleError(message){
    if(message.includes("Error:")){ //env.ALERT_ERROR == "true" && 
        alert(message);
    }
}