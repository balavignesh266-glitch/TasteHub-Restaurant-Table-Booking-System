/**
 * TasteHub – Restaurant Table Booking System
 * Core JavaScript Application File
 * Pure Vanilla JavaScript (ES6+) with localStorage
 */

// ==========================================================================
// 1. DATA MODELS & CONSTANTS
// ==========================================================================

const STORAGE_KEY = 'tastehub_bookings';

// Restaurant Tables Definition (12 distinct tables with varied capacities and locations)
const RESTAURANT_TABLES = [
    { number: 1, seats: 2, preference: '2-Seater', area: 'Window Lounge' },
    { number: 2, seats: 2, preference: '2-Seater', area: 'Window Lounge' },
    { number: 3, seats: 4, preference: '4-Seater', area: 'Garden View' },
    { number: 4, seats: 4, preference: '4-Seater', area: 'Garden View' },
    { number: 5, seats: 6, preference: '6-Seater', area: 'Family Pavilion' },
    { number: 6, seats: 8, preference: '8-Seater', area: 'Royal Banquet' },
    { number: 7, seats: 2, preference: '2-Seater', area: 'Terrace Romantic' },
    { number: 8, seats: 4, preference: '4-Seater', area: 'Terrace Central' },
    { number: 9, seats: 6, preference: '6-Seater', area: 'Private Lounge' },
    { number: 10, seats: 8, preference: '8-Seater', area: 'Imperial Hall' },
    { number: 11, seats: 4, preference: '4-Seater', area: 'Chef Corner' },
    { number: 12, seats: 2, preference: '2-Seater', area: 'Intimate Alcove' }
];

