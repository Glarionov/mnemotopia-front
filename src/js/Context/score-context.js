import React from "react";

export const ScoreContext = React.createContext({
    score: 0,
    handleObjectTouch: () => {
        /*s*/console.log('333=', 333); //todo r
    },
});