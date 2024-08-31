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
    return (_jsxs("div", { children: [_jsx("h1", { children: "Pusher Message" }), _jsx("pre", { children: data ? JSON.stringify(data, null, 2) : 'Waiting for data...' })] }));
};
export default App;
//# sourceMappingURL=App.js.map