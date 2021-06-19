import BottomBar from '@obsidians/bottombar'

BottomBar.defaultProps = {
  mnemonic: true,
  chains: [
    { key: 'dev', text: 'Local develop networks', filter: key => key.startsWith('0x') },
    { key: 'testnet', text: 'Testnet', filter: key => key.startsWith('cfxtest:') },
    { key: 'mainnet', text: 'Tethys mainnet', filter: key => key.startsWith('cfx:'), network: 'tethys' }
  ]
}

export default BottomBar
