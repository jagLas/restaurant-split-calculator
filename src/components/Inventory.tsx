import React, { useId, useMemo, useState } from "react"
import { Inventory, Item } from "../classes";
import InventoryList from "./InventoryList";
import Summary from "./Summary";
import './Inventory.css'

export default function InventoryComp () {
    const id = useId()
    const [inventory, setInventory] = useState<Inventory>(new Inventory([], 0, 0))
    const [person, setPerson] = useState('');
    const [item, setItem] = useState('');
    const [price, setPrice] = useState<number>(0)
    const [tax, setTax] = useState<number>(0)
    const [tip, setTip] = useState<number>(0)

    const handleClick = (e : React.BaseSyntheticEvent) => {
        e.preventDefault()
        setInventory(inventory.addItem(person, item, price))
    }

    const updateHandler = (e : React.BaseSyntheticEvent) => {
        e.preventDefault()
        setInventory(new Inventory(inventory.items, tip, tax))
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
        <div id='app-container'>
            <form id='item-form' className="grid-form horizontal">
                <label htmlFor="person-input">
                    Person

                </label>
                <input
                        id='person-input'
                        value={person}
                        onChange={(e) => setPerson(e.target.value)}
                    />
                <label htmlFor="item-input">
                    Item

                </label>
                <input
                    id="item-input"
                    value={item}
                    onChange={(e) => setItem(e.target.value)}
                />
                <label htmlFor="price-input">Price</label>
                <input
                    id='price-input'
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                    />
                <div></div>
                <button onClick={handleClick}>Add Item</button>
            </form>
            <form id='tax-tip-form' className="grid-form horizontal">
                <label htmlFor='tax-input'>Tax</label>
                <input id='tax-input' type='number' value={tax} onChange={(e) => {setTax(Number(e.target.value))}} />
                <label htmlFor="tip-input">Tip</label>
                <input id='tip-input' type='number' value={tip} onChange={(e) => {setTip(Number(e.target.value))}} />
                <div></div>
                <button onClick={updateHandler}>Update</button>
            </form>
            <Summary totals={totals} inventory={inventory}/>
            <InventoryList inventory={inventory} setInventory={setInventory} />
        </div>
    )
}