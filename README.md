Worker Search
A simple, client-side search and filter tool for viewing worker statuses and copying relevant data. Built with vanilla HTML, CSS, and JavaScript.

(Replace the link above with your own GitHub Pages link after you deploy it!)

📸 Screenshot
Here is the layout for each worker item in the list:

✨ Features
Dynamic Search: Instantly filter the list by ID, Phone, Company, Serial, or IMEI as you type.

Order Mode: Search for multiple items (separated by a space) and preserve their exact order in the results.

Data Selection:

Click anywhere on a row to select/deselect it.

Use checkboxes for individual selection.

Use the "Select All" button to toggle all visible items.

Bulk Copy:

Select multiple items and copy data by category (All, Status, IDs, Phones, etc.).

The "All" button formats data with tabs for easy pasting into spreadsheets.

Single-Click Copy: Click on any individual piece of data (like an ID or Phone Number) to copy it instantly.

Status Highlighting: Worker statuses (Online, Degraded, Offline) are color-coded for quick visibility.

Refresh Timer: A "Last refresh" timer shows how long it's been since the data was loaded.

🚀 How to Use
Click the Refresh Data button to load the sample dataset.

Use the search bar at the top to filter the results.

Click on items in the list to select them.

Use the buttons in the "actions" panel to copy the data you need.

💻 Technologies Used
HTML5: For the application structure.

CSS3: For all styling, including Flexbox and Grid layouts.

JavaScript (ES6+): For all application logic, including search, filtering, and DOM manipulation.

🛠️ How to Run Locally
This project has no external dependencies. You can run it locally in two simple steps:

Clone or Download the Repository:

Bash

git clone https://github.com/syang48/Worker-Search.git
(Or, you can download the project as a ZIP file and extract it.)

Open the File: Navigate to the project folder and double-click the index.html file to open it in your web browser.

