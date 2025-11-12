const searchInput = document.getElementById('searchInput');
const resultsList = document.getElementById('resultsList');
const loadingIndicator = document.getElementById('loading');
const selectAllBtn = document.getElementById('selectAllBtn');
const refreshDataBtn = document.getElementById('refreshDataBtn');
const statusIndicator = document.getElementById('selection-status');
const copySuccessIndicator = document.getElementById('copySuccess');
const checkboxModeToggle = document.getElementById('checkboxModeToggle');
const lastRefreshTimeSpan = document.getElementById('lastRefreshTime');

let allData = [];
let selectedItems = new Set();
let dataToDisplay = [];
let lastTimestamp = null;

// --- DATA MAPPING ---

function mapApiData(apiItem) {
    const displayPhoneNumber = apiItem.phoneNumber || 'N/A';
    return {
        status: apiItem.status || 'N/A',
        workerId: apiItem.id || 'UnknownID',
        displayPhoneNumber: displayPhoneNumber,
        phoneNumber: displayPhoneNumber.replace(/[^0-9]/g, ''),
        companyAssigned: apiItem.assignedCompany || 'N/A',
        serialNumber: apiItem.serialNumber || 'N/A',
        imei: apiItem.IMEI || 'N/A'
    };
}


// --- CORE UTILITY FUNCTIONS ---

function showCopySuccess(isWarning = false) {
    if (isWarning) {
        copySuccessIndicator.style.backgroundColor = '#ffc107';
        copySuccessIndicator.textContent = "Select at least one row.";
    } else {
        copySuccessIndicator.style.backgroundColor = '#28a745';
        copySuccessIndicator.textContent = "Copied!";
    }
    copySuccessIndicator.style.opacity = '1';
    setTimeout(() => {
        copySuccessIndicator.style.opacity = '0';
    }, isWarning ? 2000 : 1500);
}

function copyToClipboard(text, isWarning = false) {
    if (!navigator.clipboard) {
        // Fallback for older browsers (or insecure contexts like http://)
        try {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            if (!isWarning) showCopySuccess();
        } catch (err) {
            console.error('Fallback copy failed: ', err);
            alert('Copy failed. Check console for details.');
        }
        return;
    }

    // Modern, secure way
    navigator.clipboard.writeText(text).then(() => {
        if (!isWarning) showCopySuccess();
    }).catch(err => {
        console.error('Async copy failed: ', err);
        alert('Copy failed. Check console for details.');
    });
}

function updateStatusIndicator() {
    const totalLoaded = allData.length;
    statusIndicator.textContent = `${selectedItems.size} items selected out of ${totalLoaded} loaded items`;
}

function formatTimeAgo(timestamp) {
    if (!timestamp) return 'Never refreshed';
    
    const now = Date.now();
    const seconds = Math.floor((now - timestamp) / 1000);

    if (seconds < 0) return 'Error';

    if (seconds < 60) return `${seconds}s ago`;

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;

    const days = Math.floor(hours / 24);
    return `${days}d ago`;
}

function updateLastRefreshTimeDisplay() {
    if (lastTimestamp) {
        lastRefreshTimeSpan.textContent = `Refresh: ${formatTimeAgo(lastTimestamp)}`;
    } else {
        lastRefreshTimeSpan.textContent = `Refresh: Never`;
    }
}

function startTimer() {
    setInterval(updateLastRefreshTimeDisplay, 1000);
}

function getStatusClass(status) {
    status = status.toLowerCase();
    if (status.includes('online')) return 'status-online';
    if (status.includes('degraded')) return 'status-degraded';
    if (status.includes('offline')) return 'status-offline';
    return '';
}

// --- DATA FETCHING & REFRESH LOGIC ---

