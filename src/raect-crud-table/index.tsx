import { useState } from "react";
import { Columns, dataSource, type DataType } from "./data";
import Button from "../components/ui/Button";
import Table from "../components/ui/table";
import { v4 as uuid } from "uuid";
import { useForm, type FieldValues } from "react-hook-form";

interface IState {
  tableData: DataType[];
  isAddedRow?: boolean;
  selectedRowId?: string | null;
}
const CrudTableWork = () => {
  const [state, setState] = useState<IState>({
    tableData: dataSource,
    isAddedRow: false,
    selectedRowId: null,
  });
  const { control, getValues, reset } = useForm<
    FieldValues,
    unknown,
    DataType
  >();

  const onAddRow = () => {
    if (state.isAddedRow) return;
    setState((prevState) => ({
      ...prevState,
      isAddedRow: true,
      tableData: [
        { id: "", name: "",key:1, age: 0, address: "" },
        ...prevState.tableData.map((item, index) => ({...item, key: index+2})) ?? [],
      ],
    }));
  };
  const onCancel = () => {
    setState((prevState) => ({
      ...prevState,
      isAddedRow: false,
      selectedRowId: null,
      tableData: [...prevState.tableData!.filter((item) => item.id)].map((item, index) => {
        return {...item, key: index + 1 };
      }),
    }));
  };
  const onSave = (record: DataType) => {
    const obj = getValues() as Omit<DataType, "id" | "key">;
    const name = obj.name ?? record.name;
    const age = obj.age ?? record.age;
    const address = obj.address ?? record.address;
    const formData = {
      id: uuid(),
      name,
      age,
      address,
    } as DataType;
    if (!name || !age || !address) return;

    setState((prevState) => ({
      ...prevState,
      tableData: prevState
        .tableData!.map((item, index) => {
          if (!item.id || item.id === state.selectedRowId) {
            return {...formData, key: index + 1 };
          }
          return item;
        })
        .filter((item) => item.id),
    }));

    reset();
  };

  const onEditRow = (id: string) => {
    setState((prevState) => ({
      ...prevState,
      selectedRowId: id,
    }));
  };

  const onDeleteRow = (id: string) => {
    setState((prevState) => ({
      ...prevState,
      tableData: prevState.tableData!.filter((item) => item.id !== id),
    }));
  };

  return (
    <>
      <div style={{ marginBottom: "20px" }}>
        <Button children="Add Row" type="primary" onClick={onAddRow} />
      </div>
      <Table
        columns={Columns({
          control,
          onCancel,
          onSave,
          onDeleteRow,
          onEditRow,
          selectedRowId: state.selectedRowId,
        })}
        rowKey={item => item.id || ""}
        dataSource={state.tableData}
        pagination={{ pageSize: 10 }}
        // scroll={{ y: 55 * 75 }}
      />
    </>
  );
};

export default CrudTableWork;
