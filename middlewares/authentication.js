const {validateToken} = require("../services/authentication")

function checkForAuthenticationCookie(cookieName){
    return (req,res,next)=>{
        // Returns the value of the particular cookie
        const tokenCookieValue = req.cookies[cookieName];

        if(!tokenCookieValue){
            return next();
        }

        try{
            const userPayload = validateToken(tokenCookieValue)
            req.user = userPayload;
        }catch(error){
        }

        next();
    }
}

module.exports = {
    checkForAuthenticationCookie
}