function handleRefreshData() {
    resultsList.innerHTML = '';
    allData = [];
    selectedItems.clear();
    loadingIndicator.style.display = 'block';
    updateStatusIndicator();
    lastRefreshTimeSpan.textContent = `Last refresh: Fetching...`;

    // Simulate a network fetch using setTimeout
    setTimeout(() => {
        try {
            // Use the global SAMPLE_API_DATA variable from sample-data.js
            const rawJson = SAMPLE_API_DATA;
            
            const workersObject = rawJson.workers;

            if (!workersObject || typeof workersObject !== 'object') {
                throw new Error('Sample data missing expected "workers" object.');
            }
            const dataToProcess = Object.values(workersObject);
            allData = dataToProcess.map(mapApiData);

            lastTimestamp = Date.now();
            performSearch();

            if (allData.length === 0) {
                 resultsList.textContent = 'Data loaded, but no records were mapped.';
            }
        } catch (error) {
            console.error("Data Load Error:", error);
            resultsList.textContent = `Data Load Error: ${error.message}`;
            lastTimestamp = null;
        } finally {
            loadingIndicator.style.display = 'none';
            updateLastRefreshTimeDisplay();
        }
    }, 500); // Simulate a 500ms (0.5 second) delay
}


// --- SEARCH & DISPLAY LOGIC ---

function performSearch() {
    const rawSearchTerm = searchInput.value.toLowerCase().trim();
    resultsList.innerHTML = '';
    dataToDisplay = [];
    
    if (allData.length === 0) return;

    const isOrderMode = checkboxModeToggle.checked;

    if (!rawSearchTerm) {
        dataToDisplay = allData;
    } else {
        const searchTerms = rawSearchTerm.split(/[,|\s]+/)
                                       .map(term => term.trim())
                                       .filter(term => term.length > 0);

        if (searchTerms.length === 0) return;

        if (isOrderMode) {
            const foundData = [];
            const foundWorkerIds = new Set();

            searchTerms.forEach(term => {
                const foundItem = allData.find(item => {
                    if (foundWorkerIds.has(item.workerId)) return false;
                    
                    const searchableString = Object.values(item).join(' ').toLowerCase();
                    return searchableString.includes(term);
                });

                if (foundItem) {
                    foundData.push(foundItem);
                    foundWorkerIds.add(foundItem.workerId);
                }
            });
            dataToDisplay = foundData;
        } else {
            dataToDisplay = allData.filter(item => {
                const searchableString = Object.values(item).join(' ').toLowerCase();
                return searchTerms.some(term => searchableString.includes(term));
            });
        }
    }
    
    if (dataToDisplay.length > 0) {
        dataToDisplay.forEach(item => {
            const isSelected = selectedItems.has(item.workerId);
            const row = document.createElement('div');
            row.className = `result-item ${isSelected ? 'selected' : ''}`;
            row.dataset.workerId = item.workerId;
            
            // UPDATED HTML TEMPLATE START HERE
            const statusHtml = `<span class="${getStatusClass(item.status)}">${item.status}</span>`;

            row.innerHTML = `
                <div class="checkbox-container">
                    <input type="checkbox" class="selection-checkbox" data-worker-id="${item.workerId}" ${isSelected ? 'checked' : ''}>
                </div>
                <div class="data-content">
                    <div class="status-header" data-field="status">${statusHtml}</div>
                    <div class="data-grid">
                        <strong>ID:</strong> <span class="copyable-value" data-field="workerId" data-value="${item.workerId}">${item.workerId}</span>
                        <strong>Phone:</strong> <span class="copyable-value" data-field="displayPhoneNumber" data-value="${item.displayPhoneNumber}">${item.displayPhoneNumber}</span>
                        <strong>Company:</strong> <span class="copyable-value" data-field="companyAssigned" data-value="${item.companyAssigned}">${item.companyAssigned}</span>
                        <strong>Serial:</strong> <span class="copyable-value" data-field="serialNumber" data-value="${item.serialNumber}">${item.serialNumber}</span>
                        <strong>IMEI:</strong> <span class="copyable-value" data-field="imei" data-value="${item.imei}">${item.imei}</span>
                    </div>
                </div>
            `;
            // UPDATED HTML TEMPLATE END HERE
            
            resultsList.appendChild(row);
        });

    } else if (!rawSearchTerm && allData.length > 0) {
        resultsList.textContent = `No results found for your search terms.`;
    } else if (allData.length === 0) {
        resultsList.textContent = `No data loaded. Click "Refresh Data" to begin.`;
    }
    
    updateStatusIndicator();
}

// --- SELECTION HANDLERS ---

