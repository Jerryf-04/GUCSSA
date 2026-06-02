export interface GuideSection {
  id: string;
  title: string;
  chineseTitle: string;
  icon: string;
  subsections: {
    id: string;
    title: string;
    chineseTitle: string;
    content: string;
    tips?: string[];
  }[];
}

export interface CSSAEvent {
  id: string;
  title: string;
  chineseTitle: string;
  date: string;
  time: string;
  location: string;
  description: string;
  chineseDescription: string;
  image: string;
  category: 'academic' | 'social' | 'career' | 'culture';
  isRegistered?: boolean;
}

export interface Post {
  id: string;
  title: string;
  author: string;
  date: string;
  category: 'housing' | 'marketplace' | 'general';
  content: string;
  contact: string;
  price?: string; // For marketplace
  location?: string; // For housing
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

export interface AlumProfile {
  name: string;
  englishName: string;
  degree: string;
  year: string;
  school: string;
  role: string;
  achievement: string;
  chineseAchievement: string;
  image: string;
  category: 'notable' | 'chinese';
}
