import {DataGrid, GridRowsProp, GridColDef} from '@mui/x-data-grid';

interface Props {
    rows: GridRowsProp,
    columns: GridColDef[],
}

export default function MuiXDataGrid({rows, columns}: Props) {

    return (
        <div style={{height: 400, width: '100%'}}>
            <DataGrid
                rows={rows}
                columns={columns}
                checkboxSelection={true}
                disableRowSelectionOnClick={true}
                onCellClick={e => console.log(`${e.row.col1} ${e.row.col2}`)}
            />
        </div>
    )
}