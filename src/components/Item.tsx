import { Inventory, Item } from "../classes"

type props = {
    inventory: Inventory;
    item: Item;
    setInventory: React.Dispatch<React.SetStateAction<Inventory>>;
}

export default function ItemCmp({item, inventory, setInventory}: props) {
    const removeItem = (e: React.BaseSyntheticEvent) => {
        e.preventDefault()
        console.log(item.id)
        setInventory(inventory.removeItem(item))
    }

    return (
        <li>
            <div>{item.id}</div>
            <div>{item.person}</div>
            <div>{item.name}</div>
            <div>{item.price}</div>
            <button onClick={removeItem}>Remove</button>
        </li>
    )
}