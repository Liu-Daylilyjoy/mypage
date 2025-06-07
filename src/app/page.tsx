'use client';

import SkillsItem from "@/components/common/SkillItem/SkillItem"
import { useEffect, useRef } from "react";

const information = {
  name: "Liudy",
  profile: `Hello! I'm Liudy, a first-year postgraduate student with a 
  strong passion for front-end development, web design, and user interaction.`,
  skills: [
    {
      name: "HTML",
      level: 90,
    },
    {
      name: "CSS",
      level: 90,
    },
    {
      name: "JavaScript",
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
    progressContainer.addEventListener('mousemove', (e) => {
      const rect = progressContainer.getBoundingClientRect();
      const percentage = (e.clientX - rect.left) / rect.width * 100;
      progressTooltip.textContent = getPageNameByProgress(percentage);

      // 更新tooltip位置
      const tooltipRect = progressTooltip.getBoundingClientRect();
      const maxLeft = rect.width - tooltipRect.width;
      const left = Math.min(Math.max(0, e.clientX - rect.left - tooltipRect.width / 2), maxLeft);
      progressTooltip.style.left = `${left}px`;
    });

    // 处理进度条点击
    progressContainer.addEventListener('click', () => {
      // 更新位置
      let { section, subsection, order } = sectionIndex.get(progressTooltip.textContent!)!;
      currentSection = section;
      currentSubsection = subsection;
      currentOrder = order;

      // 更新section位置
      sections.forEach((section_, index) => {
        (section_ as HTMLElement).style.transform = `translateY(${(index - currentSection) * 100}vh)`;
        let subsections = section_.querySelectorAll('.subsection');
        subsections.forEach((subsection_, index) => {
          (subsection_ as HTMLElement).style.transform = `translateX(${(index - currentSubsection) * 100}vw)`;
        });
      });

      // 更新进度条
      updateProgress();
    });

    // 处理鼠标滚轮事件
    content.addEventListener('wheel', (e) => {
      e.preventDefault(); // 阻止默认滚动行为

      if (isScrolling) return;

      isScrolling = true;
      setTimeout(() => {
        isScrolling = false;
      }, 500);

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
    }, { passive: false });

    welcomePage.addEventListener('wheel', (e) => {
      if (e.deltaY > 0) {
        welcomePage.style.opacity = '0';
        welcomePage.style.height = '0';
        progressContainer.classList.add('active');
      }
    });

    sections[0].addEventListener('wheel', (e) => {
      if ((e as WheelEvent).deltaY < 0) {
        welcomePage.style.opacity = '1';
        welcomePage.style.height = '100vh';
        progressContainer.classList.remove('active');
      }
    });

    replay.addEventListener('click', () => {
      currentSection = 0;
      currentSubsection = 0;
      currentOrder = 0;
      updateProgress();
      sections.forEach((section, index) => {
        (section as HTMLElement).style.transform = `translateY(${index * 100}vh)`;
      });

      welcomePage.style.opacity = '1';
      welcomePage.style.height = '100vh';
      progressContainer.classList.remove('active');
    });
  });

  return (
    // <div className="h-[200vh] mx-10 pt-25 flex flex-col">
    //   <div className="flex flex-col self-center">
    //     <div className="max-w-3xl my-10 text-6xl">{information.name}</div>
    //     <div className="max-w-3xl text-xl/loose text-primary/70 text-wrap-balance ">
    //       <hr />
    //       <header className="mb-10">
    //         {information.profile}
    //       </header>

    //       <main>
    //         <h1 className="text-2xl font-bold mb-5">My Skills</h1>
    //         {information.skills.map((skill) => (
    //           <SkillsItem key={skill.name} {...skill} />
    //         ))}
    //       </main>
    //     </div>
    //   </div>
    // </div>
    <>
      <div className="welcome-page" ref={welcomePageRef}>
        <h1>Welcome</h1>
      </div>
      <div className="content" ref={contentRef}>
        <div className="section" data-title="Section 1">
          <h1>Section 1</h1>
        </div>
        <div className="section">
          <div className="subsection" data-title="Section 2.1">
            <h1>Section 2.1</h1>
          </div>
          <div className="subsection" data-title="Section 2.2">
            <h1>Section 2.2</h1>
          </div>
          <div className="subsection" data-title="Section 2.3">
            <h1>Section 2.3</h1>
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
