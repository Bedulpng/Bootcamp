// src/types/Trainee.ts
export interface Certificate {
    id: string;
    traineeId: string;
    issuedAt: string;
  }
  
  export interface Class {
    id: string;
    className: string;
    createdAt: string;
  }

  export type Visibility = 'All' | 'FOR_TRAINEE' | 'FOR_GRADER'; // Adjust based on the enum in your Prisma schem
  
  export interface Trainee {
    id: string;
    fullName: string;
    nickname: string;
    batch: string;
    class: string;
    address: string;
    mobile: string;
    email: string;
    github: string;
    confident: string;
    certificates: Certificate[];
    classes: Class[];
    graderNotes?: Note[]; // Notes graded by this user
    traineeNotes?: Note[]; // Notes related to this trainee
  }

  export interface Note {
    id: string;
    content: string;
    visibility: Visibility;
    createdAt: string;
    grader: {
      id: string;
      fullName: string;
      nickname: string;
    };
    trainee: {
      id: string;
      fullName: string;
      nickname: string;
    };
  };

  export interface Class {
    id: string;
    className: string;
    createdAt: string;
    participant: number;
    batchId: string;
    status: string;
  }
  
  export interface Mentor {
    id: string;
    fullName: string;
    email: string;
  }
  
  export interface Batch {
    id: string;
    batchNum: number;
    batchClass: string;
    batchTitle: string;
    batchDesc: string;
    mentorId?: string;
    startDate: string;
    endDate: string;
    status: string;
    mentor: Mentor;
    participants: any[];
    challenges: any[];
    classes: Class[];
    lessons: any[];
  }
  
  