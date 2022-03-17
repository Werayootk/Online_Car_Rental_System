
const mappingImgUrl = (imgList) => {
    const images = [];
    for (const url of imgList) {
        images.push({
            original: url.img_url,
            thumbnail: url.img_url
        });
    }
    return images;
};

export default mappingImgUrl;