import SkillItem, { SkillItemProps } from "./SkillItem"
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useRef } from "react";
import { useGSAP } from "@gsap/react";

export interface SkillPageProps {
  skills: SkillItemProps[];
}

// 在客户端代码中执行
if (typeof window !== 'undefined') {
  gsap.registerPlugin(SplitText);
}

const SkillPage: React.FC<SkillPageProps> = ({ skills }) => {
  const skillRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!skillRef.current) {
      console.warn("skillRef not found");
      return;
    }

    const splitText = new SplitText(skillRef.current, { type: "chars" });
    const chars = splitText.chars;

    // 创建动画
    gsap.fromTo(chars,
      { y: 0 }, 
      {
        y: 2, 
        duration: 0.5,
        ease: "sine.inOut",
        stagger: {
          each: 0.05, 
          repeat: -1, 
          yoyo: true 
        }
      }
    );

    // useGSAP 的清理函数。当组件卸载或依赖项改变时触发。
    return () => {
      if (splitText) {
        // 清理 SplitText 生成的 DOM 元素。这很重要，防止旧的 DOM 元素残留。
        splitText.revert();
      }
    }
  }, { scope: skillRef });

  return (
    <>
      <h1 className="text-2xl font-bold mb-5">My Skills</h1>
      <div className="w-full max-w-3xl" ref={skillRef}>
        {
          skills.map((skill: SkillItemProps) => (
            <SkillItem key={skill.name} {...skill} />
          ))
        }
      </div>
    </>
  )
}

export default SkillPage;