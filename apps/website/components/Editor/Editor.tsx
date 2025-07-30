import { Editor, Runner } from '@rspress/plugin-playground/web'
// @ts-expect-error Cannot find module '_rspress_playground_imports'
import getImport from '_rspress_playground_imports'
import {
  type HTMLAttributes,
  type ReactNode,
  useCallback,
  useState,
} from 'react'

export interface PlaygroundProps extends HTMLAttributes<HTMLDivElement> {
  code: string
  language: string
  direction?: 'horizontal' | 'vertical'
  editorPosition?: 'left' | 'right'
  renderChildren?: (
    props: PlaygroundProps,
    code: string,
    direction: 'horizontal' | 'vertical',
  ) => ReactNode
}

export const VSeedEditor = (props: PlaygroundProps) => {
  const {
    code: codeProp,
    language,
    className = '',
    direction = 'horizontal',
    editorPosition = 'left',
    renderChildren,
    ...rest
  } = props

  const [code, setCode] = useState(codeProp)

  const handleCodeChange = useCallback((e?: string) => {
    setCode(e || '')
  }, [])

  const useReverseLayout =
    direction === 'horizontal' && editorPosition === 'left'

  const monacoLanguage =
    language === 'tsx' || language === 'ts' ? 'typescript' : 'javascript'

  const classNames = [
    'rspress-playground',
    `rspress-playground-${direction}`,
    `rspress-playground-reverse-${useReverseLayout ? 'y' : 'n'}`,
    className,
  ].join(' ')

  return (
    <div className={classNames} {...rest}>
      <Runner language={language} code={code} getImport={getImport} />
      <Editor
        value={code}
        onChange={handleCodeChange}
        language={monacoLanguage}
        beforeMount={(monaco) => {
          monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
            noSemanticValidation: true,
            noSyntaxValidation: true,
            noSuggestionDiagnostics: true,
          })
        }}
      />
      {renderChildren?.(props, code, direction)}
    </div>
  )
}

export default Editor
