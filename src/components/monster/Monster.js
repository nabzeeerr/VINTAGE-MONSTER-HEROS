import getTemplate from "./template";
import DB from "../../DB";

export default class Monster {
    constructor (data) {
        this.id = data.id;
        this.name = data.name;
        this.type = data.type;
        this.dangerLevel = data.dangerLevel;
        this.year = data.year;
    }
    render(elmt) {
        const template = document.createElement('template');
        template.innerHTML = getTemplate(this);
        elmt.append(template.content);
        this.addEvents(elmt);
    }
    addEvents(elmt) {
    const row = elmt.querySelector(`[data-id="${this.id}"]`);

    row.querySelector(".btn-edit").addEventListener("click", () => {
        row.classList.add("isEditing");
    });

    row.querySelector(".btn-check").addEventListener("click", async () => {
        const monster = {
            name: row.querySelector(".input-name").value,
            type: row.querySelector(".input-type").value,
            dangerLevel: Number(row.querySelector(".input-danger").value),
            year: Number(row.querySelector(".input-year").value)
        };
        await DB.update(this.id, monster);
        this.name = monster.name;
        this.type = monster.type;
        this.dangerLevel = monster.dangerLevel;
        this.year = monster.year;

        const hiddenElements = row.querySelectorAll(".isEditing-hidden");
        hiddenElements[0].textContent = this.name;
        hiddenElements[1].textContent = this.type;
        hiddenElements[2].textContent = "☠️".repeat(this.dangerLevel);
        hiddenElements[3].textContent = this.year;
        
        row.classList.remove("isEditing");
    });
}
}