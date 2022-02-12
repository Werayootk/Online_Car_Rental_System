import './Table.scss';
import { Table as AntDTable } from 'antd';
import { TableProps as AntDTableProps } from 'antd/es/table';

function Table(props) {
    return (
        <AntDTable {...props}>
            {props.children}
        </AntDTable>
    );
};
  
Table.Column = AntDTable.Column;
  
export default Table;