import React, { Component } from 'react';
import GraphHeader from '../components/GraphHeader';
import Graph from '../components/Graph';
import axios from 'axios'

class GraphContainer extends Component {


  state = {
    chartData:[],
    show: false
  }

  componentDidMount = () => {
    this.chartData()
  }
  chartData = () => {
  // const range = this.state.testRange
  const symbol = this.props.symbol

  const range = '1d'
  // const symbol = 'AAPL'
  let label = []
  let open = []

  axios
    .get(`https://api.iextrading.com/1.0/stock/${symbol}/chart/${range}`)
    .then(res => {
      let quotes = res.data

      return quotes.map(quote => {
        let tempTime = quote.minute.split(':')
        let combined = tempTime[0] + tempTime[1]
        // console.log('combined', combined)
        let parsed = parseInt(combined)
        // console.log('parsed', parsed)
        if (parsed % 5 === 0) {
          label.push(quote.label)
          // console.log(label)
          open.push(quote.open)
          // console.log(open)
        }
      })
    })

  this.setState({
    chartData: {
      labels: label,
      // labels: ['10:00 am', '10:05 am'],
      //  These labels need to be minutes
      datasets: [
        {
          fill: false,
          // data: [150, 134, 144],
          data: open,
          // Data points are stock high prices
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 225, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(255, 99, 132, 0.6)'
          ]
        }
      ]
    }
  })
}

  handleClick = () => {
    // console.log('helllo')
    this.setState(prevState => ({
      show: !prevState.show
    }))
  } 
  

  render() {
    console.log('Graph Container', this.props)
    // console.log('Graph Container State', this.state)
    return <div>
         <GraphHeader handleClick={this.handleClick} />
         {this.state.show === false ? null : <Graph chartData={this.state.chartData} />}
      </div>;
  }
}

export default GraphContainer;