import React, { useEffect, useState } from "react";
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css'; 
import { useParams } from "react-router-dom";
// import parse from 'html-react-parser';

function HtmlEditor({content, setContent}){
    const { quill, quillRef } = useQuill();
    // const [value,setValue]=useState();

    React.useEffect(() => {
        if (quill) {
            quill.clipboard.dangerouslyPasteHTML('write something...');
            
            quill.on('text-change', () => {
                // setContent(quillRef.current.firstChild.innerHTML)
            });
            }
        }, [quill]);

    return(
        <div className="ql">
            <div className="h-[380px] rounded-lg overflow-hidden border">
                <div ref={quillRef} className="border-none"/>
            </div>
        </div>
    );
}
export default HtmlEditor;