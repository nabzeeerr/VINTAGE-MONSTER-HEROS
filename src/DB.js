export default class DB {
    static setApiURL(data){
        this.apiURL = data;
    }

    static async findAll(){
        const response = await fetch(this.apiURL + "monsters");
        return response.json();
    }

    static async create(monster) {
        const response = await fetch(this.apiURL + "monsters", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(monster)
        });

        return response.json();
    }

    static async update(id, monster) {
        const response = await fetch(this.apiURL + "monsters/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(monster)
        });

        return response.json();
    }

    static async delete(id) {
        const response = await fetch(this.apiURL + "monsters/" + id, {
            method: "DELETE"
        });

        return response.json();
    }
}
