const { channel } = require("diagnostics_channel");
require("dotenv").config();
const Discord = require("discord.js");
const { unwatchFile } = require("fs");
const Client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
    ]
});

const prefix = "?";

Client.on("ready", async () => {
    Client.user.setStatus("dnd")
    Client.user.setActivity("développer son bot")
    console.log("bot opérationnel");
});



Client.on("messageCreate", message => {
    if (message.author.bot) return;


        //ban
            if(message.member.permissions.has("ADMINISTRATOR")){
            if(message.content.startsWith(prefix + "ban")){
            let mention = message.mentions.members.first();

            if(message == undefined){
                message.reply("**Membre non ou mal mentionné !**");
            }
            else {
                if(mention.bannable){
                    mention.ban();
                    message.channel.send(mention.displayName + "** à été bannis avec succès  <a:f476fb02848e435bb327634f475ca175:881499641865179178> **");
                }
                else {
                    message.reply("**Impossible de BAN le membre !**");
                }
            }
        }
            
            //kick
                else if(message.content.startsWith(prefix + "kick")){
                let mention = message.mentions.members.first();

                if(mention == undefined){
            message.reply("**Membre non ou mal mentionner [@] !**");
             }
                else {
                    if(mention.kickable){
                        mention.kick();
                        message.channel.send(mention.displayName + " a été kick avec succès");
                    }
                    else {
                        message.reply("**Imposible de KICK ce membre !**");
                    }
                }   

            }
 }   

            //clear    
                if(message.member.permissions.has("MANAGE_MESSAGES"))
                if(message.content.startsWith(prefix + "clear")){
                let args = message.content.split(" ");
                
                if(args[1] == undefined){
                    message.reply("**Nombre de message non ou mal défini !**");
                }
                else {
                    let number = parseInt(args[1]);

                    if(isNaN(number)){
                        message.reply("**Nombre de message non ou mal défini !**");
                    }    
                    else {
                        message.channel.bulkDelete(number).then(messages => {
                            console.log("Suppression de " + message.size + " message réussi !");
                        }).catch(err => {
                            console.log("Erreur de clear : " + err)
                        })
                    }

                }
            }     

        //serveur
        if(message.content === prefix + "serveur"){
            message.channel.send(`**Nom du Serveur :** ${message.guild.name}\n**Nombre d'utilisateur :** ${message.guild.memberCount}`);
        }
        

        //avatar
        if (message.content === prefix + "avatar"){
            return message.channel.send(`**Votre avatar est :** ${message.author.displayAvatarURL + ({ format: 'png' })}`);
          }
      

        //paypal
        if (message.content === prefix + "paypal"){
            message.reply("** <:paypal:881268443796615208> __PAYPAL__ <:paypal:881268443796615208> : https://paypal.me/XenityArtix?locale.x=fr_FR !**")
        }

        //tiktok
        if (message.content === prefix + "tiktok"){
            message.reply("**<:tiktok:881268554115203132> __TIKTOK__ <:tiktok:881268554115203132> : https://www.tiktok.com/@creetonserv.fr?**")
        }

        //help
        if (message.content === prefix + "help"){
        const embed = new Discord.MessageEmbed()
            
            .setColor("#0000FF")
            .setTitle("__Commande du bot__")
            .setURL("")
            .setAuthor("CréeTonServ", "https://cdn.discordapp.com/attachments/881492213576646696/881493038302646272/InShot_20210828_233124693.jpg",)
            .addField("🛠️ : MODERATION", "- ?ban [@membre] : Ban le membre du serveur\n- ?kick [@membre] : Kick un membre du serveur.\n- ?clear [Chiffre] : Supprime des messages.")
            .addField("<:serveur:881499523090907196> : SERVEUR", "- ?help : Affiche les commandes\n- ?serveur : Affiche les infos du serveur.")
            .addField("<:twitch:881501455301885972> : RESEAUX", "- ?paypal : Donne le lien du Paypal\n- ?tiktok : Donne le lien du TikTok.")
            .addField("<a:9c065ee789c14ba7a2387b466b85b4a9:881499531651477514> : AUTRES", "- ?avatar : Affiche votre photo de profil")
            .setFooter("Tout droit réserver à la fondation", "https://cdn.discordapp.com/attachments/881492213576646696/881585142525755412/copyright.png")
            .setTimestamp();
            
            message.channel.send({ embeds: [embed]});    

        
    }

})



Client.login(process.env.BOT_TOKEN);
