
import httpStatus from "http-status";
import { Parser } from "json2csv";
import { prisma } from "../../database/prisma.js";
import { sendEmail } from "../../shared/utils/email.js";
import { IContactQuery, ICreateContact } from "./contact.interface.js";
import { envVars } from "../../config/env.js";
import { getPagination } from "../../shared/utils/pagination.js";
import { AppError } from "../../shared/errors/app-error.js";

const createContact = async (payload: ICreateContact) => {
  const contact = await prisma.contact.create({
    data: payload,
  });

  // User কে confirmation
  sendEmail({
    to: payload.email,
    subject: "We received your message — Petronick Corporate Holdings",
    templateName: "contact-confirmation",
    templateData: {
      userName: payload.name,
      message: payload.message,
      appName: "Petronick Corporate Holdings",
    },
  });

  // Admin কে notification
  sendEmail({
    to: envVars.SUPER_ADMIN_EMAIL,
    subject: "New Contact Message Received",
    templateName: "contact-admin",
    templateData: {
      userName: payload.name,
      email: payload.email,
      phone: payload.phone ?? "N/A",
      message: payload.message,
      appName: "Petronick Corporate Holdings",
    },
  });

  return contact;
};

const getAllContacts = async (query: IContactQuery) => {
  const { page, limit, skip } = getPagination(query);
  const { search } = query;

  const where: Record<string, unknown> = {};

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
    ];
  }

  const [contacts, total] = await Promise.all([
    prisma.contact.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.contact.count({ where }),
  ]);

  return {
    data: contacts,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getContactById = async (id: string) => {
  const contact = await prisma.contact.findUnique({ where: { id } });

  if (!contact) {
    throw new AppError(httpStatus.NOT_FOUND, "Contact not found");
  }

  return contact;
};

const deleteContact = async (id: string) => {
  await getContactById(id);
  await prisma.contact.delete({ where: { id } });
  return null;
};

const exportCSV = async () => {
  const contacts = await prisma.contact.findMany({
    orderBy: { createdAt: "desc" },
  });

  const fields = ["id", "name", "email", "phone", "message", "createdAt"];
  const parser = new Parser({ fields });
  const csv = parser.parse(contacts);

  return csv;
};

export const contactService = {
  createContact,
  getAllContacts,
  getContactById,
  deleteContact,
  exportCSV,
};