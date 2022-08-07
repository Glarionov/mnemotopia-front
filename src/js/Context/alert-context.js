import React from "react";

export const AlertContext = React.createContext({
    show: false,
    setShowAlert2: () => {},
    action: () => {}
});
