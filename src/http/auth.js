import {
  serviceMaker,
  methods,
  api
} from "./index.js"

export const signin = (username, password) => serviceMaker(`/authentication?username=${username}&password=${password}`, methods.POST, api.NGB, '', {})
export const getUserDetails = (userId) => serviceMaker(`/users/${userId}`, methods.GET, api.NGB);
export const changePassword = (data, userId) => serviceMaker(`/users/${userId}`, methods.PUT, api.NGB, data);
