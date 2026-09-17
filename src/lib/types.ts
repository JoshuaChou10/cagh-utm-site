export type EventRecord = {
  id: string;
  title: string;
  description: string;
  tag: string;
  location: string;
  starts_at: string;
  ends_at: string | null;
  created_at: string;
  updated_at: string;
};

export type EventSignup = {
  id: string;
  event_id: string;
  name: string;
  email: string;
  created_at: string;
};

export type EventWithSignupCount = EventRecord & {
  signup_count: number;
};

export type ActionState = {
  error?: string;
  success?: string;
} | null;

export type AdminRecord = {
  user_id: string;
  email: string;
  created_at: string;
};
