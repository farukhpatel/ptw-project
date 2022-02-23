import React from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CustomSelect from "./Component/CustomSelect";

const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  gender: yup.string().required("Please select gender"),
  select: yup.string().required("Please select "),
  multiSelect: yup.array().required("Please multiSelect"),
  options: yup.array().of(
    yup.object().shape({
      label: yup.string().required("Please enter label"),
      value: yup.string().required("Please enter value"),
    })
  ),
});

function Form() {
  const {
    control,
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: "",
      select: "",
      multiSelect: [],
      options: [{ label: "", value: "" }],
    },
    resolver: yupResolver(schema),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  const options = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
    { label: "Option 4", value: "4" },
  ];
  const onSubmit = (data) => {
    console.log("data", data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ul>
          {fields?.map((item, index) => (
            <>
              <li key={item.id}>
                <input {...register(`options.${index}.label`)} />
                {errors?.options?.[index]?.label && (
                  <span style={{ color: "red" }}>
                    {errors?.options?.[index]?.label?.message}
                  </span>
                )}{" "}
                <input {...register(`options.${index}.value`)} />
                {errors?.options?.[index]?.value && (
                  <span style={{ color: "red" }}>
                    {errors?.options?.[index]?.value?.message}
                  </span>
                )}{" "}
                <button type="button" onClick={() => remove(index)}>
                  Delete
                </button>
              </li>
              <br />
            </>
          ))}
          <br />
          <button
            type="button"
            onClick={() => append({ label: "", value: "" })}
          >
            Add
          </button>
        </ul>
        <label>Enter your firstName</label> <br />
        <input name="firstName" {...register("firstName")} /> <br />
        {errors.firstName && (
          <p style={{ color: "red" }}>{errors?.firstName?.message}</p>
        )}{" "}
        <br />
        <label>Enter your lastName</label> <br />
        <input {...register("lastName")} /> <br />
        {errors.lastName && (
          <p style={{ color: "red" }}>{errors?.lastName?.message}</p>
        )}{" "}
        <br />
        <label>Select Gender</label>
        <br />
        <input
          type="radio"
          value="Male"
          name="gender"
          {...register("gender")}
        />
        <label>Male</label>
        <br></br>
        <input
          type="radio"
          value="Female"
          name="gender"
          {...register("gender")}
        />
        <label>Female</label>
        <br></br>
        {errors.gender && (
          <p style={{ color: "red" }}>{errors?.gender?.message}</p>
        )}{" "}
        <br />
        <label>Select box</label>
        <br />
        <Controller
          name="select"
          control={control}
          {...register("select")}
          render={({ field: { onChange, value } }) => (
            <CustomSelect
              defaultValue={value}
              options={getValues("options")}
              onChange={(v) => onChange(v.value)}
            />
          )}
        />
        <br />
        {errors.select && (
          <p style={{ color: "red" }}>{errors?.select?.message}</p>
        )}{" "}
        <br />
        <label>Multi Select</label> <br />
        <Controller
          name="multiSelect"
          control={control}
          {...register("multiSelect")}
          render={({ field: { onChange, value } }) => (
            <CustomSelect
              options={options}
              defaultValue={value}
              isMulti={true}
              onChange={(v) => onChange(v?.map((v) => v.value))}
            />
          )}
        />
        <br />
        {errors.multiSelect && (
          <p style={{ color: "red" }}>{errors?.multiSelect?.message}</p>
        )}{" "}
        <br />
        <button type="submit">Submit Form</button>
      </form>
    </div>
  );
}
export default Form;
