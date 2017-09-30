/**
 * Created by liuzy on 2017/8/21.
 */
export function getNetResult(url) {
    return new Promise((resolve, reject) =>{
        fetch(url)
            .then((response)=>response.json())
            .then((responseData)=>{
                resolve(responseData);
            })
            .catch((error)=>{
                if(error){
                    reject(error);
                }
            }).done();
    });
}
export function getNetResultNoPromise(url) {
        return fetch(url)
            .then((response)=>response.json())
            .then((responseData)=>{
                resolve(responseData);
            })
            .catch((error)=>{
                if(error){
                    reject(error);
                }
            }).done();
}