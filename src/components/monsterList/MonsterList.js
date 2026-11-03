import DB from '../../DB';
import Monster from "../monster/Monster";

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
    const container = this.domElmt.querySelector("#monsters-container");
    container.innerHTML = "";

    this.monsters.forEach(monster => {
        monster.render(container);
    });
}
}