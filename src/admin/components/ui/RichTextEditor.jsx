import React from 'react'
import JodiEditor from 'jodit-react'
import { useRef } from 'react';

const RichTextEditor = ({value, setValue}) => {
    const editor = useRef(null);

    return (
        <div>
            <JodiEditor ref={editor} value={value} onChange={content => setValue(content)} className='h-[400px]'/>
        </div>
    )
}

export default RichTextEditor