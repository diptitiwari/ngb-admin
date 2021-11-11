import {
  serviceMaker,
  methods,
  api
} from "./index.js"

export const getTransactionHistoryOffice = (fromDate, toDate) => serviceMaker(
  `/transactionhistory/office?fromDate=${fromDate}&toDate=${toDate}`,
  methods.GET,
  api.NGB
);