function selectAllVisibleItems() {
    const visibleWorkerIds = dataToDisplay.map(item => item.workerId);
    const allVisibleSelected = visibleWorkerIds.every(id => selectedItems.has(id));
    
    const shouldSelect = !allVisibleSelected;

    dataToDisplay.forEach(item => {
        const workerId = item.workerId;
        const rowElement = resultsList.querySelector(`.result-item[data-worker-id="${workerId}"]`);
        const checkbox = rowElement ? rowElement.querySelector('.selection-checkbox') : null;

        if (checkbox) {
            checkbox.checked = shouldSelect;
            
            if (shouldSelect) {
                selectedItems.add(workerId);
                rowElement.classList.add('selected');
            } else {
                selectedItems.delete(workerId);
                rowElement.classList.remove('selected');
            }
        }
    });

    updateStatusIndicator();
}


function handleCheckboxChange(event) {
    const checkbox = event.target.closest('.selection-checkbox');
    if (!checkbox) return;

    const workerId = checkbox.dataset.workerId;
    const row = checkbox.closest('.result-item');

    if (checkbox.checked) {
        selectedItems.add(workerId);
        row.classList.add('selected');
    } else {
        selectedItems.delete(workerId);
        row.classList.remove('selected');
    }
    updateStatusIndicator();
}

function handleCopyableClick(event) {
    const valueSpan = event.target.closest('.copyable-value');
    if (!valueSpan) return;
    
    event.stopPropagation();

    const fieldKey = valueSpan.dataset.field;
    let valueToCopy = valueSpan.dataset.value;

    if (fieldKey === 'displayPhoneNumber') {
        if (valueToCopy.startsWith('+1')) {
            valueToCopy = valueToCopy.substring(2).trim();
        } else if (valueToCopy.startsWith('+')) {
            valueToCopy = valueToCopy.substring(1).trim();
        }
    }
    
    copyToClipboard(valueToCopy);
}

// --- BULK COPY LOGIC ---

function copySelectedData(field) {
    if (selectedItems.size === 0) {
        showCopySuccess(true);
        return;
    }

    const selectedData = allData.filter(item => selectedItems.has(item.workerId));
    let output = '';

    if (field === 'all') {
        output = selectedData.map(item => {
            let phone = item.displayPhoneNumber || '';
            if (phone.startsWith('+1')) {
                phone = phone.substring(2).trim();
            } else if (phone.startsWith('+')) {
                phone = phone.substring(1).trim();
            }
            return `${item.workerId}\t${phone}\t${item.serialNumber}`;
        }).join('\n');
    } else if (field === 'displayPhoneNumber') {
        output = selectedData.map(item => {
            let phone = item[field] || '';
            if (phone.startsWith('+1')) {
                phone = phone.substring(2).trim();
            } else if (phone.startsWith('+')) {
                phone = phone.substring(1).trim();
            }
            return phone;
        }).join('\n');
    } else if (field === 'status') {
         output = selectedData.map(item => item.status).join('\n');
    } else {
        output = selectedData.map(item => item[field] || '').join('\n');
    }
    
    copyToClipboard(output);
}


function handleCategoryCopyClick(event) {
    const button = event.target.closest('.multi-copy-btn');
    if (button) {
        const fieldKey = button.dataset.field;
        copySelectedData(fieldKey);
    }
}

// --- EVENT LISTENERS ---

resultsList.addEventListener('click', (e) => {
    handleCopyableClick(e);
    
    const row = e.target.closest('.result-item');
    if (row && !e.target.closest('input[type="checkbox"]')) {
        const checkbox = row.querySelector('.selection-checkbox');
        if (checkbox) {
            checkbox.checked = !checkbox.checked;
            const event = new Event('change', { bubbles: true });
            checkbox.dispatchEvent(event);
        }
    }
});

resultsList.addEventListener('change', handleCheckboxChange);

searchInput.addEventListener('input', performSearch);
selectAllBtn.addEventListener('click', selectAllVisibleItems);
checkboxModeToggle.addEventListener('change', performSearch);
refreshDataBtn.addEventListener('click', handleRefreshData);

document.querySelectorAll('.multi-copy-btn').forEach(button => {
    button.addEventListener('click', handleCategoryCopyClick);
});

// --- INITIALIZE APP ---
// (These run after the DOM is parsed because of the 'defer' attribute on the script tag)
startTimer();
performSearch();
