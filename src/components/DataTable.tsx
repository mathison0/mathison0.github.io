import type { DataTable as DataTableData } from '../types'

/** 결과 표. 좁은 화면에서는 표만 가로로 스크롤된다. */
export default function DataTable({ table }: { table: DataTableData }) {
  return (
    <div className="data-table">
      {table.caption ? <p className="data-table__caption">{table.caption}</p> : null}
      <div className="data-table__scroll">
        <table>
          <thead>
            <tr>
              {table.columns.map((column) => (
                <th key={column} scope="col">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row) => (
              <tr key={row[0]}>
                {row.map((cell, index) =>
                  index === 0 ? (
                    <th key={index} scope="row">
                      {cell}
                    </th>
                  ) : (
                    <td key={index}>{cell}</td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {table.notes && table.notes.length > 0 ? (
        <ul className="data-table__notes">
          {table.notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