// Restaurant Menu Catalog
const RESTAURANT_MENU = [
    // Starters
    {
        id: 's1',
        name: 'Truffle Mushroom Arancini',
        category: 'Starters',
        price: 14.50,
        isVeg: true,
        isPopular: true,
        desc: 'Crisp golden risotto spheres stuffed with wild forest mushrooms, fontina cheese, and black truffle aioli.',
        img: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=700&q=80'
    },
    {
        id: 's2',
        name: 'Crispy Calamari Fritti',
        category: 'Starters',
        price: 16.00,
        isVeg: false,
        isPopular: false,
        desc: 'Tender squid lightly dusted in seasoned flour, served with charred lemon and smoked paprika tartar sauce.',
        img: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=700&q=80'
    },
    {
        id: 's3',
        name: 'Paneer Tikka Angara',
        category: 'Starters',
        price: 13.50,
        isVeg: true,
        isPopular: true,
        desc: 'Tandoor-charred cottage cheese cubes marinated in smoked Kashmiri spices, hung yogurt, and mint relish.',
        img: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=700&q=80'
    },
    {
        id: 's4',
        name: 'Garlic Butter Tiger Prawns',
        category: 'Starters',
        price: 18.50,
        isVeg: false,
        isPopular: false,
        desc: 'Succulent jumbo tiger prawns sautéed in cold-pressed olive oil, roasted garlic cloves, and white grape reduction.',
        img: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=700&q=80'
    },

    // Main Course
    {
        id: 'm1',
        name: 'Slow Braised Lamb Shank',
        category: 'Main Course',
        price: 28.00,
        isVeg: false,
        isPopular: true,
        desc: 'Fall-off-the-bone tender lamb shank gently simmered with rosemary, root vegetables, and velvety potato purée.',
        img: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=80'
    },
    {
        id: 'm2',
        name: 'Pan-Seared Chilean Sea Bass',
        category: 'Main Course',
        price: 32.50,
        isVeg: false,
        isPopular: false,
        desc: 'Crispy skin Chilean sea bass served on saffron fennel broth with butter-poached asparagus spears.',
        img: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=700&q=80'
    },
    {
        id: 'm3',
        name: 'Handcrafted Truffle Tagliatelle',
        category: 'Main Course',
        price: 24.00,
        isVeg: true,
        isPopular: true,
        desc: 'Artisanal egg ribbons tossed in aged 24-month Parmigiano-Reggiano emulsion and shaved Umbrian truffles.',
        img: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281691?auto=format&fit=crop&w=700&q=80'
    },
    {
        id: 'm4',
        name: 'Prime Black Angus Ribeye 10oz',
        category: 'Main Course',
        price: 36.00,
        isVeg: false,
        isPopular: false,
        desc: 'Charbroiled grain-fed beef cut with peppercorn glaze, bone marrow butter, and roasted baby carrots.',
        img: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=700&q=80'
    },

    // Biryanis
    {
        id: 'b1',
        name: 'Nawabi Dum Gosht Biryani',
        category: 'Biryanis',
        price: 23.00,
        isVeg: false,
        isPopular: true,
        desc: 'Aged basmati rice layered with tender spiced goat meat, saffron milk, brown onions, and sealed in clay pot dum.',
        img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=700&q=80'
    },
    {
        id: 'b2',
        name: 'Royal Awadhi Murgh Biryani',
        category: 'Biryanis',
        price: 19.50,
        isVeg: false,
        isPopular: false,
        desc: 'Classic Lucknowi spiced chicken slowly steam-cooked with aromatic long-grain rice, kewra, and rose essence.',
        img: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=700&q=80'
    },
    {
        id: 'b3',
        name: 'Shahi Subz Nizami Biryani',
        category: 'Biryanis',
        price: 16.50,
        isVeg: true,
        isPopular: true,
        desc: 'Garden fresh seasonal vegetables, paneer, and cashews gently cooked in aromatic saffron rice and mint broth.',
        img: 'https://images.unsplash.com/photo-1642821373181-696a54913e9a?auto=format&fit=crop&w=700&q=80'
    },
    {
        id: 'b4',
        name: 'Coastal Prawn Malabar Biryani',
        category: 'Biryanis',
        price: 24.50,
        isVeg: false,
        isPopular: false,
        desc: 'Kaima rice tossed with spiced coastal tiger prawns, fried cashews, golden sultanas, and coconut curry leaves.',
        img: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=700&q=80'
    },

    // Vegetarian
    {
        id: 'v1',
        name: 'Paneer Makhani Royale',
        category: 'Vegetarian',
        price: 17.50,
        isVeg: true,
        isPopular: true,
        desc: 'Charred artisan cottage cheese simmered in a silky vine-ripened tomato gravy with artisanal churned butter and fenugreek.',
        img: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=700&q=80'
    },
    {
        id: 'v2',
        name: 'Heritage Dal Bukhara',
        category: 'Vegetarian',
        price: 15.00,
        isVeg: true,
        isPopular: false,
        desc: 'Black lentils slow-cooked overnight over live glowing charcoal embers, finished with cream and ginger juliennes.',
        img: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=700&q=80'
    },
    {
        id: 'v3',
        name: 'Wild Morel Mushroom Risotto',
        category: 'Vegetarian',
        price: 22.00,
        isVeg: true,
        isPopular: false,
        desc: 'Acquerello carnaroli rice with Himalayan morels, parmigiano crisps, and fine herb chive oil infusion.',
        img: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=700&q=80'
    },

    // Desserts
    {
        id: 'd1',
        name: 'Belgian Molten Lava Cake',
        category: 'Desserts',
        price: 12.00,
        isVeg: true,
        isPopular: true,
        desc: 'Warm 72% dark Valrhona chocolate cake with a molten center, paired with Madagascar Bourbon vanilla bean gelato.',
        img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=700&q=80'
    },
    {
        id: 'd2',
        name: 'Saffron Pistachio Royal Kulfi',
        category: 'Desserts',
        price: 10.50,
        isVeg: true,
        isPopular: false,
        desc: 'Traditional dense caramelized milk freeze infused with Persian saffron strands, crushed green pistachios, and silver leaf.',
        img: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=700&q=80'
    },
    {
        id: 'd3',
        name: 'Vanilla Bean Crème Brûlée',
        category: 'Desserts',
        price: 11.00,
        isVeg: true,
        isPopular: false,
        desc: 'Silky rich custard with a delicate torched caramelized sugar crust, accompanied by fresh raspberries.',
        img: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?auto=format&fit=crop&w=700&q=80'
    },

    // Beverages
    {
        id: 'bev1',
        name: 'Artisan Mango Mint Julep',
        category: 'Beverages',
        price: 8.50,
        isVeg: true,
        isPopular: true,
        desc: 'Alphonso mango puree, fresh crushed spearmint, lime elixir, topped with sparkling Perrier mineral water.',
        img: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=700&q=80'
    },
    {
        id: 'bev2',
        name: 'Smoked Rosemary Old Fashioned Mocktail',
        category: 'Beverages',
        price: 9.50,
        isVeg: true,
        isPopular: false,
        desc: 'Non-alcoholic botanical blend, oak barrel bitter extract, charred rosemary sprig, and orange peel expression.',
        img: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=700&q=80'
    },
    {
        id: 'bev3',
        name: 'Wild Berry Blossom Sparkler',
        category: 'Beverages',
        price: 8.00,
        isVeg: true,
        isPopular: false,
        desc: 'Muddled blackberries, raspberries, elderflower cordial, and soda over handcrafted diamond ice spheres.',
        img: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=700&q=80'
    }
];

