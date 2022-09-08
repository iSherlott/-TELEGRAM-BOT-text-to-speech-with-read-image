const ReadText = require('text-from-image');
const fs = require('fs');

module.exports = async (bot, message) => {
    try {
        let text = ""

        if(message["photo"]) {
            const path = await bot.downloadFile(message.photo[message.photo.length - 1].file_id, './images')

            text = await ReadText(path)
            fs.unlinkSync(path);
        }

        if(message["text"]) {
            text = message["text"]
        }

        return {status: true, data: text}
    } catch (error) {
        console.log(error)
        return {status: false, data: null}
    }
    
}