# Conflux Studio

Conflux Studio 是一个帮助开发者快速开发 [Conflux](https://confluxnetwork.org/) 智能合约的集成化开发环境。

![](./screenshots/compile.png)

[English](https://github.com/ObsidianLabs/ConfluxStudio/blob/master/README.md) | 简体中文

## 安装

### 下载

Conflux Studio 安装包可以在 [Github Releases](https://github.com/ObsidianLabs/ConfluxStudio/releases) 进行下载。目前 Conflux Studio 支持 macOS, Linux 和 Windows 系统，请根据系统下载对应的版本 (macOS 下载 .dmg 或者 .zip，Linux 下载 .AppImage, Windows 下载 .exe)。

### 安装

- **macOS**: 双击打开 `ConfluxStudio-x.x.x.dmg` 并将 `Conflux Studio` 拖动到应用文件夹内。
- **Linux**: 双击打开 `ConfluxStudio-x.x.x.AppImage`, 选择 *Properties* => *Permissions* => *Execute*, 将 *Allow executing file as progrom* 选项打勾。关闭属性设置窗口并双击打开应用（不同的 Linux 发行版可能会有不同的安装方式）。
- **Windows**:  双击打开 `ConfluxStudio-x.x.x.exe`。

### 网页版

Conflux Studio 同样支持网页版，通过https://conflux.ide.black/访问，或在安装好的客户端右上角账户处快速访问。通过创建账户并登陆，最新版本的Conflux Studio已经支持网页端和客户端IDE项目文件互通。

<p align="center">
  <img src="./screenshots/web.png" width="720px">
</p>

Web端特别支持了Conflux 官方浏览器插件钱包 Conflux Portal，如果浏览器环境中已经存在Conflux Portal，Conflux Studio会自动是识别并链接Conflux Portal, 并允许Conflux Portal管理网络节点与密钥。进行支付相关操作的时候，Conflux Studio亦会链接到Conflux Portal来进行支付许可。

## 教程

你可以前往 [Conflux DApp 开发教程](https://github.com/ObsidianLabs/conflux-dapp-tutorial/blob/master/README-CN.md)学习如何使用 Conflux Studio 完整地开发一款代币 DApp。

## 功能预览

### 准备工作

在正确安装 Conflux Studio 并初次启动时，你将看到一个欢迎页面，这里有 Conflux Studio 正常运行所需要的依赖，包括了 Docker，Conflux Node 以及 Conflux Truffle

<p align="center">
  <img src="./screenshots/welcome.png" width="720px">
</p>

- Conflux Studio 使用 [**Docker**](https://www.docker.com/) 来启动 Conflux 节点和进行项目编译。如果你之前没有安装过 Docker，可以点击 *Install Docker* 按钮访问 Docker 官方网站并进行下载安装。
- [**Conflux Node**](https://github.com/Conflux-Chain/conflux-rust) 是 Conflux 官方提供的 Conflux 节点镜像，Conflux Studio 使用这个镜像来运行 Conflux 节点以及项目编译
- [**Conflux Truffle**](https://github.com/Conflux-Chain/conflux-truffle) 是 Conflux 版本的 Truffle。Conflux Studio 使用这个工具包进行项目的创建和编译。

当所有依赖都正确安装并运行后，灰色的 *Skip* 按钮将会变成绿色的 *Get Started* 按钮。点击这个按钮进入 Conflux Studio 的主界面。

### 创建密钥对

进入主界面后，我们需要首先创建一些密钥对。在 Conflux Studio 的任意界面，点击应用左下⻆的钥匙图标，打开密钥管理器。

<p align="center">
  <img src="./screenshots/keypairs.png" width="480px">
</p>
你可以在密钥管理器中创建、导入并管理密钥对。在创建和编辑密钥对的时候，你可以为该密钥对设置别名，方便在后续的使用中进行识别。目前，Conflux Studio同时支持使用密钥文件和助记词导入密钥。Conflux Studio会自动为每个不同的网络储存不同的密钥对库。

<p align="center">
  <img src="./screenshots/import.png" width="720px">
</p>

密钥管理器除了对密钥对进行储存管理外，还将为创世区块提供创世地址。创建新的 Conflux 节点实例时，会使用密钥管理器里所有的地址作为创世地址，每个地址得到 10000 CFX 的初始 token。

**在继续之前，请先在密钥管理器中创建一些密钥对，作为接下来创建节点实例的创世地址。**

### 启动节点

在顶部的 *Network* 标签，可以选择连接的网络。点击该标签将把页面切换为网络管理器。目前，Conflux Studio支持连接到Mainnet主网，Testnet测试网络，Development开发网络，以及通过提供Node RPC的url来连接到自定义节点。

<p align="center">
  <img src="./screenshots/network.png" width="720px">
</p>
在Development网络中，我们可以进行 Conflux 节点版本和节点实例的管理，包括下载、删除 Conflux 节点版本，根据不同版本创建、删除和运行节点实例。点击主页面中右上角的 *New Instance* 按钮打开创建新实例的弹窗，填写实例名称和选择合适的版本，点击 *Create* 按钮完成节点实例的创建。

<p align="center">
  <img src="./screenshots/new_instance.png" width="720px">
</p>

节点实例创建完成后，实例列表将显示刚刚创建好的实例，点击实例的绿色 *Start* 按钮启动 Conflux 节点。启动完成后，你可以在下方的日志查看器中检查节点运行日志。

<p align="center">
  <img src="./screenshots/node_log.png" width="720px">
</p>

### 区块浏览器

节点启动或连接到已启动的网络后，点击顶部的 *Explorer* 标签，主页面将切换为区块浏览器。在区块浏览器中，我们可以查询对应地址的信息。

从密钥管理器中复制刚刚生成的地址，将地址粘贴在地址栏并点击回车，我们便可以看到对应地址的余额信息了。

<p align="center">
  <img src="./screenshots/explorer.png" width="720px">
</p>
地址除了是账户密钥外，还可以是一个合约。当合约是一个Token的时候，会自动显示该Token的相关信息，包括类型、名称、符号等。以下是一个名为cat，符号为CAT的CRC 20 Token。

<p align="center">
  <img src="./screenshots/CRC20.png" width="720px">
</p>

另外，也支持在Explorer页面中使用合约中任何一种 CRC-20 Token 发起交易。【这个我没找到在哪，等下确定了补个图】

### 创建智能合约项目

点击顶部的 *Project* 标签，主页面将切换至项目管理器。点击页面右上角的 *New* 按钮打开创建项目弹窗，输入项目名称并选择合适的模版，Conflux Studio 目前提供的模版包括：

- `coin` 与 `sponsored coin`：Conflux实例提供的coin智能合约，后者额外支持 `sponsor` 功能
- `Open Zepplein`模板，包括ERC20, ERC721, ERC777, ERC1155等
- `[Truffle] metacoin`：使用Conflux Truffle创建的合约；该项目目前无法部署到 Conflux 节点

<p align="center">
  <img src="./screenshots/create_project.png" width="720px">
</p>

项目创建完成后，主页面将切换至项目编辑器。项目编辑器由几个部分组成，包括了文件浏览器，代码编辑器，工具栏，日志查看器等多个开发常用模块。

### 编译智能合约项目

点击工具栏的编译按钮（锤子形状），Conflux Studio 将进行项目的编译，你可以通过下方的日志查看器来查看编译结果。编译后将在项目目录下的 `build` 文件夹中生成 json 文件。

在代码页面右下角可以选取编译使用Truffle和Solc的版本。如果没有的话会先执行下载操作，然后再进行编译和部署。由于使用浏览器环境中运行的Solc编译器，所以Conflux Studio进行编译时,无需再使用docker存储编译器的镜像。

<p align="center">
  <img src="./screenshots/compile.png" width="720px">
</p>

### 部署智能合约项目

点击工具栏的部署按钮（船形状），部署参数窗口将被打开，在这里可以输入构造函数的参数、交易签名者、gas limit 和 gas price。

<p align="center">
  <img src="./screenshots/deploy_parameters.png" width="720px">
</p>

点击 *Deploy* 按钮 Conflux Studio 将进行项目部署，部署结果将会弹窗显示。

<p align="center">
  <img src="./screenshots/deploy.png" width="720px">
</p>
### 调用合约

成功部署智能合约后，点击弹窗中点击蓝色的 *contract* 按钮，主页面将切换至合约浏览器，Conflux Studio 将自动打开刚才部署完成的智能合约。

合约浏览器页面主要分为两个部分：

- 左边为合约的调用方法，点击左半部分的左上角蓝色按钮弹出的下拉框显示当前合约所定义的方法，点击方法名称可以切换调用的方法。
- 右边为合约的数据读取，点击右半部分的左上角蓝色按钮弹出的下拉框显示当前合约的数据表，点击表名称可以切换查看不同表中的数据。

Conflux Studio 会自动读取合约 ABI 中的 functions，并为每个 function 生成参数表单。用户可以简单的选择要调用的 function，输入参数，选择签名者（需要为 keypair manager 中存在的地址；读操作不需选择），并点击运行按钮进行合约调用。调用结果（成功或失败）将显示在下方的 result 栏中。

<p align="center">
  <img src="./screenshots/contract.png" width="720px">
</p>


接下来我们使用部署好的合约创建 *coin*。选择 *mint* 方法，在 *Parameters* 下填入 *receiver* 地址（可以从密钥管理器中复制）和在 *amount* 中填入合适的数量。在gas一栏点击Estimate，即可完成燃气估算。在 *Authorization* 中填入创世地址，点击上方的执行按钮。完成交易后，我们可以在左下角的 *Result* 中看到成功执行的结果。此时我们已经创建了新的 *coin*。

在右边的 *balance* 表中，在 Parameters 下输入刚刚填入的 *receiver* 地址，点击执行按钮，便可以看到刚刚 *mint* 的总数了。

<p align="center">
  <img src="./screenshots/mint.png" width="720px">
</p>

在最右侧可以进行事件查询，支持填入查询哪些区块内触发的事件，默认为最新的10000个。重新查询的时候可以点击clear快速清除上次输入的范围。

### ABI Storage

部署好的合约提供的ABI接口会被储存记录在下面的ABI  Storage处，另外也支持通过提供Codehash或address的方式手动添加ABI。

<p align="center">
  <img src="./screenshots/abi.png" width="720px">
</p>

### RPC Client

另外，Conflux Studio提供RPC Client功能，允许用户从底层调用Conflux RPC接口以验证公链接口调用过程。 
