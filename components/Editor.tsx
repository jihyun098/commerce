import { EditorProps, EditorState } from 'react-draft-wysiwyg'
import dynamic from 'next/dynamic'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import styled from '@emotion/styled'
import { Dispatch, SetStateAction } from 'react'
import Button from './Button'

const Editor = dynamic<EditorProps>(
  () => import(`react-draft-wysiwyg`).then((module) => module.Editor),
  {
    ssr: false,
  }
)

export default function CustomEditor({
  editorState,
  readOnly = false,
  onSave,
  onEditorStateChange,
}: {
  editorState: EditorState
  readOnly?: boolean
  onSave?: () => void
  onEditorStateChange?: Dispatch<SetStateAction<EditorState | undefined>>
}) {
  return (
    <Wrapper>
      <Editor
        readOnly={readOnly}
        editorState={editorState}
        toolbarHidden={readOnly}
        toolbarClassName="editorToolbar-hidden-"
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        onEditorStateChange={onEditorStateChange}
        toolbar={{ option: ['inline', 'list', 'textAlign', 'link'] }}
        localization={{ locale: 'ko' }}
      ></Editor>
      {!readOnly && <Button onClick={onSave}>저장</Button>}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 16px;
`
