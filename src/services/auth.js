import {
    serviceMaker,
    methods,
    api
} from "./index.js"

export const login = (username, password) => serviceMaker(`/authentication?username=${username}&password=${password}`, methods.POST, api.ngb)
