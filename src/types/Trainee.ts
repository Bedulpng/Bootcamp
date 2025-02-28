// src/types/Trainee.ts
export interface Certificate {
  id: string;
  traineeId: string;
  issuedAt: string;
  filepath: string;
  trainee: {
    fullName: string;
  };
  class: {
    className: string;
  };
  batch: {
    batchNum: number;
    batchTitle: string;
  };
}

export interface Profile {
  filepath: string;
}

export interface ClassCover {
  id: string;
  classId: string;
  filePath: string;
  fileName: string;
  mimetype: string;
  size: number;
}
export interface BatchCover {
  id: string;
  batchId: string;
  filePath: string;
  fileName: string;
  mimetype: string;
  size: number;
}

export interface  File {
  id: string;
  filename: string;
  filepath: string;
  mimetype: string;
  challengeId?: string;
  lessonId?: string;
}

export interface Files {
  id: string;
  filename: string;
  filepath: string;
  mimetype: string;
  challengeId?: string;
  lessonId?: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  deadline: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  class: Class[];
  batch: Batch[];
  files: File[];
  mentor: Mentor;
  completionStatus: string;
}

export interface Presentation {
  id: string;
  title: string;
  description: string;
  deadline: string;
  status: string;
  createdAt: string;
  class: Class;
  batch: Batch;
  files: File[];
  mentor: Mentor;
  completionStatus?: string;
}

export interface PresentationCompletion {
  id: string;
  userId: string;
  presentationId: string;
  completed: boolean
  status: string;
  completedAt: string;
  user: Trainee;
  final : Presentation;
  submissionFiles: Files[];
  notes: Note[]
}


export interface Completions {
  id: string;
  completions: any[];
  users: Trainee;
  files: File[];
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  deadline: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  class: Class[];
  batch: Batch[];
  files: File[];
  mentor: Mentor;
  completionStatus: string;
}

export type Visibility = "All" | "FOR_TRAINEE" | "FOR_GRADER"; // Adjust based on the enum in your Prisma schem

export interface Trainee {
  id: string;
  fullName: string;
  nickname: string;
  batches: Batch[];
  class: string;
  address: string;
  mobile: string;
  email: string;
  github: string;
  confident: string;
  isLoggedIn: boolean;
  role: string;
  userstatus: string;
  certificates: Certificate[];
  classes: Class[];
  graderNotes?: Note[]; // Notes graded by this user
  traineeNotes?: Note[]; // Notes related to this trainee
  profiles: Profile[];
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
    role: string;
  };
  trainee: Trainee
  class: {
    id: string;
    className: string;
  }
  batch: {
    id: string;
    batchTitle: string;
  }
  lessonCompletion: {
    id: string
    lesson: {
      class: {
        className: string;
      }
      batch: {
        batchTitle: string;
      }
      title: string;
    }
  }
  challengeCompletion: {
    id: string
    challenge: {
      class: {
        className: string;
      }
      batch: {
        batchTitle: string;
      }
      title: string;
    }
  }
}

export interface BatchesClasses {
  id: string;
  batchId: string;
  classId: string; 
  batch: Batch[];
}

export interface Class {
  id: string;
  className: string;
  createdAt: string;
  participant: number;
  batches: BatchesClasses[];
  status: string;
  mentors: Mentor[];
  certificates: Certificate[];
  users: Trainee[];
  challenges: Challenge[];
  lessons: Lesson[];
  presentation : Presentation[];
  cover: ClassCover;
}

export interface Mentor {
  id: string;
  fullName: string;
  nickname: string;
  email: string;
  role: string;
  profiles: Profile[];
}

export interface Batch {
  id: string;
  batchNum: number;
  batchTitle: string;
  batchDesc: string;
  startDate: string;
  endDate: string;
  status: string;
  mentor: Mentor[];
  participants: any[];
  challenges: Challenge[];
  classes: Class[];
  lessons: Lesson[];
  certificates: Certificate[];
  cover: BatchCover;
}

export interface Roles {
  id: string;
  name: string;
  permissions: RoutePermissions[]
}

export interface RoutePermissions {
  id: string;
  route: string;
  role: Roles[]
}
