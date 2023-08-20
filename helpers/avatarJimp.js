import Jimp from "jimp";

const resizeAvatar = async (filepath) => {
    try {
        const image = await Jimp.read(filepath);
        const resizedImage = await image.resize(250, 250).writeAsync(filepath);
        return resizedImage;
    } catch (err) {
        console.error(err);
    }
};

export default resizeAvatar;