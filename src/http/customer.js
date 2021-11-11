import {isEmpty} from 'lodash';
import {
  serviceMaker,
  methods,
  api
} from "./index.js";
import {queryString} from '../plugins';

export const getClients = (queryParams) => serviceMaker(`/clients?${queryString(queryParams)}`, methods.GET, api.NGB);
export const addClients = (data) => serviceMaker(`/clients`, methods.POST, api.NGB, data);

export const getClientById = (id) => serviceMaker(`/clients/getclient360?key=id&value=${id}`, methods.GET, api.NGB);

//{"clientId":"11","serialNo":"SCS0003","clientServiceStatus":"ACIVE","isStraight":true}
export const deallocateClientDevice = (deviceId) => serviceMaker(`/itemdetails/deallocate/${deviceId}`, methods.PUT, api.NGB, data);

export const  getClientsTemplate = () => serviceMaker(`/clients/template`, methods.GET, api.NGB);
export const getClientServiceTemplate = () => serviceMaker(`/clientservice/template`, methods.GET, api.NGB);

export const getClientNotes = (clientId) => serviceMaker(`/clients/${clientId}/notes`, methods.GET, api.NGB);
//{"note":"new test note for client id 11"}
export const addClientNotes = (clientId, note) => serviceMaker(`/clients/${clientId}/notes`, methods.POST, api.NGB, note);

export const getIdentifierTemplate = (clientId) => serviceMaker(`clients/${clientId}/identifiers/template`, methods.GET, api.NGB);
export const getClientIdentifiers = (clientId) => serviceMaker(`/clients/${clientId}/identifiers`, methods.GET, api.NGB);
//{documentTypeId: 4, documentKey: "14563287", description: "other type ID"}
export const addClientIdentifiers = (clientId, data) => serviceMaker(`/clients/${clientId}/identifiers`,
  methods.POST,
  api.NGB,
  data
);
export const deleteClientIdentifiers = (clientId, identifierId) => serviceMaker(`/clients/${clientId}/identifiers/${identifierId}`,
  methods.DELETE, api.NGB
);
//{name: Adhar, file:}
export const uploadIdentifierDocument = (identifierId, data) => serviceMaker(`/client_identifiers/${identifierId}/documents`, methods.POST, api.NGB, data )
export const getIdentifierDocument = (identifierId) => serviceMaker(`/client_identifiers/${identifierId}/documents`, methods.GET, api.NGB);


//{"nationality":167,"jobTitle":"Some","preferredLang":169,"remarks":"Some Remark","idType":1,"idNumber":"1234567890","ageGroup":173,"utsCustomerId":"1478956","financeId":"4789224","preferredCommunication":171,"dateFormat":"dd MMMM yyyy","activationDate":"16 December 2019","locale":"en","dateOfBirth":"03 December 1995"}
export const addAdditionalInfo = (clientId, info) => serviceMaker(`/clients/additionalinfo/${clientId}`, methods.POST, api.NGB, info);
export const getAdditionalInfo = (clientId) => serviceMaker(`/clients/additionalinfo/${clientId}?template=true`, methods.GET, api.NGB);

//{name: Adhar
// description: dfdsfsdfsdfsd
// file: (binary)}
export const uploadClientDocument = (clientId, data) => serviceMaker(`/clients/${clientId}/documents`, methods.POST, api.NGB, data);
export const getAllClientDocuments = (clientId) => serviceMaker(`/clients/${clientId}/documents`, methods.GET, api.NGB);
export const deleteClientDocument = (clientId, documentId) => serviceMaker(`/clients/${clientId}/documents/${documentId}`, methods.DELETE, api.NGB);

export const updateTaxExemption = (clientId, data) => serviceMaker(`/taxexemption/${clientId}`, methods.PUT, api.NGB, data);

export const getClientBillProfile = (clientId) => serviceMaker(`/clientbillprofile/bills/${clientId}`, methods.GET, api.NGB);

export const getClientCardDetails = (clientId) => serviceMaker(`/clients/${clientId}/carddetails`, methods.GET, api.NGB);
//{"type":"CreditCard","cardType":"MASTERCARD","name":"Some Name","cvvNumber":"U2FsdGVkX19vgeHStskZeD1H0NiPw4h4ORu0ISvXP1g=","cardNumber":"U2FsdGVkX1/k4zZ7HG3anDtnA7BDpZnm7ZR17+MV+18=","cardExpiryDate":"U2FsdGVkX1+GADz9QoFBsaloAweA7KIETFDopwBeSBA="}
export const addClientCardDetail = (clientId, data) => serviceMaker(`/clients/${clientId}/carddetails`, methods.POST, api.NGB, data);

