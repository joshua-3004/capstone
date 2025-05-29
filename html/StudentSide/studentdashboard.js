document.addEventListener('DOMContentLoaded', function() {
    // Initialize the dashboard
    initializeDashboard();

    // Set up event listeners
    setupEventListeners();

    // Load initial data
    loadDashboardData();
});

/**
 * Initialize the dashboard components
 */
function initializeDashboard() {
    // Set current date in welcome message
    updateWelcomeMessage();
    
    // Initialize calendar
    initializeCalendar();
    
    // Show current date
    highlightCurrentDate();
}

/**
 * Update welcome message with time-based greeting
 */
function updateWelcomeMessage() {
    const welcomeText = document.querySelector('.welcome-text');
    const username = document.querySelector('.username').textContent;
    const hour = new Date().getHours();
    
    let greeting;
    if (hour < 12) {
        greeting = 'Good morning';
    } else if (hour < 18) {
        greeting = 'Good afternoon';
    } else {
        greeting = 'Good evening';
    }
    
    welcomeText.textContent = `${greeting}, ${username}! Track your progress and manage your courses.`;
}

/**
 * Initialize the calendar component
 */
function initializeCalendar() {
    // Set up calendar navigation
    const prevMonthBtn = document.querySelector('.calendar-nav button:first-child');
    const nextMonthBtn = document.querySelector('.calendar-nav button:last-child');
    
    prevMonthBtn.addEventListener('click', () => navigateCalendar(-1));
    nextMonthBtn.addEventListener('click', () => navigateCalendar(1));
    
    // Add hover effect to date cells
    document.querySelectorAll('.date-cell').forEach(cell => {
        cell.addEventListener('mouseenter', function() {
            this.classList.add('hover');
        });
        cell.addEventListener('mouseleave', function() {
            this.classList.remove('hover');
        });
    });
}

/**
 * Navigate calendar months
 * @param {number} direction - Direction to navigate (-1 for previous, 1 for next)
 */
function navigateCalendar(direction) {
    // For demonstration, we'll just update the month title
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                    'July', 'August', 'September', 'October', 'November', 'December'];
    const calendarTitle = document.querySelector('.calendar-title');
    const currentText = calendarTitle.textContent;
    const currentMonth = months.findIndex(month => currentText.includes(month));
    const currentYear = parseInt(currentText.split(' ')[1]);
    
    let newMonth = currentMonth + direction;
    let newYear = currentYear;
    
    if (newMonth < 0) {
        newMonth = 11;
        newYear--;
    } else if (newMonth > 11) {
        newMonth = 0;
        newYear++;
    }
    
    calendarTitle.textContent = `${months[newMonth]} ${newYear}`;
    
    // In a real implementation, we would regenerate the calendar dates here
    updateCalendarDates(newMonth, newYear);
}

/**
 * Update calendar dates for the given month and year
 * @param {number} month - Month index (0-11)
 * @param {number} year - Year (e.g., 2025)
 */
function updateCalendarDates(month, year) {
    const datesContainer = document.querySelector('.calendar-dates');
    datesContainer.innerHTML = '';
    
    // Calculate first day of month and total days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Add previous month's trailing dates
    const prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = firstDay - 1; i >= 0; i--) {
        const dateCell = createDateCell(prevMonthDays - i, 'prev-month');
        datesContainer.appendChild(dateCell);
    }
    
    // Add current month's dates
    for (let i = 1; i <= daysInMonth; i++) {
        const dateCell = createDateCell(i, '');
        
        // Mark current date
        const today = new Date();
        if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
            dateCell.classList.add('today');
        }
        
        // Add event markers (example dates with events)
        if ((month === 4 && (i === 8 || i === 10 || i === 12 || i === 15)) || 
            (month === 5 && (i === 5 || i === 20))) {
            dateCell.classList.add('has-event');
        }
        
        datesContainer.appendChild(dateCell);
    }
    
    // Add next month's leading dates
    const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
    const nextMonthDays = totalCells - (firstDay + daysInMonth);
    for (let i = 1; i <= nextMonthDays; i++) {
        const dateCell = createDateCell(i, 'next-month');
        datesContainer.appendChild(dateCell);
    }
    
    // Update events list based on the new month
    updateEventsForMonth(month, year);
}

/**
 * Create a date cell element
 * @param {number} day - Day number
 * @param {string} className - Additional class name
 * @returns {HTMLElement} - Date cell element
 */
function createDateCell(day, className) {
    const dateCell = document.createElement('div');
    dateCell.className = 'date-cell';
    if (className) dateCell.classList.add(className);
    dateCell.textContent = day;
    
    dateCell.addEventListener('click', function() {
        document.querySelectorAll('.date-cell').forEach(c => c.classList.remove('selected'));
        this.classList.add('selected');
        
        // Show events for the selected date
        // This would typically fetch events for the specific date
        showEventsForDate(day);
    });
    
    return dateCell;
}

