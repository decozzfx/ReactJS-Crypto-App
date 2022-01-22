import React, { useEffect, useState } from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Input } from 'antd'

import { useGetCryptosQuery } from '../services/cryptoApi'

const Cryptocurrencies = ({ simplified }) => {
   const count = simplified ? 10 : 100
   const { data: cryptosList, isFeaching } = useGetCryptosQuery(count)
   const [cryptos, setCryptos] = useState([])
   const [searchTerm, setSearchTerm] = useState('')

   useEffect(() => {
      const filterData = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()))
      
      setCryptos(filterData)
   },[cryptosList, searchTerm])
   
   if(isFeaching) return 'Loading...'

  return (
   <>
      {!simplified && (
         <div className='search-crypto'  >
            <input placeholder='Search Cryptocurrency' onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} />   
         </div>
      )}
      <Row gutter={[15, 15]} className='crypto-card-container' >
         {cryptos?.map((crypto) => (
            <Col xs={24} sm={12} lg={6} className='crypto-card' key={crypto.uuid} >
               <Link to={`/crypto/${crypto.uuid}`} >
                  <Card 
                  title={`${crypto.rank}. ${crypto.name} `} 
                  extra={ <img className='crypto-image' src={crypto.iconUrl} /> }
                  hoverable
                  >
                  <p>Price: {millify(crypto.price)}</p>
                  <p>MarketCap: {millify(crypto.marketCap)}</p>
                  <p>Daily Change: {millify(crypto.change)}%</p>
                  </Card>               
               </Link>
            </Col>
         ))}
      </Row>
   </>
   )
}

export default Cryptocurrencies
