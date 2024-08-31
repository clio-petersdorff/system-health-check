const Pusher = require("pusher");
const pusher = new Pusher({
    appId: "1858001",
    key: "08f8c9c0e361033491ff",
    secret: "f48a57ed6ce936bc865d",
    cluster: "eu",
    useTLS: true
});
pusher.trigger("my-channel", "my-event", {
    message: "hello world"
});
//# sourceMappingURL=server.js.map