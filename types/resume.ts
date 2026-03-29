export interface Experience {
  title: string;
  company: string;
  date: string;
  location: string;
  tasks: string;
}

export interface Project {
  title: string;
  date: string;
  url: string;
  tech: string;
}

export interface Education {
  degree: string;
  school: string;
  date: string;
  gpa: string;
}

export interface ResumeData {
  personal: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    github: string;
    portfolio: string;
    summary: string;
    image?: string;
  };
  experience: Experience[];
  projects: Project[];
  education: Education[];
  skills: string;
  achievements: string;
  languages: string;
  interests: string;
}