
export function getFromStorage(key){
    if(!key){
        return null;
    }
    try{
        const value=localStorage.getItem(key);
        if(value){
            return JSON.parse(value);
        }
        return null;
    }catch(err){
        return null;
    }
}
export function setInStorage(key,obj){
    if(!key){
        console.error("key is missing");
    }
    try{
        localStorage.setItem(key,JSON.stringify(obj))
    }catch(err){
        console.log(err)
    }
}

export function removeFromStorage(key){
    if(!key){
        return null;
    }
    try{

        localStorage.removeItem(key);
        
       
    }catch(err){
        return null;
    }
}
