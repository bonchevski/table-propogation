// useTableContext.tsx
import { useContext } from "react";
import { TableContext, TableContextProps } from "./TableContext";

export const useTableContext = (): TableContextProps => {
    const context = useContext(TableContext);
    if (!context) {
      throw new Error("useTableContext must be used within a TableProvider");
    }
    return context;
  };