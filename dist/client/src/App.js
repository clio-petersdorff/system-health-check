import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import './App.css';
const App = () => {
    const [data, setData] = useState({});
    const [cpuHistories, setCpuHistories] = useState({}); // State for CPU history
    const pusherKey = import.meta.env.VITE_PUSHER_KEY;
    useEffect(() => {
        // Configure Pusher client
        const pusher = new Pusher(pusherKey, {
            cluster: 'eu',
        });
        const channel = pusher.subscribe('my-channel');
        channel.bind('status-update', (update) => {
            var _a, _b, _c, _d;
            setData(update); // Update state with new data
            // Update CPU history for each region
            const updatedHistories = Object.assign({}, cpuHistories);
            for (const region of Object.keys(update)) {
                const newCpuLoad = (_d = (_c = (_b = (_a = update[region]) === null || _a === void 0 ? void 0 : _a.results) === null || _b === void 0 ? void 0 : _b.stats) === null || _c === void 0 ? void 0 : _c.server) === null || _d === void 0 ? void 0 : _d.cpu_load;
                if (newCpuLoad !== undefined && newCpuLoad !== null) {
                    updatedHistories[region] = [...(updatedHistories[region] || []), newCpuLoad].slice(-5);
                }
            }
            setCpuHistories(updatedHistories);
        });
        // Cleanup
        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, []);
    // Service Component to render services like Redis and Database
    const Services = ({ redis, database }) => (_jsxs("div", { className: 'resultsChunk', children: [_jsx("p", { children: _jsx("span", { style: { 'fontWeight': 'bold' }, children: "Services:" }) }), _jsxs("ul", { children: [_jsxs("li", { children: ["Redis: ", (redis === null || redis === void 0 ? void 0 : redis.toString()) || 'waiting for update'] }), _jsxs("li", { children: ["Database: ", (database === null || database === void 0 ? void 0 : database.toString()) || 'waiting for update'] })] })] }));
    // ServerStats Component to render server statistics
    const ServerStats = ({ active_connections, wait_time, cpu_load, cpuHistory }) => (_jsxs("div", { className: 'resultsChunk', children: [_jsx("p", { children: _jsx("span", { style: { 'fontWeight': 'bold' }, children: "Server:" }) }), _jsxs("ul", { children: [_jsxs("li", { children: [_jsx("img", { src: './assets/global-network.png' }), " Active connections: ", active_connections !== null && active_connections !== void 0 ? active_connections : 'waiting for update'] }), _jsxs("li", { children: [" ", _jsx("img", { src: './assets/time-left.png' }), " Wait time: ", wait_time !== null && wait_time !== void 0 ? wait_time : 'waiting for update'] }), _jsxs("li", { children: [" ", _jsx("img", { src: './assets/cpu.png' }), " CPU load time: ", cpu_load !== null && cpu_load !== void 0 ? cpu_load : 'waiting for update'] })] }), _jsxs("div", { children: [_jsx("p", { children: "CPU Load History:" }), _jsx("ul", { children: cpuHistory.map((value, index) => (_jsxs("li", { children: [index + 1, ": ", value] }, index))) })] })] }));
    // Region Component that renders status, services, and server stats
    const Region = ({ status, results, cpuHistory }) => {
        var _a;
        return (_jsxs("div", { children: [_jsx("div", { className: status === 'ok' ? "statusChunk-ok" : "statusChunk-red", children: _jsxs("p", { children: [_jsx("span", { style: { 'fontWeight': 'bold' }, children: "Status: " }), status || 'waiting for status'] }) }), (results === null || results === void 0 ? void 0 : results.services) && _jsx(Services, Object.assign({}, results.services)), ((_a = results === null || results === void 0 ? void 0 : results.stats) === null || _a === void 0 ? void 0 : _a.server) && _jsx(ServerStats, Object.assign({}, results.stats.server, { cpuHistory: cpuHistory }))] }));
    };
    // Main Dashboard Component
    return (_jsxs("div", { children: [_jsx("div", { className: 'header', children: _jsx("h2", { children: "System health monitoring dashboard" }) }), _jsx("div", { id: "dashboard", className: "grid-container", children: Object.keys(data).map((region) => {
                    var _a, _b;
                    return (_jsxs("div", { className: "grid-item", children: [_jsx("h3", { className: "regionHeader", children: region }), _jsx(Region, { status: (_a = data[region]) === null || _a === void 0 ? void 0 : _a.status, results: (_b = data[region]) === null || _b === void 0 ? void 0 : _b.results, cpuHistory: cpuHistories[region] || [] })] }, region));
                }) }), _jsx("div", { className: 'statusMessage', children: _jsx("h2", { children: " All systems ok" }) })] }));
};
export default App;
//# sourceMappingURL=App.js.map