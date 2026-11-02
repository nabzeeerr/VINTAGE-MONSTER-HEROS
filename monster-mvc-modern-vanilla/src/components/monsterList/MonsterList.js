import DB from '../../DB';
import Monster from "../monster/Monster";
import getTemplate from "./template"

export default class MonsterList {
    constructor(data) {
        this.domElmt = document.querySelector(data.elmt);
        DB.setApiURL(data.apiURL);
        this.monsters = [];
        this.loadMonsters();
    }
    async loadMonsters () {
        const monsters = await DB.findAll();
        this.monsters = monsters.map(monster =>  new Monster(monster));
        this.render();
    }
    render() {
        this.domElmt.innerHTML = getTemplate();
        this.monsters.forEach(todo =>
            todo.render(this.domElmt.querySelector(".todo-list"))
        );
    }
}