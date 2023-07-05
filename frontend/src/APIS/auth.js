import { redirect } from "react-router-dom";

export function auth() {
    let user = localStorage.getItem("userfff") !== "undefined"
        ? JSON.parse(localStorage.getItem("userfff"))
        : localStorage.clear();
    console.log(user);
    user = true
    if (!user) {
        throw redirect("/sign-in")
    }
    return null
}