// ==========================================================================
// 2. LOCALSTORAGE STORAGE CONTROLLER
// ==========================================================================

/**
 * Retrieve all bookings from localStorage or initialize with seed data if empty
 */
function getStoredBookings() {
    try {
        let stored = localStorage.getItem(STORAGE_KEY);
        // Fallback for previous key if exists
        if (!stored) {
            stored = localStorage.getItem('dineease_bookings');
        }
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (e) {
        console.error('Error reading localStorage:', e);
    }

    // Default realistic seed bookings so the user has immediate data to test
    const today = getTodayDateString();
    const defaultSeed = [
        {
            id: 'TH-10482',
            customerName: 'Eleanor Vance',
            email: 'eleanor@luxury.com',
            phone: '+1 555-019-2834',
            date: today,
            time: '20:00',
            guests: 4,
            tablePreference: '4-Seater',
            tableNumber: 3,
            specialRequests: 'Anniversary celebration, window or quiet table preferred.',
            status: 'Confirmed',
            createdAt: new Date().toISOString()
        },
        {
            id: 'TH-10891',
            customerName: 'Marcus Sterling',
            email: 'marcus@prestige.com',
            phone: '+1 555-014-9921',
            date: today,
            time: '19:00',
            guests: 2,
            tablePreference: '2-Seater',
            tableNumber: 1,
            specialRequests: 'Corner seating for romantic dinner.',
            status: 'Confirmed',
            createdAt: new Date().toISOString()
        }
    ];

    saveStoredBookings(defaultSeed);
    return defaultSeed;
}

/**
 * Save array of bookings to localStorage
 */
function saveStoredBookings(bookings) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
        updateNavBadge();
    } catch (e) {
        console.error('Error saving to localStorage:', e);
    }
}

/**
 * Add a new booking to localStorage
 */
function addBooking(bookingData) {
    const bookings = getStoredBookings();
    bookings.unshift(bookingData);
    saveStoredBookings(bookings);
    return bookingData;
}

/**
 * Cancel a booking by ID (changes status to 'Cancelled', freeing the table)
 */
function cancelBooking(bookingId) {
    const bookings = getStoredBookings();
    const index = bookings.findIndex(b => b.id === bookingId);
    if (index !== -1) {
        bookings[index].status = 'Cancelled';
        bookings[index].cancelledAt = new Date().toISOString();
        saveStoredBookings(bookings);
        return true;
    }
    return false;
}

/**
 * Permanently delete a booking by ID from localStorage
 */
function deleteBooking(bookingId) {
    let bookings = getStoredBookings();
    const initialLength = bookings.length;
    bookings = bookings.filter(b => b.id !== bookingId);
    if (bookings.length < initialLength) {
        saveStoredBookings(bookings);
        return true;
    }
    return false;
}

// ==========================================================================
// 3. UTILITY HELPERS
// ==========================================================================

/**
 * Get current date string formatted as YYYY-MM-DD
 */
