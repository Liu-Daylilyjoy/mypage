"use client";

import WelcomePage from "@/components/common/Summary/WelcomePage";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import Image from "next/image";
import SlowLoading from "@/components/common/Loading/SlowLoading";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(ScrambleTextPlugin);

const information: {
  name: string;
  skills: {
    name: string;
    level: number;
  }[];
} = {
  name: "Liudy",
  skills: [
    {
      name: "Java",
      level: 100,
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
      level: 90,
    },
    {
      name: "TypeScript",
      level: 70,
    },
    {
      name: "Next.js",
      level: 90,
    },
    {
      name: "Vue",
      level: 90,
    },
    {
      name: "Minecraft",
      level: 30,
    },
  ],
};

const precept = [
  "菩提本无树，明镜亦非台，本来无一物，何处惹尘埃？",
  "山路行行无止境，今日行至此，只为赏花。花下酌酒歌，人生几何？明日黄昏，花落了。",
  "私は、雪の降る夜の、孤独な男だ。",
  "Life is for living, not for enduring.",
  "Do not go gentle into that good night.",
  "活着就是为了改变世界，难道还有别的理由吗？",
  "眠らぬ海棠の花を見るために、午前四時に目を覚ます。",
];

// 生成随机位置、大小和透明度
const positions = [
  { top: "6%", left: "10%" },
  { top: "20%", right: "15%" },
  { top: "45%", left: "5%" },
  { top: "70%", right: "10%" },
  {
    top: "30%",
    left: "50%",
    transform: "translateX(-50%)",
  },
  { top: "80%", left: "25%" },
  { top: "40%", left: "65%" },
  { top: "60%", right: "5%" },
];

const sizes = ["text-xs", "text-sm", "text-base", "text-lg", "text-xl"];
const opacities = [
  "opacity-30",
  "opacity-40",
  "opacity-50",
  "opacity-60",
  "opacity-70",
];

