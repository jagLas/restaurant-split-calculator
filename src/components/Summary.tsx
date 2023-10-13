import { Inventory } from '../classes';
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

    let persons: Persons[] = [];
    for (const [name, total] of Object.entries(totals)) {

        let person: Persons = {
            name: name === 'preTaxTipTotal' ? 'Total' : name,
            total: (Math.round(total * 100) / 100),
            portion: totals.preTaxTipTotal ? Math.round(total / totals.preTaxTipTotal * 100) / 100 : 0,
            allocatedTax: 0
        }

        person.allocatedTax = (Math.round(inventory.tax * person.portion * 100) / 100)
        persons.push(person)
    }

    // formats them into react elements for table JSX
    const data = persons.map(person => {
        return {
            name: <div key={1}>{person.name}</div>,
            total: <div key={2}>{'$' + person.total.toFixed(2)}</div>,
            portion: <div key={3}>{(person.portion * 100).toFixed(0) + '%'}</div>,
            allocatedTax: <div key={4}>{'$' + person.allocatedTax.toFixed(2)}</div>
        }
    })

    // sort function for data
    const sortFn = (a: any, b: any) => {
        if (a.name.props.children === 'Total') {
            return 1
        } else if (b.name.props.children === 'Total') {
            return -1
        } else if (a.name.props.children < b.name.props.children) {
            return -1
        } else {
            return 1
        }
    }

    // header labels
    const headers: object = {
        name: 'Name',
        total: 'Pre-Tax Total',
        portion: 'Portion of Bill',
        allocatedTax: 'Allocated Tax'
    }

    // order of table columns
    const keyOrder : string[] = ['name', 'total', 'portion', 'allocatedTax']

    return (
        <div>
            <h1>Summary</h1>
            <Table header={headers} data={data} keyOrder={keyOrder} sortFn={sortFn}/>
        </div>
    )
}