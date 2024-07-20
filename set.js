const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOERxTzNTbHFkT2ZZRWZZSFdoSFhxdU1vV29QQWJiMzBheXc4dXcvRXVGST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0Y0R0cxMUxMVDlRNnBnUVB3NW4rYmZHYnFHY0JMZWVkbG9LMHUxdXR6QT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZR0o0NGY2a0xQWDMxSFZBU013dEowcXVxWTB6andaNWxpQkt4dnB3cVU4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0QjlwOWZQazRRVWpzVWxlMWNCdkZzVWhCRHpvUVpIMy84Tmxpd1NKdnhRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNNWFZoQVhRQlBrVlF6MzZHZlczM2NMeFFrU0Y2YXVyT3UvdkN0K1JQWFU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im56eVpVeGszMUYxSjJOdmNIdnhHT2hOMnV6NHBnd2F4UGVqNCt0eFFOU289In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid01FRW9sUUpSR3ZZQWVTTGRSYnFaWHl1dm1WaFd5YVBqeC94dmpTVGUzVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSEJ2V1RTVkxCS1JhU09hNG43S29kdFFwRGw5bHRPUFFuWGFQUFhtMFZpND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklSZmk1SW1RclhSRVdER3FMYWZqY0VXWlhCbXBING04VWZBUVdOVUJHYnBHQjNpSkNZbjZCNkpiL0pCdUd1ZnFuMit6T0dWQTZmU0tkdHBqdVNGMWh3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NDAsImFkdlNlY3JldEtleSI6ImFnc0crQXg0Lzd2SzFZWVJZaW5ELzJTVUpHSmlpRlBuSjVMWmJ6VEtxS3c9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6ImtqWmVnNWlLVGVxN2xpeUZ0Vk5DZ3ciLCJwaG9uZUlkIjoiYTZhMjk4MWMtNTlhMi00YWVjLWJhOWEtZWQ4N2I3Y2RiMmQwIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ilhrck8yd3pRYlR1dHNTQVU2bThuazVFK1d5Zz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJOVGZDcXdUcjEra05RbElYekNVVlgwRENyaFU9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiSldTN0ZIN0siLCJtZSI6eyJpZCI6IjIzNDcwNjY2NTkxODk6NDVAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ01LRS8rMEdFSS9HN2JRR0dBSWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjZOdVBFb2dEaWc1RHNzNlJGakRBQnRtUzMrNW9tS1YvdXFMRDJNUFBtVmM9IiwiYWNjb3VudFNpZ25hdHVyZSI6InZGMyszV2lKaTMyZ2VXcXYyTjVsUjN1Tk5KRFNVYmhkVGJLSVhLK2hNZTdrZ3BNYmU0K1JzTDQxR3p2b3lIZnhycDgvMzZwclMyRnVqU1VGY0pmeERnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJSaCs0TFRJVlNpSDI1aHcwWDNIc0lzcG5VS0kwMmhpem50MWxJUWlCa0lJZWgrM2NBb21vaytadTYrT1d1YVpaRjNxdk5jVnB6eTRBcVFkd0hmQWlpZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDcwNjY2NTkxODk6NDVAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZWpianhLSUE0b09RN0xPa1JZd3dBYlprdC91YUppbGY3cWl3OWpEejVsWCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMTQ1OTQ4NX0=FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOERxTzNTbHFkT2ZZRWZZSFdoSFhxdU1vV29QQWJiMzBheXc4dXcvRXVGST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0Y0R0cxMUxMVDlRNnBnUVB3NW4rYmZHYnFHY0JMZWVkbG9LMHUxdXR6QT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZR0o0NGY2a0xQWDMxSFZBU013dEowcXVxWTB6andaNWxpQkt4dnB3cVU4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0QjlwOWZQazRRVWpzVWxlMWNCdkZzVWhCRHpvUVpIMy84Tmxpd1NKdnhRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNNWFZoQVhRQlBrVlF6MzZHZlczM2NMeFFrU0Y2YXVyT3UvdkN0K1JQWFU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im56eVpVeGszMUYxSjJOdmNIdnhHT2hOMnV6NHBnd2F4UGVqNCt0eFFOU289In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid01FRW9sUUpSR3ZZQWVTTGRSYnFaWHl1dm1WaFd5YVBqeC94dmpTVGUzVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSEJ2V1RTVkxCS1JhU09hNG43S29kdFFwRGw5bHRPUFFuWGFQUFhtMFZpND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklSZmk1SW1RclhSRVdER3FMYWZqY0VXWlhCbXBING04VWZBUVdOVUJHYnBHQjNpSkNZbjZCNkpiL0pCdUd1ZnFuMit6T0dWQTZmU0tkdHBqdVNGMWh3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NDAsImFkdlNlY3JldEtleSI6ImFnc0crQXg0Lzd2SzFZWVJZaW5ELzJTVUpHSmlpRlBuSjVMWmJ6VEtxS3c9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6ImtqWmVnNWlLVGVxN2xpeUZ0Vk5DZ3ciLCJwaG9uZUlkIjoiYTZhMjk4MWMtNTlhMi00YWVjLWJhOWEtZWQ4N2I3Y2RiMmQwIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ilhrck8yd3pRYlR1dHNTQVU2bThuazVFK1d5Zz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJOVGZDcXdUcjEra05RbElYekNVVlgwRENyaFU9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiSldTN0ZIN0siLCJtZSI6eyJpZCI6IjIzNDcwNjY2NTkxODk6NDVAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ01LRS8rMEdFSS9HN2JRR0dBSWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjZOdVBFb2dEaWc1RHNzNlJGakRBQnRtUzMrNW9tS1YvdXFMRDJNUFBtVmM9IiwiYWNjb3VudFNpZ25hdHVyZSI6InZGMyszV2lKaTMyZ2VXcXYyTjVsUjN1Tk5KRFNVYmhkVGJLSVhLK2hNZTdrZ3BNYmU0K1JzTDQxR3p2b3lIZnhycDgvMzZwclMyRnVqU1VGY0pmeERnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJSaCs0TFRJVlNpSDI1aHcwWDNIc0lzcG5VS0kwMmhpem50MWxJUWlCa0lJZWgrM2NBb21vaytadTYrT1d1YVpaRjNxdk5jVnB6eTRBcVFkd0hmQWlpZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDcwNjY2NTkxODk6NDVAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZWpianhLSUE0b09RN0xPa1JZd3dBYlprdC91YUppbGY3cWl3OWpEejVsWCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMTQ1OTQ4NX0=',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "🌙 MOONLIGHT 🌙",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "2347066659189", 
             
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",
CHATBOT: process.env.CHAT_BOT || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || '🌙 MOONLIGHT 🌙',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
