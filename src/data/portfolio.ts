export type ProjectLink = {
  label: string;
  href: string;
};

export type PortfolioProject = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  imageAlt: string;
  imageStatus: string;
  links: ProjectLink[];
};

export type SkillIllustration = "embedded-hardware" | "languages" | "web-tooling";

export type TechnicalSkillGroup = {
  id: SkillIllustration;
  title: string;
  skills: string[];
};

export const contact = {
  email: "phongna.dev@gmail.com",
  github: "https://github.com/phongna07/",
  linkedin: "https://www.linkedin.com/in/phongna07/",
};

export const technicalSkillGroups: TechnicalSkillGroup[] = [
  {
    id: "embedded-hardware",
    title: "Embedded & hardware",
    skills: ["ESP32", "FreeRTOS", "FPGA", "RTL", "Digital Logic", "Embedded Linux"],
  },
  {
    id: "languages",
    title: "Languages",
    skills: ["C", "C++", "Python", "JavaScript", "TypeScript"],
  },
  {
    id: "web-tooling",
    title: "Web & tooling",
    skills: ["React", "Next.js", "Firebase", "Git", "Docker"],
  },
];

export const projects: PortfolioProject[] = [
  {
    id: "forest-monitor",
    title: "Forest Monitor",
    description:
      "An environmental monitoring system that connects ESP32 sensors and FreeRTOS firmware to a real-time web dashboard.",
    technologies: ["ESP32", "FreeRTOS", "Firebase", "Next.js"],
    image: "/projects/forest-monitor.png",
    imageAlt:
      "Forest Monitor dashboard showing environmental sensor readings and system status",
    imageStatus: "LIVE // SENSOR LINK",
    links: [
      { label: "Live system", href: "https://forest-monitor.vercel.app/" },
      {
        label: "Source code",
        href: "https://github.com/phongna07/forest-monitor",
      },
    ],
  },
  {
    id: "snake-xenzia-stm32",
    title: "Snake Xenzia STM32",
    description:
      "A hardware recreation of the classic Snake Xenzia game for the STM32F411, with two-button steering, OLED graphics, buzzer feedback, and a persistent high score.",
    technologies: [
      "STM32F411",
      "Interrupt-driven input",
      "I²C",
      "PWM",
    ],
    image: "/projects/snake-xenzia.jpg",
    imageAlt:
      "Snake Xenzia running on an STM32F411 breadboard prototype with an OLED display and buttons",
    imageStatus: "RUNNING // STM32",
    links: [
      {
        label: "Source code",
        href: "https://github.com/phongna07/snake-xenzia-stm32",
      },
    ],
  },
  {
    id: "vnmint",
    title: "VnMint",
    description:
      "A customized Linux Mint 22.3 Cinnamon installation image that helps Vietnamese newcomers get started with preconfigured input, essential apps, and practical desktop defaults.",
    technologies: ["Linux Mint", "Bash Script", "ISO remastering", "Makefile"],
    image: "/projects/vnmint-preview.png",
    imageAlt:
      "VnMint desktop showing its dark Cinnamon interface, essential app shortcuts, and file manager",
    imageStatus: "READY // LIVE ISO",
    links: [
      {
        label: "Download",
        href: "https://sourceforge.net/projects/vnmint/",
      },
      {
        label: "Source code",
        href: "https://github.com/phongna07/vnmint",
      },
    ],
  },
  {
    id: "vinuni-course-planner",
    title: "VinUni Course Planner",
    description:
      "An independent course-planning app for VinUniversity students with searchable sections, automatic timetable conflict detection, credit totals, and calendar export.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js"],
    image: "/projects/vinuni-course-planner-preview.png",
    imageAlt:
      "VinUni Course Planner showing a weekly timetable and selected course details",
    imageStatus: "READY // LIVE WEBSITE",
    links: [
      {
        label: "Live site",
        href: "https://vinuni-course-planner.vercel.app",
      },
      {
        label: "Source code",
        href: "https://github.com/phongna07/vinuni-course-planner",
      },
    ],
  },
];
