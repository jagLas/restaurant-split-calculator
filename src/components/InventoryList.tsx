import React from "react"
import { Inventory } from "../classes"
import Item from "./Item";

type AppProps = {
    inventory: Inventory,
    setInventory: React.Dispatch<React.SetStateAction<Inventory>>;
}

export default function InventoryList ({inventory, setInventory}: AppProps) {

    return (
        <div>
        <ul>
            {inventory.items.map((item)=> {
                return <Item key={item.id} item={item} inventory={inventory} setInventory={setInventory}/>
            })}
        </ul>
    </div>
    )
}