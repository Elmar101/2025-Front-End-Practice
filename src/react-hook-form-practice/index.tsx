import { useForm } from "react-hook-form";
import Input from "../components/ui/form/Input";
import Button from "../components/ui/Button";



interface IFormData {
  userName?: string;
  userEmail?: string;
  userPassword?: string;
}

function ReactHookForm() {
  const {
    control,
    getValues,
    handleSubmit,
    formState: {
      errors,
      isValid,
      isDirty,
      isSubmitted,
      touchedFields,
      dirtyFields,
      validatingFields,
    },
  } = useForm<IFormData>({
    mode: "onChange",
    defaultValues: {
      userName: "",
    },
  });
  console.log({
    errors,
    isValid,
    isDirty,
    isSubmitted,
    touchedFields,
    dirtyFields,
    validatingFields,
  });
 
  console.log("App rendered");
  const onClick = () => {
    const userName = getValues("userName");
    console.log("userName", userName);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onClick)}>
        <div style={{ marginBottom: "20px" }}>
          <Input
            control={control}
            name="userName"
            placeholder="Enter your name"
            style={{ width: "600px", padding: "20px 4px" }}
            rulues={{
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Minimum length is 3 characters",
              },
            }}
            status={errors.userName ? "error" : undefined}
            errorMessage={errors.userName?.message}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <Input
            control={control}
            name="userEmail"
            placeholder="Enter your email"
            style={{ width: "600px", padding: "20px 4px" }}
            rulues={{
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email format",
              },
            }}
            status={errors.userEmail ? "error" : undefined}
            errorMessage={errors.userEmail?.message}
          />
        </div>
        <Button
          htmlType="submit"
          style={{ width: "600px", padding: "20px 4px", marginTop: "20px" }}
        >
          Submit
        </Button>
      </form>
    </>
  );
}

export default ReactHookForm;
