import jwt from  "jsonwebtoken"
import { Request, Response } from "express"
import { success } from "zod"
import  "dotenv/config"
const isProd= process.env.NODE_ENV === "production"


// token create

export const createToken = (payload: object) => {
  return jwt.sign(
    payload,
    process.env.ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: "1d",
    }
  );
};

export const createRefreshToken = (payload: object) => {
  return jwt.sign(
    payload,
    process.env.REFRESH_TOKEN_SECRET as string,
    {
      expiresIn: "7d",
    }
  );
};

export const verifyToken = (token:string)=>{
    try {
        return {
            success: true,
            data: jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string)
        }
    } catch (error) {
        return {
            success: false,
            data: null
        }
    }
}

// cookies set 

export const setAuthCookies = (res:Response, accessToken:string, refreshToken:string)=>{
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: isProd,
        
        
    })
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: isProd,
       
     
    })
}


export const getTokenFromRequest = (req: Request) => {
  // cookie first
  if (req.cookies?.accessToken) {
    return req.cookies.accessToken;
  }

  // authorization header fallback
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return null;
  }

  return authHeader.split(" ")[1];
};

// utility functions for cookie management

export const getCookie = (req: Request, name: string) => {
  return req.cookies?.[name] || null;
};

export const clearCookie = (res: Response, name: string, options?: any) => {
  res.clearCookie(name, options);
};

export const setAccessTokenCookie = (res: Response, accessToken: string) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "strict" : "lax",
    
  });
};