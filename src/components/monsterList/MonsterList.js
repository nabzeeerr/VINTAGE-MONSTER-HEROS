import DB from '../../DB';
import Monster from "../monster/Monster";
import './styles.css'

export default class MonsterList {
    constructor(data) {
        this.domElmt = document.querySelector(data.elmt);
        DB.setApiURL(data.apiURL);
        this.monsters = [];
        this.loadMonsters();
        this.domElmt.querySelector(".btn-lipstick").addEventListener("click", () => {
            this.addMonster();
        });
        this.domElmt.querySelector("#search-monsters").addEventListener("input", (event) => {
            this.searchMonsters(event.target.value);
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

        this.domElmt.querySelector("#monster-name").value = "";
        this.domElmt.querySelector("#monster-danger").value = "";
        this.domElmt.querySelector("#monster-year").value = "";

        await this.loadMonsters();
    }
    searchMonsters(search) {
        const filteredMonsters = this.monsters.filter(monster => {
            return monster.name.toLowerCase().includes(search.toLowerCase())
                || monster.type.toLowerCase().includes(search.toLowerCase());
        });

        const container = this.domElmt.querySelector("#monsters-container");
        container.innerHTML = "";

        filteredMonsters.forEach(monster => {
            monster.render(container);
        });
    }
    render() {
        const container = this.domElmt.querySelector("#monsters-container");
        container.innerHTML = "";

        this.domElmt.querySelector("#monsters-count").textContent = this.monsters.length;

        this.monsters.forEach(monster => {
            monster.render(container);
        });
    }
}