/**
 * Update events list for the given month
 * @param {number} month - Month index (0-11)
 * @param {number} year - Year (e.g., 2025)
 */
function updateEventsForMonth(month, year) {
    const eventsList = document.querySelector('.events-list');
    const eventsTitle = eventsList.querySelector('h3');
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December'];
    
    // Example events data - in a real app, this would come from an API
    const events = {
        '4-8': { title: 'Study Group: Data Structures', time: '3:00 PM - 5:00 PM', type: 'class' },
        '4-10': { title: 'Midterm Exam: Computer Science', time: '10:00 AM - 12:00 PM', type: 'exam' },
        '4-12': { title: 'Psychology Quiz', time: '2:00 PM - 3:00 PM', type: 'quiz' },
        '4-15': { title: 'Research Paper Due', time: '11:59 PM', type: 'deadline' },
        '5-5': { title: 'Final Project Presentation', time: '1:00 PM - 3:00 PM', type: 'presentation' },
        '5-20': { title: 'Final Exams Begin', time: 'All Day', type: 'exam' }
    };
    
    // Clear current events
    while (eventsList.children.length > 1) {
        eventsList.removeChild(eventsList.lastChild);
    }
    
    // Add events for the current month
    let eventCount = 0;
    for (const key in events) {
        const [eventMonth, eventDay] = key.split('-').map(Number);
        if (eventMonth === month) {
            eventCount++;
            const event = events[key];
            
            const eventItem = document.createElement('div');
            eventItem.className = 'event-item';
            eventItem.innerHTML = `
                <div class="event-date">
                    <span class="month">${months[month].substring(0, 3)}</span>
                    <span class="day">${eventDay}</span>
                </div>
                <div class="event-info">
                    <h4>${event.title}</h4>
                    <p>${event.time}</p>
                </div>
                <span class="event-badge event-${event.type}">${event.type.charAt(0).toUpperCase() + event.type.slice(1)}</span>
            `;
            eventsList.appendChild(eventItem);
        }
    }
    
    // Update title based on event count
    eventsTitle.textContent = eventCount > 0 ? 'Upcoming Events' : 'No Events This Month';
}

/**
 * Show events for a specific date
 * @param {number} day - Day number
 */
function showEventsForDate(day) {
    // This function would typically fetch and display events for the selected date
    console.log(`Showing events for day: ${day}`);
    
    // For demo purposes, we'll just show a notification
    const notify = document.createElement('div');
    notify.className = 'notification';
    notify.textContent = `Viewing events for day ${day}`;
    document.body.appendChild(notify);
    
    setTimeout(() => {
        notify.classList.add('show');
        setTimeout(() => {
            notify.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notify);
            }, 300);
        }, 2000);
    }, 100);
}

/**
 * Highlight the current date in the calendar
 */
function highlightCurrentDate() {
    const today = new Date();
    const dateStr = today.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
    });
    
    document.querySelectorAll('.date-cell').forEach(cell => {
        if (cell.classList.contains('today')) {
            cell.setAttribute('title', `Today: ${dateStr}`);
        }
    });
}

/**
 * Set up all event listeners for the dashboard
 */
function setupEventListeners() {
    // Profile picture click
    const profilePic = document.getElementById('profile-pic');
    const profileOptions = document.getElementById('profile-options');
    
    profilePic.addEventListener('click', function() {
        profileOptions.style.display = profileOptions.style.display === 'none' ? 'block' : 'none';
    });
    
    // Close profile options when clicking elsewhere
    document.addEventListener('click', function(event) {
        if (!profilePic.contains(event.target) && !profileOptions.contains(event.target)) {
            profileOptions.style.display = 'none';
        }
    });
    
    // Notification icon
    const notifyIcon = document.querySelector('.notify-icon');
    notifyIcon.addEventListener('click', function() {
        showNotifications();
    });
    
    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    searchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            performSearch(this.value);
        }
    });
    
    // Course buttons
    document.querySelectorAll('.course-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const courseTitle = this.closest('.course-card').querySelector('.course-title').textContent;
            continueCourse(courseTitle);
        });
    });
    
    // View all buttons
    document.querySelectorAll('.btn-outline').forEach(btn => {
        btn.addEventListener('click', function() {
            const section = this.closest('.card').querySelector('h2').textContent;
            viewAllItems(section);
        });
    });
    
    // Assessment items
    document.querySelectorAll('.assessment-item').forEach(item => {
        item.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            viewAssessmentDetails(title);
        });
    });
    
    // Mobile navigation toggle (for responsive design)
    setupMobileNavigation();
}

