import EventConsumer from "./EventConsumer"
import Event from "./EventConsumer"

class LocalhostEventConsumer implements EventConsumer {
    sessionStarted(discussionID: string, callback: (data: any) => void): void {
        setInterval(() => {
            callback(new Date())
        }, 1000)
    }
}

export default LocalhostEventConsumer