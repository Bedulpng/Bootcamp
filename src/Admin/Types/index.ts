export interface UserActivity {
    id: number;
    name: string;
    role: string;
  }
  
  export interface ClassActivity {
    id: number;
    name: string;
    batch: string;
    participants: number;
    status: 'active' | 'ended';
  }
  
  export interface ChartData {
    percentage: number;
    label: string;
  }