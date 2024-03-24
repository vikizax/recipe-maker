export class Recipe {
    name: string;
    description: string;
    imgPath: string;

    constructor(name: string, description: string, imgPath: string) {
        this.name = name;
        this.description = description;
        this.imgPath = imgPath;
    }
}