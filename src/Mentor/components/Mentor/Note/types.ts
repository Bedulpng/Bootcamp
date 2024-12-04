export interface Note {
  id: string;
  content: string;
  visibility: 'trainee' | 'admin';
  createdAt: string;
  mentorName: string;
}

export interface Trainee {
  id: string;
  name: string;
  email: string;
  avatar: string;
  notes: Note[];
}

export interface Batch {
  id: number;
  trainees: Trainee[];
}

export interface TrainingClass {
  id: string;
  name: string;
  icon: string;
  color: string;
  batches: Record<number, Batch>;
}

export type TrainingClasses = Record<string, TrainingClass>;