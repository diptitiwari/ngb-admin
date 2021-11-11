import {
  serviceMaker,
  methods,
  api
} from "./index.js"

export const getEntities = () => serviceMaker(`/offices/officesView`, methods.GET, api.NGB)
export const getEntityTemplate = () => serviceMaker('/offices/template', methods.GET, api.NGB)
export const createEntity = (data) => serviceMaker('/offices', methods.POST, api.NGB, data)
export const getEntityById = (id) => serviceMaker(`/offices/${id}`, methods.GET, api.NGB);
export const getEntityTickets = (entityId) => serviceMaker(`/tickets/office/${entityId}`, methods.GET, api.NGB);
export const getTicketTemplate = () => serviceMaker(`/tickets/template`, methods.GET, api.NGB);
export const deleteTickets = (entityId) => serviceMaker(`/tickets/office/${entityId}`, methods.DELETE, api.NGB);
// customer
export const getEntityCustomers = (entityId) => serviceMaker(`/lco/${entityId}`, methods.GET, api.NGB);
// city templete
export const getCityTemplate = (city) => serviceMaker(`/address/template/${city}`, methods.GET, api.NGB);
export const updateEntity = (id,data) => serviceMaker(`/offices/${id}`, methods.PUT, api.NGB, data);
export const updateCreditLimit = (id,data) => serviceMaker(`/officeadjustments/updateCreditLimit/${id}`, methods.PUT, api.NGB, data);
export const getAdjustmentsTemplate = () => serviceMaker('/officeadjustments/template', methods.GET, api.NGB)
