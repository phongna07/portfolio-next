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
  /** Optional muted looping clip; `image` doubles as its poster frame. */
  video?: string;
  /** CSS object-position for the preview (defaults to "top center"). */
  imagePosition?: string;
  imageStatus: string;
  domain: string;
  links: ProjectLink[];
};

export type SkillIllustration = "embedded-hardware" | "languages" | "software-tooling";

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
    skills: ["STM32", "ESP32", "FreeRTOS", "FPGA", "RTL", "KiCad PCB", "Embedded Linux"],
  },
  {
    id: "languages",
    title: "Languages",
    skills: ["C", "C++", "Python", "Bash", "JavaScript", "TypeScript", "SQL"],
  },
  {
    id: "software-tooling",
    title: "Software & tooling",
    skills: [
      "ROS 2",
      "Gazebo",
      "Docker",
      "Git",
      "React",
      "Next.js",
      "PostgreSQL",
      "Firebase",
    ],
  },
];

/** Intrinsic preview dimensions, used to reserve layout space. */
export const projectImageSizes: Record<string, [number, number]> = {
  "uav-simulation-3d": [1168, 772],
  "snake-xenzia-stm32": [909, 682],
  vnmint: [1267, 798],
  "audio-amplifier-pcb-kicad": [2285, 1428],
  "forest-monitor": [2386, 1580],
  "vinuni-course-planner": [2425, 1562],
  "3dr-solo-simulation": [1600, 900],
  "masc-hypernova": [1220, 809],
  "audio-visualizer": [640, 360],
};

export const projects: PortfolioProject[] = [
  {
    id: "uav-simulation-3d",
    title: "UAV Simulation 3D",
    description:
      "A 3D physics adapter for a multi-UAV MPC target-tracking planner. Five 6-DoF quadrotors fly a city map in RotorPy, with continuous collision checking, side-by-side benchmarks of five controllers, paper metrics, and rendered replay videos.",
    technologies: ["Python", "RotorPy", "Model predictive control", "CasADi", "pytest"],
    image: "/projects/uav-simulation-3d-poster.jpg",
    imageAlt:
      "Five quadrotors weaving between city buildings while tracking a moving target, with their flight trails and camera footprints",
    video: "/projects/uav-simulation-3d-preview.mp4",
    imageStatus: "REPLAY // SCEN1 · 5×",
    domain: "Robotics · Simulation",
    links: [
      {
        label: "Source code",
        href: "https://github.com/phongna07/uav-simulation-3d",
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
    domain: "Firmware · Embedded",
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
    domain: "Linux · Systems",
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
    id: "audio-amplifier-pcb-kicad",
    title: "Audio Amplifier PCB",
    description:
      "A mono LM386 amplifier board designed in KiCad for a VinUniversity circuits lab. It sums a 3.5 mm stereo input to mono, sets the gain to about 50, filters the supply with an RC network, and drives a 4 Ω / 3 W speaker.",
    technologies: ["KiCad 10", "LM386", "Schematic capture", "PCB layout"],
    image: "/projects/audio-amplifier-pcb.jpg",
    imageAlt:
      "3D render of the assembled LM386 amplifier PCB with capacitors, a trimmer potentiometer, and a 3.5 mm audio jack",
    imagePosition: "center",
    imageStatus: "RENDER // KICAD 3D",
    domain: "Hardware · PCB design",
    links: [
      {
        label: "Source code",
        href: "https://github.com/phongna07/audio-amplifier-pcb-kicad",
      },
    ],
  },
];

/** Smaller projects shown in the compact "Additional projects" grid. */
export const additionalProjects: PortfolioProject[] = [
  {
    id: "3dr-solo-simulation",
    title: "3DR Solo Simulation",
    description:
      "Teams of UAVs track a moving target between city blocks with MPC, LiDAR mapping, and onboard cameras, using ROS 2 Jazzy and Gazebo Harmonic packaged in Docker.",
    technologies: ["ROS 2", "Gazebo", "Docker", "Python", "C++"],
    image: "/projects/3dr-solo-simulation.jpg",
    imageAlt:
      "Gazebo mission view of five UAVs over city blocks, with an occupancy map, drone state panel, and five onboard camera feeds",
    imagePosition: "center",
    imageStatus: "SIM // GAZEBO",
    domain: "Robotics · Simulation",
    links: [
      {
        label: "Source code",
        href: "https://github.com/phongna07/3dr-solo-simulation",
      },
    ],
  },
  {
    id: "masc-hypernova",
    title: "MASC 2026 · Hypernova",
    description:
      "The platform behind Marketing All-Star Challenge 2026: an animated bilingual landing page, team registration and submissions, organizer tools, and ticketing with QR check-in.",
    technologies: ["Next.js", "tRPC", "PostgreSQL", "Drizzle", "GSAP"],
    image: "/projects/masc-hypernova.png",
    imageAlt:
      "Marketing All-Star Challenge 2026 landing page with a starry purple hero and the glowing Hypernova emblem",
    imagePosition: "center",
    imageStatus: "LIVE // EVENT PLATFORM",
    domain: "Web · Full-stack",
    links: [
      { label: "Live site", href: "https://marketingallstarchallenge.com" },
      {
        label: "Source code",
        href: "https://github.com/phongna07/masc-landing",
      },
    ],
  },
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
    domain: "IoT · Embedded + Web",
    links: [
      { label: "Live system", href: "https://forest-monitor.vercel.app/" },
      {
        label: "Source code",
        href: "https://github.com/phongna07/forest-monitor",
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
    domain: "Web · Software",
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
  {
    id: "audio-visualizer",
    title: "ESP32 Audio Visualizer",
    description:
      "A real-time spectrum analyzer that captures audio from an INMP441 microphone over I²S, runs an FFT on the ESP32, and draws a responsive spectrum on a 128×64 OLED, with capture and rendering split across both cores.",
    technologies: ["ESP32", "FreeRTOS", "I²S", "FFT", "PlatformIO"],
    image: "/projects/audio-visualizer-poster.jpg",
    imageAlt:
      "ESP32 breadboard build with an INMP441 microphone and an OLED showing a live audio spectrum",
    video: "/projects/audio-visualizer-preview.mp4",
    imagePosition: "center",
    imageStatus: "RUNNING // 23 FPS",
    domain: "Firmware · DSP",
    links: [
      {
        label: "Source code",
        href: "https://github.com/phongna07/audio-visualizer",
      },
    ],
  },
];
