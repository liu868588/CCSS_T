/** @flow */
export function checkMobile(sMobile) {
        if(!(/^(13|15|18)\d{9}$/.test(sMobile))){
            return false;
        }
        return true;
}

/*
 异步操作，只能够没次传入参。因为this.setState(name)之后this.state.name并不是这次输入的值，而是上次输入的值，
 本质是因为在生命周期中改变了state了的值后，还没有进行render，就进行取值，所以取的值是上一次的。
 */
export function isNotEmpty(text){
    /*if(this.state.name == ''){
     return false;
     }
     if(this.state.phone == ''){
     return false;
     }*/
    if(text == ''){
        return false;
    }
    return true;
}

