import React from "react";
import FormHelperText from "@material-ui/core/FormHelperText";
import s from "./MaterialForm.module.css";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FilledInput from "@material-ui/core/FilledInput";
import TextField from "@material-ui/core/TextField"
import Autocomplete from "@material-ui/lab/Autocomplete";

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

export const renderAutocomplete = ({
                                       label,
                                       input,
                                       options,
                                       meta: {touched, invalid, error},
                                       ...custom
                                   }) => (
    <FormControl className={s.input__area}>
        <InputLabel htmlFor={label}>{label}</InputLabel>
        <Autocomplete
            id="combo-box-demo"
            options={options}
            getOptionLabel={(option) => option.country}
            style={{width: 300}}
            renderInput={(params) => <TextField {...params} label={label}/>}
        />
        {renderFromHelper({touched, error, label})}
    </FormControl>
)
