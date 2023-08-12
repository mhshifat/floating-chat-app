import { type ChangeEvent, useCallback, useState } from "react";

export default function useOnChange(initialValues: Record<string, string>) {
  const [values, setValues] = useState(initialValues);
  
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    setValues(values => ({...values, [e.target.name]: e.target.value}))
  }, [])
  return { values, setValues, handleChange };
}