/**
 * Set up mobile navigation for responsive design
 */
function setupMobileNavigation() {
    // Create mobile menu toggle button if it doesn't exist
    if (!document.querySelector('.mobile-menu-toggle')) {
        const menuToggle = document.createElement('div');
        menuToggle.className = 'mobile-menu-toggle';
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        document.querySelector('.header').prepend(menuToggle);
        
        menuToggle.addEventListener('click', function() {
            document.querySelector('.sidebar').classList.toggle('show-mobile');
            this.querySelector('i').classList.toggle('fa-bars');
            this.querySelector('i').classList.toggle('fa-times');
        });
    }
    
    // Close sidebar when clicking a link on mobile
    document.querySelectorAll('.sidebar a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 768) {
                document.querySelector('.sidebar').classList.remove('show-mobile');
                document.querySelector('.mobile-menu-toggle i').classList.add('fa-bars');
                document.querySelector('.mobile-menu-toggle i').classList.remove('fa-times');
            }
        });
    });
}

/**
 * Show notifications popup
 */
function showNotifications() {
    // Create notifications panel if it doesn't exist
    let notifyPanel = document.querySelector('.notifications-panel');
    
    if (!notifyPanel) {
        notifyPanel = document.createElement('div');
        notifyPanel.className = 'notifications-panel';
        notifyPanel.innerHTML = `
            <div class="notification-header">
                <h3>Notifications</h3>
                <button class="close-btn"><i class="fas fa-times"></i></button>
            </div>
            <div class="notification-body">
                <div class="notification-item unread">
                    <div class="notification-icon"><i class="fas fa-bell"></i></div>
                    <div class="notification-content">
                        <p>Your assignment "Algorithm Analysis" has been graded.</p>
                        <span class="notification-time">2 hours ago</span>
                    </div>
                </div>
                <div class="notification-item unread">
                    <div class="notification-icon"><i class="fas fa-comment"></i></div>
                    <div class="notification-content">
                        <p>Prof. James Smith posted a new announcement in Computer Science.</p>
                        <span class="notification-time">Yesterday</span>
                    </div>
                </div>
                <div class="notification-item">
                    <div class="notification-icon"><i class="fas fa-calendar"></i></div>
                    <div class="notification-content">
                        <p>Reminder: Research Paper due in 10 days.</p>
                        <span class="notification-time">2 days ago</span>
                    </div>
                </div>
            </div>
            <div class="notification-footer">
                <button>Mark all as read</button>
                <button>See all notifications</button>
            </div>
        `;
        document.body.appendChild(notifyPanel);
        
        // Add event listeners to the notification panel
        notifyPanel.querySelector('.close-btn').addEventListener('click', function() {
            notifyPanel.classList.remove('show');
        });
        
        notifyPanel.querySelector('.notification-footer button:first-child').addEventListener('click', function() {
            notifyPanel.querySelectorAll('.notification-item').forEach(item => {
                item.classList.remove('unread');
            });
            document.querySelector('.notify-badge').style.display = 'none';
        });
    }
    
    // Show panel with animation
    notifyPanel.classList.add('show');
    
    // Close panel when clicking outside
    setTimeout(() => {
        document.addEventListener('click', function closeNotify(event) {
            if (!notifyPanel.contains(event.target) && !document.querySelector('.notify-icon').contains(event.target)) {
                notifyPanel.classList.remove('show');
                document.removeEventListener('click', closeNotify);
            }
        });
    }, 100);
}

/**
 * Perform search functionality
 * @param {string} query - Search query
 */
function performSearch(query) {
    console.log(`Searching for: ${query}`);
    
    // For demo purposes, show a notification
    const notify = document.createElement('div');
    notify.className = 'notification';
    notify.textContent = `Searching for: ${query}`;
    document.body.appendChild(notify);
    
    setTimeout(() => {
        notify.classList.add('show');
        setTimeout(() => {
            notify.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notify);
            }, 300);
        }, 2000);
    }, 100);
}

/**
 * Continue a course
 * @param {string} courseTitle - Title of the course
 */
function continueCourse(courseTitle) {
    console.log(`Continuing course: ${courseTitle}`);
    
    // For demo purposes, show a notification
    const notify = document.createElement('div');
    notify.className = 'notification';
    notify.textContent = `Opening course: ${courseTitle}`;
    document.body.appendChild(notify);
    
    setTimeout(() => {
        notify.classList.add('show');
        setTimeout(() => {
            notify.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notify);
            }, 300);
        }, 2000);
    }, 100);
}

/**
 * View all items in a section
 * @param {string} section - Section title
 */
