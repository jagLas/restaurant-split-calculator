import React from "react"
import { Inventory } from "../classes"
import Item from "./Item";
import Table from "./Table";

type AppProps = {
    inventory: Inventory,
    setInventory: React.Dispatch<React.SetStateAction<Inventory>>;
}

export default function InventoryList ({inventory, setInventory}: AppProps) {

    const inventoryArray = inventory.items.map(item => {
        return {
            person: <div key={1}>{item.person}</div>,
            name: <div key={2}>{item.name}</div>,
            price: <div key={3}>{item.price}</div>,
            removeItem: <button key={4} onClick={() => setInventory(inventory.removeItem(item))}>Delete</button>
        }
    })

    inventoryArray.sort((a: any, b: any) => {
        if (a.person.props.children > b.person.props.children) {
            return 1
        } else if (a.person.props.children < b.person.props.children) {
            return -1
        } 
        
        if (a.name.props.children > b.name.props.children) {
            return 1
        } else if (a.name.props.children < b.name.props.children) {
            return -1
        }
        
        return 0
    })

    const headers = {
        person: 'Name',
        name: 'Item',
        price: 'Price',
        removeItem: ''
    }

    const keyOrder = ['person', 'name', 'price', 'removeItem']
    return (
        <div>
            <Table rgbValues={[255, 66, 28]} keyOrder={keyOrder} header={headers} data={inventoryArray}/>
        </div>
    )
}