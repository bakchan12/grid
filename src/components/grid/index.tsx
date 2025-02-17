import {useState} from "react";
import MuiXDataGrid from "./mui-x/mui-x-data-grid.tsx";
import MyDataGrid from "./react-data-grid/react-data-grid.tsx";
import TanStackTable from "./tanstack/tan-stack-table.tsx";
import GridExample from "./ag-grid/ag-grid-test.tsx";
import {Column} from "react-data-grid";
import {GridColDef, GridRowsProp} from "@mui/x-data-grid";

export default function Grid() {
    interface IRow {
        id: number;
        make: string;
        model: string;
        price: number;
        checkbox: boolean;
    }
    const [columns, setColumns] = useState<Column<IRow>[]>([
        { key: "checkbox", name: "체크박스", sortable: false },
        { key: "make", name: "메이크", sortable: true },
        { key: "model", name: "모델", sortable: true },
        { key: "price", name: "가격", sortable: true },
    ]);
    const [rows, setRows] = useState<IRow[]>([
        { id: 0, make: "Tesla", model: "Model Y", price: 64950, checkbox: true },
        { id: 1, make: "Ford", model: "F-Series", price: 33850, checkbox: false },
        { id: 2, make: "Toyota", model: "Corolla", price: 29600, checkbox: true },
        { id: 3, make: "Mercedes", model: "EQA", price: 48890, checkbox: true },
        { id: 4, make: "Fiat", model: "MM", price: 15774, checkbox: false },
        { id: 5, make: "Nissan", model: "Juke", price: 20675, checkbox: true },
    ]);

    const [value, setValue] = useState<string>('tanstack');

    return (
        <div style={{width: '100dvw', height: '100dvh'}}>
            {value === 'tanstack' && <TanStackTable initialData={tanstackInitialData} />}
            {value === 'mui' && <MuiXDataGrid rows={muiRows} columns={muiColumns} />}
            {value === 'ag' && <GridExample sampleData={sampleData} />}
            {value === 'myGrid' && <MyDataGrid />}
                <select value={value} onChange={(e) => setValue(e.target.value)}>
                    <option value='tanstack'>tanStack-table</option>
                    <option value='mui'>Mui-X-Data-Grid</option>
                    <option value='ag'>AG-Grid</option>
                    <option value='myGrid'>React-Data-Grid</option>
                </select>
        </div>
    )
}

