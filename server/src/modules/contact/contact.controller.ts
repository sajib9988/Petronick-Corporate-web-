import { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../shared/utils/catch-async";
import { sendResponse } from "../../shared/utils/send-response";
import { contactService } from "./contact.service";
import { contactValidation } from "./contact.validation";
import { IContactQuery } from "./contact.interface";

const createContact = catchAsync(async (req: Request, res: Response) => {
  const parsed = contactValidation.createContact.parse(req.body);
  const result = await contactService.createContact(parsed);

  sendResponse(res, {
    status: httpStatus.CREATED,
    success: true,
    message: "Message sent successfully",
    data: result,
  });
});

const getAllContacts = catchAsync(async (req: Request, res: Response) => {
  const result = await contactService.getAllContacts(
    req.query as IContactQuery,
  );

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Contacts fetched successfully",
    data: result.data,
    meta: result.meta,
  });
});

const getContactById = catchAsync(async (req: Request, res: Response) => {
  const result = await contactService.getContactById(req.params.id as string);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Contact fetched successfully",
    data: result,
  });
});

const deleteContact = catchAsync(async (req: Request, res: Response) => {
  await contactService.deleteContact(req.params.id as string);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Contact deleted successfully",
    data: null,
  });
});

const exportCSV = catchAsync(async (_req: Request, res: Response) => {
  const csv = await contactService.exportCSV();

  res.setHeader("Content-Type", "text/csv; charset=utf-8");
  res.setHeader("Content-Disposition", 'attachment; filename="contacts.csv"');

  res.status(httpStatus.OK).send("\uFEFF" + csv);
});

export const contactController = {
  createContact,
  getAllContacts,
  getContactById,
  deleteContact,
  exportCSV,
};