import { nanoid } from "nanoid";
import { createContext, useState } from "react";


export const AddFormContext = createContext();

export function AddFormProvider ({children}) {
    const [formData, setFormData] = useState({
    // Step1
        fullName: "",
        lmp: "",
        age: "",
        edc: "",
        dob: "",
        philhealth: "",
        address: "",
        husband: "",
        cp: "",
    // Step 2
        temp: "",
        aog: "",
        pr: "",
        fh: "",
        fht: "",
        bp: "",
        pres: "",
        rr: "",
        pros: "",
        weight: "",
        height: "",
        bmi: "",

    // Step 3
        remarks1: "",
        remarks2: "",
        remarks3: "",
        remarks4: "",
        nurse:"",

    })
    return (
        <AddFormContext.Provider value={{formData,setFormData}}>
            {children}
        </AddFormContext.Provider>
    )
}