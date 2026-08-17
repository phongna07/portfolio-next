export type ProjectLink = {
  label: string;
  href: string;
};

export type ProjectIllustration =
  | "fpga-logic"
  | "embedded-linux"
  | "chip-architecture";

export type PortfolioProject = {
  id: string;
  title: string;
  status: "built" | "placeholder";
  description: string;
  technologies: string[];
  image?: string;
  imageAlt?: string;
  imageStatus?: string;
  illustration?: ProjectIllustration;
  links?: ProjectLink[];
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
    status: "built",
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
    status: "built",
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
    id: "embedded-linux",
    title: "Embedded Linux Systems",
    status: "placeholder",
    description:
      "Reserved for future work with Linux, device drivers, and hardware-software integration.",
    technologies: ["Linux", "Drivers", "C", "System integration"],
    illustration: "embedded-linux",
  },
  {
    id: "chip-architecture",
    title: "Chip Architecture",
    status: "placeholder",
    description:
      "Reserved for a future project focused on processor design, digital architecture, or semiconductor systems.",
    technologies: ["Architecture", "Processors", "Logic design", "Semiconductors"],
    illustration: "chip-architecture",
  },
];
