import React from "react";

export const ScoreContext = React.createContext({
    score: 0,
    handleObjectTouch: () => {},
});