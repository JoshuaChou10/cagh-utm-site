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
    department: "Internal Affairs",
    name: "Nadeem Salib",
    execRole: "Internal Affairs Executive",
    description: "Handles behind the scenes activities such as documents, meeting minutes, member list. ",
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
    department: "External Affairs",
    name: "Shreya Vivek",
    execRole: "External Affairs Executive",
    description: "[Short description]",
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
    department: "Special Projects",
    name: "[Name]",
    execRole: "Special Projects Executive",
    description: "[Short description]",
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
        coordinators: ["[Name]", "[Name]", "[Name]", "[Name]", "[Name]", "[Name]"],
      },
    ],
  },
  {
    id: "finance",
    department: "Finance",
    name: "[Name]",
    execRole: "Finance Executive",
    description: "[Short description]",
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
        coordinators: ["[Name]", "[Name]", "[Name]"],
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
