import React, { memo, forwardRef } from 'react';

export interface SkillItemProps {
  name: string;
  level: number;
}

const SkillItem: React.FC<SkillItemProps> = forwardRef<HTMLDivElement, SkillItemProps>((skill, ref) => {
  return (
    <div ref={ref} className='flex w-full max-w-3xl items-center mb-4 h-10'>
      <h3 className='text-primary/80 w-32'>{skill.name}</h3>
      <div className='relative flex-1 h-full border-border border-1 border-solid rounded-md overflow-hidden mb-3'>
        <div
          className='w-full h-full transition-all duration-500 bg-gradient-to-r from-red-500/60 via-yellow-500/60 to-green-500/60'
          style={{ clipPath: `inset(0 ${100 - skill.level}% 0 0)` }}
        />
        <div className='absolute bottom-0 right-10 text-primary/60 animate'>
          {skill.level < 60 && `I need to practice more 🙏 on ${skill.name}`}
          {skill.level >= 60 && skill.level < 100 && `I'm good at ${skill.name} 👌`}
          {skill.level === 100 && `Interest is the best teacher 💪`}
        </div>
      </div>
    </div>
  )
});

export default memo(SkillItem);