import Layout from './components/Layout'
import Chart from './components/Chart'
import './App.css'

function App() {
  return (
    <Layout>
      <div className="grid grid-cols-12 gap-6">
        <aside className="col-span-3 bg-slate-800 p-4 rounded-md">
          <h3 className="text-sm font-semibold mb-3">Assets</h3>
          <ul className="space-y-2 text-sm text-slate-300">
            <li className="flex justify-between"><span>BTC</span><span>$98,450</span></li>
            <li className="flex justify-between"><span>ETH</span><span>$3,450</span></li>
            <li className="flex justify-between"><span>APPL</span><span>$264</span></li>
          </ul>
        </aside>

        <section className="col-span-6">
          <Chart />
        </section>

        <aside className="col-span-3 bg-slate-800 p-4 rounded-md">
          <h3 className="text-sm font-semibold mb-3">News Feed</h3>
          <ul className="space-y-3 text-sm text-slate-300">
            <li>SCOTUS strikes down tariffs</li>
            <li>Nvidia scales OpenAI investment</li>
            <li>Trump declares emergency</li>
          </ul>
        </aside>
      </div>
    </Layout>
  )
}

export default App
