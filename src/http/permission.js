import { api, methods, serviceMaker } from './index'

export const getRoles = () => serviceMaker('/roles', methods.GET, api.NGB);
export const createRole = (data) => serviceMaker('/roles', methods.POST, api.NGB, data);
