let itemIdCounter = 0

export class Item {
    id: number;
    person: string;
    name: string;
    price: number;

    constructor(person: string, name: string, price: number){
        this.id = itemIdCounter++;
        this.person = person;
        this.name = name;
        this.price = price;
    }
}

export class Inventory {
    items: Item[];
    tax: number;
    tip: number;

    constructor(items: Item[], tip: number) {
        if (items) {
            this.items = [...items]
        } else {
            this.items = []
        }

        if (typeof tip === 'number') {
            this.tip = tip;
        } else {
            this.tip = 0;
        }

        this.tax = this.items.reduce((accumulator, currentVal) => {
            return accumulator + currentVal.price
        }, 0) * .08

        this.tax = Math.round(this.tax * 100) / 100
    }

    addItem(person: string, item: string, price: number): Inventory {
        const newItem = new Item(person, item, price)
        this.items.push(newItem)

        return new Inventory(this.items, this.tip)
    }

    removeItem(removedItem: Item): Inventory {
        this.items = this.items.filter(item => {
            if (item.id === removedItem.id) {
                return false
            } else {
                return true
            }
        })

        return new Inventory(this.items, this.tip)
    }

    editItem(editedItem: Item): Inventory {
        this.items = this.items.map(item => {
            if (item.id === editedItem.id) {
                return editedItem
            } else {
                return item
            }
        })

        return new Inventory(this.items, this.tip)
    }
}