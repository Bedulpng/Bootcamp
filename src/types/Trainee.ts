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
  }

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
  
  