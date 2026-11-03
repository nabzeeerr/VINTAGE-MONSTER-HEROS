import DB from '../../DB';
import Monster from "../monster/Monster";

export default class MonsterList {
    constructor(data) {
        this.domElmt = document.querySelector(data.elmt);
        DB.setApiURL(data.apiURL);
        this.monsters = [];
        this.loadMonsters();
        this.domElmt.querySelector(".btn-lipstick").addEventListener("click", () => {
            this.addMonster();
        });
    }
    async loadMonsters () {
        const monsters = await DB.findAll();
        this.monsters = monsters.map(monster =>  new Monster(monster));
        this.render();
    }
    async addMonster() {
        const monster = {
            name: this.domElmt.querySelector("#monster-name").value,
            type: this.domElmt.querySelector("#monster-type").value,
            dangerLevel: Number(this.domElmt.querySelector("#monster-danger").value),
            year: Number(this.domElmt.querySelector("#monster-year").value)
        };

        await DB.create(monster);
        await this.loadMonsters();
    }
    render() {
    const container = this.domElmt.querySelector("#monsters-container");
    container.innerHTML = "";

    this.monsters.forEach(monster => {
        monster.render(container);
    });
}
}