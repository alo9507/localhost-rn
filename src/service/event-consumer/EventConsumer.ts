import Event from "./Event"

interface EventConsumer {
    sessionStarted(discussionID: string, callback: (data: Event) => void): void;
}

export default EventConsumer