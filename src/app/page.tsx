'use client';

import { SkillItemProps } from "@/components/common/Skill/SkillItem"
import SkillPage from "@/components/common/Skill/SkillPage";
import WelcomePage from "@/components/common/Summary/WelcomePage";
import { useEffect, useRef } from "react";

const information: {
  name: string;
  profile: string;
  skills: SkillItemProps[];
} = {
  name: "Liudy",
  profile: `Hello! I'm Liudy, a first-year postgraduate student with a 
  strong passion for front-end development, web design, and user interaction.`,
  skills: [
    {
      name: "Java",
      level: 95,
    },
    {
      name: "CSS",
      level: 90,
    },
    {
      name: "React",
      level: 85,
    },
    {
      name: "Git",
      level: 80,
    },
    {
      name: "TypeScript",
      level: 80,
    },
    {
      name: "Next.js",
      level: 90,
    },
    {
      name: "Vue",
      level: 30,
    },
    {
      name: "Minecraft(doge)",
      level: 100,
    }
  ]
}

export default function Home() {
  const welcomePageRef = useRef<HTMLDivElement>(null);
  const progressContainerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressTooltipRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const replayRef = useRef<SVGSVGElement>(null);
  let isScrolling = false;

  useEffect(() => {
    if (!welcomePageRef.current || !progressContainerRef.current || !progressBarRef.current || !progressTooltipRef.current || !contentRef.current || !replayRef.current) return;

    // 获取所有section元素
    const welcomePage = welcomePageRef.current;
    const progressContainer = progressContainerRef.current;
    const progressBar = progressBarRef.current;
    const progressTooltip = progressTooltipRef.current;
    const content = contentRef.current;
    const replay = replayRef.current;
    const sections = document.querySelectorAll('.section');

    // 计算每个section的进度比例
    const sectionProgress = 100 / sections.length;
    const sectionLength: number[] = [];
    const sectionName: string[] = [];
    const sectionIndex = new Map<string, { section: number, subsection: number, order: number }>();
    const subsectionSize: number[] = [];
    let currentSection = 0;
    let currentSubsection = 0;
    let currentOrder = 0;

    // 添加单个分隔线
    const addSeparator = (position: number) => {
      const separator = document.createElement('div');
      separator.className = 'separator';
      separator.style.left = `${position}%`;
      progressContainer.appendChild(separator);
    };

    const addSeparators = () => {
      let count = 0;
      // 为每个section添加分隔线
      for (let i = 0; i < sections.length; i++) {
        let subsections = sections[i].querySelectorAll('.subsection');
        if (subsections.length > 0) {
          const subsectionProgress = sectionProgress / subsections.length;
          for (let j = 0; j < subsections.length; j++) {
            addSeparator(sectionProgress * i + j * subsectionProgress);
            sectionLength.push(sectionProgress * i + j * subsectionProgress);
            sectionName.push(subsections[j].getAttribute('data-title') || '');
            sectionIndex.set(sectionName[sectionName.length - 1], { section: i, subsection: j, order: count++ });
          }
        } else {
          addSeparator(i * sectionProgress);
          sectionLength.push(i * sectionProgress);
          sectionName.push(sections[i].getAttribute('data-title') || '');
          sectionIndex.set(sectionName[sectionName.length - 1], { section: i, subsection: 0, order: count++ });
        }
        subsectionSize.push(subsections.length);
      }

      sectionLength.push(100);
    };

    // 获取对应的页面名称
    let i;
    const getPageNameByProgress = (percentage: number) => {
      for (i = 1; i < sectionLength.length; i++) {
        if (percentage < sectionLength[i]) {
          break;
        }
      }

      return sectionName[i - 1];
    };

    // 更新进度条
    const updateProgress = () => {
      let percentage = sectionLength[currentOrder + 1];
      progressBar.style.width = `${percentage}%`;
    };

    // 初始化section位置
    sections.forEach((section, index) => {
      (section as HTMLElement).style.transform = `translateY(${index * 100}vh)`;
      let subsections = section.querySelectorAll('.subsection');
      subsections.forEach((subsection, index) => {
        (subsection as HTMLElement).style.transform = `translateX(${index * 100}vw)`;
      });
    });

    // 初始化进度条和分隔线
    addSeparators();
    // console.log(sectionName);
    // console.log(sectionIndex);
    // console.log(sectionLength);
    // console.log(subsectionSize);

    progressTooltip.textContent = sectionName[0] ? sectionName[0] : 'Empty';
    updateProgress();

    // 处理进度条鼠标移动
    const handleProgressContainerMouseMove = (e: MouseEvent) => {
      const rect = progressContainer.getBoundingClientRect();
      const percentage = (e.clientX - rect.left) / rect.width * 100;
      progressTooltip.textContent = getPageNameByProgress(percentage);

      // 更新tooltip位置
      const tooltipRect = progressTooltip.getBoundingClientRect();
      const maxLeft = rect.width - tooltipRect.width;
      const left = Math.min(Math.max(0, e.clientX - rect.left - tooltipRect.width / 2), maxLeft);
      progressTooltip.style.left = `${left}px`;
    };

    // 处理进度条点击
    const handleProgressContainerClick = () => {
      // 更新位置
      let { section, subsection, order } = sectionIndex.get(progressTooltip.textContent!)!;
      currentSection = section;
      currentSubsection = subsection;
      currentOrder = order;

      // 更新section位置
      sections.forEach((section_, index) => {
        (section_ as HTMLElement).style.transform = `translateY(${(index - currentSection) * 100}vh)`;
        let subsections = section_.querySelectorAll('.subsection');
        if (index < currentSection) {
          subsections.forEach((subsection_, idx) => {
            (subsection_ as HTMLElement).style.transform = `translateX(${(idx - subsectionSize[index] + 1) * 100}vw)`;
          });
        } else if (index > currentSection) {
          subsections.forEach((subsection_, idx) => {
            (subsection_ as HTMLElement).style.transform = `translateX(${idx * 100}vw)`;
          });
        } else {
          subsections.forEach((subsection_, idx) => {
            (subsection_ as HTMLElement).style.transform = `translateX(${(idx - currentSubsection) * 100}vw)`;
          });
        }
      });

      // 更新进度条
      updateProgress();
    };

    // 处理鼠标滚轮事件
    const handleContentWheel = (e: WheelEvent) => {
      e.preventDefault(); // 阻止默认滚动行为

      if (isScrolling) return;

      isScrolling = true;
      setTimeout(() => {
        isScrolling = false;
      }, 300);

      // 处理横向滚动
      if (subsectionSize[currentSection] > 0) {
        let subsections = sections[currentSection].querySelectorAll('.subsection');
        // console.log(sections.length, subsections.length);
        if (e.deltaY > 0) {
          // 向下滚动，向右移动
          if (currentSubsection < subsections.length - 1) {
            currentSubsection++;
            // 更新subsection的位置
            subsections.forEach((subsection, index) => {
              (subsection as HTMLElement).style.transform = `translateX(${(index - currentSubsection) * 100}vw)`;
            });
            currentOrder++;
          } else if (currentSection < sections.length - 1) {
            // 在最后一个subsection时，允许向下滚动到下一个section
            currentSection++;
            sections.forEach((section, index) => {
              (section as HTMLElement).style.transform = `translateY(${(index - currentSection) * 100}vh)`;
            });
            currentOrder++;
          }
        } else {
          // 向上滚动，向左移动
          if (currentSubsection > 0) {
            currentSubsection--;
            // 更新subsection的位置
            subsections.forEach((subsection, index) => {
              (subsection as HTMLElement).style.transform = `translateX(${(index - currentSubsection) * 100}vw)`;
            });
            currentOrder--;
          } else if (currentSection > 0) {
            // 在第一个subsection时，允许向上滚动到上一个section
            currentSection--;

            sections.forEach((section, index) => {
              (section as HTMLElement).style.transform = `translateY(${(index - currentSection) * 100}vh)`;
            });
            currentOrder--;
          }
        }
      } else {
        // 处理垂直滚动
        if (e.deltaY > 0 && currentSection < sections.length - 1) {
          currentSection++;
          currentOrder++;

          if (subsectionSize[currentSection] > 0) {
            currentSubsection = 0;
          }
          // 更新section的位置
          sections.forEach((section, index) => {
            (section as HTMLElement).style.transform = `translateY(${(index - currentSection) * 100}vh)`;
          });
        } else if (e.deltaY < 0 && currentSection > 0) {
          currentSection--;
          currentOrder--;

          if (subsectionSize[currentSection] > 0) {
            currentSubsection = subsectionSize[currentSection] - 1;
          }
          // 更新section的位置
          sections.forEach((section, index) => {
            (section as HTMLElement).style.transform = `translateY(${(index - currentSection) * 100}vh)`;
          });
        }
      }

      // 更新进度条
      updateProgress();
      // console.log(currentSection, currentSubsection);
    };

    const handleWelcomePageWheel = (e: WheelEvent) => {
      e.preventDefault(); // 阻止默认滚动行为

      if (isScrolling) return;

      isScrolling = true;
      setTimeout(() => {
        isScrolling = false;
      }, 300);

      if (e.deltaY > 0) {
        welcomePage.classList.add('disappear');
        progressContainer.classList.add('active');
      }
    };

    const handleSections0Wheel = (e: WheelEvent) => {
      if (e.deltaY < 0) {
        welcomePage.classList.remove('disappear');
        progressContainer.classList.remove('active');
      }
    };

    const handleReplayClick = () => {
      currentSection = 0;
      currentSubsection = 0;
      currentOrder = 0;
      updateProgress();
      sections.forEach((section, index) => {
        (section as HTMLElement).style.transform = `translateY(${index * 100}vh)`;
        let subsections = section.querySelectorAll('.subsection');
        subsections.forEach((subsection, index) => {
          (subsection as HTMLElement).style.transform = `translateX(${(index - currentSubsection) * 100}vw)`;
        });
      });

      welcomePage.classList.remove('disappear');
      progressContainer.classList.remove('active');
    };

    let firstSection = sections[0].querySelectorAll('.subsection')[0] || sections[0];

    progressContainer.addEventListener('mousemove', handleProgressContainerMouseMove);
    progressContainer.addEventListener('click', handleProgressContainerClick);
    content.addEventListener('wheel', handleContentWheel);
    welcomePage.addEventListener('wheel', handleWelcomePageWheel);
    (firstSection as HTMLElement).addEventListener('wheel', handleSections0Wheel);
    replay.addEventListener('click', handleReplayClick);

    return () => {
      progressContainer.removeEventListener('mousemove', handleProgressContainerMouseMove);
      progressContainer.removeEventListener('click', handleProgressContainerClick);
      content.removeEventListener('wheel', handleContentWheel);
      welcomePage.removeEventListener('wheel', handleWelcomePageWheel);
      (firstSection as HTMLElement).removeEventListener('wheel', handleSections0Wheel);
      replay.removeEventListener('click', handleReplayClick);
    };
  }, []);

  return (
    <>
      <div className="welcome-page" ref={welcomePageRef}>
        <WelcomePage name={information.name} profile={information.profile} />
      </div>
      <div className="content" ref={contentRef}>
        <div className="section" data-title="Me">
          <div className="subsection" data-title="About Me">
            <h1>About Me</h1>
          </div>
          <div className="subsection" data-title="First of me">
            <h1>First of me</h1>
          </div>
          <div className="subsection" data-title="Second of me">
            <h1>Second of me</h1>
          </div>
          <div className="subsection" data-title="Third of me">
            <h1>Third of me</h1> 
          </div>
        </div>

        <div className="section" data-title="Skills">
          <SkillPage skills={information.skills} />
        </div>

        <div className="section" data-title="Project">
          <div className="max-w-3xl mb-10 text-6xl">
            <svg className="inline-block" width={60} viewBox="0 0 1046 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5551">
              <path d="M576.413957 968.290043c74.468766 60.644766 181.52034 62.965106 265.041703 5.588425 51.722894-35.317106 154.449702-165.441362 37.430468-318.311489 131.845447-33.116596 193.949957-164.972936 156.780936-279.748085-18.290383-55.590128-105.123404-197.152681-291.426043-134.318298C754.077957 109.306553 647.080851 6.307404 526.673702 6.307404c-120.614128 0-229.920681 105.722553-217.948596 235.454639-126.997787-49.467915-253.396426 19.880851-290.707063 134.459914-37.234383 114.491915 24.946383 243.232681 156.650212 279.748086-85.297021 103.456681-59.773277 247.350468 37.975149 318.169872 79.054979 57.387574 186.302638 55.459404 264.562383-7.908766l49.870979-54.729532 49.337191 56.788426z" fill="#231916" p-id="5552">
              </path>
              <path d="M803.872681 922.711149c-68.956596 50.404766-166.018723 34.772426-216.292766-34.445617-16.819745-22.811234-40.829277-69.35966-23.268766-134.525277a217.262298 217.262298 0 0 0 153.055319-111.180255c66.756085 1.329021 104.654979 39.238809 120.886468 63.237447 70.677787 105.19966-0.664511 192.512-34.380255 216.913702M779.754213 296.066723c130.516426-30.654638 182.577021 59.980255 195.148255 99.480511 26.656681 81.190128-14.368681 165.572085-99.077447 195.355234-32.114383 10.904511-95.809362 11.035234-135.233361-19.750128 11.035234-72.605957-21.220766-141.028766-58.520511-179.733787 19.281702-58.171915 70.089532-88.837447 97.683064-95.35183M526.706383 69.958809c85.514894 0 154.057532 69.348766 154.918128 154.929021 0.806128 78.72817-52.659745 116.365617-60.307064 122.084766-52.85583-25.861447-118.478979-34.641702-189.494468 0-7.516596-5.719149-60.307064-43.356596-60.307064-122.084766 0.130723-85.580255 69.544851-154.929021 155.190468-154.929021M177.78383 591.011404C96.615489 564.681532 52.006128 476.977021 78.466723 395.786894c26.395234-81.266383 114.034383-125.821277 195.082894-99.611234 27.931234 9.368511 76.52766 37.038298 97.879149 95.210212-37.833532 38.705021-71.614638 119.764426-58.509617 180.398298-56.59234 36.918468-107.716085 27.942128-135.113532 19.227234M466.421106 888.418043c-50.328511 69.348766-147.543149 84.643404-216.565106 34.314893-69.152681-49.870979-84.371064-147.554043-34.238638-216.379915 16.950468-23.268766 54.184851-59.642553 120.548766-63.36817a216.238298 216.238298 0 0 0 153.055319 110.788085c16.754383 70.743149-5.773617 111.37634-22.800341 134.645107" fill="#FEFEFE" p-id="5553">
              </path>
              <path d="M374.15217 541.009702c0-83.913532 68.21583-152.477957 152.521532-152.477957 84.251234 0 152.728511 68.564426 152.728511 152.477957 0 84.185872-68.477277 152.728511-152.728511 152.728511-84.305702 0-152.521532-68.542638-152.521532-152.728511" fill="#FFF000" p-id="5554">
              </path>
            </svg>
            Project
          </div>
          <div className="max-w-3xl text-xl/loose text-primary/70 text-wrap-balance ">
            <hr />
            <div className="mb-10 text-center">
              In the past four years of my student life, I have learned a lot about
              network programming. In the previous years, I mainly developed Java back-end projects.
              It was only in the last few months that I found I preferred front-end development.
              Here are several projects I completed recently.
            </div>
          </div>
        </div>

        <div className="section" data-title="Section 3">
          <h1>Section 3</h1>
        </div>
        <div className="section" data-title="Section 4">
          <h1>Section 4</h1>
        </div>
        <div className="section" data-title="Section 5">
          <div className="subsection" data-title="Section 5.1">
            <h1>Section 5.1</h1>
          </div>
          <div className="subsection" data-title="Section 5.2">
            <h1>Section 5.2</h1>
          </div>
          <div className="subsection" data-title="Section 5.3">
            <h1>Section 5.3</h1>
          </div>
        </div>
        <div className="section" data-title="Thanks">
          <h1>Thanks</h1>
          <svg id="replay" ref={replayRef} className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1472"
            width="100" height="100">
            <path
              fill="currentColor"
              d="M853.333333 554.666667a341.333333 341.333333 0 0 1-682.666666 22.613333 21.76 21.76 0 0 1 5.546666-15.786667 22.186667 22.186667 0 0 1 16.64-6.826666h42.666667a21.333333 21.333333 0 0 1 21.333333 19.626666A256 256 0 1 0 512 298.666667v100.693333a20.906667 20.906667 0 0 1-6.4 15.36l-8.533333 8.533333a21.333333 21.333333 0 0 1-30.293334 0L315.733333 272.64a21.76 21.76 0 0 1 0-30.293333l151.04-150.613334a21.333333 21.333333 0 0 1 30.293334 0l8.533333 8.533334a20.906667 20.906667 0 0 1 6.4 15.36V213.333333a341.333333 341.333333 0 0 1 341.333333 341.333334z"
              p-id="1473"></path>
          </svg>
        </div>
      </div>
      <div className="progress-container" ref={progressContainerRef}>
        <div className="progress-bar" ref={progressBarRef}>
          <div className="progress-tooltip" ref={progressTooltipRef}></div>
        </div>
      </div>
    </>
  );
}
