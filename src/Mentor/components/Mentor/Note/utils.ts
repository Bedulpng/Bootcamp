import { Trainee, Note } from './types';

const NAMES = [
  'Emma Thompson', 'Liam Chen', 'Sofia Rodriguez', 'Noah Kim', 'Olivia Patel',
  'Lucas Silva', 'Ava Nguyen', 'Ethan Williams', 'Isabella Garcia', 'Mason Lee'
];

const MENTORS = [
  'Dr. Sarah Johnson', 'Prof. Michael Chang', 'Dr. Rachel Martinez',
  'Prof. David Kim', 'Dr. Emily Parker'
];

const SAMPLE_NOTES: Note[] = [
  {
    id: '1',
    content: 'Excellent progress in test automation practices',
    visibility: 'trainee',
    createdAt: '2024-03-15T10:00:00Z',
    mentorName: MENTORS[0]
  },
  {
    id: '2',
    content: 'Needs additional support with API testing concepts',
    visibility: 'admin',
    createdAt: '2024-03-14T14:30:00Z',
    mentorName: MENTORS[1]
  }
];

export function getRandomTrainees(count = 5): Trainee[] {
  return Array.from({ length: count }, (_, index) => ({
    id: Math.random().toString(36).substr(2, 9),
    name: NAMES[Math.floor(Math.random() * NAMES.length)],
    email: `trainee${index + 1}@example.com`,
    avatar: `https://source.unsplash.com/100x100/?portrait&${Math.random()}`,
    notes: [...SAMPLE_NOTES]
  }));
}