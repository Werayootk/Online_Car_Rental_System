
const mappingImgUrl = (imgList) => {
    const images = [];
    console.log(imgList);
    for (const url of imgList) {
        images.push({
            original: url.img_url,
            thumbnail: url.img_url
        });
    }
    console.log(images);
    return images;
};

export default mappingImgUrl;