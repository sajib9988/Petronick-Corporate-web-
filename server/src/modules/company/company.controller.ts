import { Request, Response } from "express";
import { catchAsync } from "../../shared/utils/catch-async.js";
import { AppError } from "../../shared/errors/app-error.js";
import { uploadToCloudinary } from "../../shared/utils/upload.js";
import { companyValidation } from "./company.vaidation.js";
import { companyService } from "./company.service.js";
import { sendResponse } from "../../shared/utils/send-response.js";
import { ICompanyQuery } from "./company.interface.js";
import httpStatus from "http-status";



const createCompany = catchAsync(async (req: Request, res: Response) => {
  const files = req.files as
    | { [field: string]: Express.Multer.File[] }
    | undefined;
  const logoFile = files?.["logo"]?.[0];
  const iconFile = files?.["icon"]?.[0];

  if (!logoFile) {
    throw new AppError(httpStatus.BAD_REQUEST, "Logo image is required");
  }

  const body = req.body.data ? JSON.parse(req.body.data) : req.body;
  const uploaded = await uploadToCloudinary(logoFile.buffer, "logos");
  const iconUploaded = iconFile
    ? await uploadToCloudinary(iconFile.buffer, "icons")
    : null;
  const parsed = companyValidation.createCompany.parse(body);

  const result = await companyService.createCompany({
    ...parsed,
    logo: uploaded.secure_url,
    ...(iconUploaded && { icon: iconUploaded.secure_url }),
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

  const files = req.files as
    | { [field: string]: Express.Multer.File[] }
    | undefined;
  const logoFile = files?.["logo"]?.[0];
  const iconFile = files?.["icon"]?.[0];

  let logo: string | undefined;
  if (logoFile) {
    const uploaded = await uploadToCloudinary(logoFile.buffer, "logos");
    logo = uploaded.secure_url;
  }

  let icon: string | undefined;
  if (iconFile) {
    const uploaded = await uploadToCloudinary(iconFile.buffer, "icons");
    icon = uploaded.secure_url;
  }
 const id = req.params.id as string;
  const result = await companyService.updateCompany(id, {
    ...parsed,
    ...(logo && { logo }),
    ...(icon && { icon }),
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

