import { Response } from "express";
import { JwtPayload, SignOptions } from "jsonwebtoken";
import { jwtUtils } from "./jwt.js";
import { envVars } from "../../config/env.js";
import { cookieUtils } from "./cookie.js";


const isProd = process.env.NODE_ENV === 'production';

//Creating access token
const getAccessToken = (payload: JwtPayload) => {
    const accessToken = jwtUtils.createToken(
        payload,
        envVars.ACCESS_TOKEN_SECRET,
        { expiresIn: envVars.ACCESS_TOKEN_EXPIRES_IN } as SignOptions
    );

    return accessToken;
}

const getRefreshToken = (payload: JwtPayload) => {
    const refreshToken = jwtUtils.createToken(
        payload,
        envVars.REFRESH_TOKEN_SECRET,
        { expiresIn: envVars.REFRESH_TOKEN_EXPIRES_IN } as SignOptions
    );
    return refreshToken;
}

const setAccessTokenCookie = (res: Response, token: string) => {
    cookieUtils.setCookie(res, 'accessToken', token, {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "none" : "lax",
        path: '/',
        //1 day
        maxAge: 60 * 60 * 24 * 1000,
    });
}

const setRefreshTokenCookie = (res: Response, token: string) => {
    cookieUtils.setCookie(res, 'refreshToken', token, {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "none" : "lax",
        path: '/',
        //7d
        maxAge: 60 * 60 * 24 * 1000 * 7,
    });
}


export const tokenUtils = {
    getAccessToken,
    getRefreshToken,
    setAccessTokenCookie,
    setRefreshTokenCookie,
  
}