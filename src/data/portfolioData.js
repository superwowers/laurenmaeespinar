const B = import.meta.env.BASE_URL;
export const LINKS = {
  github: 'https://github.com/superwowers',
  linkedin: 'https://www.linkedin.com/in/lauren-mae-espinar-1338b1440',
  acesLive: 'https://aces.lms-edu.app/',
  email: 'lrnmspnr@gmail.com',
};

export const personalInfo = {
  name: 'Lauren Mae Espinar',
  status: 'Available for engineering roles & technical collaborations',
  headline: ['AI-integration web developer', 'full-stack', 'QA tester'],
  tags: ['AI integration', 'Full-stack', 'QA tester', 'Team lead'],
  intro:
    'Team lead of the ACES LMS thesis project, responsible for its backend, database and AI features, and for quality assurance. Sole developer of FitWise, an AI-powered virtual fitting room, from frontend to backend.',
  facts: [
    { label: 'Thesis project', value: 'ACES LMS', detail: 'Team lead · backend, database, AI, QA' },
    { label: 'Sole developer', value: 'FitWise', detail: 'Frontend, backend and database' },
    { label: 'Database', value: 'MySQL', detail: 'Complete ACES schema design' },
    { label: 'Works with AI', value: 'Claude · Antigravity', detail: 'AI-assisted development' },
  ],
};

