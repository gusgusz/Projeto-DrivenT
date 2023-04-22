import { Enrollment } from '@prisma/client';
import { prisma } from '@/config';

async function findWithAddressByUserId(userId: number) {
  return prisma.enrollment.findFirst({
    where: { userId },
    include: {
      Address: true,
    },
  });
}

async function findByUserWithTicket(userId: number) {
  return prisma.enrollment.findFirst({
    where: { userId },
    include: {
      Ticket: true,
    },
  });
}
async function findEnrollmentByUser(userId: number) {
  return prisma.enrollment.findFirst({
    where: { userId },
  });
}

async function findEnrollmentById(id: number) {
  return prisma.enrollment.findUnique({
    where: { id },
  });
}

async function upsert(
  userId: number,
  createdEnrollment: CreateEnrollmentParams,
  updatedEnrollment: UpdateEnrollmentParams,
) {
  return prisma.enrollment.upsert({
    where: {
      userId,
    },
    create: createdEnrollment,
    update: updatedEnrollment,
  });
}

export type CreateEnrollmentParams = Omit<Enrollment, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateEnrollmentParams = Omit<CreateEnrollmentParams, 'userId'>;

const enrollmentRepository = {
  findWithAddressByUserId,
  upsert,
  findEnrollmentByUser,
  findEnrollmentById,
  findByUserWithTicket,
};

export default enrollmentRepository;