function getTodayDateString() {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * Generate unique TasteHub Booking ID e.g. TH-74921
 */
function generateBookingId() {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    return `TH-${randomNum}`;
}

/**
 * Format 24-hour time "20:00" to readable "8:00 PM"
 */
function formatTime12(time24) {
    if (!time24) return '';
    const [hStr, mStr] = time24.split(':');
    let h = parseInt(hStr, 10);
    const m = mStr || '00';
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return `${h}:${m} ${ampm}`;
}

/**
 * Display toast notification
 */
function showToast(message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icon = type === 'success' ? '✓' : '⚠️';
    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(50px)';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

/**
 * Update active confirmed bookings count in the navigation badge
 */
function updateNavBadge() {
    const countBadge = document.getElementById('booking-count-badge');
    if (!countBadge) return;
    const bookings = getStoredBookings();
    const activeCount = bookings.filter(b => b.status === 'Confirmed').length;
    countBadge.textContent = activeCount;
}

/**
 * Initialize Mobile Navigation Drawer
 */
function initMobileNav() {
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const drawer = document.getElementById('mobile-nav-drawer');

    if (!toggleBtn || !drawer) return;

    toggleBtn.addEventListener('click', () => {
        drawer.classList.toggle('open');
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!toggleBtn.contains(e.target) && !drawer.contains(e.target) && drawer.classList.contains('open')) {
            drawer.classList.remove('open');
        }
    });
}

// ==========================================================================
// 4. MENU FILTERING & SEARCH LOGIC
// ==========================================================================

let activeMenuCategory = 'All';
let activeMenuSearch = '';

/**
 * Render menu cards into the target grid container
 */
function renderMenuGrid(containerId = 'menu-grid', itemsToRender = null) {
    const grid = document.getElementById(containerId);
    if (!grid) return;

    const items = itemsToRender || RESTAURANT_MENU.filter(item => {
        const matchesCategory = activeMenuCategory === 'All' || item.category === activeMenuCategory;
        const matchesSearch = activeMenuSearch === '' || 
            item.name.toLowerCase().includes(activeMenuSearch.toLowerCase()) || 
            item.desc.toLowerCase().includes(activeMenuSearch.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    if (items.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">🍽️</div>
                <h3>No Dishes Found</h3>
                <p>No dishes match your selected filter or search keyword. Try clearing filters.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = items.map(item => `
        <article class="food-card" data-category="${item.category}">
            <div class="food-img-container">
                <img src="${item.img}" alt="${item.name}" class="food-img" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=700&q=80'">
                <span class="food-category-tag">${item.category}</span>
                <span class="diet-dot ${item.isVeg ? '' : 'non-veg'}" title="${item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}"></span>
            </div>
            <div class="food-body">
                <div class="food-header">
                    <h3 class="food-name">${item.name}</h3>
                    <span class="food-price">$${item.price.toFixed(2)}</span>
                </div>
                <p class="food-desc">${item.desc}</p>
                <div class="food-footer">
                    <span class="food-badge">${item.isVeg ? '🌱 Pure Vegetarian' : '🍖 Chef Crafted'}</span>
                    <a href="booking.html" class="btn btn-sm btn-outline">Reserve Table</a>
                </div>
            </div>
        </article>
    `).join('');
}

/**
 * Initialize Menu category tabs and search input
 */
function initMenuPage() {
    const catBtns = document.querySelectorAll('.cat-btn');
    const searchInput = document.getElementById('menu-search-input');

    if (catBtns.length > 0) {
        catBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                catBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                activeMenuCategory = btn.getAttribute('data-category');
                renderMenuGrid('menu-grid');
            });
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            activeMenuSearch = e.target.value.trim();
            renderMenuGrid('menu-grid');
        });
    }

    renderMenuGrid('menu-grid');
}

/**
 * Render Popular Dishes on Home Page
 */
function renderHomePopularDishes() {
    const popularGrid = document.getElementById('popular-dishes-grid');
    if (!popularGrid) return;

    const popularItems = RESTAURANT_MENU.filter(item => item.isPopular).slice(0, 4);
    renderMenuGrid('popular-dishes-grid', popularItems);
}

// ==========================================================================
// 5. TABLE BOOKING & AVAILABILITY ENGINE
// ==========================================================================

let currentSelectedTableNumber = null;
let currentSelectedTableCapacity = null;

/**
 * Check which tables are booked for a given date and time slot
 * A table is booked if a booking exists with status === 'Confirmed'
 */
function getBookedTableNumbers(date, time) {
    if (!date || !time) return new Set();
    const allBookings = getStoredBookings();
    const bookedNumbers = new Set();

    allBookings.forEach(b => {
        if (b.status === 'Confirmed' && b.date === date && b.time === time) {
            bookedNumbers.add(Number(b.tableNumber));
        }
    });

    return bookedNumbers;
}

/**
 * Render the interactive floor plan with real-time Available / Selected / Booked states
 */
function renderFloorPlan() {
    const floorGrid = document.getElementById('restaurant-floor-grid');
    if (!floorGrid) return;

    const dateInput = document.getElementById('booking-date');
    const timeInput = document.getElementById('booking-time');
    const prefFilter = document.querySelector('.pref-pill.active')?.getAttribute('data-pref') || 'ALL';

    const selectedDate = dateInput ? dateInput.value : '';
    const selectedTime = timeInput ? timeInput.value : '';

    const bookedTableSet = getBookedTableNumbers(selectedDate, selectedTime);

    // If currently selected table is now booked under the new time slot, clear selection
    if (currentSelectedTableNumber && bookedTableSet.has(currentSelectedTableNumber)) {
        currentSelectedTableNumber = null;
        currentSelectedTableCapacity = null;
        updateSelectedTablePreview(null);
        showToast('The previously selected table is booked for this time slot. Please choose another.', 'error');
    }

    floorGrid.innerHTML = RESTAURANT_TABLES.map(table => {
        const isBooked = bookedTableSet.has(table.number);
        const isSelected = currentSelectedTableNumber === table.number;
        const matchesPref = prefFilter === 'ALL' || table.preference === prefFilter;

        // Visual states
        let stateClass = 'available';
        let statusText = 'Available';

        if (isBooked) {
            stateClass = 'booked';
            statusText = 'Booked';
        } else if (isSelected) {
            stateClass = 'selected';
            statusText = 'Selected';
        }

        // Chair dots visual representation based on seats count
        const chairDots = Array.from({ length: table.seats }, () => `<span class="chair-dot"></span>`).join('');

        return `
            <div class="table-node ${stateClass} ${matchesPref ? '' : 'faded-pref'}" 
                 data-table-number="${table.number}" 
                 data-seats="${table.seats}" 
                 data-pref="${table.preference}"
                 title="${isBooked ? `Table ${table.number} is already booked for this slot` : `Table ${table.number} (${table.seats} Seats) - Click to select`}">
                <div class="table-chairs">${chairDots}</div>
                <div class="table-number">Table ${table.number}</div>
                <div class="table-capacity">${table.seats} Seats • ${table.area}</div>
                <div class="table-status-tag">${statusText}</div>
            </div>
        `;
    }).join('');

    // Attach click events to table cards
    floorGrid.querySelectorAll('.table-node').forEach(node => {
        node.addEventListener('click', () => {
            const tableNum = Number(node.getAttribute('data-table-number'));
            const seats = Number(node.getAttribute('data-seats'));

            if (node.classList.contains('booked')) {
                showToast(`Table ${tableNum} is already booked for this date and time slot. Please pick another table.`, 'error');
                return;
            }

            // Select this table
            currentSelectedTableNumber = tableNum;
            currentSelectedTableCapacity = seats;

            // Auto-align guest count dropdown if user hadn't set it yet
            const guestsInput = document.getElementById('booking-guests');
            if (guestsInput && (!guestsInput.value || Number(guestsInput.value) > seats)) {
                guestsInput.value = seats;
            }

            // Sync Table Preference select dropdown in form
            const prefSelect = document.getElementById('booking-table-pref');
            const foundTable = RESTAURANT_TABLES.find(t => t.number === tableNum);
            if (prefSelect && foundTable) {
                prefSelect.value = foundTable.preference;
            }

            updateSelectedTablePreview(tableNum, seats, foundTable?.area);
            renderFloorPlan(); // Refresh highlighted node
        });
    });
}

/**
 * Update Selected Table Preview card in booking form
 */
function updateSelectedTablePreview(tableNum, seats, area) {
    const previewContainer = document.getElementById('selected-table-preview-card');
    const hiddenTableInput = document.getElementById('selected-table-input');

    if (!previewContainer) return;

    if (!tableNum) {
        if (hiddenTableInput) hiddenTableInput.value = '';
        previewContainer.innerHTML = `
            <div class="table-preview-info">
                <h5>Selected Table</h5>
                <p style="color: var(--text-muted); font-weight: normal;">No table selected. Click an available table on the floor plan.</p>
            </div>
            <span class="preview-badge" style="background: var(--bg-secondary); color: var(--text-muted); border: 1px solid var(--border-subtle);">None</span>
        `;
        return;
    }

    if (hiddenTableInput) hiddenTableInput.value = tableNum;

    previewContainer.innerHTML = `
        <div class="table-preview-info">
            <h5>Selected Table Confirmed</h5>
            <p>Table ${tableNum} • ${seats} Seats (${area || 'Dining Area'})</p>
        </div>
        <span class="preview-badge">Table #${tableNum} Ready</span>
    `;
}

/**
 * Initialize Booking Form & Interactivity
 */
function initBookingPage() {
    const dateInput = document.getElementById('booking-date');
    const timeInput = document.getElementById('booking-time');
    const guestsInput = document.getElementById('booking-guests');
    const prefSelect = document.getElementById('booking-table-pref');
    const bookingForm = document.getElementById('restaurant-booking-form');
    const prefPills = document.querySelectorAll('.pref-pill');

    // Restrict past dates dynamically
    if (dateInput) {
        const todayStr = getTodayDateString();
        dateInput.min = todayStr;
        if (!dateInput.value) {
            dateInput.value = todayStr;
        }

        dateInput.addEventListener('change', () => {
            // Validate not in past
            if (dateInput.value < todayStr) {
                dateInput.value = todayStr;
                showToast('Past dates cannot be selected. Date has been reset to today.', 'error');
            }
            renderFloorPlan();
        });
    }

    if (timeInput) {
        timeInput.addEventListener('change', () => {
            renderFloorPlan();
        });
    }

    // Table Preference Pills in Floor Plan Header
    if (prefPills.length > 0) {
        prefPills.forEach(pill => {
            pill.addEventListener('click', () => {
                prefPills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                const pref = pill.getAttribute('data-pref');

                // If form has matching dropdown, sync it
                if (prefSelect && pref !== 'ALL') {
                    prefSelect.value = pref;
                }
                renderFloorPlan();
            });
        });
    }

    // If preference select changes in form, sync pills and floor
    if (prefSelect) {
        prefSelect.addEventListener('change', () => {
            const selectedPref = prefSelect.value;
            prefPills.forEach(p => {
                if (p.getAttribute('data-pref') === selectedPref) {
                    p.classList.add('active');
                } else {
                    p.classList.remove('active');
                }
            });
            renderFloorPlan();
        });
    }

    // Handle Form Submit & Validation
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Form inputs
            const nameInput = document.getElementById('customer-name');
            const emailInput = document.getElementById('customer-email');
            const phoneInput = document.getElementById('customer-phone');
            const requestsInput = document.getElementById('special-requests');

            let isValid = true;

            // Reset error displays
            document.querySelectorAll('.error-msg').forEach(el => el.classList.remove('visible'));
            document.querySelectorAll('.form-control').forEach(el => el.classList.remove('invalid'));

            // Name validation
            if (!nameInput.value.trim()) {
                showInputError(nameInput, 'Please enter your full name.');
                isValid = false;
            }

            // Email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim() || !emailPattern.test(emailInput.value.trim())) {
                showInputError(emailInput, 'Please enter a valid email address.');
                isValid = false;
            }

            // Phone validation
            if (!phoneInput.value.trim() || phoneInput.value.trim().length < 7) {
                showInputError(phoneInput, 'Please enter a valid phone number (at least 7 digits).');
                isValid = false;
            }

            // Date validation
            const todayStr = getTodayDateString();
            if (!dateInput.value || dateInput.value < todayStr) {
                showInputError(dateInput, 'Please select a valid future or current date.');
                isValid = false;
            }

            // Time validation
            if (!timeInput.value) {
                showInputError(timeInput, 'Please select a time slot.');
                isValid = false;
            }

            // Guests validation
            const numGuests = Number(guestsInput.value);
            if (!numGuests || numGuests < 1) {
                showInputError(guestsInput, 'Please specify the number of guests.');
                isValid = false;
            }

            // Table Selection Validation
            if (!currentSelectedTableNumber) {
                showToast('Please select an available table from the visual floor map.', 'error');
                const floorSection = document.getElementById('restaurant-floor-grid');
                if (floorSection) {
                    floorSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                isValid = false;
            } else {
                // Check if capacity fits guests
                const selectedTable = RESTAURANT_TABLES.find(t => t.number === currentSelectedTableNumber);
                if (selectedTable && numGuests > selectedTable.seats) {
                    showToast(`Table ${selectedTable.number} accommodates up to ${selectedTable.seats} guests. Please choose a table with ${numGuests}+ capacity or adjust guest count.`, 'error');
                    isValid = false;
                }

                // Check if table got booked in between
                const bookedSet = getBookedTableNumbers(dateInput.value, timeInput.value);
                if (bookedSet.has(currentSelectedTableNumber)) {
                    showToast(`Table ${currentSelectedTableNumber} was just booked for this time slot. Please pick another available table.`, 'error');
                    renderFloorPlan();
                    isValid = false;
                }
            }

            if (!isValid) return;

            // Generate Booking Object
            const bookingId = generateBookingId();
            const newBooking = {
                id: bookingId,
                customerName: nameInput.value.trim(),
                email: emailInput.value.trim(),
                phone: phoneInput.value.trim(),
                date: dateInput.value,
                time: timeInput.value,
                guests: numGuests,
                tablePreference: prefSelect ? prefSelect.value : 'Standard',
                tableNumber: currentSelectedTableNumber,
                specialRequests: requestsInput ? requestsInput.value.trim() : '',
                status: 'Confirmed',
                createdAt: new Date().toISOString()
            };

            // Save to localStorage
            addBooking(newBooking);

            // Trigger Confirmation Card Modal
            showConfirmationModal(newBooking);

            // Reset form state & table selection
            bookingForm.reset();
            dateInput.value = todayStr;
            currentSelectedTableNumber = null;
            currentSelectedTableCapacity = null;
            updateSelectedTablePreview(null);
            renderFloorPlan();
        });
    }

    // Initial render of floor plan
    renderFloorPlan();
}

