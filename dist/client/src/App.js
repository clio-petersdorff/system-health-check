import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
const App = () => {
    // const [message, setMessage] = useState<string>("");
    const [data, setData] = useState({});
    const pusherKey = import.meta.env.VITE_PUSHER_KEY;
    useEffect(() => {
        // Configure Pusher client
        const pusher = new Pusher(pusherKey, {
            cluster: 'eu',
        });
        const channel = pusher.subscribe('my-channel');
        channel.bind('status-update', (update) => {
            setData(update); // Update state with new data
        });
        // Cleanup
        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, []);
    return (_jsxs("div", { children: [_jsx("h1", { children: "System health" }), _jsx("div", { id: 'dashboard', children: Object.keys(data).map(region => {
                    var _a, _b;
                    return (_jsxs("div", { children: [_jsxs("h3", { id: 'regionHeader', children: [region, " data:"] }), _jsxs("div", { children: [_jsxs("p", { children: ["Status: ", ((_a = data[region]) === null || _a === void 0 ? void 0 : _a.status) || 'waiting for status'] }), _jsxs("p", { children: ["Services: ", ((_b = data[region]) === null || _b === void 0 ? void 0 : _b.services) || 'waiting for services'] })] }), _jsx("pre", { children: JSON.stringify(data[region], null, 2) })] }, region));
                }) })] }));
};
export default App;
//# sourceMappingURL=App.js.map