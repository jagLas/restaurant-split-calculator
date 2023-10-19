import { Inventory } from '../classes';
import Table from './Table';
import './Summary.css'

type SummaryProps = {
    totals : {[index: string]: number},
    inventory : Inventory
}

export default function Summary ({totals, inventory} : SummaryProps) {

    type Persons = {
        name: string,
        total: number,
        portion: number,
        allocatedTax: number,
        allocatedTip: number,
        finalPortion: number
    }

    let persons: Persons[] = [];
    for (const [name, total] of Object.entries(totals)) {

        let person: Persons = {
            name: name === 'preTaxTipTotal' ? 'Total' : name,
            total: (Math.round(total * 100) / 100),
            portion: totals.preTaxTipTotal ? total / totals.preTaxTipTotal  : 0,
            allocatedTax: 0,
            allocatedTip: 0,
            finalPortion: 0
        }

        person.allocatedTax = (Math.round(inventory.tax * person.portion * 100) / 100)
        person.allocatedTip = (Math.round(inventory.tip * person.portion * 100) /100)
        person.finalPortion = (Math.round(
            (person.allocatedTax + person.allocatedTip + person.total) * 100
        ) / 100)
        console.log(person)
        persons.push(person)
    }

    // formats them into react elements for table JSX
    const data = persons.map(person => {
        return {
            name: <div key={1}>{person.name}</div>,
            total: <div key={2}>{'$' + person.total.toFixed(2)}</div>,
            portion: <div key={3}>{(person.portion * 100).toFixed(1) + '%'}</div>,
            allocatedTax: <div key={4}>{'$' + person.allocatedTax.toFixed(2)}</div>,
            allocatedTip: <div key={5}>{'$' + person.allocatedTip.toFixed(2)}</div>,
            finalPortion: <div key={6}>{'$' + person.finalPortion.toFixed(2)}</div>,
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
        portion: 'Portion of Bill (%)',
        allocatedTax: 'Allocated Tax',
        allocatedTip: 'Allocated Tip',
        finalPortion: 'Portion of Bill ($)'
    }

    // order of table columns
    const keyOrder : string[] = ['name', 'total', 'portion', 'allocatedTax', 'allocatedTip', 'finalPortion']

    return (
        <div id='summary-container'>
            <h2>Summary</h2>
            <Table header={headers} data={data} keyOrder={keyOrder} sortFn={sortFn} rgbValues={[56, 172, 35]} />
        </div>
    )
}