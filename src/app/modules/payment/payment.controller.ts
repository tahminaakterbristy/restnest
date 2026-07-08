import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { PaymentService } from "./payment.service";

const createPayment = catchAsync(async(req,res)=>{

const url=

await PaymentService.createPayment(
req.params.rentalId
);

sendResponse(res,{

success:true,

statusCode:httpStatus.OK,

message:"Payment Session Created",

data:url

});

});

export const PaymentController={

createPayment

}