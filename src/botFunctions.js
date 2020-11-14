const {getUserId, isAdm, sendMedia} = require('./miscFunctions');
const insideJokes = require("../private/insideJokes");
const users = require('../private/users');

const funcIdeologia = async (bot, msg) => {
    try {
        const ideologiaMessage = insideJokes.ideologia;
        const optionsReplyGif = {
            caption: ideologiaMessage,
            reply_to_message_id: msg.message_id,
            parse_mode: "HTML"
        };

        await sendMedia(bot, msg, 'Ideologia', '.gif', optionsReplyGif);
    } catch (error) {
        console.log(sendMedia);
        console.log("----------------------------------------------")
        console.log("ERROR IDEOLOGIA BOTFUNC: \n"+error);
        console.log("----------------------------------------------");
    }
};

const funcDice = async (bot, msg) => {
    try {
        const optionsReplyGif = {
            reply_to_message_id:msg.message_id, 
            caption: `<i>@${msg.from.username} rolou um dado...</i>`,
            parse_mode: "HTML",
        };
        gifDiceMessage = await sendMedia(bot, msg, 'diceJumanji', '.gif', optionsReplyGif);
        bot.sendDice(msg.chat.id, {reply_to_message_id: gifDiceMessage.message_id});
        
    } catch (error) {
        console.log("----------------------------------------------")
        console.log("ERROR NO /DICE: \n"+error);
        console.log("----------------------------------------------");
    }
};


const funcHelloThere = async (bot, msg) => {
    try {
        const optionsReplyGif = {
            reply_to_message_id: msg.message_id,
        };
        await sendMedia(bot, msg, 'helloThere', '.gif', optionsReplyGif);
    } catch (error) {
        console.log("----------------------------------------------")
        console.log("ERROR NO MENTION/HELLO THERE: \n"+error);
        console.log("----------------------------------------------");
    }
};

const funcStab =  async (bot, msg) => {
    try {
        if(msg.from.username === users.zamora.username){
            const userStabbed = msg.text.substring(msg.text.search(/@/)+1).trim();
            
            await bot.deleteMessage(msg.chat.id, msg.message_id);
            
            if (isAdm(userStabbed)){
                return await bot.sendMessage(msg.chat.id, "Acalme-se, my Lord");
            }
            else{ 
                const optionsReplyGif = {
                    caption: "<i>I did warned you not to trust me</i>", 
                    parse_mode: "HTML"
                };
                await sendMedia(bot, msg, 'ForTheWatch', '.gif', optionsReplyGif);        
                bot.kickChatMember(msg.chat.id, getUserId(userStabbed));
            }
            return;
        }
    } catch (error) {
        console.log("----------------------------------------------")
        console.log("ERROR NO STAB: \n"+error);
        console.log("----------------------------------------------");
    }
};

const funcQntdDeK =  async (bot, msg) => {
    const userK = msg.from.username;
    try {
        if(isAdm(userK)){
            bot.deleteMessage(msg.chat.id, msg.message_id);
            bot.sendMessage(msg.chat.id, `Follow the rules, sir @${userK}`);
        }
        else{
            const optionsReplyJpg = {
                parse_mode: "HTML",
                caption: insideJokes.swearingQntdK,
                reply_to_message_id: msg.message_id,
            };
            await sendMedia(bot, msg, 'qntdDeK', '.jpg', optionsReplyJpg);

            bot.deleteMessage(msg.chat.id, msg.message_id);
            bot.kickChatMember(msg.chat.id, getUserId(userK));
        }
        
    } catch (error) {
        console.log("----------------------------------------------")
        console.log("ERROR NO QNTD DE K: \n"+error);
        console.log("----------------------------------------------");
    }
};

const funcKekRafael = (bot, msg) => {
    try {
        if(msg.from.username.toString() === users.rafael.username || msg.from.username.toString() === users.rafael2.username){
            bot.sendMessage(msg.chat.id, insideJokes.punishRafaelKek, 
            {
                parse_mode: "HTML",
                reply_to_message_id: msg.message_id
            });
        }
    } catch (error) {
        console.log("----------------------------------------------")
        console.log("ERROR NO COMANDO /KEK: \n"+error);
        console.log("----------------------------------------------");
    }
};

module.exports = {
    funcIdeologia,
    funcDice,
    funcHelloThere,
    funcStab,
    funcQntdDeK,
    funcKekRafael,

}