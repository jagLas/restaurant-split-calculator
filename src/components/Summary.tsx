import { Inventory } from '../classes';
import './Summary.css'
import Table from './Table';

type SummaryProps = {
    totals : {[index: string]: number},
    inventory : Inventory
}

export default function Summary ({totals, inventory} : SummaryProps) {

    type Persons = {
        name: string,
        total: number,
        portion: number,
        allocatedTax: number
    }

    type StringPersons = {[index: string]: string}[]

    let persons: Persons[] = [];
    for (const [name, total] of Object.entries(totals)) {

        let person: Persons = {
            name: name === 'preTaxTipTotal' ? 'Total' : name,
            total: (Math.round(total * 100) / 100),
            portion: totals.preTaxTipTotal ? Math.round(total / totals.preTaxTipTotal * 100) / 100 : 0,
            allocatedTax: 0
        }

        person.allocatedTax = (Math.round(inventory.tax * person.portion) / 100)
        persons.push(person)
    }

    const data : StringPersons = persons.map(person => {
        const newObject : {[index: string]: string} = {
            name: person.name,
            total: '$' + person.total.toFixed(2),
            portion: person.portion * 100 + '%',
            allocatedTax: person.allocatedTax.toFixed(2)
        }

        return newObject
    })

    const sortFn = (a: any, b: any) => {
        if (a.name === 'Total') {
            return 1
        } else if (b.name === 'Total') {
            return -1
        } else if (a.name < b.name) {
            return -1
        } else {
            return 1
        }
    }

    const headers: object = {
        name: 'Name',
        total: 'Pre-Tax Total',
        portion: 'Portion of Bill',
        allocatedTax: 'Allocated Tax'
    }

    const keyOrder = ['name', 'total', 'portion', 'allocatedTax']

    return (
        <div>
            <h1>Summary</h1>
            <Table header={headers} data={data} keyOrder={keyOrder} sortFn={sortFn}/>
        </div>
    )
}