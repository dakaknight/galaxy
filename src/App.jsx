import React, { useEffect, useState } from 'react'
import MapViz from './components/MapViz.jsx'
import Sidebar from './components/Sidebar.jsx'
import FilterPanel from './components/FilterPanel.jsx'
import ExportButton from './components/ExportButton.jsx'
import Charts from './components/Charts.jsx'

export default function App(){
  const [data,setData] = useState([])
  const [filtered,setFiltered] = useState([])
  const [selected,setSelected] = useState(null)
  const [shortlist,setShortlist] = useState([])
  const [filters,setFilters] = useState({country:'All', platform:'All', category:'All', minFollowers:0, maxFollowers:3000000})
  const [loading,setLoading] = useState(true)
  const [showWelcome,setShowWelcome] = useState(true)

  useEffect(()=>{
    const timer = setTimeout(()=>{
      fetch('/src/data/influencers_east_africa.json')
        .then(r=>r.json())
        .then(d=>{
          setData(d); setFiltered(d); setLoading(false)
          setTimeout(()=> setShowWelcome(false), 5000)
        })
    }, 1200)
    return ()=>clearTimeout(timer)
  },[])

  useEffect(()=>{
    let cur = data.filter(d=> 
      (filters.country==='All' || d.country===filters.country) &&
      (filters.platform==='All' || d.platform===filters.platform) &&
      (filters.category==='All' || d.category===filters.category) &&
      d.followers>=filters.minFollowers && d.followers<=filters.maxFollowers
    )
    setFiltered(cur)
  },[filters, data])

  const addToShortlist = (item)=>{
    if(!shortlist.find(s=>s.id===item.id)){
      setShortlist([...shortlist, item])
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="flex items-center justify-between px-6 py-3 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <img src="/assets/swangz_logo.png" alt="Swangz" className="h-7 opacity-90" />
          <h1 className="text-lg font-semibold tracking-wide">Influencer Galaxy • East Africa</h1>
        </div>
        <div className="text-xs text-swangz-gold">Version 1.0 — Internal MVP</div>
      </header>

      {loading ? (
        <div className="h-[80vh] flex flex-col items-center justify-center gap-3">
          <div className="animate-pulse text-swangz-gold text-sm">🪩 Mapping East Africa’s Influencer Galaxy…</div>
          <div className="w-64 h-1 bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full w-1/2 bg-swangz-gold animate-pulse"></div>
          </div>
        </div>
      ):(
        <main className="grid grid-cols-12 gap-0">
          <aside className="col-span-2 border-r border-zinc-800 p-3">
            <FilterPanel data={data} filters={filters} setFilters={setFilters} />
            <div className="mt-6">
              <Charts data={filtered} />
            </div>
          </aside>
          <section className="col-span-7 p-3">
            <MapViz data={filtered} onSelect={setSelected} />
          </section>
          <aside className="col-span-3 border-l border-zinc-800 p-3">
            <Sidebar influencer={selected} addToShortlist={addToShortlist} shortlist={shortlist} />
            <div className="mt-4">
              <ExportButton shortlist={shortlist} />
            </div>
          </aside>
        </main>
      )}

      {(!loading && showWelcome) && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center z-50">
          <div className="relative w-[560px] max-w-[92vw] border border-swangz-gold/60 rounded-xl p-6 bg-zinc-950/90 shadow-xl">
            <img src="/assets/swangz_logo.png" alt="Swangz" className="absolute -top-4 -right-4 h-10 opacity-80" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
              <img src="/assets/swangz_logo.png" className="h-40" />
            </div>
            <h2 className="text-2xl font-semibold">Welcome to Swangz Influencer Galaxy</h2>
            <p className="text-zinc-300 mt-2">
              Explore East Africa’s influencer landscape. Filter, shortlist, and export your perfect brand pitch deck.
            </p>
            <p className="text-xs text-zinc-500 mt-4 italic">
              Developed by Gabriel Mundaka · Swangz Digital Team
            </p>
            <div className="mt-5 flex justify-end">
              <button onClick={()=>setShowWelcome(false)} className="px-3 py-2 rounded bg-swangz-gold text-black font-semibold hover:opacity-90 transition">
                Enter Dashboard →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
