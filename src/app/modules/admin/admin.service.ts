import { prisma } from "../../config/prisma";


// Get all users
export const getAllUsers = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
    },
  });
};


// Change user role
export const updateUserRole = async (
  userId: string,
  role: string
) => {
  return await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      role,
    },
  });
};


// Delete user
export const deleteUser = async (
  userId: string
) => {
  return await prisma.user.delete({
    where:{
      id:userId
    }
  });
};


// Get all properties
export const getAllProperties = async () => {

  return await prisma.property.findMany({
    include:{
      owner:{
        select:{
          name:true,
          email:true
        }
      }
    }
  });

};


// Approve / Reject property

export const updatePropertyStatus = async(
  propertyId:string,
  status:string
)=>{

 return await prisma.property.update({

    where:{
      id:propertyId
    },

    data:{
      status
    }

 });

};


// Dashboard statistics

export const getDashboardStats = async()=>{

const users =
 await prisma.user.count();


const properties =
 await prisma.property.count();


const rentals =
 await prisma.rental.count();


return {
 users,
 properties,
 rentals
};

};