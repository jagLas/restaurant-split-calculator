import { Inventory } from '../classes';
import './Summary.css'

export default function Summary ({totals, inventory} : {totals : {[index: string]: number}, inventory : Inventory}) {

    type Persons = {
        name: string,
        total: number,
        portion: number,
        allocatedTax: number
    }

    let persons: Persons[] = [];
    for (const [name, total] of Object.entries(totals)) {

        let person: Persons = {
            name: name === 'preTaxTipTotal' ? 'total' : name,
            total: total,
            portion: totals.preTaxTipTotal ? total / totals.preTaxTipTotal : 0,
            allocatedTax: 0
        }

        person.allocatedTax = inventory.tax * person.portion
        persons.push(person)
    }

    persons.sort((a,b) => {
        if (a.name === 'total') {
            return 1
        } else if (b.name === 'total') {
            return -1
        } else if (a.name < b.name) {
            return -1
        } else {
            return 1
        }
    })

    const header = {
        name: 'Name',
        total: 'Pre-Tax Total',
        portion: 'Portion of Bill',
        allocatedTax: 'Allocated Tax'
    }

    return (
        <div>
            <h1>Summary</h1>
            <ul id='summary-table'>
                <li className='table-header' key={header.name}>
                        <div>
                            {header.name}
                        </div>
                        <div>
                            {header.total}
                        </div>
                        <div>
                            {header.portion}
                        </div>
                        <div>
                            {header.allocatedTax}
                        </div>
                </li>
                {persons.map(person  => {
                return(
                    <li className='table-row' key={person.name}>
                        <div>
                            {person.name}
                        </div>
                        <div>
                            ${person.total}
                        </div>
                        <div>
                            {Math.round(person.portion * 100)}%
                        </div>
                        <div>
                            ${Math.round(person.allocatedTax * 100) / 100}
                        </div>
                    </li>)
            })}</ul>
        </div>
    )
}