const txtomp3 = require("text-to-mp3");
const fs = require("fs")

module.exports = async (text) => {
    return new Promise(async (res, rej) => {
        try {
            txtomp3.getMp3(text, async function(err, binaryStream){
                if(err){
                    return rej(err);
                }
    
                var file = await fs.createWriteStream("audio.mp3");
                file.write(binaryStream);
                file.end();
                return res("Success generation audio")
            })
        } catch (error) {
            return rej(error);
        }
    })
}