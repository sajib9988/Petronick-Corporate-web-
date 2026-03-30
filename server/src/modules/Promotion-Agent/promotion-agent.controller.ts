import { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../shared/utils/catch-async";
import { sendResponse } from "../../shared/utils/send-response";
import { agentService } from "./promotion-agent.service";
import { agentValidation } from "./promotion-agent.validation";
import { IAgentQuery } from "./promotion-agent.interface";

const createAgent = catchAsync(async (req: Request, res: Response) => {
  const parsed = agentValidation.createAgent.parse(req.body);
  const result = await agentService.createAgent(parsed);

  sendResponse(res, {
    status: httpStatus.CREATED,
    success: true,
    message: "Application submitted successfully",
    data: result,
  });
});

const getAllAgents = catchAsync(async (req: Request, res: Response) => {
  const result = await agentService.getAllAgents(req.query as IAgentQuery);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Agents fetched successfully",
    data: result.data,
    meta: result.meta,
  });
});

const getAgentById = catchAsync(async (req: Request, res: Response) => {
  const result = await agentService.getAgentById(req.params.id as string);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Agent fetched successfully",
    data: result,
  });
});

const updateAgentStatus = catchAsync(async (req: Request, res: Response) => {
  const parsed = agentValidation.updateStatus.parse(req.body);
  const result = await agentService.updateAgentStatus(req.params.id as string, parsed);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Agent status updated successfully",
    data: result,
  });
});

const deleteAgent = catchAsync(async (req: Request, res: Response) => {
  await agentService.deleteAgent(req.params.id as string);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Agent deleted successfully",
    data: null,
  });
});

const exportCSV = catchAsync(async (_req: Request, res: Response) => {
  const csv = await agentService.exportCSV();

  res.setHeader("Content-Type", "text/csv");
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=promotion-agents.csv",
  );
  res.status(httpStatus.OK).send(csv);
});

export const agentController = {
  createAgent,
  getAllAgents,
  getAgentById,
  updateAgentStatus,
  deleteAgent,
  exportCSV,
};