import {
  serviceMaker,
  methods,
  api
} from "./index.js"

export const GetGoodReceiptDetails = data => serviceMaker("/grn", methods.GET, api.NGB)


