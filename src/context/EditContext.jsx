import { createContext, useState } from "react";


export const EditFormContext = createContext();

export function EditFormProvider ({children}) {
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

    });

    const [formId, setFormId] = useState("");
    
    return (
        <EditFormContext.Provider value={{formData, setFormData, formId, setFormId}}>
            {children}
        </EditFormContext.Provider>
    )
}