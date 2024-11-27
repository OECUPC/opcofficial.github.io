export enum BlogType {
    blog = "blog",
    activity = "activity"
};

export interface ScheduledEventData {
    id: string,
    type: string,
    location: string,
    name: string,
    start: Date,
    end: Date | undefined,
    status: number
};