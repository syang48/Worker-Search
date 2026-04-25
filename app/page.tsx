"use client";

import { useState, useMemo, useEffect } from "react";

export default function Home() {
  // --- 1. STATE ---
  const [allData, setAllData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOut, setFilterOut] = useState("");
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [idMode, setIdMode] = useState(false);
  const [isOrdered, setIsOrdered] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "row">("grid"); 
  const [copySuccess, setCopySuccess] = useState(false);
  const [mounted, setMounted] = useState(false);

  // --- 2. DATA FETCHING ---
  const fetchWorkers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/workers");
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      const rawData = Array.isArray(data.workers) ? data.workers : [];

      const mapped = rawData.map((item: any) => ({
        status: item.status || 'OFFLINE',
        workerId: item.workerId || item.id || item._id?.toString() || 'N/A',
        displayPhoneNumber: item.displayPhoneNumber || item.phoneNumber || 'N/A',
        company: item.company || item.assignedCompany || 'N/A', 
        imei: item.imei || item.IMEI || 'N/A'
      }));
      
      setAllData(mapped);
    } catch (error) {
      console.error("Error loading workers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { 
    setMounted(true); 
    fetchWorkers();
  }, []);

  // --- 3. SEARCH & ORDER LOGIC ---
  const dataToDisplay = useMemo(() => {
    const sTerms = searchTerm.toLowerCase().trim().split(/\s+/).filter(t => t !== "");
    const fTerms = filterOut.toLowerCase().trim().split(/\s+/).filter(t => t !== "");

    let result = allData.filter(item => {
      const hayStack = [
        item.workerId, item.status, item.company, 
        item.displayPhoneNumber, item.imei
      ].join(' ').toLowerCase();

      const matchesSearch = sTerms.length === 0 || sTerms.some(term => hayStack.includes(term));
      const matchesFilter = fTerms.length === 0 || !fTerms.some(term => hayStack.includes(term));

      return matchesSearch && matchesFilter;
    });

    if (isOrdered) {
      result = [...result].sort((a, b) => a.workerId.localeCompare(b.workerId));
    }

    return result;
  }, [searchTerm, filterOut, allData, isOrdered]);

  // --- 4. UI FUNCTIONS ---
  const copyToClipboard = (text: string) => {
    if (!text || text === "N/A") return;
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 1500);
    });
  };

  const toggleItem = (id: string) => {
    const newSelection = new Set(selectedItems);
    if (newSelection.has(id)) newSelection.delete(id);
    else newSelection.add(id);
    setSelectedItems(newSelection);
  };

  const getStatusStyle = (status: string) => {
    const s = status.toLowerCase();
    if (s === 'online') return 'bg-green-100 text-green-800 border-green-300';
    if (s === 'degraded' || s === 'warning') return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    return 'bg-red-100 text-red-800 border-red-300';
  };

  if (!mounted) return null;

  const isAllSelected = dataToDisplay.length > 0 && dataToDisplay.every(i => selectedItems.has(i.workerId));

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto w-full">
        <header className="mb-8">
          <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-6 text-blue-600 underline decoration-4 underline-offset-8">FleetWatch</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <input 
              type="text" placeholder="Bulk Search..." 
              className="w-full p-4 text-lg rounded-2xl border bg-white dark:bg-zinc-900 dark:border-zinc-800 outline-none focus:ring-4 focus:ring-blue-600/20 transition-all"
              value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            />
            <input 
              type="text" placeholder="Filter OUT..." 
              className="w-full p-4 text-lg rounded-2xl border bg-white dark:bg-zinc-900 dark:border-zinc-800 outline-none focus:ring-4 focus:ring-red-600/20 transition-all"
              value={filterOut} onChange={(e) => setFilterOut(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-6 p-5 bg-white dark:bg-zinc-900 rounded-2xl border dark:border-zinc-800 shadow-sm">
            <div className="flex gap-3">
              <button 
                onClick={() => setSelectedItems(isAllSelected ? new Set() : new Set(dataToDisplay.map(i => i.workerId)))} 
                className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-sm ${isAllSelected ? 'bg-zinc-800 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
              >
                {isAllSelected ? 'Clear All' : 'Select Visible'}
              </button>
              <button onClick={fetchWorkers} className="px-6 py-2.5 border-2 dark:border-zinc-700 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all">
                {isLoading ? 'Syncing...' : 'Refresh DB'}
              </button>
            </div>

            <div className="flex items-center gap-4 bg-zinc-100 dark:bg-zinc-800 p-1.5 rounded-xl">
              <button onClick={() => setViewMode("grid")} className={`px-5 py-2 rounded-lg text-xs font-black uppercase transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-zinc-700 shadow-md text-blue-600' : 'opacity-40'}`}>Grid</button>
              <button onClick={() => setViewMode("row")} className={`px-5 py-2 rounded-lg text-xs font-black uppercase transition-all ${viewMode === 'row' ? 'bg-white dark:bg-zinc-700 shadow-md text-blue-600' : 'opacity-40'}`}>Row</button>
            </div>

            <div className="flex gap-8">
              <label className="flex items-center gap-3 text-xs font-black uppercase cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-zinc-300 text-blue-600" checked={idMode} onChange={() => setIdMode(!idMode)} /> 
                <span className="group-hover:text-blue-500 transition-colors">ID Mode</span>
              </label>
              <label className="flex items-center gap-3 text-xs font-black uppercase cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-zinc-300 text-blue-600" checked={isOrdered} onChange={() => setIsOrdered(!isOrdered)} /> 
                <span className="group-hover:text-blue-500 transition-colors">Order A-Z</span>
              </label>
            </div>
          </div>
        </header>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 opacity-50">
             <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-6"></div>
             <p className="text-xs font-black uppercase tracking-widest">Accessing MongoDB...</p>
          </div>
        ) : (
          <div className={`grid gap-4 w-full ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" : "grid-cols-1"}`}>
            {dataToDisplay.map((item) => {
              const isSelected = selectedItems.has(item.workerId);
              return (
                <div 
                  key={item.workerId}
                  onClick={() => toggleItem(item.workerId)}
                  className={`border-2 transition-all cursor-pointer w-full bg-white dark:bg-zinc-900 overflow-hidden shadow-sm p-4 rounded-xl flex ${
                    viewMode === "row" 
                      ? "flex-wrap items-center gap-y-4" 
                      : "flex-col p-5"
                  } ${
                    isSelected ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/20' : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300'
                  }`}
                >
                  {/* HEADER SECTION: Status, Checkbox, ID */}
                  <div className={`flex items-center ${viewMode === "row" ? "gap-6 mr-10" : "gap-4 mb-4"}`}>
                    <input type="checkbox" checked={isSelected} readOnly className="w-5 h-5 rounded-md border-zinc-300 flex-shrink-0" />
                    
                    <div className="flex items-center gap-4">
                      <div className="w-20 flex-shrink-0">
                        <span className={`text-[8px] font-black px-2 py-1.5 rounded-lg border-2 uppercase text-center block tracking-widest ${getStatusStyle(item.status)}`}>
                          {item.status}
                        </span>
                      </div>
                      
                      {/* ID stays visible in both modes */}
                      <span 
                        className="text-sm font-black text-blue-600 hover:underline cursor-copy tracking-tight"
                        onClick={(e) => { e.stopPropagation(); copyToClipboard(item.workerId); }}
                      >
                        {item.workerId}
                      </span>

                      {/* Row-specific Company Placement (Tight with ID) */}
                      {viewMode === "row" && !idMode && (
                         <p className="text-sm font-black truncate hover:text-blue-500 transition-colors" onClick={(e) => { e.stopPropagation(); copyToClipboard(item.company); }}>
                            <span className="text-zinc-400 uppercase text-[9px] mr-1 font-black">co:</span>
                            {item.company}
                         </p>
                      )}
                    </div>
                  </div>
                  
                  {/* INFO SECTION: Company (for Grid), Phone, IMEI */}
                  {!idMode && (
                    <div className={`flex ${viewMode === "row" 
                      ? "flex-wrap items-center gap-x-10 gap-y-2" 
                      : "flex-col gap-3 pt-4 border-t dark:border-zinc-800"
                    } text-sm font-black`}>
                      
                      {/* Company: Only shows here in Grid view since it's grouped with ID in Row view */}
                      {viewMode === "grid" && (
                        <p className="truncate hover:text-blue-500 transition-colors" onClick={(e) => { e.stopPropagation(); copyToClipboard(item.company); }}>
                          <span className="text-zinc-400 uppercase text-[9px] mr-2 font-black">Co:</span>
                          {item.company}
                        </p>
                      )}
                      
                      <p className="truncate min-w-[160px] hover:text-blue-500 transition-colors" onClick={(e) => { e.stopPropagation(); copyToClipboard(item.displayPhoneNumber); }}>
                        <span className="text-zinc-400 uppercase text-[9px] mr-2 font-black">Ph:</span>
                        {item.displayPhoneNumber}
                      </p>

                      <p className="truncate min-w-[180px] hover:text-blue-500 font-mono transition-colors" onClick={(e) => { e.stopPropagation(); copyToClipboard(item.imei); }}>
                        <span className="text-zinc-400 uppercase text-[9px] mr-2 font-black">IMEI:</span>
                        {item.imei}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {copySuccess && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 px-8 py-3 bg-blue-600 text-white rounded-2xl font-black shadow-2xl text-xs uppercase tracking-widest animate-bounce z-50">
          Copied!
        </div>
      )}
    </div>
  );
}
