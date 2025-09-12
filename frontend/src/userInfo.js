export const getUserInfo=()=>{
    const loggedUser=localStorage.getItem("user");
    console.log("LoggedUser",loggedUser);

    return loggedUser?JSON.parse(loggedUser):null;
};