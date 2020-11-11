const TelegramBot = require('node-telegram-bot-api');
const token = require('./token');
const users = require("./users");
const fs = require('fs');

const bot = new TelegramBot(token, {polling: true});

const punishLuiz = [
        'MACACO!', //Não relativo à cor de pele, e sim ao intelecto OBVIAMENTE. É uma piada interna. 
        'BURRO IMBECIL', 
        'NECROSADO MENTAL!',
        'PRIMITIVO!', 
        'GORILA DE MERDA!', 
        'BIÓLOGO FUDIDO!',
        'ILETRADO ASQUEROSO!',
        'ANIMAL!',
        'DEGENERADO!',
        'ANALFABETOO DO CARALHO!'
     ];

const qntK = "KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK";

const IsGod = function (username){
    if(username === users.zamora.username || username === users.klaus.username || username === users.polck.username){
        return true;
    }
    else{
        return false;
    }
}

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

bot.on('message', async (msg) => {
    /*const readFile = fs.readFileSync(`${__dirname}/writedThisStream.txt`);
    const spyWriteStream = fs.createWriteStream(`${__dirname}/writedThisStream.txt`, {encoding: "utf-8"});
    spyWriteStream.write(readFile+'\n'+JSON.stringify(msg.from));*/
    try {
        if(msg.hasOwnProperty('voice') && msg.from.username.toString() === users.luiz.username){
            bot.sendMessage(msg.chat.id, 'Sem áudio seu filha da puta! APRENDE A ESCREVER SEU '+punishLuiz[Math.round(Math.random() * 10)], {reply_to_message_id: msg.message_id});  
            
            if(msg.voice.duration >= 35 && msg.voice.duration <= 44){
                bot.sendMessage(msg.chat.id,'Puta que pariu, não bastasse mandar áudio o corno ainda manda um áudio c mais de 35s. Foda-se, áudio excluído.');
                bot.deleteMessage(msg.chat.id, msg.message_id);
            }
            if(msg.voice.duration >=45){
                const stream =  fs.createReadStream("./gifs/PeakyBlinder.gif");
                bot.sendMessage(msg.chat.id,'45s de áudio? Vai refletir teus atos!');
                bot.sendChatAction(msg.chat.id, "upload_video");
                await bot.sendAnimation(msg.chat.id, stream);
                bot.kickChatMember(msg.chat.id, users.luiz.id);
            }
            
        }
        
    } catch (error) {
        console.log("----------------------------------------------")
        console.log("ERROR NO AUDIO LUIZ: \n"+error);
        console.log("----------------------------------------------");
    }
});

bot.onText(/\/dice/, async(msg) => {
    try {
        const stream = fs.createReadStream("./gifs/diceJumanji.gif");
        bot.sendChatAction(msg.chat.id, "upload_video");
        const gifDiceMessage = await bot.sendAnimation(msg.chat.id, stream, 
        {
            reply_to_message_id:msg.message_id, 
            caption: `<i>@${msg.from.username} rolou um dado...</i>`,
            parse_mode: "HTML"
        });
        bot.sendDice(msg.chat.id, {reply_to_message_id: gifDiceMessage.message_id});
    } catch (error) {
        console.log("----------------------------------------------")
        console.log("ERROR NO /DICE: \n"+error);
        console.log("----------------------------------------------");
    }
});

bot.onText(/\/kd aula/gi, async(msg) => {
    try {
        if(msg.from.username.toString() === users.pedro.username){
            const stream =  fs.createReadStream("./gifs/speakJarJar.gif");
            bot.sendChatAction(msg.chat.id, "upload_video");
            await bot.sendAnimation(msg.chat.id, stream, {
                caption: '<i>Só sabe falar essa merda vaitomanocu</i>\nSe eu tirar 6 no dado vai tomar stab,foda-se /dice @midgetZ',
                reply_to_message_id: msg.message_id,
                parse_mode: "HTML"
            });
        }
    } catch (error) {
        console.log("----------------------------------------------")
        console.log("ERROR NO KD AULA: \n"+error);
        console.log("----------------------------------------------");
    }
});

bot.onText(/@JigsawBonde_bot/g , async (msg) => {
    try {
        const stream = fs.createReadStream("./gifs/hellothere.gif");
        bot.sendChatAction(msg.chat.id, "upload_video");
        await bot.sendAnimation(msg.chat.id, stream, {reply_to_message_id: msg.message_id});
    } catch (error) {
        console.log("----------------------------------------------")
        console.log("ERROR NO MENTION/HELLO THERE: \n"+error);
        console.log("----------------------------------------------");
    }
});

bot.onText(/\/ideologia/, async (msg) => {
    try {
        const stream =  fs.createReadStream("./gifs/Ideologia.gif");
        bot.sendChatAction(msg.chat.id, "upload_video");
        await bot.sendAnimation(msg.chat.id, stream, {
            caption: '<i>Night gathers, and now my watch begins. It shall not end until my death. I shall take no wife, hold no lands, father no children. I shall wear no crowns and win no glory. I shall live and die at my post. I am the sword in the darkness. I am the watcher on the walls. I am the shield that guards the realms of men. I pledge my life and honor to the Night’s Watch, for this night and all the nights to come.</i>\n <b>Pau no cú de SJW e dos veganos</b>',
            reply_to_message_id: msg.message_id,
            parse_mode: "HTML"
        });
    } catch (error) {
        console.log("----------------------------------------------")
        console.log("ERROR NO IDEOLOGIA: \n"+error);
        console.log("----------------------------------------------");
    }
});


