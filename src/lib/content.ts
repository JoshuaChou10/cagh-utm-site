export const siteLinks = {
  generalMember: "#",
  executiveApplication: "#",
  mentorshipApplication: "#",
  officialCagh: "https://cagh-acsm.org/",
};

export type TeamPhoto = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type TeamGroupPhoto = TeamPhoto & {
  coordinators: string[];
};

export const president = {
  name: "Jagaa Jaannani Sethuraman",
  role: "President",
  photo: {
    src: "/team/execs/president.JPG",
    alt: "CAGH UTM President",
    width: 1600,
    height: 1066,
  },
} satisfies { name: string; role: string; photo: TeamPhoto };

export const portfolios = [
  {
    id: "internal",
    department: "Internal Affairs Team",
    name: "Nadeem Salib",
    execRole: "Internal Affairs Executive",
    description: "Works behind the scenes to ensure the smooth operation of CAGH UTM by coordinating executive meetings, managing membership records, and facilitating communication within the club. The team also supports member recruitment and engagement.",
    exec: {
      src: "/team/execs/internal.JPG",
      alt: "Internal Affairs Executive",
      width: 864,
      height: 576,
    },
    team: [
      {
        src: "/team/internal.jpg",
        alt: "Internal Affairs team",
        width: 2048,
        height: 1366,
        coordinators: ["Joshua Cardinal", "Isaam Marjan Ahmad", "Theo Blackburn", "Abiral Karmacharya"],
      },
    ],
  },
  {
    id: "external",
    department: "External Affairs Team",
    name: "Shreya Vivek",
    execRole: "External Affairs Executive",
    description: "Markets CAGH UTM's initiatives and opportunities to the university and broader global health community. The team manages social media, builds partnerships with student organizations, and oversees website development to promote the club and engage students.",
    exec: {
      src: "/team/execs/external.JPG",
      alt: "External Affairs Executive",
      width: 864,
      height: 553,
    },
    team: [
      {
        src: "/team/external.jpg",
        alt: "External Affairs team",
        width: 2048,
        height: 1436,
        coordinators: ["Shreya Vivek", "Joshua Chou", "Dania González Sandhu", "Aayan Lalani", "Leon Chen"],
      },
    ],
  },
  {
    id: "projects",
    department: "Special Projects Team",
    name: "Leka Marappan",
    execRole: "Special Projects Executive",
    description: "Plans events that connect students with global health topics, professionals, and opportunities. The team coordinates guest speakers, workshops, and other initiatives while managing event logistics and ensuring successful execution.",
    exec: {
      src: "/team/execs/projects.JPG",
      alt: "Special Projects Executive",
      width: 864,
      height: 575,
    },
    team: [
      {
        src: "/team/projects2.jpg",
        alt: "Special Projects team",
        width: 2048,
        height: 1424,
        coordinators: ["Jingting Sze", "Nour Mahmoud", "Leka Marappan", "Juana Vargas", "Daphne Nghiem", "Justing Ang"],
      },
    ],
  },
  {
    id: "finance",
    department: "Finance Team",
    name: "Chloe Zacek",
    execRole: "Finance Executive",
    description: "Manages CAGH UTM's financial resources to support the club's activities and long-term goals. The team oversees budgeting, tracks expenses, and allocates funding to ensure events and initiatives operate efficiently.",
    exec: {
      src: "/team/execs/finance.JPG",
      alt: "Finance Executive",
      width: 864,
      height: 576,
    },
    team: [
      {
        src: "/team/finance.jpg",
        alt: "Finance team",
        width: 2048,
        height: 1366,
        coordinators: ["Rosine Got", "Chloe Zacek", "Christian Blackwood"],
      },
    ],
  },
] satisfies Array<{
  id: string;
  department: string;
  name: string;
  execRole: string;
  description: string;
  exec: TeamPhoto;
  team: TeamGroupPhoto[];
}>;
