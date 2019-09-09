import axios from 'axios'
//添加用户
export const adduser = (user) => {
    return axios.post("/user", user);
}
//按邮件地址得用户
export const getuserbyemail = (email) => {
    return axios.get("/user?email=" + email);
}
//登录
export const login = (email, pwd) => {
    return axios.get("/user?email=" + email + "&password=" + pwd);
}
//显示资金列表
export const getlist = () => {
    return axios.get("/profile");
}
//增加资金记录
export const addlist = (fund) => {
    return axios.post("/profile", fund);
}
//删除资金
export const deletelist = (id) => {
    return axios.delete(`/profile/${id}`);
}
//修改资金
export const updatelist = (id, fund) => {
    return axios.put(`/profile/${id}`, fund);
}
