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
        { id: "", key: "", name: "", age: 0, address: "" },
        ...prevState.tableData!,
      ],
    }));
  };
  const onCancel = () => {
    setState((prevState) => ({
      ...prevState,
      isAddedRow: false,
      selectedRowId: null,
      tableData: [...prevState.tableData!.filter((item) => item.id )],
    }));
  };
  const onSave = () => {
    const obj = getValues();
    reset();

    setState((prevState) => ({
      ...prevState,
      isAddedRow: false,
      tableData: prevState.tableData!.map((item) => {
        if (!item.id || item.id === state.selectedRowId ) {
          return { ...item, id: uuid(), key: uuid(), ...obj };
        }
        return item;
      }),
    }));
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
        dataSource={state.tableData}
      />
    </>
  );
};

export default CrudTableWork;