bot.onText(/kek/ig, (msg) => {
    try {
        if(msg.from.username.toString() === users.rafael.username || msg.from.username.toString() === users.rafael2.username){
            bot.sendMessage(msg.chat.id, '<i>LEMBRETE:</i> sai da merda da KEK, CARALHO. <b>Zero meme, tua sanidade tá caindo</b>', 
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
});

bot.onText(new RegExp(`${qntK}`, 'gi'), async (msg) => {
    const userK = msg.from.username;
    try {
        if(IsGod(userK)){
            bot.deleteMessage(msg.chat.id, msg.message_id);
            bot.sendMessage(msg.chat.id, `Follow the rules, sir @${userK}`);
        }
        else{
            const stream = fs.createReadStream("./gifs/KKKKqntd.jpg");
            await bot.sendPhoto(msg.chat.id, stream, {
            parse_mode: "HTML",
            caption: "<i>Mais de 3 linhas de 'KKKK', <b>foda-se</b></i>",
            reply_to_message_id: msg.message_id
            });
            bot.deleteMessage(msg.chat.id, msg.message_id);
            bot.kickChatMember(msg.chat.id, getUserId(userK));
        }
        
    } catch (error) {
        console.log("----------------------------------------------")
        console.log("ERROR NO QNTD DE K: \n"+error);
        console.log("----------------------------------------------");
    }
});


bot.onText(/\/stab/, async (msg) => {
    try {
        if(msg.from.username === users.zamora.username){
            const userStabbed = msg.text.substring(msg.text.search(/@/)+1).trim();
            bot.deleteMessage(msg.chat.id, msg.message_id);
            const stream = fs.createReadStream("gifs/ForTheWatch.gif");
            bot.sendChatAction(msg.chat.id, "upload_video");
            setTimeout( () => {console.log('Kill him')}, 6000);
            await bot.sendAnimation(msg.chat.id, stream, {caption: "<i>I did warned you not to trust me</i>", parse_mode: "HTML"});
            bot.kickChatMember(msg.chat.id, getUserId(userStabbed));
        }
    } catch (error) {
        console.log("----------------------------------------------")
        console.log("ERROR NO STAB: \n"+error);
        console.log("----------------------------------------------");
    }
});

bot.onText(/\/ban/, async (msg) => {
    try {
        const user = msg.text.substring(msg.text.search(/@/)).trim();
        let usernameWithoutArroba = msg.text.substring(msg.text.search(/@/)+1).trim();
        if(IsGod(usernameWithoutArroba)){
            bot.sendChatAction(msg.chat.id, "upload_video");
            const stream = fs.createReadStream("./gifs/niceTry.gif");
            await bot.sendAnimation(msg.chat.id, stream, {caption: `Bane esse merda aqui, ${user}\nTentou te banir!`, reply_to_message: msg.message_id});
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
                if(msg.reply_to_message.poll.is_closed === false && msg.reply_to_message.poll.total_voter_count >= 1){ //ALTERAR 1 P 4
                    const pollStopped = await bot.stopPoll(msg.chat.id, msg.reply_to_message.message_id);
                    const userBan = pollStopped.question.substring(5, pollStopped.question.length-1).trim();
                    const yesVoters = pollStopped.options[1].voter_count;
                    if(yesVoters >=4){
                        const result = await bot.sendMessage(msg.chat.id, `<b>[${yesVoters} cavalheiros votaram para cinzar ${userBan}]</b>`, {parse_mode:"HTML"});
                        bot.sendChatAction(msg.chat.id, "upload_video");
                        const stream = fs.createReadStream("./gifs/goodbyeFriend.gif");
                        bot.sendAnimation(msg.chat.id, stream, 
                        {
                            caption: `Goodbye, colega ${userBan}`,
                            reply_to_message_id:result.message_id
                        });
                        bot.kickChatMember(msg.chat.id, getUserId(userBan));
                    }
                    else{
                        const result = await bot.sendMessage(msg.chat.id, `[Votação para banir ${userBan}] encerrada. O Conselho optou por não bani-lo.]`, {parse_mode:"HTML"});
                        bot.sendChatAction(msg.chat.id, "upload_video");
                        const stream = fs.createReadStream("./gifs/noFighting.gif");
                        bot.sendAnimation(msg.chat.id, stream, 
                        {
                            caption: `<b>Deixa ele na porra do grupo agora que a votação foi encerrada. NÃO TENTEM BANIR ELE SE NÃO VAI VIR BAN</b>\n<i>Fiquem de olho, ADM's: @${users.zamora.username}, @${users.klaus.username}, @${users.polck.username}</i>`, 
                            reply_to_message_id: result.message_id,
                            parse_mode: "HTML"
                        })
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
                bot.sendMessage(msg.chat.id, "Tem que dar reply na votação, animal. Se não o comando <i>'exec'</i> não funciona!",
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
        console.log("ERROR NO /BAN: \n"+error);
        console.log("----------------------------------------------");
    }
});

