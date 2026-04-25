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
  const [copySuccess, setCopySuccess] = useState(false);
  const [mounted, setMounted] = useState(false);

  // --- 2. DATA FETCHING (FROM MONGODB API) ---
  const fetchWorkers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/workers");
      if (!response.ok) throw new Error("Failed to fetch");
      
      const data = await response.json();
      
      // MongoDB returns an array of workers
      const rawData = Array.isArray(data.workers) ? data.workers : [];

      const mapped = rawData.map((item: any) => ({
        status: item.status || 'OFFLINE',
        // Checks for multiple ID field possibilities
        workerId: item.workerId || item.id || item._id?.toString() || 'N/A',
        displayPhoneNumber: item.displayPhoneNumber || item.phoneNumber || 'N/A',
        company: item.company || item.assignedCompany || 'N/A', 
        serialNumber: item.serialNumber || 'N/A',
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
        item.displayPhoneNumber, item.serialNumber, item.imei
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

  const handleToggleSelect = () => {
    const allVisibleSelected = dataToDisplay.length > 0 && 
      dataToDisplay.every(item => selectedItems.has(item.workerId));

    const newSelection = new Set(selectedItems);
    if (allVisibleSelected) {
      dataToDisplay.forEach(item => newSelection.delete(item.workerId));
    } else {
      dataToDisplay.forEach(item => newSelection.add(item.workerId));
    }
    setSelectedItems(newSelection);
  };

  const toggleItem = (id: string) => {
    const newSelection = new Set(selectedItems);
    if (newSelection.has(id)) newSelection.delete(id);
    else newSelection.add(id);
    setSelectedItems(newSelection);
  };

  const handleMultiCopy = (field: string) => {
    const selected = allData.filter(i => selectedItems.has(i.workerId));
    if (selected.length === 0) return;

    const output = selected.map((i: any) => {
      if (field === 'all') return `${i.workerId}\t${i.displayPhoneNumber}\t${i.serialNumber}`;
      return i[field as keyof typeof i] || "N/A";
    }).join('\n');
    
    copyToClipboard(output);
  };

  const getStatusStyle = (status: string) => {
    const s = status.toLowerCase();
    if (s === 'online') return 'bg-green-100 text-green-800 border-green-200';
    if (s === 'degraded' || s === 'warning') return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  if (!mounted) return null;

  const isAllSelected = dataToDisplay.length > 0 && dataToDisplay.every(i => selectedItems.has(i.workerId));

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 p-6 font-sans">
      <div className="max-w-7xl mx-auto w-full">
        <header className="mb-6">
          <h1 className="text-3xl font-black italic uppercase tracking-tighter mb-4 text-blue-600">FleetWatch</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <input 
              type="text" placeholder="Bulk Search (IDs/Phones)..." 
              className="w-full p-3 rounded-xl border bg-white dark:bg-zinc-900 dark:border-zinc-800 outline-none focus:ring-2 focus:ring-blue-600"
              value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            />
            <input 
              type="text" placeholder="Filter OUT..." 
              className="w-full p-3 rounded-xl border bg-white dark:bg-zinc-900 dark:border-zinc-800 outline-none focus:ring-2 focus:ring-red-600"
              value={filterOut} onChange={(e) => setFilterOut(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white dark:bg-zinc-900 rounded-xl border dark:border-zinc-800 shadow-sm">
            <div className="flex gap-2">
              <button 
                onClick={handleToggleSelect} 
                className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-colors ${
                  isAllSelected ? 'bg-zinc-800 text-white' : 'bg-blue-600 text-white'
                }`}
              >
                {isAllSelected ? 'Clear Visible' : 'Select Visible'}
              </button>
              <button 
                onClick={fetchWorkers} 
                className="px-4 py-2 border dark:border-zinc-700 rounded-lg text-[10px] font-black uppercase hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                {isLoading ? 'Syncing...' : 'Refresh DB'}
              </button>
            </div>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase cursor-pointer">
                <input type="checkbox" checked={idMode} onChange={() => setIdMode(!idMode)} /> ID Mode
              </label>
              <label className="flex items-center gap-2 text-[10px] font-black uppercase cursor-pointer">
                <input type="checkbox" checked={isOrdered} onChange={() => setIsOrdered(!isOrdered)} /> Order (ID A-Z)
              </label>
            </div>
          </div>
        </header>

        <div className="flex flex-wrap gap-2 mb-6">
          {['all', 'status', 'workerId', 'displayPhoneNumber', 'company', 'serialNumber', 'imei'].map(field => (
            <button 
              key={field} onClick={() => handleMultiCopy(field)}
              className="px-3 py-1.5 bg-zinc-200 dark:bg-zinc-800 rounded text-[9px] font-black uppercase hover:bg-blue-600 hover:text-white transition-all"
            >
              {field.replace('display', '').replace('worker', '')}
            </button>
          ))}
        </div>

        <div className="text-[10px] font-bold text-zinc-500 mb-2 uppercase tracking-widest flex justify-between">
          <span>{selectedItems.size} selected / {allData.length} total</span>
          <span className="bg-zinc-200 dark:bg-zinc-800 px-2 py-0.5 rounded">Showing {dataToDisplay.length} items</span>
        </div>
        <hr className="dark:border-zinc-800 mb-6" />

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 opacity-50">
             <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
             <p className="text-[10px] font-black uppercase tracking-widest">Accessing MongoDB...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(4,minmax(0,1fr))] gap-4 w-full">
            {dataToDisplay.map((item) => {
              const isSelected = selectedItems.has(item.workerId);
              return (
                <div 
                  key={item.workerId}
                  onClick={() => toggleItem(item.workerId)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer w-full bg-white dark:bg-zinc-900 overflow-hidden ${
                    isSelected ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md' : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300'
                  }`}
                >
                  <div className="flex items-start gap-3 w-full">
                    <input type="checkbox" checked={isSelected} readOnly className="mt-1 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center mb-1">
                        <div className="w-20 flex-shrink-0">
                          <span className={`text-[7px] font-black px-1 py-1 rounded-md border uppercase text-center block tracking-widest ${getStatusStyle(item.status)}`}>
                            {item.status}
                          </span>
                        </div>
                        <span 
                          className="ml-4 text-xs font-bold text-blue-600 hover:underline cursor-copy truncate"
                          onClick={(e) => { e.stopPropagation(); copyToClipboard(item.workerId); }}
                        >
                          {item.workerId}
                        </span>
                      </div>
                      
                      {!idMode && (
                        <div className="grid grid-cols-1 gap-1 mt-2 text-[10px] w-full">
                          <p className="truncate">
                            <span className="text-zinc-400 font-bold uppercase mr-1">Co:</span>
                            <span className="hover:text-blue-500" onClick={(e) => { e.stopPropagation(); copyToClipboard(item.company); }}>{item.company}</span>
                          </p>
                          <p className="truncate">
                            <span className="text-zinc-400 font-bold uppercase mr-1">Ph:</span>
                            <span className="hover:text-blue-500" onClick={(e) => { e.stopPropagation(); copyToClipboard(item.displayPhoneNumber); }}>{item.displayPhoneNumber}</span>
                          </p>
                          <p className="text-[9px] text-zinc-500 font-mono mt-1 truncate hover:text-blue-500" onClick={(e) => { e.stopPropagation(); copyToClipboard(item.serialNumber); }}>
                            {item.serialNumber}
                          </p>
                          <p className="text-[9px] text-zinc-400 font-mono truncate hover:text-blue-500" onClick={(e) => { e.stopPropagation(); copyToClipboard(item.imei); }}>
                            {item.imei}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {copySuccess && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-2 bg-green-600 text-white rounded-full font-bold shadow-xl text-xs uppercase tracking-widest z-50">
          Copied!
        </div>
      )}
    </div>
  );
}