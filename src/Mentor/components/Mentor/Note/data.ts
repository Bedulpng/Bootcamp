import { TrainingClasses } from './types';
import { getRandomTrainees } from './utils';

export const initialClasses: TrainingClasses = {
  qa: {
    id: 'qa',
    name: 'Quality Assurance',
    icon: 'test-tube-2',
    color: 'violet',
    batches: Object.fromEntries(
      Array.from({ length: 12 }, (_, i) => [i + 1, { id: i + 1, trainees: getRandomTrainees() }])
    ),
  },
  fullstack: {
    id: 'fullstack',
    name: 'Fullstack Development',
    icon: 'code-2',
    color: 'blue',
    batches: Object.fromEntries(
      Array.from({ length: 12 }, (_, i) => [i + 1, { id: i + 1, trainees: getRandomTrainees() }])
    ),
  },
  uiux: {
    id: 'uiux',
    name: 'UI/UX Design',
    icon: 'palette',
    color: 'pink',
    batches: Object.fromEntries(
      Array.from({ length: 12 }, (_, i) => [i + 1, { id: i + 1, trainees: getRandomTrainees() }])
    ),
  },
};