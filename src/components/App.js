import React, {Component} from 'react'
import './App.css';
import Web3 from 'web3';
import './etherium.png';


class App extends Component {

  // contructor to initialize variables
  constructor(props){
    super(props)
    this.state ={
      blockNumber: 0,
      difficulty: 0,
      gasprice: 0,
      blocks: []
    }
  }


  async componentWillMount (){
    // First we will load Web3
    let web3 = new Web3("https://mainnet.infura.io/v3/47d5ff4c89d94cac8937c798e4de63ee")

    // Fetch the details of the Latest Block
    let latest = await web3.eth.getBlock('latest')
    console.log('the_latest_Block',latest)
    this.setState({
      blockNumber: latest.number,
      difficulty: latest.difficulty

    })

    let block
    // create an array for storing the blocks
    let blocks = []
    // iterate a loop to fetch the required number of blocks(in our case =10)
    for (let i = 0; i < 10; i++) {
      block = await web3.eth.getBlock(latest.number - i)
      console.log(block)
      blocks.push(block)
    }
    this.setState({
      blocks: blocks
    })

    //  Fetch the deatils of the gas price
    let gasP = await web3.eth.getGasPrice()
    console.log('Gas_Price', gasP)
    this.setState({
      gasprice: gasP

    })
  }

  render(){

   return(
    <div>
      <nav className="navbar fixed-top  flex-md-nowrap p-2 shadow fontSize-17em mr-auto" >
        <div className="mr-auto ml-auto mt-2">
          <h4>ethIT</h4>
            <div className="content mr-auto ml-auto" style={{ width: '800px' }}>
              <h3>The Ethereum Blockchain Explorer</h3>
            </div >
        </div>
      </nav>
      
        <div class="card-body ml-auto mr-auto mt-5 shadow" style={{width: '90%'}}>
          <div className="card-reader content ml-auto mr-auto">
            <h5>Latest Block</h5>
            <p>Blocks are batches of transactions with a hash of the previous block in the chain.</p>
            <hr class="bg-light"></hr>
            <p class="info"> The value of the latest block is</p>
            <p class="val">{this.state.blockNumber}</p>
            <hr class="bg-light"></hr>
            <h5>Difficulty</h5>
            <p>Ethereum difficulty is a key value for every cryptocurrency. Ethereum Network difficulty is the difficulty of a problem that miners must solve to find a block. The more miners are mining Ethereum the more difficult it is to find the block to be rewarded.</p>
            <hr class="bg-light"></hr>
            <p class="info"> The current difficulty value of Ethereum is </p>
            <p class="val">{this.state.difficulty}</p>
            <hr class="bg-light"></hr>

            <h5>Gas Price</h5>
            <p>Gas refers to the fee, or pricing value, required to successfully conduct a transaction or execute a contract on the Ethereum blockchain platform.</p>
            <hr class="bg-light"></hr>
            <p class="info">The current value of Gas price of Ethereum is</p>
            <p class="val">{this.state.gasprice}</p>
            <hr class="bg-light"></hr>
          </div>  
        </div>
        

        
      <section>
        <div className="container-fluid mt-5 ">
            <div className="row">
              <main role="main" className="m-auto">
                <div className="content" >
                  <div className="row">
                    <div className="col-lg-12 mt-3 bg-light">
                      <div className="card" style={{width:'85em'}}>
                        <div className="card-header">
                          <h2>Whats Up with the Latest blocks</h2>
                        </div>
                        <div className="card-body1">
                          <table className="table">
                            <thead>
                              <tr>
                                <th scope="col">Block Number</th>
                                <th scope="col">Hash</th>
                                <th scope="col">Miner</th>
                                <th scope="col">Timestamp</th>
                              </tr>
                            </thead>
                            <tbody>
                              { this.state.blocks.map((block, key) => {
                                return (
                                  <tr key={key} >
                                    <th scope="row">{block.number}</th>
                                    <td>{block.hash.substring(0,25)}...</td>
                                    <td>{block.miner.substring(0,25)}...</td>
                                    <td>{block.timestamp}</td>
                                  </tr>
                                )
                              }) }
                            </tbody>
                          </table>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              </main>
            </div>
          </div>
         </section> 
    
    
    </div>  
    

   );


  }
}

 

export default App;