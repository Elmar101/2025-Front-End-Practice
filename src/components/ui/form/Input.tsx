import { Input as AntdInput, type InputProps } from "antd";
import { Controller, type Control, type FieldValues, type RegisterOptions } from "react-hook-form";

interface IControledInputProps extends InputProps {
    control: Control<FieldValues>,
    rulues?: Omit<RegisterOptions<FieldValues, string>, "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs">,
    errorMessage?: string,
}
const Input = ({ name = "", control, errorMessage,rulues,...rest }: IControledInputProps) => {
  return (
   <>
    <Controller
      render={({ field }) => (
        <AntdInput
          {...rest}
          {...field}
          onChange={(e) => {
            field.onChange(e.target.value);
          }}
        />
      )}
      control={control}
      name={name}
      rules={rulues}
    />
    {errorMessage && <div style={{ color: "red", margin: "5px 0" }}>{errorMessage}</div>}
   </>
  );
};

export default Input;
//
