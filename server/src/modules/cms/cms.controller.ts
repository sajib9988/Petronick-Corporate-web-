import httpStatus from 'http-status';

import { Request, Response } from "express"; 
import { catchAsync } from '../../shared/utils/catch-async.js';
import { cmsValidation } from './cms.validation.js';
import { cmsService } from './cms.service.js';
import { sendResponse } from '../../shared/utils/send-response.js';
import { uploadToCloudinary } from '../../shared/utils/upload.js';



const createPage = catchAsync(async (req, res)=>{
    const body= req.body.data?JSON.parse(req.body.data): req.body
    const parse = cmsValidation.createPage.parse(body)
    const result = await cmsService.createPage(parse)


    sendResponse(res, {
    status: httpStatus.CREATED,
    success: true,
    message: "Page created successfully",
    data: result,
  })
})
const getAllPages = catchAsync(async (req: Request, res: Response) => {
  const result = await cmsService.getAllPages();

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Pages fetched successfully",
    data: result,
  });
});

const getPageBySlug = catchAsync(async (req: Request, res: Response) => {
  const result = await cmsService.getPageBYSlug(req.params.slug as string);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Page fetched successfully",
    data: result,
  });
});

const updatePage = catchAsync(async (req: Request, res: Response) => {
  const body = req.body.data ? JSON.parse(req.body.data) : req.body;
  const parsed = cmsValidation.updatePage.parse(body);
  const result = await cmsService.updatePage(req.params.slug as string, parsed);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Page updated successfully",
    data: result,
  });
});

const deletePage = catchAsync(async (req: Request, res: Response) => {
  await cmsService.deletePage(req.params.slug as string);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Page deleted successfully",
    data: null,
  });
});



// section  controllers\

const createSection = catchAsync(async (req:Request, res:Response)=>{
    const body = req.body.data? JSON.parse(req.body.data):req.body
    const parsed = cmsValidation.createSection.parse(body)

 let image:string | undefined
  if (req.file) {{
    const uploaded = await uploadToCloudinary(req.file.buffer, "section")
    image = uploaded.secure_url
  }
  }



    const result = await cmsService.createSection(parsed, image)
        

    sendResponse(res, {
    status: httpStatus.CREATED,
    success: true,
    message: "Section created successfully",
    data: result,
  })
})

const getSectionsByPage = catchAsync(async (req: Request, res: Response) => {
  const result = await cmsService.getSectionByPage(req.params.pageId as string);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Sections fetched successfully",
    data: result,
  });
});

const getSectionById = catchAsync(async (req: Request, res: Response) => {
  const result = await cmsService.getSectionById(req.params.id as string);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Section fetched successfully",
    data: result,
  });
});



const updateSection = catchAsync(async (req: Request, res: Response) => {
  const body = req.body.data ? JSON.parse(req.body.data) : req.body;
  const parsed = cmsValidation.updateSection.parse(body);

  let image: string | undefined;
  if (req.file) {
    const uploaded = await uploadToCloudinary(req.file.buffer, "sections");
    image = uploaded.secure_url;
  }

  const result = await cmsService.updateSection(req.params.id as string, parsed, image);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Section updated successfully",
    data: result,
  });
});


const deleteSection = catchAsync(async (req: Request, res: Response) => {
  await cmsService.deleteSection(req.params.id as string);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Section deleted successfully",
    data: null,
  });
});


export const cmsController = {
  createPage,
  getAllPages,
  getPageBySlug,
  updatePage,
  deletePage,
  createSection,
  getSectionsByPage,
  getSectionById,
  updateSection,
  deleteSection,
};