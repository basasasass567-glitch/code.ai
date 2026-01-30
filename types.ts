
export interface PersonalityData {
  id: number;
  Time_spent_Alone: number;
  Stage_fear: 'Yes' | 'No';
  Social_event_attendance: number;
  Going_outside: number;
  Drained_after_socializing: 'Yes' | 'No' | '';
  Friends_circle_size: number;
  Post_frequency: number;
  Personality: 'Extrovert' | 'Introvert';
}

export interface UserInput {
  Time_spent_Alone: number;
  Stage_fear: 'Yes' | 'No';
  Social_event_attendance: number;
  Going_outside: number;
  Drained_after_socializing: 'Yes' | 'No';
  Friends_circle_size: number;
  Post_frequency: number;
}
