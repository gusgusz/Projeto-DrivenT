import { PrismaClient } from "@prisma/client";
import faker from '@faker-js/faker';
import { generateCPF, getStates } from '@brazilian-utils/brazilian-utils';
import dayjs from "dayjs";
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

async function main() {

  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: "Driven.t",
        logoImageUrl: "https://files.driveneducation.com.br/images/logo-rounded.png",
        backgroundImageUrl: "linear-gradient(to right, #FA4098, #FFD77F)",
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, "days").toDate(),
      },
    });

    await prisma.ticketType.createMany({
      data: [
        {  
          name:  "Presencial sem hotel",
          price: 250,
          isRemote: false,
          includesHotel: false,
          createdAt: dayjs().toDate(),
          updatedAt:     dayjs().toDate()},
          {  
            name:  "Presencial com Hotel",
            price: 250,
            isRemote: false,
            includesHotel: true,
            createdAt: dayjs().toDate(),
            updatedAt:     dayjs().toDate()},
            {  
              name:  "Online",
              price: 100,
              isRemote: true,
              includesHotel: false,
              createdAt: dayjs().toDate(),
              updatedAt:     dayjs().toDate()}
      ],
    });
  
    const hashedPassword = await bcrypt.hash("123456", 10);

  const user =  await prisma.user.create({
      data: {
        email: "gus@gmail.com",
        password: hashedPassword,
      },
    
    });



  return prisma.enrollment.create({
    data: {
      name: faker.name.findName(),
      cpf: generateCPF(),
      birthday: faker.date.past(),
      phone: faker.phone.phoneNumber('(##) 9####-####'),
      userId:  user.id,
      Address: {
        create: {
          street: faker.address.streetName(),
          cep: faker.address.zipCode(),
          city: faker.address.city(),
          neighborhood: faker.address.city(),
          number: faker.datatype.number().toString(),
          state: faker.helpers.arrayElement(getStates()).name,
        },
      },
    },
    include: {
      Address: true,
    },
  });



  }
  

  console.log({ event });

 
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
