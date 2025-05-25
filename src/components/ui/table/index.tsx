import { Table as AntdTable, type TableProps } from 'antd';

const Table= <T, >({...rest}: TableProps<T>) => {
  return <AntdTable {...rest}/>;
}
export default Table;
