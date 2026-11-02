import getTemplate from "./template";

export default class Monster {
    constructor (data) {
        this.id = data.id;
        this.name = data.name;
        this.type = data.type;
        this.dangerLevel = data.dangerLevel;
        this.year = data.year;
    }
    render(elmt) {
        const template = document.createElement('div');
        template.innerHTML = getTemplate(this);
        elmt.append(template);
    }
}