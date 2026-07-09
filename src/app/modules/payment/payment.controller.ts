import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { PaymentService } from "./payment.service";

const createPayment = catchAsync(async(req,res)=>{

const result=await PaymentService.createPayment(

req.params.rentalId

);

sendResponse(res,{

success:true,

statusCode:httpStatus.OK,

message:"Payment Session Created",

data:result

});

});


const paymentSuccess = catchAsync(async (req, res) => {
  await PaymentService.paymentSuccess(req.body.tran_id);

  res.redirect("http://localhost:3000/payment-success");
});

const paymentFail = catchAsync(async (req, res) => {
  await PaymentService.paymentFail(req.body.tran_id);

  res.redirect("http://localhost:3000/payment-failed");
});

const paymentCancel = catchAsync(async (req, res) => {
  await PaymentService.paymentCancel(req.body.tran_id);

  res.redirect("http://localhost:3000/payment-cancel");
});

const getPayments = catchAsync(async (req, res) => {
  const result = await PaymentService.getMyPayments(
    (req as any).user.id
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Payment history retrieved successfully",
    data: result,
  });
});

const getPaymentDetails = catchAsync(async (req, res) => {
  const result = await PaymentService.getPaymentDetails(
    req.params.id
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Payment details retrieved successfully",
    data: result,
  });
});
export const PaymentController={

createPayment,
  paymentSuccess,
  paymentFail,
  paymentCancel,
  getPayments,
  getPaymentDetails

}