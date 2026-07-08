import { v4 as uuid } from "uuid";
import prisma from "../../config/prisma";
import { sslcz } from "./payment.utils";

const createPayment = async (
  rentalRequestId: string
) => {

  const rental =
    await prisma.rentalRequest.findUnique({
      where:{
        id:rentalRequestId
      },
      include:{
        property:true
      }
    });

  if(!rental){
      throw new Error("Rental Not Found");
  }

  const transactionId = uuid();

  await prisma.payment.create({

      data:{
          rentalRequestId,
          amount:rental.property.rent,
          transactionId
      }

  });

  const data = {

      total_amount:rental.property.rent,

      currency:"BDT",

      tran_id:transactionId,

      success_url:process.env.SUCCESS_URL,

      fail_url:process.env.FAIL_URL,

      cancel_url:process.env.CANCEL_URL,

      product_name:rental.property.title,

      product_category:"Rent",

      product_profile:"general",

      cus_name:"Tenant",

      cus_email:"tenant@gmail.com",

      cus_add1:"Dhaka",

      cus_city:"Dhaka",

      cus_country:"Bangladesh",

      cus_phone:"01700000000",

      shipping_method:"NO",

  };

  const apiResponse =
    await sslcz.init(data);

  return apiResponse.GatewayPageURL;

};

export const PaymentService={

createPayment

}