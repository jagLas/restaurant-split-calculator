import React, { useState } from "react";
import { Inventory, Item } from "../classes"

type props = {
    inventory: Inventory;
    item: Item;
    setInventory: React.Dispatch<React.SetStateAction<Inventory>>;
}

export default function ItemCmp({item, inventory, setInventory}: props) {
    const [edit, setEdit] = useState<boolean>(false);
    const [person, setPerson] = useState(item.person);
    const [name, setName] = useState(item.name);
    const [price, setPrice] = useState(item.price);


    const removeItem = (e: React.BaseSyntheticEvent) => {
        e.preventDefault()
        console.log(item.id)
        setInventory(inventory.removeItem(item))
    }

    const save = (e: React.BaseSyntheticEvent) => {
        e.preventDefault();
        setEdit(!edit);
        item.person = person;
        item.name = name;
        item.price = price;
        setInventory(inventory.editItem(item))
    }

    return (
        <li>
            {!edit ?
            <>
                <div>{item.id}</div>
                <div>{item.person}</div>
                <div>{item.name}</div>
                <div>{item.price}</div>
                <button onClick={(e) => setEdit(!edit)}>Edit</button>
            </> :
            <form>
                <input value={person} onChange={(e) => setPerson(e.target.value)} />
                <input value={name} onChange={(e) => setName(e.target.value)} />
                <input type='number' value={price} onChange={(e) => setPrice(Number(e.target.value))} />
                <button onClick={save}>Save</button>
            </form>
            }

            <button onClick={removeItem}>Remove</button>
            
        </li>
    )
}