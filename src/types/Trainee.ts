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
  