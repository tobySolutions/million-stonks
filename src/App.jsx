import { useState, useEffect } from 'react';
import MillionStockTable from './MillionStockTable';
import ReactStockTable from './ReactStockTable';
import { allFakers } from '@faker-js/faker';
import LagRadar from 'react-lag-radar';



function Market({useReact, faker}) {
  const [market, setMarket] = useState(() => {
    return Array.from({length: 1000},  () => ({
      name: faker.company.name(),
      symbol: faker.finance.currencyCode(),
      price: Math.floor(Math.random() * 1000),
      delta: 0,
    }))
  });

  useEffect(() => {
    setInterval(() => {
      for (const stock of market) {
        const chance = Math.random();
        const delta = Math.floor(Math.random() * 100);

        if (chance < 0.1) {
          stock.price -= delta;
          stock.delta = - delta;
        } else if (chance  > 0.1){
          stock.price += delta;
          stock.delta = delta;
        }
      }

      market.sort((a, b) => b.price - a.price);
      setMarket([...market])
    })
  }, []);

  return useReact ? (
    <ReactStockTable data={market}/>
  ) : (
    <MillionStockTable data={market}/>
  )
}


function App() {
  const [useReact, setUseReact] = useState(true);

  const handleUseReact = () => {
    setUseReact(!useReact)
  }

  return (
    <main className='p-[1rem]'>
      <LagRadar/>
      <button
       type='button'
       className='my-[1rem] bg-gray-200/40 rounded border border-gray-500 py-[.2em] px-[1em]'
       onClick={handleUseReact}
      >
       Switch
      </button>
      <p>
        Currently Using: <b>{useReact ? 'React' : 'Million'}</b>
      </p>
      <div className='flex my-[1rem]'>
        <Market useReact={useReact} faker={allFakers['en']} />
        <Market useReact={useReact} faker={allFakers['es_MX']} />
        <Market useReact={useReact} faker={allFakers['zh_CN']} />
      </div>
    </main>
  )
}

export default App
