import { createContext, ReactNode } from "react";


type employeeContextType = {};
const employeeContext = createContext<employeeContextType>({} as employeeContextType)
const EmployeeProvider = ({children}:{children:ReactNode}) => {
    return (
        <employeeContext.Provider value ={{}}>{children}</employeeContext.Provider>
    )
}


export  default EmployeeProvider;