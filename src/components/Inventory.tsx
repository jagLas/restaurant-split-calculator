import React, { useId, useMemo, useState } from "react"
import { Inventory, Item } from "../classes";
import InventoryList from "./InventoryList";
import Summary from "./Summary";

export default function InventoryComp () {
    const id = useId()
    const [inventory, setInventory] = useState<Inventory>(new Inventory([], 0))
    const [person, setPerson] = useState('');
    const [item, setItem] = useState('');
    const [price, setPrice] = useState<number>(0)

    const handleClick = (e : React.BaseSyntheticEvent) => {
        e.preventDefault()
        setInventory(inventory.addItem(person, item, price))

    }

    const totals = useMemo(() => {
        const totals: {[index:string] : number} = {preTaxTipTotal: 0}

        inventory.items.forEach(item => {
            if (item.person in totals) {
                totals[item.person] += item.price;
            } else {
                totals[item.person] = item.price;
            }

            totals.preTaxTipTotal += item.price;
        })

        return totals
    }, [inventory])

    return (
        <>
            <Summary totals={totals} inventory={inventory}/>
            <form>
                <label>
                    Person
                    <input
                        id={id}
                        value={person}
                        onChange={(e) => setPerson(e.target.value)}
                    />
                </label>
                <label>
                    Item
                    <input
   
                        value={item}
                        onChange={(e) => setItem(e.target.value)}
                    />
                </label>
                <label>
                    Add Person
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                    />
                </label>
                <button onClick={handleClick}>Add Item</button>
            </form>
            <InventoryList inventory={inventory} setInventory={setInventory} />
        </>
    )
}