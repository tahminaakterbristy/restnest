import { v4 as uuid } from "uuid";
import prisma from "../../config/prisma";
import { sslcz } from "./payment.utils";

const createPayment = async (rentalRequestId: string) => {

    const rental = await prisma.rentalRequest.findUnique({

        where:{
            id:rentalRequestId
        },

        include:{
            property:true,
            tenant:true
        }

    });

    if(!rental){

        throw new Error("Rental Request Not Found");

    }

    if(rental.status!=="APPROVED"){

        throw new Error("Rental Request Not Approved");

    }

    const transactionId=uuid();

    await prisma.payment.create({

        data:{

            rentalRequestId,

            transactionId,

            provider:"SSLCommerz",

            amount:rental.property.rent

        }

    });

    const data={

        total_amount:rental.property.rent,

        currency:"BDT",

        tran_id:transactionId,

        success_url:process.env.SUCCESS_URL,

        fail_url:process.env.FAIL_URL,

        cancel_url:process.env.CANCEL_URL,

        ipn_url:"",

        shipping_method:"NO",

        product_name:rental.property.title,

        product_category:"Rent",

        product_profile:"general",

        cus_name:rental.tenant.name,

        cus_email:rental.tenant.email,

        cus_add1:"Dhaka",

        cus_city:"Dhaka",

        cus_country:"Bangladesh",

        cus_phone:"01700000000"

    };

    const response=await sslcz.init(data);

    return response.GatewayPageURL;

};


const paymentSuccess = async (tranId: string) => {
  const payment = await prisma.payment.update({
    where: {
      transactionId: tranId,
    },
    data: {
      paymentStatus: "PAID",
      paidAt: new Date(),
    },
  });

  await prisma.rentalRequest.update({
    where: {
      id: payment.rentalRequestId,
    },
    data: {
      status: "ACTIVE",
    },
  });

  return payment;
};

const paymentFail = async (tranId: string) => {
  return prisma.payment.update({
    where: {
      transactionId: tranId,
    },
    data: {
      paymentStatus: "FAILED",
    },
  });
};

const paymentCancel = async (tranId: string) => {
  return prisma.payment.update({
    where: {
      transactionId: tranId,
    },
    data: {
      paymentStatus: "FAILED",
    },
  });
};

const getMyPayments = async (tenantId: string) => {
  return prisma.payment.findMany({
    where: {
      rentalRequest: {
        tenantId,
      },
    },

    include: {
      rentalRequest: {
        include: {
          property: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};

const getPaymentDetails = async (id: string) => {
  return prisma.payment.findUnique({
    where: {
      id,
    },

    include: {
      rentalRequest: {
        include: {
          property: true,
        },
      },
    },
  });
};
export const PaymentService={

createPayment,
 paymentSuccess,
  paymentFail,
  paymentCancel,
  getMyPayments,
  getPaymentDetails

}