function viewAllItems(section) {
    console.log(`Viewing all items in: ${section}`);
    
    // For demo purposes, show a notification
    const notify = document.createElement('div');
    notify.className = 'notification';
    notify.textContent = `Viewing all ${section.toLowerCase()}`;
    document.body.appendChild(notify);
    
    setTimeout(() => {
        notify.classList.add('show');
        setTimeout(() => {
            notify.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notify);
            }, 300);
        }, 2000);
    }, 100);
}

/**
 * View assessment details
 * @param {string} title - Assessment title
 */
function viewAssessmentDetails(title) {
    console.log(`Viewing assessment: ${title}`);
    
    // For demo purposes, show a notification
    const notify = document.createElement('div');
    notify.className = 'notification';
    notify.textContent = `Opening assessment: ${title}`;
    document.body.appendChild(notify);
    
    setTimeout(() => {
        notify.classList.add('show');
        setTimeout(() => {
            notify.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notify);
            }, 300);
        }, 2000);
    }, 100);
}

/**
 * Load dashboard data from API/backend
 */
function loadDashboardData() {
    // In a real application, this would fetch data from an API
    console.log('Loading dashboard data...');
    
    // Simulate loading state
    document.querySelectorAll('.card').forEach(card => {
        card.classList.add('loading');
    });
    
    // Simulate API delay
    setTimeout(() => {
        document.querySelectorAll('.card').forEach(card => {
            card.classList.remove('loading');
        });
        
        // Add loading complete notification
        console.log('Dashboard data loaded successfully');
    }, 1000);
    
    // Update animation for progress bars
    animateProgressBars();
}

/**
 * Animate progress bars with smooth transitions
 */
function animateProgressBars() {
    document.querySelectorAll('.progress-bar').forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.transition = 'width 1s ease-in-out';
            bar.style.width = width;
        }, 200);
    });
}

// Add CSS for new elements created by JavaScript
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        bottom: -60px;
        left: 50%;
        transform: translateX(-50%);
        background-color: #3498db;
        color: white;
        padding: 12px 24px;
        border-radius: 4px;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
        transition: bottom 0.3s ease-in-out;
        z-index: 1000;
    }
    
    .notification.show {
        bottom: 20px;
    }
    
    .notifications-panel {
        position: absolute;
        top: 60px;
        right: -400px;
        width: 350px;
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
        transition: right 0.3s ease-in-out;
        z-index: 100;
    }
    
    .notifications-panel.show {
        right: 20px;
    }
    
    .notification-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px;
        border-bottom: 1px solid #eee;
    }
    
    .notification-header h3 {
        margin: 0;
        font-size: 18px;
    }
    
    .close-btn {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 16px;
        color: #888;
    }
    
    .notification-body {
        max-height: 300px;
        overflow-y: auto;
    }
    
    .notification-item {
        display: flex;
        padding: 12px 15px;
        border-bottom: 1px solid #f0f0f0;
        cursor: pointer;
        transition: background-color 0.2s;
    }
    
    .notification-item:hover {
        background-color: #f9f9f9;
    }
    
    .notification-item.unread {
        background-color: #f0f7ff;
    }
    
    .notification-icon {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: #e1e1e1;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 15px;
        color: #555;
    }
    
    .notification-content p {
        margin: 0 0 5px 0;
        font-size: 14px;
    }
    
    .notification-time {
        font-size: 12px;
        color: #888;
    }
    
    .notification-footer {
        display: flex;
        justify-content: space-between;
        padding: 12px 15px;
        border-top: 1px solid #eee;
    }
    
    .notification-footer button {
        background: none;
        border: none;
        color: #3498db;
        cursor: pointer;
        font-size: 14px;
    }
    
    .date-cell {
        cursor: pointer;
        transition: all 0.2s;
    }
    
    .date-cell.hover,
    .date-cell:hover {
        background-color: #f0f7ff;
        transform: scale(1.1);
    }
    
    .date-cell.selected {
        background-color: #3498db;
        color: white;
        font-weight: bold;
    }
    
    .date-cell.prev-month,
    .date-cell.next-month {
        color: #ccc;
    }
    
    .card.loading::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        z-index: 10;
    }
    
    @media (max-width: 767px) {
        .mobile-menu-toggle {
            display: block;
            font-size: 24px;
            cursor: pointer;
            margin-right: 15px;
        }
        
        .sidebar {
            position: fixed;
            left: -300px;
            top: 0;
            height: 100%;
            transition: left 0.3s ease-in-out;
            z-index: 1000;
            box-shadow: none;
        }
        
        .sidebar.show-mobile {
            left: 0;
            box-shadow: 5px 0 15px rgba(0, 0, 0, 0.1);
        }
        
        .notifications-panel {
            width: 300px;
        }
        
        .notifications-panel.show {
            right: 10px;
        }
    }
`;

document.head.appendChild(style);