export const sampleData = [
    { mission: "Apollo 11", company: "NASA", location: "Moon", date: "1969-07-20", time: "00:56", rocket: "Saturn V", price: 0, successful: true },
    { mission: "Falcon 9", company: "SpaceX", location: "Orbit", date: "2021-05-15", time: "10:25", rocket: "Falcon 9", price: 5000000, successful: true },
    { mission: "Starship", company: "SpaceX", location: "Earth", date: "2023-01-01", time: "12:00", rocket: "Starship", price: 2000000, successful: false },
    { mission: "Apollo 12", company: "NASA", location: "Moon", date: "1969-11-14", time: "00:53", rocket: "Saturn V", price: 0, successful: true },
    { mission: "Falcon Heavy", company: "SpaceX", location: "Orbit", date: "2022-02-06", time: "15:00", rocket: "Falcon Heavy", price: 10000000, successful: true },
    { mission: "Soyuz MS-10", company: "Roscosmos", location: "Space Station", date: "2018-10-11", time: "03:20", rocket: "Soyuz", price: 3000000, successful: true },
    { mission: "Chang'e 4", company: "CNSA", location: "Moon", date: "2019-01-03", time: "09:00", rocket: "Long March 3B", price: 5000000, successful: true },
    { mission: "Mars 2020", company: "NASA", location: "Mars", date: "2020-07-30", time: "11:00", rocket: "Atlas V", price: 2500000, successful: true },
    { mission: "Juno", company: "NASA", location: "Jupiter", date: "2011-08-05", time: "16:45", rocket: "Atlas V", price: 5000000, successful: true },
    { mission: "Vega C", company: "ESA", location: "Orbit", date: "2022-07-01", time: "13:30", rocket: "Vega C", price: 7000000, successful: true },
    { mission: "Atlas V", company: "ULA", location: "Space", date: "2021-08-19", time: "18:25", rocket: "Atlas V", price: 4000000, successful: true },
    { mission: "Falcon 9", company: "SpaceX", location: "Orbit", date: "2022-03-04", time: "12:20", rocket: "Falcon 9", price: 3000000, successful: true },
    { mission: "Artemis I", company: "NASA", location: "Moon", date: "2022-11-16", time: "08:00", rocket: "Space Launch System", price: 20000000, successful: true },
    { mission: "Venera 13", company: "Soviet Union", location: "Venus", date: "1982-03-01", time: "14:10", rocket: "Proton", price: 1000000, successful: true },
    { mission: "Perseverance Rover", company: "NASA", location: "Mars", date: "2020-07-30", time: "09:00", rocket: "Atlas V", price: 3500000, successful: true },
    { mission: "Hubble Space Telescope", company: "NASA", location: "Orbit", date: "1990-04-24", time: "13:30", rocket: "Space Shuttle", price: 12000000, successful: true },
    { mission: "James Webb Space Telescope", company: "NASA", location: "Orbit", date: "2021-12-25", time: "12:00", rocket: "Ariane 5", price: 10000000, successful: true },
    { mission: "New Horizons", company: "NASA", location: "Pluto", date: "2006-01-19", time: "19:00", rocket: "Atlas V", price: 2000000, successful: true },
    { mission: "Voyager 2", company: "NASA", location: "Interstellar Space", date: "1977-08-20", time: "11:50", rocket: "Titan IIIE", price: 8000000, successful: true },
    { mission: "Soyuz MS-11", company: "Roscosmos", location: "Space Station", date: "2018-12-03", time: "09:00", rocket: "Soyuz", price: 2500000, successful: true },
    { mission: "SLS Block 1", company: "NASA", location: "Orbit", date: "2024-08-17", time: "14:00", rocket: "Space Launch System", price: 25000000, successful: false },
    { mission: "Ceres Orbiter", company: "NASA", location: "Ceres", date: "2023-06-14", time: "07:15", rocket: "Atlas V", price: 3000000, successful: true },
    { mission: "TESS", company: "NASA", location: "Orbit", date: "2018-04-18", time: "12:32", rocket: "Falcon 9", price: 1000000, successful: true },
    { mission: "Rosetta", company: "ESA", location: "Comet 67P", date: "2004-03-02", time: "06:00", rocket: "Ariane 5", price: 1500000, successful: true },
    { mission: "Phoenix Mars Lander", company: "NASA", location: "Mars", date: "2007-08-04", time: "16:10", rocket: "Delta II", price: 5000000, successful: true },
    { mission: "Kepler Space Telescope", company: "NASA", location: "Orbit", date: "2009-03-07", time: "13:15", rocket: "Delta II", price: 3000000, successful: true },
    { mission: "Parker Solar Probe", company: "NASA", location: "Sun", date: "2018-08-12", time: "14:25", rocket: "Delta IV", price: 3500000, successful: true },
    { mission: "Chandra X-ray Observatory", company: "NASA", location: "Orbit", date: "1999-07-23", time: "11:05", rocket: "Space Shuttle", price: 8000000, successful: true },
    { mission: "JAXA Hayabusa", company: "JAXA", location: "Itokawa", date: "2005-05-09", time: "09:25", rocket: "M-V", price: 10000000, successful: true },
    { mission: "Mars Odyssey", company: "NASA", location: "Mars", date: "2001-04-07", time: "16:50", rocket: "Delta II", price: 5000000, successful: true },
    { mission: "GRAIL", company: "NASA", location: "Moon", date: "2011-09-10", time: "10:45", rocket: "Atlas V", price: 1000000, successful: true },
    { mission: "Lunar Reconnaissance Orbiter", company: "NASA", location: "Moon", date: "2009-06-18", time: "12:40", rocket: "Atlas V", price: 2000000, successful: true },
    { mission: "Mariner 10", company: "NASA", location: "Mercury", date: "1973-11-03", time: "10:00", rocket: "Atlas Centaur", price: 1500000, successful: true },
    { mission: "Space Shuttle Columbia", company: "NASA", location: "Earth Orbit", date: "1981-04-12", time: "13:50", rocket: "Space Shuttle", price: 20000000, successful: true },
    { mission: "LRO", company: "NASA", location: "Moon", date: "2009-06-18", time: "14:35", rocket: "Atlas V", price: 3000000, successful: true },
    { mission: "SLS", company: "NASA", location: "Orbit", date: "2025-01-15", time: "11:15", rocket: "Space Launch System", price: 15000000, successful: false },
    { mission: "INSAT 3DR", company: "ISRO", location: "Orbit", date: "2016-09-08", time: "08:50", rocket: "GSLV Mk III", price: 4000000, successful: true },
    { mission: "Mars Reconnaissance Orbiter", company: "NASA", location: "Mars", date: "2005-08-12", time: "15:10", rocket: "Atlas V", price: 2500000, successful: true },
    { mission: "BepiColombo", company: "ESA", location: "Mercury", date: "2018-10-20", time: "14:10", rocket: "Ariane 5", price: 7000000, successful: true },
    { mission: "Fregat", company: "Russian Space Agency", location: "Orbit", date: "2022-09-01", time: "09:25", rocket: "Soyuz", price: 3000000, successful: true },
    { mission: "JAXA Akasaki", company: "JAXA", location: "Mars", date: "2024-02-20", time: "12:50", rocket: "H-IIA", price: 2000000, successful: true },
    { mission: "Perseverance Rover", company: "NASA", location: "Mars", date: "2020-07-30", time: "09:00", rocket: "Atlas V", price: 3000000, successful: true },
    { mission: "Soyuz MS-12", company: "Roscosmos", location: "Space Station", date: "2019-03-14", time: "14:00", rocket: "Soyuz", price: 3000000, successful: true },
]

export const muiRows: GridRowsProp = [
    { id: 1, col1: 'Hello', col2: 'World', col3: 'Test' },
    { id: 2, col1: 'DataGridPro', col2: 'is Awesome', col3: 'summer' },
    { id: 3, col1: 'MUI', col2: 'is Amazing', col3: 'spring' },
    { id: 4, col1: 'React', col2: 'is Amazing', col3: 'yht' },
    { id: 5, col1: 'Java', col2: 'is Amazing', col3: 'ggg' },
    { id: 6, col1: 'Zustand', col2: 'is Amazing', col3: 'yy' },
    { id: 7, col1: 'Redux', col2: 'is Amazing', col3: 'te' },
];

export const muiColumns: GridColDef[] = [
    { field: 'col1', headerName: 'Column 1', width: 150, editable: true },
    { field: 'col2', headerName: 'Column 2', width: 150, editable: true },
    { field: 'col3', headerName: 'Column 3', width: 150, editable: true },
];

type User = {
    firstName: string;
    lastName: string;
    age: number;
    visits: number;
    progress: number;
    status: string;
};
export const tanstackInitialData: User[] = [
    { firstName: "Tanner", lastName: "Linsley", age: 33, visits: 100, progress: 50, status: "Married" },
    { firstName: "Kevin", lastName: "Vandy", age: 27, visits: 200, progress: 100, status: "Single" }
];