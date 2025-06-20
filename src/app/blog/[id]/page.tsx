'use client'

import { useParams } from 'next/navigation'

export default function ArticleDetail() {
  const { id } = useParams()

  return (
    <div className='mx-auto px-4'>
      <h1>This is a blog of {id}</h1>
    </div>
  )
}
