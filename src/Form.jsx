import React from "react";
import { useForm, Controller } from "react-hook-form";
import CustomSelect from "./Component/CustomSelect";

function Form() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: "",
      select: "",
      multiSelect: [],
    },
  });

  const validationSchema = {
    firstName: { required: "First Name is required" },
    lastName: { required: "Last Name is required" },
    gender: { required: "Last Name is required" },
    select: { required: "Please select" },
    multiSelect: { required: "Please select" },
  };
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
      {console.log("control", control._getWatch)}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Enter your firstName</label> <br />
        <input
          name="firstName"
          {...register("firstName", validationSchema?.firstName)}
        />{" "}
        <br />
        {console.log("errors", errors)}
        {errors.firstName && (
          <p style={{ color: "red" }}>{errors?.firstName?.message}</p>
        )}{" "}
        <br />
        <label>Enter your lastName</label> <br />
        <input {...register("lastName", validationSchema?.lastName)} /> <br />
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
          {...register("gender", validationSchema?.gender)}
        />
        <label>Male</label>
        <br></br>
        <input
          type="radio"
          value="Female"
          name="gender"
          {...register("gender", validationSchema?.gender)}
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
          {...register("select", validationSchema?.select)}
          render={({ field: { onChange, value } }) => (
            <CustomSelect
              defaultValue={value}
              options={options}
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
          {...register("multiSelect", validationSchema?.select)}
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
