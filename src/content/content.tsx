import { Image } from "../components/image";

export function getHeroImages() : Image[] {
    return [
        new Image('static/images/boi.jpg', 'boi', 'A boi.'),
        new Image('static/images/squirrel.jpeg', 'squirrel', 'A squirrel.')
    ];
}