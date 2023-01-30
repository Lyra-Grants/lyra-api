import getLyra from './utils/getLyra'
import { request, GraphQLClient, gql } from 'graphql-request'
import express, { Express, Request, Response } from 'express'
import compression from 'compression'
import dotenv from 'dotenv'
import { TradeQueryResult, TRADE_QUERY_FRAGMENT } from './constants/queries'

const app: Express = express()
app.set('port', process.env.PORT || 3000)
app.use(compression())

const query = gql`
  query { trades(orderBy: blockNumber, orderDirection: desc) {
    ${TRADE_QUERY_FRAGMENT}
  }
}
`
console.log(query)
const lyra = getLyra()
//https://subgraph.satsuma-prod.com/lyra/optimism-mainnet/playground
const subgraphClient = new GraphQLClient('https://api.lyra.finance/subgraph/optimism/v1/api')
dotenv.config()

app.get('/', (req: Request, res: Response) => {
  res.send('LYRA API SERVER')
})

app.get('/trades', async (req: Request, res: Response) => {
  const queryResult = await subgraphClient.request<TradeQueryResult[]>(query)
  res.send(queryResult)
})

export default app
