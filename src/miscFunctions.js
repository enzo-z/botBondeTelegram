const fs = require("fs");
const users = require("../private/users");

const getUserId = function (username){
    switch (username) {
        case users.luiz.username:
            return users.luiz.id;
        case users.rafael.username:
            return users.rafael.id;
        case users.rafael2.username:
            return users.rafael2.id;
        case users.pedro.username:
            return users.pedro.id;
        case users.charret.username:
            return users.charret.id;
        case users.rezon.username:
            return users.rezon.id;
        case users.raibolt.username:
            return users.raibolt.id;
    }
}

const isAdm = function (username){
    if(username === users.zamora.username || username === users.klaus.username || username === users.polck.username){
        return true;
    }
    else{
        return false;
    }
}

const sendMedia = async (bot, msg, filename, type, options) => {
    try{
        const stream = fs.createReadStream("./public/gifs/"+filename+type);
        
        if(type === '.gif') {
            bot.sendChatAction(msg.chat.id, "upload_video" );
            return await bot.sendAnimation(msg.chat.id, stream, options);
        }
        if(type === '.jpg'){
            return await bot.sendPhoto(msg.chat.id, stream, options);
        }
    } catch(error){
        console.log("ERROR SENDING GIF\n: "+error);
    }
}

module.exports = {
    sendMedia,
    isAdm,
    getUserId
}