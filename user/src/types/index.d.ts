export interface timelineItem {
  id: string;
  pabilion: {
    id: string;
    name: string;
    avatar?: string;
    startAt: Date;
    endAt: Date;
  };
  title: string;
  content: string;
  timestamp: Date;
  photos?: string[];
  like: number;
  // comments:[
  //     {
  //         user: string;
  //         text: string;
  //         timestamp: Date;
  //     }
  // ]
}

export interface Pabilion {
  name: string;
  avatar?: string;
}

export interface Comment {
  user: string;
  text: string;
  timestamp: Date;
}

export interface Spot {
    id: string;
    name: string;
    description: string;
    coordinates: [number, number];
    color: string;
    icon: React.ReactNode;
  }
