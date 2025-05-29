/**
 * Admin Dashboard JavaScript
 * This file enhances the Admin Dashboard with interactive functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Sidebar toggle functionality
    const toggleSidebar = document.querySelector('.toggle-sidebar');
    if (toggleSidebar) {
        toggleSidebar.addEventListener('click', function() {
            document.body.classList.toggle('body-expanded');
        });
    }

    // Menu item toggle functionality
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        const link = item.querySelector('.menu-link');
        if (link) {
            link.addEventListener('click', function(e) {
                const hasSubmenu = item.querySelector('.submenu');
                if (hasSubmenu) {
                    e.preventDefault();
                    
                    // Close other active submenus
                    menuItems.forEach(otherItem => {
                        if (otherItem !== item && otherItem.classList.contains('active')) {
                            otherItem.classList.remove('active');
                        }
                    });
                    
                    item.classList.toggle('active');
                }
            });
        }
    });

    // User dropdown functionality
    const userDropdown = document.querySelector('.user-dropdown');
    if (userDropdown) {
        userDropdown.addEventListener('click', function() {
            // Create dropdown menu if it doesn't exist
            let dropdownMenu = document.querySelector('.user-dropdown-menu');
            
            if (!dropdownMenu) {
                dropdownMenu = document.createElement('div');
                dropdownMenu.className = 'user-dropdown-menu';
                dropdownMenu.innerHTML = `
                    <ul>
                        <li><a href="#"><i class="fas fa-user"></i> My Profile</a></li>
                        <li><a href="#"><i class="fas fa-cog"></i> Account Settings</a></li>
                        <li><a href="#"><i class="fas fa-envelope"></i> Messages</a></li>
                        <li class="divider"></li>
                        <li><a href="#"><i class="fas fa-sign-out-alt"></i> Logout</a></li>
                    </ul>
                `;
                
                // Add styles for dropdown
                const style = document.createElement('style');
                style.textContent = `
                    .user-dropdown {
                        position: relative;
                    }
                    .user-dropdown-menu {
                        position: absolute;
                        top: 100%;
                        right: 0;
                        background: white;
                        border-radius: 5px;
                        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                        width: 200px;
                        z-index: 1000;
                        animation: fadeIn 0.3s ease;
                    }
                    .user-dropdown-menu ul {
                        list-style: none;
                        padding: 0;
                    }
                    .user-dropdown-menu li {
                        padding: 0;
                    }
                    .user-dropdown-menu li a {
                        padding: 10px 15px;
                        display: flex;
                        align-items: center;
                        color: var(--text-color);
                        transition: all 0.3s ease;
                    }
                    .user-dropdown-menu li a:hover {
                        background-color: var(--light-grey);
                    }
                    .user-dropdown-menu li a i {
                        margin-right: 10px;
                        width: 20px;
                        text-align: center;
                    }
                    .user-dropdown-menu .divider {
                        height: 1px;
                        background-color: var(--light-grey);
                        margin: 5px 0;
                    }
                `;
                document.head.appendChild(style);
                
                userDropdown.appendChild(dropdownMenu);
            } else {
                // Toggle visibility
                dropdownMenu.style.display = dropdownMenu.style.display === 'none' ? 'block' : 'none';
            }
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            const dropdownMenu = document.querySelector('.user-dropdown-menu');
            if (dropdownMenu && !userDropdown.contains(e.target)) {
                dropdownMenu.style.display = 'none';
            }
        });
    }

    // Notification dropdown functionality
    const notificationIcon = document.querySelector('.notification-icon');
    if (notificationIcon) {
        notificationIcon.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Create notification panel if it doesn't exist
            let notificationPanel = document.querySelector('.notification-panel');
            
            if (!notificationPanel) {
                notificationPanel = document.createElement('div');
                notificationPanel.className = 'notification-panel';
                notificationPanel.innerHTML = `
                    <div class="notification-header">
                        <h4>Notifications</h4>
                        <a href="#" class="mark-all">Mark all as read</a>
                    </div>
                    <div class="notification-body">
                        <div class="notification-item unread">
                            <div class="notification-icon"><i class="fas fa-user-plus"></i></div>
                            <div class="notification-content">
                                <div class="notification-text">New student registration</div>
                                <div class="notification-time">2 hours ago</div>
                            </div>
                        </div>
                        <div class="notification-item unread">
                            <div class="notification-icon"><i class="fas fa-comment"></i></div>
                            <div class="notification-content">
                                <div class="notification-text">New comment on Data Science course</div>
                                <div class="notification-time">5 hours ago</div>
                            </div>
                        </div>
                        <div class="notification-item">
                            <div class="notification-icon"><i class="fas fa-exclamation-circle"></i></div>
                            <div class="notification-content">
                                <div class="notification-text">System update scheduled</div>
                                <div class="notification-time">Yesterday</div>
                            </div>
                        </div>
                        <div class="notification-item">
                            <div class="notification-icon"><i class="fas fa-certificate"></i></div>
                            <div class="notification-content">
                                <div class="notification-text">5 course completions</div>
                                <div class="notification-time">2 days ago</div>
                            </div>
                        </div>
                        <div class="notification-item">
                            <div class="notification-icon"><i class="fas fa-dollar-sign"></i></div>
                            <div class="notification-content">
                                <div class="notification-text">New payment received</div>
                                <div class="notification-time">3 days ago</div>
                            </div>
                        </div>
                    </div>
                    <div class="notification-footer">
                        <a href="#">View all notifications</a>
                    </div>
                `;
                
                // Add styles for notification panel
                const style = document.createElement('style');
                style.textContent = `
                    .notification-panel {
                        position: absolute;
                        top: 100%;
                        right: 0;
                        background: white;
                        border-radius: 10px;
                        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                        width: 320px;
                        z-index: 1000;
                        animation: fadeIn 0.3s ease;
                        overflow: hidden;
                    }
                    .notification-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 15px;
                        border-bottom: 1px solid var(--light-grey);
                    }
                    .notification-header h4 {
                        margin: 0;
                        font-size: 1rem;
                    }
                    .mark-all {
                        font-size: 0.8rem;
                    }
                    .notification-body {
                        max-height: 350px;
                        overflow-y: auto;
                    }
                    .notification-item {
                        display: flex;
                        padding: 15px;
                        border-bottom: 1px solid var(--light-grey);
                        transition: all 0.3s ease;
                    }
                    .notification-item:hover {
                        background-color: var(--light-grey);
                    }
                    .notification-item.unread {
                        background-color: rgba(52, 152, 219, 0.05);
                    }
                    .notification-item .notification-icon {
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        background-color: var(--light-grey);
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        margin-right: 15px;
                        color: var(--primary-color);
                    }
                    .notification-content {
                        flex: 1;
                    }
                    .notification-text {
                        margin-bottom: 5px;
                        font-size: 0.9rem;
                    }
                    .notification-time {
                        font-size: 0.8rem;
                        color: var(--grey-color);
                    }
                    .notification-footer {
                        padding: 15px;
                        text-align: center;
                        border-top: 1px solid var(--light-grey);
                    }
                    .notification-footer a {
                        font-size: 0.9rem;
                    }
                `;
                document.head.appendChild(style);
                
                // Position relative to the notification icon
                const iconPosition = notificationIcon.getBoundingClientRect();
                notificationPanel.style.top = (iconPosition.bottom + window.scrollY) + 'px';
                notificationPanel.style.right = (window.innerWidth - iconPosition.right) + 'px';
                
                document.body.appendChild(notificationPanel);
            } else {
                // Toggle visibility
                notificationPanel.style.display = notificationPanel.style.display === 'none' ? 'block' : 'none';
            }
            
            // Mark as read functionality
            const markAllBtn = document.querySelector('.mark-all');
            if (markAllBtn) {
                markAllBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    const unreadItems = document.querySelectorAll('.notification-item.unread');
                    unreadItems.forEach(item => {
                        item.classList.remove('unread');
                    });
                    
                    // Update badge count
                    const badge = document.querySelector('.notification-badge');
                    if (badge) {
                        badge.textContent = '0';
                    }
                });
            }
        });
        
        // Close notification panel when clicking outside
        document.addEventListener('click', function(e) {
            const notificationPanel = document.querySelector('.notification-panel');
            if (notificationPanel && !notificationIcon.contains(e.target) && !notificationPanel.contains(e.target)) {
                notificationPanel.style.display = 'none';
            }
        });
    }

    // Add animation to stat cards
    const statCards = document.querySelectorAll('.stat-card');
    let delay = 0;
    statCards.forEach(card => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        }, delay);
        delay += 100;
    });

    // Dynamic chart data - example for updating the donut chart with values from page
    const updateChartPercentages = () => {
        const donutChart = document.querySelector('.donut-chart');
        if (donutChart) {
            // Get values from legend
            const legendItems = document.querySelectorAll('.legend-item');
            let percentages = [];
            let colors = [];
            
            legendItems.forEach(item => {
                const text = item.textContent.trim();
                const match = text.match(/\((\d+)%\)/);
                if (match && match[1]) {
                    percentages.push(parseInt(match[1]));
                }
                
                const colorDiv = item.querySelector('.legend-color');
                if (colorDiv) {
                    const computedStyle = window.getComputedStyle(colorDiv);
                    colors.push(computedStyle.backgroundColor);
                }
            });
            
            // Calculate cumulative percentages for conic gradient
            let cumulativePercentages = [];
            let sum = 0;
            percentages.forEach(percent => {
                sum += percent;
                cumulativePercentages.push(sum);
            });
            
            // Create conic gradient string
            let gradientString = 'conic-gradient(';
            for (let i = 0; i < colors.length; i++) {
                const startPercent = i === 0 ? 0 : cumulativePercentages[i-1];
                const endPercent = cumulativePercentages[i];
                gradientString += `${colors[i]} ${startPercent}% ${endPercent}%, `;
            }
            gradientString = gradientString.slice(0, -2) + ')';
            
            // Apply gradient
            donutChart.style.background = gradientString;
            
            // Update center percentage (sum of all values)
            const donutHole = document.querySelector('.donut-hole');
            if (donutHole) {
                donutHole.textContent = `${sum}%`;
            }
        }
    };
    
    // Call once on load
    updateChartPercentages();

    // Calendar functionality
    const initCalendar = () => {
        const calendarDays = document.querySelectorAll('.calendar-day');
        calendarDays.forEach(day => {
            day.addEventListener('click', function() {
                // Remove current-day class from all days
                calendarDays.forEach(d => {
                    if (!d.classList.contains('other-month')) {
                        d.classList.remove('current-day');
                    }
                });
                
                // Add current-day class to clicked day if it's not from another month
                if (!day.classList.contains('other-month')) {
                    day.classList.add('current-day');
                }
                
                // Show a simple event popup for event days
                if (day.classList.contains('event-day')) {
                    const events = [
                        { date: '13', title: 'Teacher Training Workshop', time: '10:00 AM - 2:00 PM' },
                        { date: '15', title: 'New Course Launch: AI Fundamentals', time: '3:00 PM' },
                        { date: '20', title: 'Board Meeting', time: '1:00 PM - 3:00 PM' },
                        { date: '28', title: 'End of Month Review', time: '11:00 AM' }
                    ];
                    
                    const dayNumber = day.textContent.trim();
                    const event = events.find(e => e.date === dayNumber);
                    
                    if (event) {
                        showEventPopup(day, event);
                    }
                }
            });
        });
    };
    
    // Event popup functionality
    const showEventPopup = (dayElement, eventData) => {
        // Remove any existing popups
        const existingPopup = document.querySelector('.event-popup');
        if (existingPopup) {
            existingPopup.remove();
        }
        
        // Create popup
        const popup = document.createElement('div');
        popup.className = 'event-popup';
        popup.innerHTML = `
            <div class="event-popup-header">
                <h4>Event Details</h4>
                <button class="close-popup"><i class="fas fa-times"></i></button>
            </div>
            <div class="event-popup-body">
                <div class="event-title">${eventData.title}</div>
                <div class="event-time"><i class="fas fa-clock"></i> ${eventData.time}</div>
                <div class="event-date"><i class="fas fa-calendar-day"></i> May ${eventData.date}, 2025</div>
            </div>
            <div class="event-popup-footer">
                <button class="btn primary-btn">View Details</button>
            </div>
        `;
        
        // Add styles for popup
        const style = document.createElement('style');
        style.textContent = `
            .event-popup {
                position: absolute;
                background: white;
                border-radius: 10px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                width: 300px;
                z-index: 1000;
                animation: fadeIn 0.3s ease;
            }
            .event-popup-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 15px;
                border-bottom: 1px solid var(--light-grey);
            }
            .event-popup-header h4 {
                margin: 0;
                font-size: 1rem;
                color: var(--dark-color);
            }
            .close-popup {
                background: none;
                border: none;
                cursor: pointer;
                font-size: 1rem;
                color: var(--grey-color);
            }
            .event-popup-body {
                padding: 15px;
            }
            .event-title {
                font-weight: 600;
                font-size: 1.1rem;
                margin-bottom: 10px;
                color: var(--dark-color);
            }
            .event-time, .event-date {
                display: flex;
                align-items: center;
                gap: 10px;
                margin-bottom: 8px;
                font-size: 0.9rem;
                color: var(--text-color);
            }
            .event-popup-footer {
                padding: 15px;
                border-top: 1px solid var(--light-grey);
                text-align: right;
            }
        `;
        document.head.appendChild(style);
        
        // Position the popup next to the day element
        const dayPosition = dayElement.getBoundingClientRect();
        const calendarPosition = document.querySelector('.calendar').getBoundingClientRect();
        
        popup.style.top = (dayPosition.top + window.scrollY - 100) + 'px';
        popup.style.left = (calendarPosition.right + 10) + 'px';
        
        document.body.appendChild(popup);
        
        // Close popup when clicking the close button
        const closeBtn = popup.querySelector('.close-popup');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                popup.remove();
            });
        }
        
        // Close popup when clicking outside
        document.addEventListener('click', function handler(e) {
            if (!popup.contains(e.target) && e.target !== dayElement) {
                popup.remove();
                document.removeEventListener('click', handler);
            }
        });
    };
    
    // Initialize calendar
    initCalendar();

    // Add sorting functionality to tables
    const initTableSorting = () => {
        const tables = document.querySelectorAll('.data-table');
        tables.forEach(table => {
            const headers = table.querySelectorAll('th');
            headers.forEach(header => {
                // Skip columns that shouldn't be sorted (like action columns)
                if (header.classList.contains('no-sort')) {
                    return;
                }
                
                // Add sort icon and cursor pointer
                header.style.cursor = 'pointer';
                header.style.position = 'relative';
                
                const sortIcon = document.createElement('span');
                sortIcon.innerHTML = ' <i class="fas fa-sort"></i>';
                sortIcon.className = 'sort-icon';
                header.appendChild(sortIcon);
                
                // Add sorting functionality
                header.addEventListener('click', function() {
                    const table = header.closest('table');
                    const tbody = table.querySelector('tbody');
                    const rows = Array.from(tbody.querySelectorAll('tr'));
                    
                    // Determine column index
                    const headerIndex = Array.from(header.parentNode.children).indexOf(header);
                    
                    // Determine sort direction
                    const currentDirection = header.getAttribute('data-sort') || 'none';
                    const newDirection = currentDirection === 'asc' ? 'desc' : 'asc';
                    
                    // Remove sort direction from all headers
                    headers.forEach(h => {
                        h.setAttribute('data-sort', 'none');
                        h.querySelector('.sort-icon').innerHTML = ' <i class="fas fa-sort"></i>';
                    });
                    
                    // Set sort direction for current header
                    header.setAttribute('data-sort', newDirection);
                    header.querySelector('.sort-icon').innerHTML = newDirection === 'asc' 
                        ? ' <i class="fas fa-sort-up"></i>' 
                        : ' <i class="fas fa-sort-down"></i>';
                    
                    // Sort rows
                    rows.sort((a, b) => {
                        const cellA = a.children[headerIndex].textContent.trim();
                        const cellB = b.children[headerIndex].textContent.trim();
                        
                        // Check if content is a date
                        const dateRegex = /^[A-Za-z]+ \d{1,2}, \d{4}$/;
                        if (dateRegex.test(cellA) && dateRegex.test(cellB)) {
                            const dateA = new Date(cellA);
                            const dateB = new Date(cellB);
                            return newDirection === 'asc' ? dateA - dateB : dateB - dateA;
                        }
                        
                        // Check if content is a number
                        const numberRegex = /^[\$]?[\d,]+(\.\d+)?$/;
                        if (numberRegex.test(cellA) && numberRegex.test(cellB)) {
                            const numA = parseFloat(cellA.replace(/[\$,]/g, ''));
                            const numB = parseFloat(cellB.replace(/[\$,]/g, ''));
                            return newDirection === 'asc' ? numA - numB : numB - numA;
                        }
                        
                        // Default string comparison
                        return newDirection === 'asc' 
                            ? cellA.localeCompare(cellB) 
                            : cellB.localeCompare(cellA);
                    });
                    
                    // Re-append rows in the sorted order
                    rows.forEach(row => tbody.appendChild(row));
                });
            });
        });
    };
    
    // Initialize table sorting
    initTableSorting();

    // Add search functionality
    const initSearch = () => {
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                const searchQuery = this.value.toLowerCase().trim();
                
                // If search query is empty, show all content
                if (searchQuery === '') {
                    document.querySelectorAll('tr[data-searchable]').forEach(row => {
                        row.style.display = '';
                    });
                    return;
                }
                
                // Search in tables
                const tables = document.querySelectorAll('.data-table');
                tables.forEach(table => {
                    const rows = table.querySelectorAll('tbody tr');
                    rows.forEach(row => {
                        const text = row.textContent.toLowerCase();
                        if (text.includes(searchQuery)) {
                            row.style.display = '';
                            row.setAttribute('data-searchable', 'true');
                        } else {
                            row.style.display = 'none';
                            row.setAttribute('data-searchable', 'false');
                        }
                    });
                });
                
                // Update "no results" message
                tables.forEach(table => {
                    let visibleRows = table.querySelectorAll('tbody tr[style=""]').length;
                    let noResultsRow = table.querySelector('.no-results-row');
                    
                    if (visibleRows === 0) {
                        if (!noResultsRow) {
                            const tbody = table.querySelector('tbody');
                            const colCount = table.querySelectorAll('thead th').length;
                            
                            noResultsRow = document.createElement('tr');
                            noResultsRow.className = 'no-results-row';
                            
                            const cell = document.createElement('td');
                            cell.setAttribute('colspan', colCount);
                            cell.textContent = 'No results found';
                            cell.style.textAlign = 'center';
                            cell.style.padding = '1rem';
                            
                            noResultsRow.appendChild(cell);
                            tbody.appendChild(noResultsRow);
                        }
                    } else if (noResultsRow) {
                        noResultsRow.remove();
                    }
                });
            });
        }
    };
    
    // Initialize search
    initSearch();

    // Add responsive table functionality
    const initResponsiveTables = () => {
        const tableContainers = document.querySelectorAll('.table-responsive');
        tableContainers.forEach(container => {
            const table = container.querySelector('table');
            if (!table) return;
            
            const headers = table.querySelectorAll('th');
            const headerText = Array.from(headers).map(header => header.textContent.trim());
            
            // Add data attributes to cells for small screen display
            const rows = table.querySelectorAll('tbody tr');
            rows.forEach(row => {
                const cells = row.querySelectorAll('td');
                cells.forEach((cell, index) => {
                    if (index < headerText.length) {
                        cell.setAttribute('data-label', headerText[index]);
                    }
                });
            });
            
            // Add CSS for responsive tables
            const style = document.createElement('style');
            style.textContent = `
                @media (max-width: 768px) {
                    .table-responsive table {
                        border: 0;
                    }
                    .table-responsive table thead {
                        display: none;
                    }
                    .table-responsive table tr {
                        margin-bottom: 10px;
                        display: block;
                        border-bottom: 2px solid var(--light-grey);
                    }
                    .table-responsive table td {
                        display: block;
                        text-align: right;
                        padding-left: 50%;
                        position: relative;
                    }
                    .table-responsive table td:before {
                        content: attr(data-label);
                        position: absolute;
                        left: 1rem;
                        font-weight: 600;
                        text-align: left;
                    }
                }
            `;
            document.head.appendChild(style);
        });
    };
    
    // Initialize responsive tables
    initResponsiveTables();
    
    // Add dark mode toggle functionality
    const addDarkModeToggle = () => {
        // Create toggle button
        const darkModeToggle = document.createElement('div');
        darkModeToggle.className = 'dark-mode-toggle';
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        document.body.appendChild(darkModeToggle);
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .dark-mode-toggle {
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background-color: var(--dark-color);
                color: white;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                z-index: 1000;
                transition: all 0.3s ease;
            }
            .dark-mode-toggle:hover {
                transform: translateY(-3px);
            }
            
            body.dark-mode {
                background-color: #1a1a2e;
                color: #f5f5f5;
            }
            
            body.dark-mode .sidebar {
                background-color: #16213e;
            }
            
            body.dark-mode .topbar,
            body.dark-mode .card {
                background-color: #0f3460;
                color: #f5f5f5;
            }
            
            body.dark-mode .card-title,
            body.dark-mode .section-title {
                color: #f5f5f5;
            }
            
            body.dark-mode .data-table th {
                background-color: #16213e;
                color: #f5f5f5;
            }
            
            body.dark-mode .data-table td {
                border-color: #16213e;
            }
            
            body.dark-mode .form-control {
                background-color: #16213e;
                color: #f5f5f5;
                border-color: #16213e;
            }
            
            body.dark-mode .search-bar {
                background-color: #16213e;
            }
            
            body.dark-mode .search-input {
                color: #f5f5f5;
            }
            
            body.dark-mode .calendar-day {
                color: #f5f5f5;
            }
            
            body.dark-mode .calendar-day.other-month {
                color: #6c757d;
            }
            
            body.dark-mode .donut-hole {
                background-color: #0f3460;
                color: #f5f5f5;
            }
        `;
        document.head.appendChild(style);
        
        // Toggle dark mode
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            
            // Update icon
            const icon = this.querySelector('i');
            if (document.body.classList.contains('dark-mode')) {
                icon.className = 'fas fa-sun';
                localStorage.setItem('darkMode', 'enabled');
            } else {
                icon.className = 'fas fa-moon';
                localStorage.setItem('darkMode', 'disabled');
            }
        });
    }
});