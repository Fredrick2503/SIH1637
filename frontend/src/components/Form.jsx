import React, { use } from "react";
import { useId } from "react";
import { useForm } from "react-hook-form";
import Container from "./container";
import { Input } from "./Input";
function Form() {
  const fields = ["FName", "LName", "Phone", "Email"];
  const { register, handleSubmit } = useForm();
  return (
    <div>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        <Container>
          {fields?.map((field) => {
            const id = useId();
            return <Input label={field} {...register(field)} />;
          })}
          <Input
            label={"1"}
            value={"1"}
            type="radio"
            name="radio"
            {...register("radio")}
          />
          <Input
            label={"2"}
            value={"2"}
            type="radio"
            name="radio"
            {...register("radio")}
          />
          <input type="submit" value="submit" />
        </Container>
      </form>
    </div>
  );
}

export default Form;


