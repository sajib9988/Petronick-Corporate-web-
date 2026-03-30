import { Request, Response } from "express";
import { catchAsync } from "../../shared/utils/catch-async";
import { AppError } from "../../shared/errors/app-error";
import httpStatus from "http-status";
import { uploadToCloudinary } from "../../shared/utils/upload";
import { companyValidation } from "./company.vaidation";
import { sendResponse } from "../../shared/utils/send-response";
import { ICompanyQuery } from "./company.interface";
import { companyService } from "./company.service";



const createCompany = catchAsync(async (req: Request, res: Response) => {
  if (!req.file) {
    throw new AppError(httpStatus.BAD_REQUEST, "Logo image is required");
  }

  const body = req.body.data ? JSON.parse(req.body.data) : req.body;
  const uploaded = await uploadToCloudinary(req.file.buffer, "logos");
  const parsed = companyValidation.createCompany.parse(body);

  const result = await companyService.createCompany({
    ...parsed,
    logo: uploaded.secure_url,
  });

  sendResponse(res, {
    status: httpStatus.CREATED,
    success: true,
    message: "Company created successfully",
    data: result,
  });
});

const getAllCompanies = catchAsync(async (req: Request, res: Response) => {
  const result = await companyService.getAllCompanies(
    req.query as ICompanyQuery,
  );

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Companies fetched successfully",
    data: result.data,
    meta: result.meta,
  });
});

const getCompanyById = catchAsync(async (req: Request, res: Response) => {
       const id = req.params.id as string;
  const result = await companyService.getCompanyById(id);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Company fetched successfully",
    data: result,
  });
});

const updateCompany = catchAsync(async (req: Request, res: Response) => {
  const body = req.body.data ? JSON.parse(req.body.data) : req.body;
  const parsed = companyValidation.updateCompany.parse(body);

  let logo: string | undefined;
  if (req.file) {
    const uploaded = await uploadToCloudinary(req.file.buffer, "logos");
    logo = uploaded.secure_url;
  }
 const id = req.params.id as string;
  const result = await companyService.updateCompany(id, {
    ...parsed,
    ...(logo && { logo }),
  });

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Company updated successfully",
    data: result,
  });
});




const deleteCompany = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as string;
  await companyService.deleteCompany(id);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Company deleted successfully",
    data: null,
  });
});

export const companyController = {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
};

