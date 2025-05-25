import type { ColumnsType } from "antd/es/table";
import { v4 as uuid } from "uuid";
import Button from "../components/ui/Button";
import { HiOutlineSave } from "react-icons/hi";
import { MdDeleteOutline, MdOutlineCancel } from "react-icons/md";
import Input from "../components/ui/form/Input";
import type { Control, FieldValues } from "react-hook-form";
import { FaRegEdit } from "react-icons/fa";
export interface DataType {
  id: string;
  key: string;
  name: string;
  age: number;
  address: string;
}

export const dataSource: DataType[] = [
  {
    id: uuid(),
    key: "1",
    name: "Mike",
    age: 32,
    address: "10 Downing Street",
  },
  {
    id: uuid(),
    key: "2",
    name: "John",
    age: 42,
    address: "10 Downing Street",
  },
];

interface IColumnsProps {
  control: Control<FieldValues, unknown , DataType>;
  selectedRowId?: string | null;
  onCancel?: () => void;
  onSave?: () => void;
  onDeleteRow?: (id: string) => void;
  onEditRow?: (id: string) => void;
}
export const Columns = ({
  onCancel,
  onSave,
  onDeleteRow,
  onEditRow,
  control,
  selectedRowId = null,
}: IColumnsProps): ColumnsType<DataType> => [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (name, record ) => {
        if(name  && selectedRowId !== record.id){
            return <span>{name}</span>;
        }
        return <Input name="name" control = {control} defaultValue={record.id === selectedRowId ? name : ""}/>
    },
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
    render: (age, record) => {
        if(age  && selectedRowId !== record.id){
            return <span>{age > 0 ? age : ""}</span>;
        }
        return <Input name="age" control = {control} defaultValue={record.id === selectedRowId ? age : ""}/>
    },
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
    render: (address, record) => {
        if(address && selectedRowId !== record.id){
            return <span>{address}</span>;
        }
        return <Input name="address" control = {control} defaultValue={record.id === selectedRowId ? address : ""}/>
    },
  },
  {
    title: "Action",
    key: "action",
    dataIndex: "action",
    align: "center",
    render: (_, record) => (
      <>
        {!record.id || record.id === selectedRowId ? (
          <div>
            <Button
              icon={<MdOutlineCancel />}
              children="Cancel"
              onClick={onCancel}
            />
            <Button
              icon={<HiOutlineSave />}
              style={{ marginLeft: "8px" }}
              children="Save"
              onClick={onSave}
            />
          </div>
        ) : <div>
             <Button
              icon={<MdDeleteOutline />}
              danger
              children="Delete"
              onClick={()=> onDeleteRow?.(record.id)}
            />
             <Button
              icon={<FaRegEdit />}
              children="Edit"
              onClick={()=> onEditRow?.(record.id)}
            />
            </div>}
      </>
    ),
  },
];
