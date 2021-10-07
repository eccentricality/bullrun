export function indexedDB() {

    // Create db variable
    let db;
    
    // Create indexedDB instance for storing API response data
    const request = window.indexedDB.open("BannerNews", 1);

    // Conditional function for db version changes
    request.onupgradeneeded = function(event) {
        // Assign response to db variable
        db = event.target.result;
        // Create an objectStore called "articles"
        db.createObjectStore("articles", { autoIncrement : true });
    }

    // store data in IndexedDB for backup
    request.onsuccess = function(event) {
        // Assign response to db variable
        db = event.target.result;
        // Create a transaction on the BudgetStore db with readwrite access
        const transaction = db.transaction(["BannerNews"], "readwrite");
        // 
        // const articleStore = transaction.ob
    };

};