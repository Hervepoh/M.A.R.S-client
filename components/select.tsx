"use client";

import { useMemo } from "react";
import { SingleValue } from "react-select";
import CreatableSelect from "react-select/creatable";

type Props = {
    onChange: (value?: string) => void;
    onCreate?: (value: string) => void;
    options?: { label: string; value: string }[];
    value?: string | null | undefined;
    disabled?: boolean;
    placeholder?: string;
};

export const Select = ({
    value,
    onChange,
    onCreate,
    options = [],
    disabled,
    placeholder,
}: Props) => {
    //DOC: https://react-select.com/home#creatable
    const onSelect = (
        option: SingleValue<{ label: string; value: string }>
    ) => {
        onChange(option?.value)
    }

    const formattedValue = useMemo(() => {
        if (value === '') return null; // Retourne null si value est vide
        return options.find((option) => option.value === value)
    }, [options, value])

    return <CreatableSelect
        isClearable={true}
        placeholder={placeholder}
        className="text-sm h-10"
        styles={{
            control: (base) => ({
                ...base,
                borderColor: "#e2e8f0",
                ":hover": {
                    borderColor: "#e2e8f0",
                },
            })
        }}
        value={formattedValue}
        onChange={onSelect}
        options={options}
        onCreateOption={onCreate}
        isDisabled={disabled}
    />;
};
