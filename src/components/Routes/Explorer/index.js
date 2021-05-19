import React from 'react'

import Explorer, { TransferButton } from '@obsidians/explorer'
import FaucetButton from './FaucetButton'
import ConvertButton from './ConvertButton'

TransferButton.defaultProps = {
  addressLength: 50,
}

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
