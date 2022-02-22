import React from "react";
import Select from "react-select";
import { components } from "react-select";
const Option = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};

export default function CustomSelect({
  options = [],
  defaultValue = null,
  onChange,
  isMulti = false,
}) {
  return (
    <Select
      closeMenuOnSelect={isMulti ? false : true}
      hideSelectedOptions={false}
      options={options}
      onChange={onChange}
      defaultValue={options?.filter((option) =>
        isMulti
          ? defaultValue?.includes(option?.value)
          : option?.value === defaultValue
      )}
      components={isMulti && { Option }}
      isSearchable={true}
      isMulti={isMulti}
      isDisable={false}
      theme={(theme) => ({
        ...theme,
        borderRadius: "6px",
        colors: {
          ...theme.colors,
          primary25: "#fafafa",
          primary: "#345b63",
        },
      })}
    />
  );
}
