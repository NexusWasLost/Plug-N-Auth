import tokenModel from "../models/tokenSchema";
import { generateToken } from "../middlewares/auth.js";
import { verifyRefreshToken } from "../utils/genRefToken";

export async function refresh(req, res){
    try{
        const incomingRefToken = req.cookies.refreshToken;
        if(!incomingRefToken)
            return res.status(401).redirect("/user/api/login");

        const storedRefToken = await tokenModel.findOne({ refreshToken: incomingRefToken }).populate("uid");
        //if someone tries to access /user/api/refresh before creating a user (since each user will have a refresh token doc)
        if(!storedRefToken)
            return res.status(401).redirect("/user/api/login");

        if(!await verifyRefreshToken(incomingRefToken, storedRefToken.refreshToken))
            return res.status(401).redirect("/user/api/login");

        //generate a valid JWT
        const payload = {
            sub: storedRefToken.uid._id.toString(),
            aud: storedRefToken.uid.serviceName,
        }
        const token = generateToken(payload, "15m");

        res.status(200).json({
            token: token
        });
    }
    catch(error){
        console.log(error);
        res.status(500).json({ ErrMsg: "Oops 😳 ! Some Error Occured !" });
    }
}