export default function Home() {
  const welcomePageRef = useRef<HTMLDivElement>(null);
  const progressContainerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressTooltipRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const replayRef = useRef<SVGSVGElement>(null);

  const [loading, setLoading] = useState(true);
  const [loadingAnimationComplete, setLoadingAnimationComplete] =
    useState(false);

  useEffect(() => {
    if (
      !welcomePageRef.current ||
      !progressContainerRef.current ||
      !progressBarRef.current ||
      !progressTooltipRef.current ||
      !contentRef.current ||
      !replayRef.current
    )
      return;

    setLoading(true);
    document.documentElement.style.overflow = "hidden";

    // 获取所有section元素
    const welcomePage = welcomePageRef.current;
    const progressContainer = progressContainerRef.current;
    const progressBar = progressBarRef.current;
    const progressTooltip = progressTooltipRef.current;
    const content = contentRef.current;
    const replay = replayRef.current;
    const sections = document.querySelectorAll(".section");

    let isScrolling = false;
    let currentOrder = 0;

    // 计算每个section的进度比例
    const sectionProgress = 100 / sections.length;
    const sectionLength: number[] = [];
    const sectionName: string[] = [];
    const sectionIndex = new Map<
      string,
      { section: number; subsection: number; order: number }
    >();
    const subsectionSize: number[] = [];
    let currentSection = 0;
    let currentSubsection = 0;

    // 添加单个分隔线
    const addSeparator = (position: number) => {
      const separator = document.createElement("div");
      separator.className = "separator";
      separator.style.left = `${position}%`;
      progressContainer.appendChild(separator);
    };

    const addSeparators = () => {
      let count = 0;
      // 为每个section添加分隔线
      for (let i = 0; i < sections.length; i++) {
        const subsections = sections[i].querySelectorAll(".subsection");
        if (subsections.length > 0) {
          const subsectionProgress = sectionProgress / subsections.length;
          for (let j = 0; j < subsections.length; j++) {
            addSeparator(sectionProgress * i + j * subsectionProgress);
            sectionLength.push(sectionProgress * i + j * subsectionProgress);
            sectionName.push(subsections[j].getAttribute("data-title") || "");
            sectionIndex.set(sectionName[sectionName.length - 1], {
              section: i,
              subsection: j,
              order: count++,
            });
          }
        } else {
          addSeparator(i * sectionProgress);
          sectionLength.push(i * sectionProgress);
          sectionName.push(sections[i].getAttribute("data-title") || "");
          sectionIndex.set(sectionName[sectionName.length - 1], {
            section: i,
            subsection: 0,
            order: count++,
          });
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
      progressBar.style.width = `${sectionLength[currentOrder + 1]}%`;
    };

    // 初始化section位置
    sections.forEach((section, index) => {
      (section as HTMLElement).style.transform = `translateY(${index * 100}vh)`;
      const subsections = section.querySelectorAll(".subsection");
      subsections.forEach((subsection, index) => {
        (subsection as HTMLElement).style.transform = `translateX(${
          index * 100
        }vw)`;
      });
    });

    // 初始化进度条和分隔线
    addSeparators();

    progressTooltip.textContent = sectionName[0] ? sectionName[0] : "Empty";
    updateProgress();

    // 处理进度条鼠标移动
    const handleProgressContainerMouseMove = (e: MouseEvent) => {
      const rect = progressContainer.getBoundingClientRect();
      const percentage = ((e.clientX - rect.left) / rect.width) * 100;
      progressTooltip.textContent = getPageNameByProgress(percentage);

      // 更新tooltip位置
      const tooltipRect = progressTooltip.getBoundingClientRect();
      const maxLeft = rect.width - tooltipRect.width;
      const left = Math.min(
        Math.max(0, e.clientX - rect.left - tooltipRect.width / 2),
        maxLeft
      );
      progressTooltip.style.left = `${left}px`;
    };

    const updatePosition = () => {
      // 更新section位置
      sections.forEach((section_, index) => {
        (section_ as HTMLElement).style.transform = `translateY(${
          (index - currentSection) * 100
        }vh)`;
        const subsections = section_.querySelectorAll(".subsection");
        if (index < currentSection) {
          subsections.forEach((subsection_, idx) => {
            (subsection_ as HTMLElement).style.transform = `translateX(${
              (idx - subsectionSize[index] + 1) * 100
            }vw)`;
          });
        } else if (index > currentSection) {
          subsections.forEach((subsection_, idx) => {
            (subsection_ as HTMLElement).style.transform = `translateX(${
              idx * 100
            }vw)`;
          });
        } else {
          subsections.forEach((subsection_, idx) => {
            (subsection_ as HTMLElement).style.transform = `translateX(${
              (idx - currentSubsection) * 100
            }vw)`;
          });
        }
      });
    };

    // 处理进度条点击
    const handleProgressContainerClick = () => {
      // 更新位置
      const { section, subsection, order } = sectionIndex.get(
        progressTooltip.textContent!
      )!;
      currentSection = section;
      currentSubsection = subsection;
      currentOrder = order;

      updatePosition();

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
        // console.log(sections.length, subsections.length);
        if (e.deltaY > 0) {
          // 向下滚动，向右移动
          if (currentSubsection < subsectionSize[currentSection] - 1) {
            currentSubsection++;
            currentOrder++;
          } else if (currentSection < sections.length - 1) {
            // 在最后一个subsection时，允许向下滚动到下一个section
            currentSection++;
            currentSubsection = 0;
            currentOrder++;
          }
        } else {
          // 向上滚动，向左移动
          if (currentSubsection > 0) {
            currentSubsection--;
            currentOrder--;
          } else if (currentSection > 0) {
            // 在第一个subsection时，允许向上滚动到上一个section
            currentSection--;
            currentSubsection = subsectionSize[currentSection] - 1;
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
            (section as HTMLElement).style.transform = `translateY(${
              (index - currentSection) * 100
            }vh)`;
          });
        } else if (e.deltaY < 0 && currentSection > 0) {
          currentSection--;
          currentOrder--;

          if (subsectionSize[currentSection] > 0) {
            currentSubsection = subsectionSize[currentSection] - 1;
          }
          // 更新section的位置
          sections.forEach((section, index) => {
            (section as HTMLElement).style.transform = `translateY(${
              (index - currentSection) * 100
            }vh)`;
          });
        }
      }

      // 更新进度条
      updateProgress();
      updatePosition();
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
        welcomePage.classList.add("disappear");
        progressContainer.classList.add("active");
      }
    };

    const handleSections0Wheel = (e: WheelEvent) => {
      if (e.deltaY < 0) {
        welcomePage.classList.remove("disappear");
        progressContainer.classList.remove("active");
      }
    };

    const handleReplayClick = () => {
      currentSection = 0;
      currentSubsection = 0;
      currentOrder = 0;
      updateProgress();
      sections.forEach((section, index) => {
        (section as HTMLElement).style.transform = `translateY(${
          index * 100
        }vh)`;
        const subsections = section.querySelectorAll(".subsection");
        subsections.forEach((subsection, index) => {
          (subsection as HTMLElement).style.transform = `translateX(${
            (index - currentSubsection) * 100
          }vw)`;
        });
      });

      welcomePage.classList.remove("disappear");
      progressContainer.classList.remove("active");
    };

    const firstSection =
      sections[0].querySelectorAll(".subsection")[0] || sections[0];

    const preventScroll = (e: WheelEvent) => {
      e.preventDefault();
    };

    progressContainer.addEventListener("wheel", preventScroll, {
      passive: false,
    });
    progressContainer.addEventListener(
      "mousemove",
      handleProgressContainerMouseMove
    );
    progressContainer.addEventListener("click", handleProgressContainerClick);
    content.addEventListener("wheel", handleContentWheel);
    welcomePage.addEventListener("wheel", handleWelcomePageWheel);
    (firstSection as HTMLElement).addEventListener(
      "wheel",
      handleSections0Wheel
    );
    replay.addEventListener("click", handleReplayClick);
    setLoading(false);

    return () => {
      progressContainer.removeEventListener("wheel", preventScroll);
      progressContainer.removeEventListener(
        "mousemove",
        handleProgressContainerMouseMove
      );
      progressContainer.removeEventListener(
        "click",
        handleProgressContainerClick
      );
      content.removeEventListener("wheel", handleContentWheel);
      welcomePage.removeEventListener("wheel", handleWelcomePageWheel);
      (firstSection as HTMLElement).removeEventListener(
        "wheel",
        handleSections0Wheel
      );
      replay.removeEventListener("click", handleReplayClick);
    };
  }, []);

  const sectionRef = useRef<HTMLDivElement[]>([]);
  const setRef = (element: HTMLDivElement) => {
    if (element && !sectionRef.current.includes(element)) {
      sectionRef.current.push(element);
    }
  };

  useGSAP(
    (context, contextSafe) => {
      if (loading) return;
      const clearEvent: (() => void)[] = [];
      for (let i = 0; i < sectionRef.current.length; i++) {
        let enterHandler: () => void = () => {};
        let clear = () => {};
        switch (i) {
          case 0:
            const split = SplitText.create("#about-me", {
              type: "words",
            });

            const tl0 = gsap.timeline({ paused: true });
            tl0
              .from("#title-me", {
                x: -100,
                opacity: 0,
                duration: 2,
                ease: "back",
                delay: 0.5,
              })
              .from(split.words, {
                y: -100,
                opacity: 0,
                rotation: "random(-80, 80)",
                duration: 0.7,
                ease: "back",
                stagger: 0.15,
                delay: -0.5,
              })
              .to("#me", {
                width: "30%",
                duration: 1,
              })
              .fromTo(
                "#hello-world",
                { x: 100 },
                {
                  x: 0,
                  duration: 1,
                  opacity: 1,
                  ease: "back",
                }
              )
              .to("#hello-world", {
                opacity: 0,
                duration: 1.5,
                yoyo: true,
                repeat: -1,
                delay: 0.5,
              });

            enterHandler = contextSafe!(() => {
              tl0.play();
            });

            clear = () => {
              split.revert();
              tl0.kill();
            };
            break;
          case 1:
            const tl11 = gsap.timeline({ paused: true });
            tl11
              .from("#i-like-1", {
                duration: 1,
                rotate: 80,
                y: -400,
                ease: "bounce",
              })
              .to("#hobby-1", {
                opacity: 1,
                scrambleText: {
                  text: "{original}",
                  chars: "lowerCase",
                },
                duration: 2,
              });

            const tl12 = gsap.timeline({
              paused: true,
              repeat: -1,
              delay: 3,
            });
            tl12
              .fromTo(
                "#pacman",
                {
                  opacity: 0,
                },
                {
                  opacity: 1,
                  duration: 0.3,
                }
              )
              .to("#pacman", {
                x: "10vw",
                duration: 1,
              })
              .fromTo(
                "#monster",
                {
                  opacity: 0,
                },
                {
                  opacity: 1,
                  duration: 0.3,
                }
              )
              .to("#pacman", {
                x: "95vw",
                duration: 2,
              })
              .to("#monster", {
                x: "70vw",
                duration: 1,
              })
              .to("#pacman", {
                opacity: 0,
                duration: 0.3,
              })
              .to("#monster", {
                x: "95vw",
                duration: 0.5,
              })
              .to("#monster", {
                opacity: 0,
                duration: 0.3,
              });

            const tl13 = gsap.timeline({
              paused: true,
              delay: 3,
            });
            tl13.fromTo(
              "#gameController",
              {
                width: "0%",
              },
              {
                width: "100%",
                duration: 1,
              }
            );

            const tl14 = gsap.timeline({
              paused: true,
              delay: 6,
              repeat: -1,
            });
            tl14
              .fromTo(
                "#flight",
                {
                  opacity: 0,
                },
                {
                  opacity: 1,
                  duration: 0.3,
                }
              )
              .to("#flight", {
                x: "95vw",
                duration: 3,
              })
              .to("#flight", {
                rotate: "-90deg",
                duration: 2,
              })
              .to("#flight", {
                y: "-100vh",
                duration: 1,
              })
              .to("#flight", {
                opacity: 0,
                duration: 0.3,
              });

            enterHandler = contextSafe!(() => {
              tl11.play();
              tl12.play();
              tl13.play();
              tl14.play();
            });

            clear = () => {
              tl11.kill();
              tl12.kill();
              tl13.kill();
              tl14.kill();
            };

            break;
          case 2:
            const tl21 = gsap.timeline({ paused: true });
            tl21
              .from("#i-like-2", {
                duration: 1,
                x: -100,
                ease: "easeInOut",
              })
              .fromTo(
                "#hobby-2",
                {
                  opacity: 0,
                  x: 100,
                },
                {
                  opacity: 1,
                  x: 0,
                  duration: 0.5,
                }
              )
              .fromTo(
                ".precept",
                {
                  opacity: 0,
                },
                {
                  opacity: 1,
                  duration: 0.5,
                  stagger: {
                    each: 0.3,
                  },
                }
              );

            const split2 = SplitText.create(".precept", {
              type: "lines",
            });
            gsap.fromTo(
              split2.lines,
              { y: 0, x: 0 },
              {
                y: "random(-5, 5)",
                x: "random(-5, 5)",
                duration: 3,
                ease: "sine.inOut",
                stagger: {
                  each: 0.05,
                  repeat: -1,
                  yoyo: true,
                },
              }
            );

            enterHandler = contextSafe!(() => {
              tl21.play();
            });

            clear = () => {
              split2.revert();
              tl21.kill();
            };

            break;
          case 3:
            const split3 = SplitText.create("#skills", {
              type: "chars",
            });

            const tl31 = gsap.timeline({ paused: true });
            tl31.fromTo(
              ".skill-item",
              { opacity: 0 },
              {
                opacity: 1,
                duration: 0.5,
                stagger: 0.3,
              }
            );

            gsap.fromTo(
              split3.chars,
              { y: 0 },
              {
                y: 2,
                duration: 0.5,
                stagger: {
                  each: 0.05,
                  repeat: -1,
                  yoyo: true,
                },
              }
            );

            enterHandler = contextSafe!(() => {
              tl31.play();
            });

            clear = () => {
              tl31.kill();
              split3.revert();
            };

            break;
        }

        sectionRef.current[i]?.addEventListener("mouseenter", enterHandler);

        clearEvent.push(() => {
          sectionRef.current[i]?.removeEventListener(
            "mouseenter",
            enterHandler
          );
          clear();
        });
      }

      return () => {
        clearEvent.forEach((fn) => fn());
      };
    },
    { scope: contentRef, dependencies: [loading] }
  );

  return (
    <>
      {(loading || !loadingAnimationComplete) && (
        <SlowLoading
          duration={3}
          onComplete={() => setLoadingAnimationComplete(true)}
        />
      )}
      <div className="welcome-page" ref={welcomePageRef}>
        <WelcomePage />
      </div>
      <div className="content" ref={contentRef}>
        <div className="section" data-title="Me">
          <div className="subsection" data-title="About me" ref={setRef}>
            <div className="max-w-3xl px-20">
              <h1 id="title-me">Dear friend:</h1>
              <h2 id="about-me">
                I'm Liudy, a first-year postgraduate student with a strong
                passion for&nbsp;
                <span className="text-theme-color">front-end development</span>,
                &nbsp;
                <span className="text-theme-color">web design</span>, and&nbsp;
                <span className="text-theme-color">user interaction</span>.
              </h2>
              <div className="flex gap-8 items-center relative">
                <Image
                  id="me"
                  src="/image/me/Labubu.png"
                  alt="me"
                  width={200}
                  height={200}
                  className="object-cover w-0"
                />
                <span
                  id="hello-world"
                  className="text-4xl font-bold text-center mr-10 flex-1 opacity-0"
                >
                  Hello world!
                </span>
              </div>
            </div>
          </div>
          <div className="subsection" data-title="hobby 1" ref={setRef}>
            <div className="max-w-3xl px-20 flex flex-col items-center gap-4">
              <h1 className="flex items-center">
                <div id="i-like-1">I like&nbsp;</div>
                <div id="hobby-1" className="text-theme-color opacity-0">
                  playing games
                </div>
              </h1>
              <Image
                id="gameController"
                src="/image/assets/gameController.svg"
                alt="gameController"
                className="w-0 scale-50"
                width={100}
                height={100}
              />
            </div>
            <Image
              id="pacman"
              src="/image/assets/pacman.svg"
              alt="pacman"
              width={50}
              height={50}
              className="opacity-0 absolute top-25 left-0"
            />
            <Image
              id="monster"
              src="/image/assets/monster.svg"
              alt="monster"
              width={50}
              height={50}
              className="opacity-0 absolute top-25 left-0"
            />
            <Image
              id="flight"
              src="/image/assets/flight.svg"
              alt="flight"
              width={50}
              height={50}
              className="opacity-0 absolute bottom-25 left-0"
            />
          </div>
          <div className="subsection" data-title="hobby 2" ref={setRef}>
            <div className="max-w-3xl px-20 flex flex-col items-center gap-4">
              <h1 className="flex items-center">
                <div id="i-like-2">I like&nbsp;</div>
                <div id="hobby-2" className="text-theme-color opacity-0">
                  reading
                </div>
              </h1>
            </div>
            {/* 背景quato元素 */}
            {precept.map((text, index) => {
              const positionIndex = index % positions.length;
              const sizeIndex = index % sizes.length;
              const opacityIndex = index % opacities.length;

              const position = positions[positionIndex];
              const size = sizes[sizeIndex];
              const opacity = opacities[opacityIndex];

              return (
                <div
                  key={index}
                  className={`precept absolute transition-all duration-1000 ease-in-out ${size} ${opacity} text-primary/70 max-w-xs text-wrap-balance pointer-events-none`}
                  style={{
                    ...position,
                    zIndex: 1,
                  }}
                >
                  {text}
                </div>
              );
            })}
          </div>
        </div>

        <div className="section" data-title="Skills" ref={setRef}>
          <h1 className="text-2xl font-bold mb-5">My Skills</h1>
          <div id="skills" className="w-full max-w-3xl">
            {information.skills.map((skill) => (
              <div
                key={skill.name}
                className="skill-item flex w-full max-w-3xl items-center mb-4 h-10 opacity-0"
              >
                <h3 className="text-primary/80 w-32">{skill.name}</h3>
                <div className="relative flex-1 h-full border-border border-1 border-solid overflow-hidden mb-3">
                  <div
                    className="w-full h-full transition-all duration-500 bg-gradient-to-r from-gray-100/50  to-theme-color"
                    style={{ clipPath: `inset(0 ${100 - skill.level}% 0 0)` }}
                  />
                  <div className="absolute bottom-0 right-10 text-primary/60 animate">
                    {skill.level < 60 &&
                      `I need to practice more 🙏 on ${skill.name}`}
                    {skill.level >= 60 &&
                      skill.level < 100 &&
                      `I'm good at ${skill.name} 👌`}
                    {skill.level === 100 && "Interest is the best teacher 💪"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="section" data-title="Project">
          <div className="max-w-3xl mb-10 text-6xl">
            <svg
              className="inline-block"
              width={60}
              viewBox="0 0 1046 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="5551"
            >
              <path
                d="M576.413957 968.290043c74.468766 60.644766 181.52034 62.965106 265.041703 5.588425 51.722894-35.317106 154.449702-165.441362 37.430468-318.311489 131.845447-33.116596 193.949957-164.972936 156.780936-279.748085-18.290383-55.590128-105.123404-197.152681-291.426043-134.318298C754.077957 109.306553 647.080851 6.307404 526.673702 6.307404c-120.614128 0-229.920681 105.722553-217.948596 235.454639-126.997787-49.467915-253.396426 19.880851-290.707063 134.459914-37.234383 114.491915 24.946383 243.232681 156.650212 279.748086-85.297021 103.456681-59.773277 247.350468 37.975149 318.169872 79.054979 57.387574 186.302638 55.459404 264.562383-7.908766l49.870979-54.729532 49.337191 56.788426z"
                fill="#231916"
                p-id="5552"
              ></path>
              <path
                d="M803.872681 922.711149c-68.956596 50.404766-166.018723 34.772426-216.292766-34.445617-16.819745-22.811234-40.829277-69.35966-23.268766-134.525277a217.262298 217.262298 0 0 0 153.055319-111.180255c66.756085 1.329021 104.654979 39.238809 120.886468 63.237447 70.677787 105.19966-0.664511 192.512-34.380255 216.913702M779.754213 296.066723c130.516426-30.654638 182.577021 59.980255 195.148255 99.480511 26.656681 81.190128-14.368681 165.572085-99.077447 195.355234-32.114383 10.904511-95.809362 11.035234-135.233361-19.750128 11.035234-72.605957-21.220766-141.028766-58.520511-179.733787 19.281702-58.171915 70.089532-88.837447 97.683064-95.35183M526.706383 69.958809c85.514894 0 154.057532 69.348766 154.918128 154.929021 0.806128 78.72817-52.659745 116.365617-60.307064 122.084766-52.85583-25.861447-118.478979-34.641702-189.494468 0-7.516596-5.719149-60.307064-43.356596-60.307064-122.084766 0.130723-85.580255 69.544851-154.929021 155.190468-154.929021M177.78383 591.011404C96.615489 564.681532 52.006128 476.977021 78.466723 395.786894c26.395234-81.266383 114.034383-125.821277 195.082894-99.611234 27.931234 9.368511 76.52766 37.038298 97.879149 95.210212-37.833532 38.705021-71.614638 119.764426-58.509617 180.398298-56.59234 36.918468-107.716085 27.942128-135.113532 19.227234M466.421106 888.418043c-50.328511 69.348766-147.543149 84.643404-216.565106 34.314893-69.152681-49.870979-84.371064-147.554043-34.238638-216.379915 16.950468-23.268766 54.184851-59.642553 120.548766-63.36817a216.238298 216.238298 0 0 0 153.055319 110.788085c16.754383 70.743149-5.773617 111.37634-22.800341 134.645107"
                fill="#FEFEFE"
                p-id="5553"
              ></path>
              <path
                d="M374.15217 541.009702c0-83.913532 68.21583-152.477957 152.521532-152.477957 84.251234 0 152.728511 68.564426 152.728511 152.477957 0 84.185872-68.477277 152.728511-152.728511 152.728511-84.305702 0-152.521532-68.542638-152.521532-152.728511"
                fill="#FFF000"
                p-id="5554"
              ></path>
            </svg>
            My Projects
          </div>
          <div className="max-w-3xl text-xl/loose text-primary/70 text-wrap-balance ">
            <hr />
            <div className="mb-10 text-center">
              In the past four years of my student life, I have learned a lot
              about network programming. In the previous years, I mainly
              developed Java back-end projects. It was only in the last few
              months that I found I preferred front-end development. Here are
              several projects I completed recently.
            </div>
          </div>
        </div>

        <div className="section" data-title="project 1">
          <div className="subsection" data-title="project1-home">
            <div className="max-w-3xl px-20 flex flex-col items-center gap-4">
              <h1>
                First project:&nbsp;
                <span className="text-theme-color">mypage</span>
              </h1>
              <Image
                src="/image/project/mypage/home.png"
                alt="mypage"
                width={1000}
                height={500}
                className="w-full h-auto"
                loading="lazy"
              />
              <div className="flex flex-wrap gap-2">
                {[
                  "react.js",
                  "tailwindcss",
                  "typescript",
                  "next.js",
                  "GSAP",
                  "shadcn",
                  "husky",
                  "markdown-it",
                  "prisma",
                  "mongodb",
                  "next-auth",
                ].map((item) => (
                  <div
                    key={item}
                    className="bg-background border border-border rounded-md p-2 "
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="subsection" data-title="project1-blog">
            <div className="max-w-6xl px-20 flex flex-col items-center gap-4">
              <Image
                src="/image/project/mypage/blog.png"
                alt="mypage"
                width={1000}
                height={500}
                className="w-full h-auto"
                loading="lazy"
              />
              <h3>Beautiful blog page</h3>
            </div>
          </div>
          <div className="subsection" data-title="project1-blog-detail">
            <div className="max-w-6xl px-20 flex flex-col items-center gap-4">
              <Image
                src="/image/project/mypage/blog-detail.png"
                alt="mypage"
                width={1000}
                height={500}
                className="w-full h-auto"
                loading="lazy"
              />
              <h3>
                Complete markdown compile, support latex, img, code block .etc.
              </h3>
            </div>
          </div>
          <div className="subsection" data-title="project1-thinking">
            <div className="max-w-6xl px-20 flex flex-col items-center gap-4">
              <Image
                src="/image/project/mypage/thinking.png"
                alt="mypage"
                width={1000}
                height={500}
                className="w-full h-auto"
                loading="lazy"
              />
              <h3>Personal thinking page, use waterfall style</h3>
            </div>
          </div>
          <div className="subsection" data-title="project1-photography">
            <div className="max-w-6xl px-20 flex flex-col items-center gap-4">
              <Image
                src="/image/project/mypage/photography.png"
                alt="mypage"
                width={1000}
                height={500}
                className="w-full h-auto"
                loading="lazy"
              />
              <h3>Photography page, support infinite scroll</h3>
            </div>
          </div>
          <div className="subsection" data-title="project1-theme">
            <div className="max-w-6xl px-20 flex flex-col items-center gap-4">
              <Image
                src="/image/project/mypage/theme.png"
                alt="mypage"
                width={1000}
                height={500}
                className="w-full h-auto"
                loading="lazy"
              />
              <h3>It also supports quick theme switch</h3>
            </div>
          </div>
          <div className="subsection" data-title="project1-admin-home">
            <div className="max-w-6xl px-20 flex flex-col items-center gap-4">
              <Image
                src="/image/project/mypage/admin-status.png"
                alt="mypage"
                width={1000}
                height={500}
                className="w-full h-auto"
                loading="lazy"
              />
              <h3>Admin page is beautiful and practical</h3>
            </div>
          </div>
          <div className="subsection" data-title="project1-blog-list">
            <div className="max-w-6xl px-20 flex flex-col items-center gap-4">
              <Image
                src="/image/project/mypage/blog-list.png"
                alt="mypage"
                width={1000}
                height={500}
                className="w-full h-auto"
                loading="lazy"
              />
              <h3>Blog management</h3>
            </div>
          </div>
          <div className="subsection" data-title="project1-blog-edit">
            <div className="max-w-6xl px-20 flex flex-col items-center gap-4">
              <Image
                src="/image/project/mypage/blog-edit.png"
                alt="mypage"
                width={1000}
                height={500}
                className="w-full h-auto"
                loading="lazy"
              />
              <h3>Blog edit</h3>
            </div>
          </div>
          <div className="subsection" data-title="project1-thinking-list">
            <div className="max-w-6xl px-20 flex flex-col items-center gap-4">
              <Image
                src="/image/project/mypage/thinking-list.png"
                alt="mypage"
                width={1000}
                height={500}
                className="w-full h-auto"
                loading="lazy"
              />
              <h3>Thinking management</h3>
            </div>
          </div>
          <div className="subsection" data-title="project1-thinking-edit">
            <div className="max-w-6xl px-20 flex flex-col items-center gap-4">
              <Image
                src="/image/project/mypage/thinking-edit.png"
                alt="mypage"
                width={1000}
                height={500}
                className="w-full h-auto"
                loading="lazy"
              />
              <h3>Thinking edit</h3>
            </div>
          </div>
          <div className="subsection" data-title="project1-photo-list">
            <div className="max-w-6xl px-20 flex flex-col items-center gap-4">
              <Image
                src="/image/project/mypage/photo-list.png"
                alt="mypage"
                width={1000}
                height={500}
                className="w-full h-auto"
                loading="lazy"
              />
              <h3>Photo management</h3>
            </div>
          </div>
          <div className="subsection" data-title="project1-photo-edit">
            <div className="max-w-6xl px-20 flex flex-col items-center gap-4">
              <Image
                src="/image/project/mypage/photo-edit.png"
                alt="mypage"
                width={1000}
                height={500}
                className="w-full h-auto"
                loading="lazy"
              />
              <h3>Photo edit</h3>
            </div>
          </div>
        </div>
        <div className="section" data-title="project 2">
          <div className="subsection" data-title="project2-home">
            <div className="max-w-4xl px-20 flex flex-col items-center gap-4">
              <h1>
                Second project:&nbsp;
                <span className="text-theme-color">awesome-meeting</span>
              </h1>
              <h3>
                A web application imitates tencent meeting for managing
                meetings, based on WebSocket, including creating, editing, and
                deleting meetings.
              </h3>
              <div className="flex gap-4">
                <Image
                  src="/image/project/awesome-meeting/home.png"
                  alt="awesome-meeting"
                  width={1000}
                  height={500}
                  className="w-1/2 h-auto rounded-md"
                  loading="lazy"
                />
                <div className="flex flex-wrap gap-2 items-center">
                  {[
                    "vue.js",
                    "element-plus",
                    "electron",
                    "websocket",
                    "ffmpeg",
                    "pinia",
                    "vue-router",
                    "vite",
                    "springboot",
                    "mybatis",
                    "mysql",
                    "redis",
                    "netty",
                    "rabbitmq",
                    "aspectjweaver",
                  ].map((item) => (
                    <div
                      key={item}
                      className="bg-background border border-border rounded-md p-2 "
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="subsection" data-title="project2-meeting">
            <div className="max-w-6xl px-20 flex flex-col items-center gap-4">
              <Image
                src="/image/project/awesome-meeting/meeting.png"
                alt="awesome-meeting"
                width={1000}
                height={500}
                className="w-full h-auto rounded-md"
                loading="lazy"
              />
              <h3>
                Meeting, user can open camera, microphone, share screen, etc.
              </h3>
            </div>
          </div>
          <div className="subsection" data-title="project2-share-screen">
            <div className="max-w-6xl px-20 flex flex-col items-center gap-4">
              <Image
                src="/image/project/awesome-meeting/share-screen.png"
                alt="awesome-meeting"
                width={1000}
                height={500}
                className="w-full h-auto rounded-md"
                loading="lazy"
              />
              <h3>Share screen</h3>
            </div>
          </div>
          <div className="subsection" data-title="project2-invite">
            <div className="max-w-6xl px-20 flex flex-col items-center gap-4">
              <Image
                src="/image/project/awesome-meeting/invite.png"
                alt="awesome-meeting"
                width={1000}
                height={500}
                className="w-full h-auto rounded-md"
                loading="lazy"
              />
              <h3>Invite user to meeting</h3>
            </div>
          </div>
          <div className="subsection" data-title="project2-chat-send-file">
            <div className="max-w-6xl px-20 flex flex-col items-center gap-4">
              <Image
                src="/image/project/awesome-meeting/chat-send-file.png"
                alt="awesome-meeting"
                width={1000}
                height={500}
                className="w-full h-auto rounded-md"
                loading="lazy"
              />
              <h3>Chat and send file to other users in meeting</h3>
            </div>
          </div>
          <div className="subsection" data-title="project2-admin">
            <div className="max-w-6xl px-20 flex flex-col items-center gap-4">
              <Image
                src="/image/project/awesome-meeting/admin.png"
                alt="awesome-meeting"
                width={1000}
                height={500}
                className="w-full h-auto rounded-md"
                loading="lazy"
              />
              <h3>Admin page</h3>
            </div>
          </div>
        </div>
        <div className="section" data-title="Thanks">
          <h1>Thanks</h1>
          <svg
            id="replay"
            ref={replayRef}
            className="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1472"
            width="100"
            height="100"
          >
            <path
              fill="currentColor"
              d="M853.333333 554.666667a341.333333 341.333333 0 0 1-682.666666 22.613333 21.76 21.76 0 0 1 5.546666-15.786667 22.186667 22.186667 0 0 1 16.64-6.826666h42.666667a21.333333 21.333333 0 0 1 21.333333 19.626666A256 256 0 1 0 512 298.666667v100.693333a20.906667 20.906667 0 0 1-6.4 15.36l-8.533333 8.533333a21.333333 21.333333 0 0 1-30.293334 0L315.733333 272.64a21.76 21.76 0 0 1 0-30.293333l151.04-150.613334a21.333333 21.333333 0 0 1 30.293334 0l8.533333 8.533334a20.906667 20.906667 0 0 1 6.4 15.36V213.333333a341.333333 341.333333 0 0 1 341.333333 341.333334z"
              p-id="1473"
            ></path>
          </svg>
        </div>
      </div>
      <div className="progress-container" ref={progressContainerRef}>
        <div className="progress-bar bg-theme-color" ref={progressBarRef}>
          <div className="progress-tooltip" ref={progressTooltipRef}></div>
        </div>
      </div>
    </>
  );
}