/**
 * Show error on specific input field
 */
function showInputError(inputElem, message) {
    if (!inputElem) return;
    inputElem.classList.add('invalid');
    const group = inputElem.closest('.form-group');
    if (group) {
        let err = group.querySelector('.error-msg');
        if (err) {
            err.textContent = message;
            err.classList.add('visible');
        }
    }
}

/**
 * Show professional Booking Confirmation Modal / Card
 */
function showConfirmationModal(booking) {
    let backdrop = document.getElementById('confirmation-modal');
    if (!backdrop) return;

    // Populate voucher fields
    document.getElementById('conf-booking-id').textContent = booking.id;
    document.getElementById('conf-customer-name').textContent = booking.customerName;
    document.getElementById('conf-date').textContent = booking.date;
    document.getElementById('conf-time').textContent = formatTime12(booking.time);
    document.getElementById('conf-guests').textContent = `${booking.guests} Guest${booking.guests > 1 ? 's' : ''}`;
    document.getElementById('conf-table').textContent = `Table #${booking.tableNumber}`;

    const specialReqRow = document.getElementById('conf-special-req');
    if (specialReqRow) {
        specialReqRow.textContent = booking.specialRequests || 'None';
    }

    backdrop.classList.add('open');
}

/**
 * Close confirmation modal
 */
