export interface Note {
    id: string;
    content: string;
    visibility: 'trainee' | 'admin';
    createdAt: string;
    mentorId: string;
    mentorName: string;
  }
  
  export interface Trainee {
    id: string;
    name: string;
    email: string;
    cohort: string;
    batch: string;
    notes: Note[];
    avatar: string;
  }