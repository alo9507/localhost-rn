import EventConsumer from "./EventConsumer"
const io = require("socket.io-client")
const ENDPOINT = "ws://localhost:4001"

class LocalhostEventConsumer implements EventConsumer {
    sessionStarted(discussionID: string, callback: (data: any) => void): void {
        const socket = io(ENDPOINT)
        socket.on("FromAPI", data => {
            callback(data.payload.time)
        })
    }
}

export default LocalhostEventConsumer