function closeConfirmationModal() {
    const backdrop = document.getElementById('confirmation-modal');
    if (backdrop) {
        backdrop.classList.remove('open');
    }
}

// ==========================================================================
// 6. MY BOOKINGS PAGE LOGIC
// ==========================================================================

let activeBookingsFilter = 'ALL';
let activeBookingsSearch = '';

/**
 * Render saved bookings list in bookings.html
 */
function renderMyBookings() {
    const listContainer = document.getElementById('my-bookings-container');
    if (!listContainer) return;

    const allBookings = getStoredBookings();

    const filtered = allBookings.filter(booking => {
        const matchesStatus = activeBookingsFilter === 'ALL' || booking.status === activeBookingsFilter;
        const matchesSearch = activeBookingsSearch === '' || 
            booking.id.toLowerCase().includes(activeBookingsSearch.toLowerCase()) || 
            booking.customerName.toLowerCase().includes(activeBookingsSearch.toLowerCase()) ||
            booking.phone.toLowerCase().includes(activeBookingsSearch.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    if (filtered.length === 0) {
        listContainer.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📅</div>
                <h3>No Bookings Found</h3>
                <p>There are no saved bookings matching your filter. Reserve a luxurious dining table today!</p>
                <a href="booking.html" class="btn btn-primary">Book a Table Now</a>
            </div>
        `;
        return;
    }

    listContainer.innerHTML = filtered.map(booking => {
        const isCancelled = booking.status === 'Cancelled';
        return `
            <article class="booking-card ${isCancelled ? 'status-cancelled' : ''}" data-id="${booking.id}">
                <div class="booking-card-top">
                    <span class="booking-card-id">${booking.id}</span>
                    <span class="badge ${isCancelled ? 'badge-cancelled' : 'badge-success'}">${booking.status}</span>
                </div>
                
                <div class="booking-card-info-list">
                    <div class="booking-info-row">
                        <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        <span>Guest:</span>
                        <strong>${booking.customerName}</strong>
                    </div>
                    <div class="booking-info-row">
                        <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                        <span>Date & Time:</span>
                        <strong>${booking.date} at ${formatTime12(booking.time)}</strong>
                    </div>
                    <div class="booking-info-row">
                        <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                        <span>Party Size:</span>
                        <strong>${booking.guests} Guests</strong>
                    </div>
                    <div class="booking-info-row">
                        <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                        <span>Reserved Table:</span>
                        <strong>Table #${booking.tableNumber}</strong>
                    </div>
                    ${booking.specialRequests ? `
                    <div class="booking-info-row">
                        <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                        <span>Notes:</span>
                        <em style="color: var(--text-muted); font-size: 0.85rem;">"${booking.specialRequests}"</em>
                    </div>` : ''}
                </div>

                <div class="booking-card-actions">
                    ${!isCancelled ? `
                        <button class="btn btn-sm btn-outline cancel-btn" onclick="handleCancelBooking('${booking.id}')" title="Cancel this reservation and release the table">
                            Cancel Booking
                        </button>
                    ` : `
                        <span style="font-size: 0.82rem; color: var(--accent-rose); font-style: italic; align-self: center;">
                            Table released
                        </span>
                    `}
                    <button class="btn btn-sm btn-danger delete-btn" onclick="handleDeleteBooking('${booking.id}')" style="margin-left: auto;" title="Permanently delete record">
                        Delete
                    </button>
                </div>
            </article>
        `;
    }).join('');
}

/**
 * Handle Cancel Booking Action
 */
function handleCancelBooking(bookingId) {
    if (confirm(`Are you sure you want to cancel booking ${bookingId}? This will free up the table immediately.`)) {
        if (cancelBooking(bookingId)) {
            showToast(`Booking ${bookingId} has been cancelled. The table is now available.`, 'success');
            renderMyBookings();
        }
    }
}

/**
 * Handle Delete Booking Action
 */
function handleDeleteBooking(bookingId) {
    if (confirm(`Are you sure you want to permanently delete record ${bookingId}?`)) {
        if (deleteBooking(bookingId)) {
            showToast(`Booking ${bookingId} permanently deleted.`, 'success');
            renderMyBookings();
        }
    }
}

/**
 * Initialize My Bookings Page
 */
function initBookingsPage() {
    const filterPills = document.querySelectorAll('.filter-pill-btn');
    const searchInput = document.getElementById('bookings-search-input');

    if (filterPills.length > 0) {
        filterPills.forEach(pill => {
            pill.addEventListener('click', () => {
                filterPills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                activeBookingsFilter = pill.getAttribute('data-status');
                renderMyBookings();
            });
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            activeBookingsSearch = e.target.value.trim();
            renderMyBookings();
        });
    }

    renderMyBookings();
}

// ==========================================================================
// 7. CONTACT SECTION LOGIC
// ==========================================================================

function initContactPage() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('contact-name');
        const email = document.getElementById('contact-email');
        const message = document.getElementById('contact-message');

        let valid = true;

        if (!name.value.trim()) {
            showInputError(name, 'Please enter your name.');
            valid = false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim() || !emailPattern.test(email.value.trim())) {
            showInputError(email, 'Please enter a valid email.');
            valid = false;
        }

        if (!message.value.trim() || message.value.trim().length < 10) {
            showInputError(message, 'Message must be at least 10 characters.');
            valid = false;
        }

        if (!valid) return;

        showToast('Thank you! Your message has been received. Our hospitality team will contact you shortly.', 'success');
        contactForm.reset();
    });
}

// ==========================================================================
// 8. GLOBAL INITIALIZATION
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Navigation badge sync & mobile navigation
    updateNavBadge();
    initMobileNav();

    // Page-specific initializers
    initMenuPage();
    renderHomePopularDishes();
    initBookingPage();
    initBookingsPage();
    initContactPage();
});
