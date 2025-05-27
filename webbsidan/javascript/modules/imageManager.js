export class ShowQuestionImage {
    constructor(imageContainer, images, indexOfImage) {
        this.container = imageContainer;
        this.images = images
        this.indexOfImage = indexOfImage
    }
    styleImage(indexOfImage) {
        const imgSrc = this.images.photos[indexOfImage].src.medium;

        this.container.innerHTML = `
      <img src="${imgSrc}" width="500" height="300" style="object-fit:contain;">
    `;
        this.container.style.display = "flex";
        this.container.style.justifyContent = "center";
        this.container.style.alignItems = "center";
        this.container.style.borderRadius = "5px";
        this.container.style.border = "solid 1px";

    }
}