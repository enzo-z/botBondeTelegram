const TelegramBot = require('node-telegram-bot-api');

const token = require('./private/token');
const users = require("./private/users");

const {funcIdeologia, funcDice, funcHelloThere, funcStab, funcQntdDeK, funcKekRafael} = require('./src/botFunctions');
const {sendMedia, isAdm, getUserId} = require("./src/miscFunctions");

const insideJokes = require("./private/insideJokes");
const { punishLuizAudio } = require('./private/insideJokes');



const botUsername = '@JigsawBonde_bot';
const bot = new TelegramBot(token, {polling: true});

bot.on('message', async (msg) => {
    try {

        //Swear at a user who sends audio, in case that user is => (Luiz Miguel)
        if(msg.hasOwnProperty('voice') && msg.from.username.toString() === users.luiz.username){
            bot.sendMessage(msg.chat.id, insideJokes.swearingBecauseOfAudio.default+punishLuizAudio[Math.round(Math.random() * 10)], {reply_to_message_id: msg.message_id});  
            
            if(msg.voice.duration >= 35 && msg.voice.duration <= 44){ //Swear if the audio is more than 35s, and deleting the audio itself
                bot.sendMessage(msg.chat.id, insideJokes.swearingBecauseOfAudio.moreThan35s);
                bot.deleteMessage(msg.chat.id, msg.message_id);
            }
            if(msg.voice.duration >=45){ //Send funny gif in case audio is more than 45s and baning the user => (Luiz Miguel)
                bot.sendMessage(msg.chat.id,'45s de áudio? Vai refletir teus atos!');
                await sendMedia(bot, msg, 'PeakyBlinder', '.gif', {});
                bot.kickChatMember(msg.chat.id, users.luiz.id);
            }
            
        }
        //Functions

        bot.onText(/\/ideologia/i, (msg) => { //Send the ideology of group w command: '/ideologia'
            funcIdeologia(bot, msg);
        });

        bot.onText(/\/dice/i, (msg) => { //Send funny gif and dice w command: /dice
            funcDice(bot, msg);
        });

        bot.onText(new RegExp(`${botUsername}`, 'gi'), (msg) => { //Send funny gif hello when u tag bot
            funcHelloThere(bot, msg);
        });

        bot.onText(/\/stab @/i, (msg) => { //Delete the /stab, send funny gif and ban user tagged
            funcStab(bot, msg);
        });

        bot.onText(new RegExp(`${insideJokes.qntdK}`, 'gi'), (msg) => {
            funcQntdDeK(bot, msg);
        });

        bot.onText(/kek/ig, (msg) => {
            funcKekRafael(bot, msg);
        });


    } catch (error) {
        console.log("----------------------------------------------")
        console.log("ERROR NO EVENTO MENSAGEM: \n"+error);
        console.log("----------------------------------------------");
    }
});

bot.onText(/\/ban/, async (msg) => {
    try {
        const user = msg.text.substring(msg.text.search(/@/)).trim();
        let usernameWithoutArroba = msg.text.substring(msg.text.search(/@/)+1).trim();
        
        if(isAdm(usernameWithoutArroba)){
            const optionsReplyGif = {
                caption: `Bane esse cara aqui, ${user}\nTentou te banir!`, 
                reply_to_message: msg.message_id,
            };
            sendMedia(bot, msg, 'niceTry', '.gif', optionsReplyGif);
        }
        else{
            const poll = await bot.sendPoll(msg.chat.id, `Banir ${user}?`, ["Não", "Sim"]);
        }
    } catch (error) {
        console.log("----------------------------------------------")
        console.log("ERROR NO /BAN: \n"+error);
        console.log("----------------------------------------------");
    }
});

bot.onText(/\/exec/, async (msg) => {
    try {
        if(bot.isPolling()){
            if(msg.reply_to_message.hasOwnProperty("poll") && msg.hasOwnProperty("reply_to_message")){
                if(msg.reply_to_message.poll.is_closed === false && msg.reply_to_message.poll.total_voter_count >= 4){ //ALTERAR 1 P 4
                    const pollStopped = await bot.stopPoll(msg.chat.id, msg.reply_to_message.message_id);
                    const userBan = pollStopped.question.substring(5, pollStopped.question.length-1).trim();
                    const yesVoters = pollStopped.options[1].voter_count;
                    if(yesVoters >=4){
                        const result = await bot.sendMessage(msg.chat.id, `<b>[${yesVoters} cavalheiros votaram para cinzar ${userBan}]</b>`, {parse_mode:"HTML"});
                        
                        //sendMedia()
                        const OptionsReplyYesGif = {
                            caption: `Goodbye, colega ${userBan}`,
                            reply_to_message_id:result.message_id,
                        };
                        await sendMedia(bot, msg, "goodbyeFriend", ".gif", OptionsReplyYesGif);
                        bot.kickChatMember(msg.chat.id, getUserId(userBan));
                    }
                    else{
                        const result = await bot.sendMessage(
                            msg.chat.id, 
                            `[Votação para banir ${userBan}] encerrada. O Conselho optou por não bani-lo.]`, 
                            {parse_mode:"HTML"}
                        );

                        //sendMedia()
                        const optionsReplyGif = {
                            aption: insideJokes.noFighting, 
                            reply_to_message_id: result.message_id,
                            parse_mode: "HTML",
                        };
                        await sendMedia(bot, msg, "noFighting", ".gif", optionsReplyGif);
                    }
                }
                else{ 
                    bot.sendMessage(msg.chat.id, 
                        `Das duas uma: \n1 -> Ou você deu reply numa votação que já foi encerrada, configurando o senhor como um silvicola que não sabe usar tecnologia\nOU\n2 -> Tu tentou encerrar a votação sem antes ter pelo menos 4 membros votando. Ou seja: tentou ser esperto. Not today. `,
                        {
                        reply_to_message_id: msg.message_id
                    });
                }
            }
            else{
                bot.sendMessage(msg.chat.id, "Tem que dar reply na votação em si, animal. Se não o comando <i>'exec'</i> não funciona!",
                {
                    parse_mode: "HTML",
                    reply_to_message_id: msg.message_id
                });
            }
        }
        else{
            bot.sendMessage(msg.chat.id, "Não tem votação em aberto. Abre uma aí antes de dar exec, que tal?",
            {
                parse_mode: "HTML",
                reply_to_message_id: msg.message_id
            });
        }
    } catch (error) {
        console.log("----------------------------------------------")
        console.log("ERROR NO /EXEC: \n"+error);
        console.log("----------------------------------------------");
    }
});

