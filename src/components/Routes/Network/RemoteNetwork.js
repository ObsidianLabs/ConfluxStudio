import React, { PureComponent } from 'react'

import {
  TableCard,
  TableCardRow,
} from '@obsidians/ui-components'

import moment from 'moment'

import { networkManager } from '@obsidians/network'

export default class RemoteNetwork extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      info: null,
      status: null,
    }
  }

  componentDidMount () {
    this.refresh()
    this.h = setInterval(() => this.refreshBlock(), 1000)
  }

  componentDidUpdate (prevProps) {
    if (this.props.networkId !== prevProps.networkId) {
      this.refresh()
    }
  }

  componentWillUnmount () {
    clearInterval(this.h)
    this.h = undefined
  }

  async refresh () {
    this.setState({
      info: null,
      status: null,
    })
    if (!networkManager.sdk) {
      return
    }
    this.refreshBlock()
    const networkId = this.props.networkId
    const info = await networkManager.sdk?.networkInfo()
    if (this.props.networkId === networkId) {
      this.setState({ info })
    }
  }

  async refreshBlock () {
    if (!networkManager.sdk) {
      return
    }
    try {
      const networkId = this.props.networkId
      const status = await networkManager.sdk?.getStatus()
      if (this.props.networkId === networkId) {
        this.setState({ status })
      }
    } catch (error) {
      console.warn(error)
      this.setState({ status: null })
    }
  }

  render () {
    const { networkId } = this.props
    const { status, info } = this.state

    return (
      <div className='d-flex flex-1 flex-column overflow-auto'>
        <div className='d-flex'>
          <div className='col-6 p-0 border-right-black'>
            <TableCard title={`${process.env.CHAIN_NAME} Network (${networkId})`}>
              <TableCardRow
                name='Node URL'
                badge={networkManager.sdk?.url}
                badgeColor='primary'
              />
              <TableCardRow
                name='Chain ID'
                badge={status?.chainId}
              />
              <TableCardRow
                name='TPS'
                badge={info && Number(info?.tps).toFixed(6)}
              />
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
        <div className='d-flex flex-fill'>
          <div className='col-12 p-0 border-top-black'>
          </div>
        </div>
      </div>
    )
  }
}


