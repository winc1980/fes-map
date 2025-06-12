export interface timelineItem{
    id: string;
    pabilion:{
        id: string;
        name: string;
        avatar?: string;
        startAt: Date;
        endAt: Date;
    }
    title: string;
    content: string;
    timestamp: Date;
    photos?: string[];
    like:number
    // comments:[
    //     {
    //         user: string;
    //         text: string;
    //         timestamp: Date;
    //     }
    // ]
}