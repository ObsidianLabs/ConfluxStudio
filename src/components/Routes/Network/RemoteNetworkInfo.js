import React, { PureComponent } from 'react'

import {
  TableCard,
  TableCardRow,
} from '@obsidians/ui-components'

export default class RemoteNetworkInfo extends PureComponent {
  render () {
    const { networkId, url, EditButton, status, info } = this.props
    return (
      <div className='d-flex'>
        <div className='col-6 p-0 border-right-black'>
          <TableCard
            title={`${process.env.CHAIN_NAME} Network (${networkId})`}
            right={EditButton}
          >
            <TableCardRow name='Node URL' badge={url} badgeColor='primary' />
            <TableCardRow
              name='Chain ID'
              badge={status?.chainId}
            />
            { info && info.tps && <TableCardRow
              name='TPS'
              badge={info && Number(info?.tps).toFixed(6)}
            />}
          </TableCard>
        </div>
        <div className='col-6 p-0'>
          <TableCard title='Blocks'>
            <TableCardRow
              name='Epoch'
              badge={status?.epochNumber}
            />
            <TableCardRow
              name='Block Number'
              badge={status?.blockNumber}
            />
            <TableCardRow
              name='Block Time'
              badge={info ? `${Number(info.blockTime).toFixed(2)} s` : ''}
            />
            <TableCardRow
              name='Difficulty'
              badge={info && Number(info.difficulty).toFixed(0)}
            />
            <TableCardRow
              name='Hash Rate'
              badge={info && Number(info.hashRate).toFixed(0)}
            />
          </TableCard>
        </div>
      </div>
    )
  }
}


