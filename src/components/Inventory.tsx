import React, { useId, useState } from "react"
import { Inventory } from "../classes";
import InventoryList from "./InventoryList";

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

    return (
        <>
            <InventoryList inventory={inventory} setInventory={setInventory} />
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
                <button onClick={handleClick}>Add Person</button>
            </form>
        </>
    )
}