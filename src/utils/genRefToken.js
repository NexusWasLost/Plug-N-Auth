//generate referesh Tokens

import argon2 from "argon2";
import { generate } from 'short-uuid';

export async function generateRefreshToken(){
    //generate a random refresh Token
    const rawRefToken = generate();

    //hash the refresh token
    const hashedRefToken = await argon2.hash(rawRefToken); //update params to be not that heavy on hashing

    return { rawRefToken, hashedRefToken };
}

export async function verifyRefreshToken(refToken_from_cookie, refToken_from_DB){
    try{
        const isRefTokenValid = await argon2.verify(refToken_from_DB, refToken_from_cookie);
        return isRefTokenValid;
    }
    catch{
        return false;
    }
}
