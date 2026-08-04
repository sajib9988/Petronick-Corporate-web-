
import httpStatus from "http-status";
import { Parser } from "json2csv";
import { prisma } from "../../database/prisma.js";

import { getPagination } from "../../shared/utils/pagination.js";
import { AppError } from "../../shared/errors/app-error.js";
import { IAgentQuery, ICreatePromotionAgent, IUpdateAgentStatus } from "./promotion-agent.interface.js";
import { Agent } from "https";
import { sendEmail } from "../../shared/utils/email.js";
import { envVars } from "../../config/env.js";


const createAgent = async (payload: ICreatePromotionAgent) => {
  const { businessUnits, ...rest } = payload;

  const existingAgent = await prisma.promotionAgent.findFirst({
    where: {
      email: payload.email,
      status: { in: ["PENDING", "REVIEWED", "APPROVED"] },
    },
  });

  if (existingAgent) {
    throw new AppError(
      httpStatus.CONFLICT,
      "You have already submitted an application with this email. Please wait for review.",
    );
  }

  const agent = await prisma.promotionAgent.create({
    data: {
      ...rest,
      businessUnits: {
        create: businessUnits.map((name) => ({ name })),
      },
    },
    include: { businessUnits: true },
  });

  const businessUnitsString = businessUnits.join(", ");

  // Common data for both templates
  const commonData = {
    userName: payload.fullName,
    email: payload.email,
    phone: payload.phone,
    location: payload.location,
    experience: payload.experience,
    focus: payload.focus,
    businessUnits: businessUnitsString,
    message: payload.message,
    appName: envVars.APP_NAME || "Petronick Corporate Holdings",
  };

  // 1. Agent Confirmation (fire-and-forget)
  sendEmail({
    to: payload.email,
    subject: "Application Received — Petronick Corporate Holdings",
    templateName: "agent-confirmation",
    templateData: {
      ...commonData,
      businessUnits: businessUnitsString,
    },
  }).catch((err) =>
    console.error("❌ Agent confirmation email failed:", err.message || err)
  );

  // 2. Parse admin emails from env
  const adminEmails = (envVars.ADMIN_NOTIFICATION_EMAILS || envVars.SUPER_ADMIN_EMAIL || "")
    .split(",")
    .map((e: string) => e.trim())
    .filter((e: string) => e.length > 0 && e.includes("@"));

  // 3. Admin Notifications (fire-and-forget, individually)
  adminEmails.forEach((adminEmail: string) => {
    sendEmail({
      to: adminEmail,
      subject: `New Promotion Agent Application from ${payload.fullName}`,
      templateName: "agent-admin",
      templateData: {
        ...commonData,
      },
    }).catch((err) =>
      console.error(`❌ Admin email failed for ${adminEmail}:`, err.message || err)
    );
  });

  return agent;
};


const getAllAgents= async (query: IAgentQuery) => {
     const { page, limit, skip } = getPagination(query);
  const { search, status } = query

 const where: Record<string, unknown> = {};


 if (search) {
            where.OR= [
                { fullName: { contains: search, mode: "insensitive" } },
                { email: { contains: search, mode: "insensitive" } },
                { phone: { contains: search, mode: "insensitive" } },
                { location: { contains: search, mode: "insensitive" } },
            ]
 }

  if (status) {
    where.status = status;
  }
 const [agents, total] = await Promise.all([
    prisma.promotionAgent.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: { businessUnits: true },
      skip,
      take: limit,
    }),
    prisma.promotionAgent.count({ where }),
  ]);

  return {
    data: agents,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };

}


const getAgentById = async (id: string) => {
  const agent = await prisma.promotionAgent.findUnique({
    where: { id },
    include: { businessUnits: true },
  });

  if (!agent) {
    throw new AppError(httpStatus.NOT_FOUND, "Promotion agent not found");
  }

  return agent;
};

const updateAgentStatus = async (id: string, payload: IUpdateAgentStatus) => {
  await getAgentById(id);

  return await prisma.promotionAgent.update({
    where: { id },
    data: { status: payload.status },
    include: { businessUnits: true },
  });
};

const deleteAgent = async (id: string) => {
  await getAgentById(id);
  await prisma.promotionAgent.delete({ where: { id } });
  return null;
};

const exportCSV = async () => {
  const agents = await prisma.promotionAgent.findMany({
    orderBy: { createdAt: "desc" },
    include: { businessUnits: true },
  });

  const data = agents.map((agent: typeof agents[number]) => ({
    id: agent.id,
    fullName: agent.fullName,
    email: agent.email,
    phone: agent.phone,
    location: agent.location,
    experience: agent.experience,
    focus: agent.focus,
    message: agent.message,
    status: agent.status,
    businessUnits: agent.businessUnits.map((b: { name: string }) => b.name).join(", "),
    createdAt: agent.createdAt,
  }));

  const fields = [
    "id",
    "fullName",
    "email",
    "phone",
    "location",
    "experience",
    "focus",
    "message",
    "status",
    "businessUnits",
    "createdAt",
  ];

  const parser = new Parser({ fields });
  const csv = parser.parse(data);

  return csv;
};

export const agentService = {
  createAgent,
  getAllAgents,
  getAgentById,
  updateAgentStatus,
  deleteAgent,
  exportCSV,
};