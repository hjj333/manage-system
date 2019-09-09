import * as api from './api'
//是存在的email
function isexistsemail(email) {
    return new Promise((resolve, reject) => {
        api.getuserbyemail(email).then(res => {
            let _data = res.data;
            if (_data != null && _data.length > 0) {
                resolve({
                    isexists: true,
                    data: _data
                });
            } else {
                resolve({
                    isexists: false,
                    data: null
                });
            }
        });
    });
}
//登录
function login(email, pwd) {
    return new Promise((resolve, reject) => {
        api.login(email, pwd).then((res) => {
            let _data = res.data;
            if (_data != null && _data.length > 0) {
                //成功登录
                // _data 是数组
                resolve({
                    isok: true,
                    data: _data
                });
            } else {
                resolve({
                    isok: false,
                    data: null
                });
            }
        })
    });
}
export {
    isexistsemail,
    login
}