export const sections = [
  { id: 'home', label: 'Home' },
  { id: 'systems', label: 'Systems' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Stack' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

/* ---------- How they work ---------- */
export const howItWorks = [
  {
    id: 'aces',
    tab: 'ACES · portals',
    steps: [
      ['Login', 'Everyone signs in from one login page and lands in the portal for their role.'],
      ['System admin', 'Looks after the whole platform: administrator accounts, settings, announcements, reports and AI usage.'],
      ['Admin', 'Manages the student and teacher accounts, programs, curriculum, sections and rosters, approves the grades teachers submit, and closes each semester to open the next.'],
      ['Teacher', 'Adds lessons, quizzes and activities for students, then grades their work and submits the grades to the admin.'],
      ['Student', 'Takes the quizzes, completes the activities and follows grades and notifications. Criminology students also practise with the AI interrogation.'],
    ],
    snippet:
      'login -> system admin -> admin -> teacher -> student\ngrades: teacher grades students -> submits to admin -> admin approves -> permanent academic record\nsemester: admin closes the 1st semester -> the 2nd semester opens',
    actions: [{ label: 'Open the live site ↗', href: LINKS.acesLive }],
  },
  {
    id: 'quiz',
    tab: 'AI quiz generator',
    steps: [
      ['Choose', 'The teacher opens a lesson, picks a quiz type (multiple choice, identification or drag and drop) and how many questions to generate.'],
      ['Read the lesson', 'The system gathers the lesson title, its description and the text inside the uploaded files (PDF, Word, PowerPoint, Excel or images).'],
      ['Generate', 'The lesson content goes to the AI with a prompt that avoids repeating questions already used in earlier quizzes.'],
      ['Review', 'The generated questions come back as a draft. The teacher edits them and saves the quiz.'],
      ['Take the quiz', 'Students answer the published quiz and their scores go to the gradebook.'],
    ],
    snippet:
      'input:    lesson text + quiz type + number of questions\noutput:   draft questions for the teacher to review\ncontrols: daily limit for each teacher, and an on/off switch for the system admin',
    image: { src: B + 'images/aces-quiz-ai.jpg', caption: 'The teacher portal: Generate with AI' },
  },
  {
    id: 'interrogation',
    tab: 'AI interrogation',
    steps: [
      ['Choose a case', 'A criminology student picks a case type (homicide, theft and robbery, financial fraud, assault, cybercrime or kidnapping), the briefing language (English or Tagalog) and chat or voice mode.'],
      ['Case story', 'The AI writes a unique Philippine case: a briefing, several suspects with their own backgrounds, alibis and motives, and one guilty suspect.'],
      ['Interrogate', 'The student questions each suspect. Replies stay in character and are checked for consistency, and suggested questions help. In voice mode the student speaks and the suspect answers aloud.'],
      ['Verdict', 'The student names the culprit and explains the reasoning.'],
      ['Score and feedback', 'The answer is scored on technique (alibi, timeline, motive, evidence, witnesses, contradictions), correctness and reasoning, then the AI writes feedback.'],
    ],
    snippet:
      'access: criminology students only\nmodes:  chat, or voice (speech-to-text in, text-to-speech out)\nscore:  technique + correct suspect + written reasoning\ncontrols: daily limit for each student, and an on/off switch for the system admin',
    image: { src: B + 'images/aces-interrogation.jpg', caption: 'The student portal: case type, language and mode' },
  },
  {
    id: 'fitwise',
    tab: 'FitWise',
    steps: [
      ['Ground truth', 'Height and weight anchor the scale.'],
      ['Pose', 'MediaPipe finds 33 body landmarks.'],
      ['Measurements', 'An ellipse model estimates chest, waist and hip circumference.'],
      ['3D avatar', 'A Three.js mannequin morphs to the measurements.'],
      ['Ease heatmap', 'Garment size against the body, zone by zone.'],
      ['Size pick', 'The best of S to XXL for a slim, regular or relaxed fit.'],
    ],
    snippet:
      'scale   = height_cm / skeleton_height_px\nease    = garment_dimension - body_dimension\noptimal = +4 to +8 cm   relaxed > +10 cm   tight < +2 cm',
    image: { src: B + 'images/fitwise.jpg', caption: 'FitWise: the virtual fitting room' },
  },
];

/* ---------- Projects (laptop carousel) ---------- */
export const projectSlides = [
  {
    image: B + 'images/aces-home.jpg',
    alt: 'ACES landing page',
    title: 'ACES LMS',
    badges: ['Thesis project', '4 role portals'],
    description:
      'Learning management system for a college: enrollment per semester, lessons, quizzes, a multi-step grade approval flow and permanent academic records.',
    role: 'Team leader. Developed the backend and the complete database, led quality assurance, implemented the admin semester rollover (1st to 2nd semester), and contributed to the frontend alongside teammates.',
    stack: [
      ['Backend', 'PHP 8.5 · Laravel 12 · MySQL 8'],
      ['AI', 'Google Gemini · speech-to-text / text-to-speech'],
      ['Frontend', 'React 19 · Vite · Tailwind CSS (developed with teammates)'],
      ['Quality', 'PHPUnit · Vitest · ESLint · Laravel Pint · Manual testing'],
    ],
    links: [{ label: 'Live site ↗', href: LINKS.acesLive }],
  },
  {
    image: B + 'images/aces-quiz-ai.jpg',
    alt: 'AI quiz generator',
    title: 'ACES · AI quiz generator',
    badges: ['AI', 'Teacher portal'],
    description:
      'Teachers pick a quiz type (drag and drop, identification, multiple choice) and generate the questions with AI, then review them before use.',
    role: 'Designed and developed the AI quiz generator, including the AI integration.',
    stack: [
      ['AI', 'Google Gemini API'],
      ['Backend', 'PHP 8.5 · Laravel 12 · MySQL 8'],
      ['Review', 'Teachers review generated questions before use'],
    ],
    links: [{ label: 'Live site ↗', href: LINKS.acesLive }],
  },
  {
    image: B + 'images/aces-interrogation.jpg',
    alt: 'AI suspect interrogation',
    title: 'ACES · AI suspect interrogation',
    badges: ['AI', 'Student portal'],
    description:
      'Students practise criminology investigation: choose a case type, read a unique Philippine case briefing in English or Tagalog, then interrogate suspects by chat or voice.',
    role: 'Co-developed with a teammate. Proposed the feature and implemented the voice interaction and the case story generation. AI usage tracking was developed by my teammate.',
    stack: [
      ['AI', 'Google Gemini · speech-to-text · text-to-speech'],
      ['Backend', 'PHP 8.5 · Laravel 12 · MySQL 8'],
      ['AI usage', 'Tracking and limits (developed by a teammate)'],
    ],
    links: [{ label: 'Live site ↗', href: LINKS.acesLive }],
  },
  {
    image: B + 'images/fitwise.jpg',
    alt: 'FitWise',
    title: 'FitWise · Virtual fitting room',
    badges: ['Sole developer', 'SDG 12'],
    description:
      'Estimates body measurements from a camera, renders a 3D mannequin and checks garment fit zone by zone against real brand size charts.',
    role: 'Sole developer: design, frontend, backend and database.',
    stack: [
      ['Frontend', 'React 18 · TypeScript · Vite · Three.js · Tailwind CSS'],
      ['Backend', 'Python 3.11 · FastAPI · SQLAlchemy · SQLite'],
      ['Vision', 'MediaPipe pose (33 landmarks)'],
      ['Delivery', 'Docker Compose'],
    ],
    links: [{ label: 'GitHub ↗', href: 'https://github.com/superwowers/FITWISE' }],
  },
];

/* ---------- Tech stack ring ---------- */
export const techStack = [
  { name: 'Backend', note: 'Server-side languages and frameworks', items: [['PHP', 'Language'], ['Laravel', 'Framework'], ['Python', 'Language'], ['FastAPI', 'Framework'], ['Pydantic', 'Validation library']] },
  { name: 'Frontend', note: 'Interfaces and 3D', items: [['React', 'Library'], ['TypeScript', 'Language'], ['JavaScript', 'Language'], ['Vite', 'Build tool'], ['Tailwind CSS', 'Styling'], ['Three.js', '3D graphics']] },
  { name: 'Database', note: 'Data storage', items: [['MySQL', 'Relational database'], ['SQLite', 'Embedded database'], ['SQLAlchemy', 'ORM']] },
  { name: 'AI integration', note: 'Generative AI, voice and vision', items: [['Google Gemini API', 'Generative AI'], ['Speech-to-text and text-to-speech', 'Voice'], ['MediaPipe', 'Pose estimation']] },
  { name: 'QA & testing', note: 'Testing and code quality', items: [['PHPUnit', 'PHP testing'], ['Vitest', 'JavaScript testing'], ['ESLint', 'Linting'], ['Laravel Pint', 'Code style'], ['Manual testing', 'Hands-on QA of every release']] },
  { name: 'AI tools', note: 'How I work with AI', items: [['Claude', 'AI assistant'], ['Antigravity', 'AI coding agent']] },
];

/* ---------- About gallery ---------- */
export const gallery = [
  { src: B + 'images/beach.jpg', title: "Hi, I'm Lauren", caption: 'Full-stack developer from the Philippines.', h: 280, ry: 26, pos: '42% center' },
  { src: B + 'images/hirono.jpg', title: 'Hirono', caption: 'Hirono is my stress reliever.', h: 190, ry: 20, pos: 'center', w: 2.3 },
  { src: B + 'images/cooking.jpg', title: 'Cooking', caption: 'I love cooking, especially seafood dishes.', h: 160, ry: 10, pos: 'center 45%' },
  { src: B + 'images/dog-selfie.jpg', title: 'Dogs', caption: 'Dogs are my favorite company.', h: 160, ry: -10, pos: 'center 35%' },
  { src: B + 'images/husky.jpg', title: 'Photography', caption: 'I enjoy photographing nature and animals.', h: 220, ry: -20, pos: 'center' },
  { src: B + 'images/cows.jpg', title: 'Quiet views', caption: 'Slow afternoons in the countryside.', h: 280, ry: -26, pos: 'center 60%' },
];
