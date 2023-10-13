import React from "react"
import './Table.css'

type TableProps = {
    header: object,
    keyOrder: string[],
    data: {[index: string]: React.ReactElement}[],
    sortFn?: (a:any, b:any) => 1 | -1 | 0
    rgbValues?: [number, number, number]
}

/*
Accepts an Object of header
Accepts an Array of Objects
*/
export default function Table({keyOrder, header, data, sortFn, rgbValues}: TableProps) {

    if (!rgbValues) {
        rgbValues = [0, 185, 255]
    }

    const rgbString = `${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]}`
    const rgbStringDark = `rgb(${rgbString})`
    const rgbStringLight = `rgba(${rgbString}, .4`
    const rgbStringLightest = `rgba(${rgbString}, .2`

    if (sortFn) {
        data.sort(sortFn)
    }

    const headerArray : any = keyOrder.map(key => {
        return header[key as keyof typeof header]
    })

    const dataArray = data.map(rowData => {
        const row = keyOrder.map(key => {
            return rowData[key as keyof Object]
        })

        return row
    })

    return (
        <ul className="table"
            style={{
                gridTemplateColumns: `repeat(${headerArray.length}, auto)`,
                ['--main-color' as any]: rgbStringDark,
                ['--secondary-color' as any]: rgbStringLight,
                ['--tertiary-color' as any]: rgbStringLightest,
                }}>

            <li className="table-row header">
                {headerArray.map((headerLabel : string, i : number)=>{
                    return <div key={i}>{headerLabel}</div>
                })}
            </li>

            {dataArray.map((dataRow, i) => {
                return (
                    <li key={i} className="table-row data">
                        {dataRow}
                    </li>)
            })}
        </ul>
    )
}