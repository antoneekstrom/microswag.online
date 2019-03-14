import { Image } from "../components/image";

export function getHeroImages() : Image[] {
    return [
        new Image('static/images/thanos.jpg', 'Thanos from Fortnite', 'It is Thanos.'),
        new Image('static/images/fortnite.jpg', 'Fortnite (epic)', 'A Fortnite.'),
        new Image('static/images/golden_scar.jpg', 'Golden Scar', 'A very nice golden scar.')
    ];
}