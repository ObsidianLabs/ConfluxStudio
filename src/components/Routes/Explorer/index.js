import React from 'react'

import Explorer from '@obsidians/explorer'
import FaucetButton from './FaucetButton'
import ConvertButton from './ConvertButton'

Explorer.defaultProps = {
  ...Explorer.defaultProps,
  ExtraToolbarButtons: ({ explorer, value, ...otherProps }) => <>
    <ConvertButton
      explorer={explorer}
      address={value}
      {...otherProps}
    />
    <FaucetButton address={value} {...otherProps} />
  </>,
}

export default Explorer
