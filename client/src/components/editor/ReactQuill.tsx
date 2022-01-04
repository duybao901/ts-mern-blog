import React, { useCallback, useRef } from 'react'
import { useDispatch } from 'react-redux';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ALERT } from '../../redux/types/alertTypes'
import { checkImage, uploadImage } from '../../utils/ImageHelper'

interface QuillProps {
    setBody: (value: string) => void
}

var container = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean', "image"]                                         // remove formatting button
];

const Quill: React.FC<QuillProps> = ({ setBody }) => {
    const dispatch = useDispatch()
    const quillRef = useRef<ReactQuill>(null)

    // You need to use useMemo or useCallback to memoize the plugin function and object creations,
    //  if these plugins are defined inline in a function component.
    //   The ReactQuill wrapper will rebuild the editor if these values change identity.
    const imageHandler = useCallback(async () => {
        console.log('dispatch')
        // Create Tag Input and Click
        const input = document.createElement('input')
        input.setAttribute('accept', "image/*")
        input.setAttribute("type", 'file')
        input.click();

        // Handle 
        input.onchange = async () => {
            const files = input.files
            if (!files) return dispatch({
                type: ALERT, payload: { error: 'File does not exist.' }
            });

            const file = files[0]

            let check = checkImage(file)
            if (check) return dispatch({
                type: ALERT, payload: { error: 'File does not exist.' }
            });

            dispatch({ type: ALERT, payload: { loading: true } })
            const photo = await uploadImage(file)

            const quill = quillRef.current;
            const range = quill?.getEditor().getSelection()?.index

            if (range !== undefined) {
                quill?.getEditor().insertEmbed(range, "image", `${photo.url}`)
            }

            dispatch({ type: ALERT, payload: { loading: false } })
        }
    }, [dispatch, quillRef])

    const modules = {
        toolbar: {
            container,
            handlers: {
                image: imageHandler
            }
        },

    }

    // Custom Image
    return (
        <div>
            <ReactQuill theme="snow"
                modules={modules}
                placeholder="Write somethings..."
                onChange={e => setBody(e)}
                ref={quillRef}
            />
        </div>
    )
}


export default Quill
