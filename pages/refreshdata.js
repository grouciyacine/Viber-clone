export const UserData=()=>{
    const accessTok=localStorage.getItem('user')!=="undefined"?
    JSON.parse(localStorage.getItem('user')):localStorage.clear();
    return accessTok
}
export const UserToken=()=>{
    const accessTok=localStorage.getItem('token')!=="undefined"?
    JSON.parse(localStorage.getItem('token')):localStorage.clear();
return accessTok
}