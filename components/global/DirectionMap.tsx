import React from 'react'

export default function DirectionMap({ url }: { url: string }) {

  return (
    <div className='rounded-md overflow-hidden aspect-square'>
      <iframe 
        src={url}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy='no-referrer-when-downgrade'
      ></iframe>
    </div>
  )
}
