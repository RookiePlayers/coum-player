import React from 'react';

type RoutingContextType = { 
    currentRoute: string;
    component: React.ReactNode;
    routes: {[key: string]: React.ReactNode};
    history: string[]
    forwardHistory: string[]
    goBack: () => void;
    goForward: () => void;
    setRoute: (route: string, component?: React.ReactNode) => void;
}


const RoutingContext = React.createContext<RoutingContextType | null>(null);

export const useRouting = () => {
    const context = React.useContext(RoutingContext);
    if (!context) {
        throw new Error('useRouting must be used within a RoutingProvider');
    }
    return context;
}


const RoutingProvider = ({children}: {
    children: React.ReactNode
}) => {
    const [currentRoute, setCurrentRoute] = React.useState<string>("");
    const [component, setComponent] = React.useState<React.ReactNode>(<></>);
    const [routes, setRoutes] = React.useState<{[key: string]: React.ReactNode}>({});
    const [history, setHistory] = React.useState<string[]>([]);
    const [forwardHistory, setForwardHistory] = React.useState<string[]>([]);

    const setRoute = (route: string, component?: React.ReactNode) => {
        setCurrentRoute(route);
        setComponent(component);
        setRoutes({...routes, [route]: component});
        setHistory(prevHistory => [...prevHistory.filter(r => r !== route), route]);
        setForwardHistory([]);
    }

    const goBack = () => {
        if (history.length > 1) {
            const previousRoute = history[history.length - 2];
            setCurrentRoute(previousRoute);
            setComponent(routes[previousRoute]);
            setHistory(prevHistory => {
                const newHistory = [...prevHistory];
                newHistory.splice(newHistory.length - 1, 1); // Remove the current route
                return newHistory;
            });
            setForwardHistory(prevForwardHistory => [...prevForwardHistory, currentRoute]);
        }
    }
    
    const goForward = () => {
        if (forwardHistory.length > 0) {
            const nextRoute = forwardHistory[forwardHistory.length - 1];
            setCurrentRoute(nextRoute);
            setComponent(routes[nextRoute]);
            setHistory(prevHistory => [...prevHistory, nextRoute]);
            setForwardHistory(prevForwardHistory => prevForwardHistory.slice(0, -1)); // Remove the last element
        }
    }
    return (
        <RoutingContext.Provider value={{currentRoute, component, setRoute, routes, goBack, history, forwardHistory, goForward}}>
            {children}
        </RoutingContext.Provider>
    )
}

export default RoutingProvider;