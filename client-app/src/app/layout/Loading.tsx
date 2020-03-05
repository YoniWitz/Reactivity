import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'

interface IProps {
  content?: string;
}
export const Loading: React.FC<IProps> = ({ content }) => {
  return (
    <Dimmer active inverted>
      <Loader inverted content={content} />
    </Dimmer>
  )
}
