import React, { useState, useEffect, useMemo } from "react";
import memeber1 from '@assets/team/member-1.png'
import memeber2 from '@assets/team/member-2.png'
import memeber3 from '@assets/team/member-3.png'
import memeber4 from '@assets/team/member-4.png'
import {EXPERT} from '../data/source';
export interface Job {
  title: string;
  benefit: number;
  department: string;
  tags: string[];
  responsibilities: string[];
}

export interface PillProps {
  active: boolean;
  icon: string;
  label: string;
  onClick: () => void;
}

export default function Jobs({ jobs }: { jobs: Job[] }) {
  const [jobData, setJobData] = useState<Job[]>([]);
  const [active, setActive] = useState("All Categories");
  const [category, setCategory] = useState<string>("All Categories");

  // useEffect(() => {
  //   setJobData(jobs);
  //   //console.log(jobs);
  // }, [jobs]);

  // const getCategoryJobs = (category: string) => {
  //     setCategory(category);
  //     if (category === "All Categories") {
  //         setJobData(jobs);
  //     } else {
  //         const filteredJobs = jobs.filter(job => job.department === category);
  //         setJobData(filteredJobs);
  //     }
  // };

  // const categories = [
  //   "All Categories",
  //   "Contact Center",
  //   "Cyber Security",
  //   "Designers",
  //   "Finance & Accounting",
  //   "HR Operations",
  //   "IT Operations",
  //   "Legal Admin",
  //   "Marketing",
  //   "Software Development",
  //   "Virtual Assistants",
  // ];

  const visibleJobs = useMemo(() => {
    if (active === "All Categories") return setJobData(jobs);
    const filteredJobs = jobs.filter((j) => j.department.includes(active));
    setJobData(filteredJobs);
  }, [active]);

  const CATEGORIES = [
    {
      id: "All Categories",
      label: "All",
      icon: ``,
    },
    {
      id: "Contact Center",
      label: "Contact Center",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M18.3334 5.20829V9.45827C18.3334 10.5166 17.9834 11.4083 17.3584 12.025C16.7418 12.65 15.8501 12.9999 14.7917 12.9999V14.5083C14.7917 15.0749 14.1584 15.4166 13.6917 15.1L12.8834 14.5666C12.9584 14.3083 12.9917 14.0249 12.9917 13.7249V10.3333C12.9917 8.63331 11.8584 7.49996 10.1584 7.49996H4.50008C4.38341 7.49996 4.27508 7.50831 4.16675 7.51664V5.20829C4.16675 3.08329 5.58341 1.66663 7.70842 1.66663H14.7917C16.9167 1.66663 18.3334 3.08329 18.3334 5.20829Z" stroke="#5271FF" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M12.9917 10.3334V13.725C12.9917 14.025 12.9584 14.3083 12.8834 14.5667C12.5751 15.7917 11.5584 16.5583 10.1584 16.5583H7.89175L5.37508 18.2333C5.00008 18.4917 4.50008 18.2167 4.50008 17.7667V16.5583C3.65008 16.5583 2.94175 16.275 2.45008 15.7833C1.95008 15.2833 1.66675 14.575 1.66675 13.725V10.3334C1.66675 8.75002 2.65008 7.65835 4.16675 7.51668C4.27508 7.50835 4.38341 7.5 4.50008 7.5H10.1584C11.8584 7.5 12.9917 8.63335 12.9917 10.3334Z" stroke="#5271FF" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
    },
    {
      id: "Cyber Security",
      label: "Cyber Security",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M6.0501 1.66663H13.9418C14.4834 1.66663 14.9668 1.68332 15.4001 1.74165C17.7084 1.99998 18.3334 3.0833 18.3334 6.04997V11.3166C18.3334 14.2833 17.7084 15.3666 15.4001 15.625C14.9668 15.6833 14.4918 15.7 13.9418 15.7H6.0501C5.50844 15.7 5.0251 15.6833 4.59177 15.625C2.28344 15.3666 1.65845 14.2833 1.65845 11.3166V6.04997C1.65845 3.0833 2.28344 1.99998 4.59177 1.74165C5.0251 1.68332 5.50844 1.66663 6.0501 1.66663Z" stroke="#5271FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M11.3169 6.93335H14.3836" stroke="#5271FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M5.6167 11.7583H5.63336H14.3917" stroke="#5271FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M5.83325 18.3334H14.1666" stroke="#5271FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M5.99559 6.91667H6.00307" stroke="#5271FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M8.74534 6.91667H8.75283" stroke="#5271FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
    },
    {
      id: "Designers",
      label: "Designers",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M8.95844 18.75H11.0584C11.8584 18.75 12.3751 18.1833 12.2251 17.4916L11.8834 15.9833H8.13343L7.79177 17.4916C7.64177 18.1416 8.20844 18.75 8.95844 18.75Z" stroke="#5271FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M11.8831 15.975L13.3248 14.6917C14.1331 13.975 14.1665 13.475 13.5248 12.6666L10.9831 9.44167C10.4498 8.76667 9.57481 8.76667 9.04147 9.44167L6.49981 12.6666C5.85814 13.475 5.85813 14 6.6998 14.6917L8.14147 15.975" stroke="#5271FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M10.0078 9.26666V11.375" stroke="#5271FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M10.4342 4.16669H9.60091C9.14258 4.16669 8.76758 3.79169 8.76758 3.33335V2.50002C8.76758 2.04169 9.14258 1.66669 9.60091 1.66669H10.4342C10.8926 1.66669 11.2676 2.04169 11.2676 2.50002V3.33335C11.2676 3.79169 10.8926 4.16669 10.4342 4.16669Z" stroke="#5271FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M2.72591 11.8084H3.55924C4.01758 11.8084 4.39258 11.4334 4.39258 10.9751V10.1417C4.39258 9.6834 4.01758 9.30835 3.55924 9.30835H2.72591C2.26758 9.30835 1.89258 9.6834 1.89258 10.1417V10.9751C1.89258 11.4334 2.26758 11.8084 2.72591 11.8084Z" stroke="#5271FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M17.276 11.8084H16.4427C15.9844 11.8084 15.6094 11.4334 15.6094 10.9751V10.1417C15.6094 9.6834 15.9844 9.30835 16.4427 9.30835H17.276C17.7344 9.30835 18.1094 9.6834 18.1094 10.1417V10.9751C18.1094 11.4334 17.7344 11.8084 17.276 11.8084Z" stroke="#5271FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M8.76667 2.96667C5.59167 3.34167 3.125 6.03333 3.125 9.30833" stroke="#5271FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M16.8759 9.30833C16.8759 6.04166 14.4259 3.35834 11.2676 2.96667" stroke="#5271FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
    },
    {
      id: "Finance & Accounting",
      label: "Finance & Accounting",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M7.22656 11.9415C7.22656 13.0165 8.05156 13.8832 9.07656 13.8832H11.1682C12.0599 13.8832 12.7849 13.1248 12.7849 12.1915C12.7849 11.1748 12.3432 10.8165 11.6849 10.5832L8.32656 9.41652C7.66823 9.18318 7.22656 8.82485 7.22656 7.80818C7.22656 6.87485 7.95156 6.11652 8.84323 6.11652H10.9349C11.9599 6.11652 12.7849 6.98318 12.7849 8.05818" stroke="#5271FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M10 5V15" stroke="#5271FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M9.99935 18.3334C14.6017 18.3334 18.3327 14.6024 18.3327 10C18.3327 5.39765 14.6017 1.66669 9.99935 1.66669C5.39698 1.66669 1.66602 5.39765 1.66602 10C1.66602 14.6024 5.39698 18.3334 9.99935 18.3334Z" stroke="#5271FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
    },
    {
      id: "HR Operations",
      label: "HR Operations",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M15.1161 18.0167C14.3828 18.2333 13.5161 18.3334 12.4995 18.3334H7.49948C6.48281 18.3334 5.61615 18.2333 4.88281 18.0167C5.06615 15.85 7.29115 14.1417 9.99948 14.1417C12.7078 14.1417 14.9328 15.85 15.1161 18.0167Z" stroke="#5271FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M12.4993 1.66669H7.49935C3.33268 1.66669 1.66602 3.33335 1.66602 7.50002V12.5C1.66602 15.65 2.61602 17.375 4.88268 18.0167C5.06602 15.85 7.29102 14.1417 9.99935 14.1417C12.7077 14.1417 14.9327 15.85 15.116 18.0167C17.3827 17.375 18.3327 15.65 18.3327 12.5V7.50002C18.3327 3.33335 16.666 1.66669 12.4993 1.66669ZM9.99935 11.8083C8.34935 11.8083 7.01601 10.4667 7.01601 8.8167C7.01601 7.1667 8.34935 5.83335 9.99935 5.83335C11.6493 5.83335 12.9827 7.1667 12.9827 8.8167C12.9827 10.4667 11.6493 11.8083 9.99935 11.8083Z" stroke="#5271FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M12.9842 8.81666C12.9842 10.4667 11.6509 11.8083 10.0009 11.8083C8.35091 11.8083 7.01758 10.4667 7.01758 8.81666C7.01758 7.16666 8.35091 5.83331 10.0009 5.83331C11.6509 5.83331 12.9842 7.16666 12.9842 8.81666Z" stroke="#5271FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
    },
    {
      id: "Marketing",
      label: "Sales/Marketing",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M5.73242 15.125V13.4" stroke="#5271FF" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M10 15.125V11.675" stroke="#5271FF" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M14.2676 15.125V9.94165" stroke="#5271FF" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M14.2658 4.875L13.8824 5.325C11.7574 7.80833 8.90742 9.56667 5.73242 10.3583" stroke="#5271FF" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M11.8242 4.875H14.2659V7.30833" stroke="#5271FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M7.49935 18.3334H12.4993C16.666 18.3334 18.3327 16.6667 18.3327 12.5V7.50002C18.3327 3.33335 16.666 1.66669 12.4993 1.66669H7.49935C3.33268 1.66669 1.66602 3.33335 1.66602 7.50002V12.5C1.66602 16.6667 3.33268 18.3334 7.49935 18.3334Z" stroke="#5271FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
    },
    {
      id: "Legal Admin",
      label: "Legal Admin",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M16.6758 15.425L12.5508 11.3" stroke="#5271FF" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M12.5499 11.3L9.59988 14.25C8.94988 14.9 7.89154 14.9 7.24154 14.25L3.7082 10.7167C3.0582 10.0667 3.0582 9.00836 3.7082 8.35836L9.59988 2.46669C10.2499 1.81669 11.3082 1.81669 11.9582 2.46669L15.4915 6.00004C16.1415 6.65004 16.1415 7.70836 15.4915 8.35836L12.5499 11.3Z" stroke="#5271FF" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M1.66602 17.5H6.66602" stroke="#5271FF" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M5.4668 6.60004L11.3585 12.4917" stroke="#5271FF" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
    },
    {
      id: "Software Development",
      label: "Software Development",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M8.00004 16.6667H12C15.3334 16.6667 16.6667 15.3334 16.6667 12V8.00004C16.6667 4.66671 15.3334 3.33337 12 3.33337H8.00004C4.66671 3.33337 3.33337 4.66671 3.33337 8.00004V12C3.33337 15.3334 4.66671 16.6667 8.00004 16.6667Z" stroke="#5271FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M8.75004 14.1667H11.25C13.3334 14.1667 14.1667 13.3334 14.1667 11.25V8.75004C14.1667 6.66671 13.3334 5.83337 11.25 5.83337H8.75004C6.66671 5.83337 5.83337 6.66671 5.83337 8.75004V11.25C5.83337 13.3334 6.66671 14.1667 8.75004 14.1667Z" stroke="#5271FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M6.67505 3.33329V1.66663" stroke="#5271FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M10 3.33329V1.66663" stroke="#5271FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M13.3334 3.33329V1.66663" stroke="#5271FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M16.6666 6.66663H18.3333" stroke="#5271FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M16.6666 10H18.3333" stroke="#5271FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M16.6666 13.3334H18.3333" stroke="#5271FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M13.3334 16.6666V18.3333" stroke="#5271FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M10.0083 16.6666V18.3333" stroke="#5271FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M6.67505 16.6666V18.3333" stroke="#5271FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M1.66663 6.66663H3.33329" stroke="#5271FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M1.66663 10H3.33329" stroke="#5271FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M1.66663 13.3334H3.33329" stroke="#5271FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M10.0001 8.08337L9.21672 9.45004C9.04172 9.75004 9.18339 10 9.53339 10H10.4667C10.8167 10 10.9584 10.25 10.7834 10.55L10.0001 11.9167" stroke="#5271FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
    },
    {
      id: "Virtual Assistants",
      label: "Virtual Assistants",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M18.3083 15.275C18.3083 15.575 18.2416 15.8833 18.1 16.1833C17.9583 16.4833 17.775 16.7666 17.5333 17.0333C17.125 17.4833 16.675 17.8083 16.1666 18.0166C15.6666 18.225 15.125 18.3333 14.5416 18.3333C13.6916 18.3333 12.7833 18.1333 11.825 17.725C10.8666 17.3166 9.90829 16.7666 8.95829 16.075C7.99996 15.375 7.09163 14.6 6.22496 13.7416C5.36663 12.875 4.59163 11.9666 3.89996 11.0166C3.21663 10.0666 2.66663 9.11663 2.26663 8.17496C1.86663 7.22496 1.66663 6.31663 1.66663 5.44996C1.66663 4.88329 1.76663 4.34163 1.96663 3.84163C2.16663 3.33329 2.48329 2.86663 2.92496 2.44996C3.45829 1.92496 4.04163 1.66663 4.65829 1.66663C4.89163 1.66663 5.12496 1.71663 5.33329 1.81663C5.54996 1.91663 5.74163 2.06663 5.89163 2.28329L7.82496 5.00829C7.97496 5.21663 8.08329 5.40829 8.15829 5.59163C8.23329 5.76663 8.27496 5.94163 8.27496 6.09996C8.27496 6.29996 8.21663 6.49996 8.09996 6.69163C7.99163 6.88329 7.83329 7.08329 7.63329 7.28329L6.99996 7.94163C6.90829 8.03329 6.86663 8.14163 6.86663 8.27496C6.86663 8.34163 6.87496 8.39996 6.89163 8.46663C6.91663 8.53329 6.94163 8.58329 6.95829 8.63329C7.10829 8.90829 7.36663 9.26663 7.73329 9.69996C8.10829 10.1333 8.50829 10.575 8.94163 11.0166C9.39163 11.4583 9.82496 11.8666 10.2666 12.2416C10.7 12.6083 11.0583 12.8583 11.3416 13.0083C11.3833 13.025 11.4333 13.05 11.4916 13.075C11.5583 13.1 11.625 13.1083 11.7 13.1083C11.8416 13.1083 11.95 13.0583 12.0416 12.9666L12.675 12.3416C12.8833 12.1333 13.0833 11.975 13.275 11.875C13.4666 11.7583 13.6583 11.7 13.8666 11.7C14.025 11.7 14.1916 11.7333 14.375 11.8083C14.5583 11.8833 14.75 11.9916 14.9583 12.1333L17.7166 14.0916C17.9333 14.2416 18.0833 14.4166 18.175 14.625C18.2583 14.8333 18.3083 15.0416 18.3083 15.275Z" stroke="#5271FF" stroke-width="1.5" stroke-miterlimit="10"/>
  <path d="M15.4167 7.50004C15.4167 7.00004 15.025 6.23337 14.4417 5.60837C13.9083 5.03337 13.2 4.58337 12.5 4.58337" stroke="#5271FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M18.3333 7.49996C18.3333 4.27496 15.725 1.66663 12.5 1.66663" stroke="#5271FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
    },

  ];

  function Pill({ active, icon, label, onClick }: PillProps) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`rf-pill ${active ? "active" : ""}`}
        aria-pressed={active}
      >
        <span
          className="rf-pill-ico"
          aria-hidden="true"
          dangerouslySetInnerHTML={{ __html: icon }}
        ></span>
        {label}
      </button>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 gap-10 mt-[24px] lg:mt-[64px] mb-[65px] lg:mb-[135px]">
      {/* Pills */}
      <div className="rf-pills">
        {CATEGORIES.map((cat) => (
          <Pill
            key={cat.id}
            label={cat.label}
            icon={cat.icon}
            active={active === cat.id}
            onClick={() => setActive(cat.id)}
          />
        ))}
      </div>
      {/* <aside className="lg:col-span-3">
          <div className="jr-first-section">
            <h3 className="jr-heading">Categories</h3>
            <ul className="jr-categories mt-4 flex flex-col">
              {categories.map((c, i) => (
                <li key={i} onClick={() => getCategoryJobs(c)}>
                  <span
                    className={`jr-category cursor-pointer ${
                      category === c ? "active" : ""
                    }`}
                  >
                    {c}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="jr-custom mt-10 p-4 rounded-xl">
            <h3>Can't find the role you're looking for?</h3>
            <p className="jr-left-text">
              Submit a custom job description and we’ll help you find the
              perfect candidate.
            </p>
            <a href="#" className="jr-custom-btn mt-4 inline-block">
              Submit Custom Role
            </a>
          </div>
        </aside> */}

      <div className="lg:col-span-9">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {jobData.map((job, index) => (
            <article key={index} className="jr-card rounded-2xl p-5">
              <h4 className="jr-title">{job.title}</h4>
              <p className="jr-benefit">
                {" "}
                Save Up to {job.benefit}% on hiring costs
              </p>

              <div className="jr-tags mt-3 flex gap-4 text-sm">
                <span className="jr-tag flex gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M6.66667 18.3333H13.3333C16.6833 18.3333 17.2833 16.9917 17.4583 15.3583L18.0833 8.69167C18.3083 6.65833 17.725 5 14.1667 5H5.83333C2.275 5 1.69166 6.65833 1.91666 8.69167L2.54166 15.3583C2.71666 16.9917 3.31666 18.3333 6.66667 18.3333Z"
                      stroke="#152651"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6.66666 4.99996V4.33329C6.66666 2.85829 6.66666 1.66663 9.33332 1.66663H10.6667C13.3333 1.66663 13.3333 2.85829 13.3333 4.33329V4.99996"
                      stroke="#152651"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11.6667 10.8333V11.6667C11.6667 11.675 11.6667 11.675 11.6667 11.6833C11.6667 12.5917 11.6583 13.3333 10 13.3333C8.35001 13.3333 8.33334 12.6 8.33334 11.6917V10.8333C8.33334 10 8.33334 10 9.16668 10H10.8333C11.6667 10 11.6667 10 11.6667 10.8333Z"
                      stroke="#152651"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M18.0417 9.16663C16.1167 10.5666 13.9167 11.4 11.6667 11.6833"
                      stroke="#152651"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2.18332 9.39172C4.05832 10.6751 6.17499 11.4501 8.33332 11.6917"
                      stroke="#152651"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>{" "}
                  {job.tags[0]}
                </span>
                <span className="jr-tag flex gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M10 11.1917C11.436 11.1917 12.6 10.0276 12.6 8.5917C12.6 7.15576 11.436 5.9917 10 5.9917C8.56408 5.9917 7.40002 7.15576 7.40002 8.5917C7.40002 10.0276 8.56408 11.1917 10 11.1917Z"
                      stroke="#292D32"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M3.01669 7.07496C4.65836 -0.141705 15.35 -0.133372 16.9834 7.08329C17.9417 11.3166 15.3084 14.9 13 17.1166C11.325 18.7333 8.67502 18.7333 6.99169 17.1166C4.69169 14.9 2.05836 11.3083 3.01669 7.07496Z"
                      stroke="#292D32"
                      strokeWidth="1.5"
                    />
                  </svg>{" "}
                  {job.tags[1]}
                </span>
              </div>

              <hr className="jr-divider my-4" />

              <h5 className="font-semibold mb-2">Our industry expert</h5>
              <div className="expert-wrapper mt-2">
                {EXPERT.filter((e) => e.job_category === job.department).map((exp) => (
                  <div key={exp.id} className="expert-card">
                    <img src={exp.img.src} alt={exp.name} className="expert-img" />
                    <div className="expert-info">
                      <h6 className="font-semibold">{exp.name}</h6>
                      <p className="text-sm">Years of experience: 0{exp.experience}</p>
                    </div>
                  </div>
                ))}
              </div>
              {/* <ul className="jr-list space-y-2 text-sm">
                {job.responsibilities.map((r: any, i: number) => (
                  <li key={i} className="flex gap-2">
                    <span className="jr-check">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M5 9.99996L8.32941 13.3333L15 6.66663"
                          stroke="#209F6B"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#"
                className="jr-btn mt-5 inline-flex items-center gap-2 justify-center"
              >
                Hire now{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                >
                  <path
                    d="M4.16669 10.5H15.8334"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 4.66663L15.8333 10.5L10 16.3333"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a> */}
            </article>
          ))}
        </div>
        {category === "All Categories" && (
          <div className="mt-10 text-center">
            <a
              href="/hire"
              className="jr-viewall flex items-center justify-center gap-2"
            >
              View all roles{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M4.16669 10H15.8334"
                  stroke="#5271FF"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 4.16675L15.8333 10.0001L10 15.8334"
                  stroke="#5271FF"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
