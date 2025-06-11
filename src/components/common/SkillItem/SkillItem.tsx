import React, { memo } from 'react';

export interface SkillItemProps {
  name: string;
  level: number;
}

const SkillItem: React.FC<SkillItemProps> = ({ name, level=0 }) => {
  return (
    <div className='flex w-full max-w-3xl items-center mb-4 h-10'>
      <h3 className='text-primary/80 w-32'>{name}</h3>
      <div className='flex-1 h-full border-border border-1 border-solid rounded-md overflow-hidden mb-3'>
        <div
          className='w-full h-full transition-all duration-500 bg-gradient-to-r from-red-500/60 via-yellow-500/60 to-green-500/60'
          style={{
            clipPath: `inset(0 ${100 - level}% 0 0)`
          }}
        />
      </div>
    </div>
  )
}

export default memo(SkillItem);