export const getClientTickets = (clientId) => serviceMaker(`/tickets/${clientId}`, methods.GET, api.NGB);
export const getTicketTemplate = () => serviceMaker(`/tickets/template`, methods.GET, api.NGB);
export const getTicketSubCategory = (categoryId) => serviceMaker(`/tickets/subcategory?category=${categoryId}`, methods.GET, api.NGB)
export const getTicketTeamUsers = (teamUserId) => serviceMaker(`/tickets/teamusers?teamusers=${teamUserId}`, methods.GET, api.NGB)
// {"assignedTo":1,"priority":"LOW","sourceOfTicket":"Phone","problemCode":249,"subCategory":"selfcare1","teamCode":39,"description":"xfmgngklfnhlglkmgkjhjgm,","locale":"en","dateFormat":"dd MMMM yyyy","ticketDate":"17 December 2019","ticketURL":"https://smartway.trigital.in/app/#/viewTicket/10","ticketTime":" 10:21:15 AM"}
export const createTicket = (clientId) => (clientId) => serviceMaker(`/tickets/ticketing/${clientId}`, methods.POST, api.NGB, data);

export const getEventOrderByClient = (clientId) => serviceMaker(`/eventorder?clientId=${clientId}`, methods.GET, api.NGB);
export const clientEventOrderTemplate = (clientId) => serviceMaker(`/eventorder/${clientId}`, methods.GET, api.NGB);

export const getChildsByClientId = (clientId) => serviceMaker(`/parentclient/child/${clientId}`, methods.GET, api.NGB);

export const getTransactionDetails = (params, clientId) =>  {
  if (!isEmpty(params))
    return serviceMaker(`/financialTransactions/${clientId}/type?key=id&${queryString(params)}`, methods.GET, api.NGB);
  return serviceMaker(`/financialTransactions/${clientId}?key=id`, methods.GET, api.NGB);
}

export const getClientBillMaster = (clientId) => serviceMaker(`/billmaster/${clientId}`, methods.GET, api.NGB);
export const sendBillMasterEmail = (billMasterId, data) => serviceMaker(`/billmaster/email/${billMasterId}`, methods.PUT, api.NGB, data);

export const getClientServiceDetail = (clientId, serviceId) => serviceMaker(`/clientservice/details/${clientId}/${serviceId}`, methods.GET, api.NGB)
export const getClientProvisioningDetail = (serviceId) => serviceMaker(`/provisioning/template/${serviceId}`, methods.GET, api.NGB)

export const getOneTimeSalesTemplate = () => serviceMaker('onetimesales/template', methods.GET, api.NGB);
export const getSalesPlanCategory = (params) =>  {
  if (!isEmpty(params))
    return serviceMaker(`/usercataloge/salesPlanCategory?${queryString(params)}`, methods.GET, api.NGB);
  return serviceMaker(`/usercataloge/salesPlanCategory`, methods.GET, api.NGB);
}
  export const getsalescataloges = (params) =>  {
  if (!isEmpty(params))
    return serviceMaker(`/salescataloge/salescataloges?${queryString(params)}`, methods.GET, api.NGB);
  return serviceMaker(`/salescataloge/salescataloges`, methods.GET, api.NGB);
}
export const getClientServiceDetails = (serviceId, params) =>  {
  if (!isEmpty(params))
    return serviceMaker(`/clientservice/servicedetails/${serviceId}?${queryString(params)}`, methods.GET, api.NGB);
  return serviceMaker(`/clientservice/servicedetails/${serviceId}`, methods.GET, api.NGB);
}
export const getOneTimeSales = (serialno) => serviceMaker(`/onetimesales/paired/${serialno}`, methods.GET, api.NGB);
export const getOrders = (id) => serviceMaker(`/orders/${id}/orderprice`, methods.GET, api.NGB);
export const getOrderTemplate = (params) =>  {
  if (!isEmpty(params))
    return serviceMaker(`/orders/template?${queryString(params)}`, methods.GET, api.NGB);
  return serviceMaker(`/orders/template`, methods.GET, api.NGB);
}

export const getSerailNo = (params) =>  {
  if (!isEmpty(params))
    return serviceMaker(`/itemdetails/0?${queryString(params)}`, methods.GET, api.NGB);
  return serviceMaker(`/itemdetails/serialnum`, methods.GET, api.NGB);
}

export const customerActivation = (params) => serviceMaker('/activationprocess/customeractivation', methods.POST, api.NGB, )
