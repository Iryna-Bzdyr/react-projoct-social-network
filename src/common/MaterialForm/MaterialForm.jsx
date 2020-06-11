import React from "react";
import FormHelperText from "@material-ui/core/FormHelperText";
import s from "./MaterialForm.module.css";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FilledInput from "@material-ui/core/FilledInput";
import Select from "@material-ui/core/Select";

export const renderFromHelper = ({touched, error, label}) => {
    if (!(touched && error)) {
        return <FormHelperText className={s.text__helper}>Please enter <span
            className={s.label__text}>{label}</span> here</FormHelperText>
    } else {
        return <FormHelperText>{touched && error}</FormHelperText>
    }
}


export const renderFilledInput = ({
                                      label,
                                      input,

                                      meta: {touched, invalid, error},
                                      ...custom
                                  }) => (
    <FormControl className={s.input__area}>
        <InputLabel htmlFor={label}>{label}</InputLabel>
        <FilledInput
            id={label}
            label={label}
            placeholder={label}
            error={touched && invalid}
            {...input}
            {...custom}
        />
        {renderFromHelper({touched, error, label})}
    </FormControl>
)

export const renderSelectField = ({
                               input,
                               label,
                               meta: { touched, error },
                               children,
                               ...custom
                           }) => (
    <FormControl error={touched && error} className={s.input__area} variant="filled">
        <InputLabel>{label}</InputLabel>
        <Select
            native
            {...input}
            {...custom}
            inputProps={{
                name: input.name,
                value:input.value
            }}

        >
            {children}
        </Select>
        {renderFromHelper({ touched, error, label })}
    </FormControl>
)