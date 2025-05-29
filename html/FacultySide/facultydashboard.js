document.addEventListener('DOMContentLoaded', function() {
    // Mobile sidebar toggle functionality
    const mobileToggle = document.querySelector('.mobile-toggle');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            mainContent.classList.toggle('sidebar-active');
        });
    }

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(event) {
        const isClickInside = sidebar.contains(event.target) || mobileToggle.contains(event.target);
        
        if (!isClickInside && sidebar.classList.contains('active') && window.innerWidth < 992) {
            sidebar.classList.remove('active');
            mainContent.classList.remove('sidebar-active');
        }
    });

    // Handle notifications
    const notificationBell = document.querySelector('.notification-bell');
    if (notificationBell) {
        notificationBell.addEventListener('click', function() {
            // Here you would typically show a dropdown with notifications
            alert('You have 3 new notifications');
            // In a real application, replace this with a proper notification dropdown
        });
    }

    // Handle menu item selection
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Remove active class from all menu items
            menuItems.forEach(menuItem => menuItem.classList.remove('active'));
            // Add active class to clicked menu item
            this.classList.add('active');
            
            // Prevent default link behavior for demo
            e.preventDefault();
            
            // In a real application, you would handle navigation here
            const menuText = this.querySelector('span').textContent;
            console.log(`Navigating to ${menuText}`);
            
            // Close the sidebar on mobile after clicking a menu item
            if (window.innerWidth < 992) {
                sidebar.classList.remove('active');
                mainContent.classList.remove('sidebar-active');
            }
        });
    });

    // Handle module actions
    const moduleActions = document.querySelectorAll('.module-actions button');
    moduleActions.forEach(button => {
        button.addEventListener('click', function() {
            const icon = this.querySelector('i');
            const moduleCard = this.closest('.module-card');
            const moduleHeader = moduleCard.querySelector('.module-header h3').textContent;
            
            if (icon.classList.contains('fa-plus')) {
                console.log(`Add new item to ${moduleHeader}`);
                if (moduleHeader === 'Announcements') {
                    showAnnouncementForm(moduleCard);
                } else if (moduleHeader === 'Manage Curriculum & Subjects') {
                    showCurriculumForm(moduleCard);
                }
            } else if (icon.classList.contains('fa-ellipsis-v')) {
                console.log(`Show more options for ${moduleHeader}`);
                // Here you would show a dropdown with more options
            } else if (icon.classList.contains('fa-download')) {
                console.log(`Download ${moduleHeader}`);
                // Here you would handle the download functionality
            } else if (icon.classList.contains('fa-filter')) {
                console.log(`Filter ${moduleHeader}`);
                // Here you would show filtering options
            }
        });
    });

    // Handle primary action buttons
    const primaryButtons = document.querySelectorAll('.primary-btn');
    primaryButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const buttonText = this.textContent.trim();
            
            // Handle different button actions
            if (buttonText.includes('Propose New Course') || buttonText.includes('New Course Proposal')) {
                showCurriculumForm(this.closest('.module-card') || document.querySelector('.module-grid'));
            } else if (buttonText.includes('Make Assignment') || buttonText.includes('Assign Faculty')) {
                showAssignmentForm();
            } else if (buttonText.includes('Post Announcement') || buttonText.includes('New Announcement')) {
                showAnnouncementForm(this.closest('.module-card') || document.querySelector('.module-grid'));
            } else if (buttonText.includes('Generate Report')) {
                generateReport();
            } else if (buttonText.includes('Manage Schedule') || buttonText.includes('Schedule Event')) {
                showScheduleManager();
            } else if (buttonText.includes('View All Students')) {
                viewAllStudents();
            }
        });
    });

    // Form handling functions
    function showAnnouncementForm(container) {
        // In a real app, this would be a proper form overlay or modal
        console.log('Opening announcement form...');
        alert('Announcement form would appear here');
    }

    function showCurriculumForm(container) {
        console.log('Opening curriculum form...');
        alert('Course proposal form would appear here');
    }

    function showAssignmentForm() {
        console.log('Opening faculty assignment form...');
        alert('Faculty assignment form would appear here');
    }

    function generateReport() {
        const reportType = document.getElementById('report-type').value;
        const semester = document.getElementById('semester').value;
        const format = document.getElementById('format').value;
        
        if (!reportType || !semester) {
            alert('Please select both report type and semester');
            return;
        }
        
        console.log(`Generating ${reportType} report for ${semester} in ${format} format`);
        alert(`Report generation started. Your ${reportType} report will be available shortly.`);
    }

    function showScheduleManager() {
        console.log('Opening schedule manager...');
        alert('Schedule management interface would appear here');
    }

    function viewAllStudents() {
        console.log('Opening full student list...');
        alert('Full student listing would appear here');
    }

    // Add hover effects for better UX
    const tableRows = document.querySelectorAll('tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f9f9f9';
        });
        row.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
    });

    // Handle window resize for responsive design
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 992) {
            sidebar.classList.remove('active');
            mainContent.classList.remove('sidebar-active');
        }
    });

    // Function to add CSS for dashboard enhancements
    function addDashboardStyles() {
        const dashboardStyles = document.createElement('style');
        dashboardStyles.textContent = `
            /* Basic responsive styling */
            .dashboard-container {
                display: flex;
                min-height: 100vh;
                position: relative;
            }
            
            .sidebar {
                width: 250px;
                background-color: #2c3e50;
                color: white;
                position: fixed;
                height: 100vh;
                transition: all 0.3s ease;
                z-index: 1000;
                overflow-y: auto;
            }
            
            .sidebar-header {
                padding: 20px 15px;
                display: flex;
                align-items: center;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .sidebar-header h3 {
                margin-left: 10px;
                font-size: 1.2rem;
            }
            
            .sidebar-header span {
                color: #3498db;
            }
            
            .sidebar-menu {
                padding: 15px 0;
            }
            
            .menu-item {
                padding: 12px 20px;
                display: flex;
                align-items: center;
                color: #ecf0f1;
                text-decoration: none;
                transition: all 0.3s ease;
            }
            
            .menu-item:hover, .menu-item.active {
                background-color: #34495e;
                color: #3498db;
            }
            
            .menu-item i {
                margin-right: 10px;
                font-size: 1.1rem;
            }
            
            .main-content {
                flex: 1;
                margin-left: 250px;
                padding: 20px;
                transition: margin-left 0.3s ease;
            }
            
            .page-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
                padding-bottom: 10px;
                border-bottom: 1px solid #eee;
            }
            
            .header-actions {
                display: flex;
                align-items: center;
            }
            
            .notification-bell {
                position: relative;
                margin-right: 20px;
                cursor: pointer;
            }
            
            .notification-badge {
                position: absolute;
                top: -8px;
                right: -8px;
                background-color: #e74c3c;
                color: white;
                border-radius: 50%;
                padding: 2px 6px;
                font-size: 0.7rem;
            }
            
            .user-profile {
                display: flex;
                align-items: center;
            }
            
            .user-profile img {
                border-radius: 50%;
                margin-right: 10px;
            }
            
            .user-name {
                font-weight: bold;
            }
            
            .user-role {
                font-size: 0.8rem;
                color: #7f8c8d;
            }
            
            /* Mobile toggle button */
            .mobile-toggle {
                display: none;
                position: fixed;
                top: 20px;
                left: 20px;
                width: 40px;
                height: 40px;
                background-color: #3498db;
                color: white;
                border-radius: 5px;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                z-index: 1100;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
            }
            
            /* Responsive styles */
            @media (max-width: 991px) {
                .sidebar {
                    transform: translateX(-100%);
                }
                
                .sidebar.active {
                    transform: translateX(0);
                }
                
                .main-content {
                    margin-left: 0;
                }
                
                .mobile-toggle {
                    display: flex;
                }
                
                /* Add padding when sidebar is active */
                .main-content.sidebar-active {
                    opacity: 0.7;
                }
            }
            
            /* Add hover effects for better UX */
            .btn {
                transition: all 0.3s ease;
            }
            
            .btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            
            .module-card {
                transition: all 0.3s ease;
            }
            
            .module-card:hover {
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            }
            
            /* Styles for status badges */
            .status {
                padding: 3px 8px;
                border-radius: 12px;
                font-size: 0.8rem;
                font-weight: 500;
            }
            
            .approved {
                background-color: rgba(46, 204, 113, 0.2);
                color: #27ae60;
            }
            
            .pending {
                background-color: rgba(241, 196, 15, 0.2);
                color: #f39c12;
            }
            
            .rejected {
                background-color: rgba(231, 76, 60, 0.2);
                color: #c0392b;
            }
            
            /* Add animations for activity list */
            .activity-item {
                transform: translateX(0);
                transition: transform 0.3s ease;
            }
            
            .activity-item:hover {
                transform: translateX(5px);
            }
            
            /* Style variables */
            :root {
                --primary-color: #3498db;
                --secondary-color: #2ecc71;
                --accent-color: #9b59b6;
                --grey-color: #7f8c8d;
                --dark-color: #2c3e50;
            }
            
            /* Button styles */
            .btn {
                padding: 8px 16px;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-weight: 600;
                margin: 5px;
            }
            
            .primary-btn {
                background-color: var(--primary-color);
                color: white;
            }
            
            .secondary-btn {
                background-color: white;
                color: var(--primary-color);
                border: 1px solid var(--primary-color);
            }
            
            /* Table styles */
            table {
                width: 100%;
                border-collapse: collapse;
            }
            
            thead th {
                background-color: #f9f9f9;
                padding: 10px;
                text-align: left;
                font-weight: 600;
                color: var(--dark-color);
                border-bottom: 2px solid #eee;
            }
            
            tbody td {
                padding: 10px;
                border-bottom: 1px solid #eee;
            }
            
            tbody tr:last-child td {
                border-bottom: none;
            }
            
            /* Form styles */
            .form-group {
                margin-bottom: 15px;
            }
            
            .form-group label {
                display: block;
                margin-bottom: 5px;
                font-weight: 500;
                color: var(--dark-color);
            }
            
            .form-group select, .form-group input {
                width: 100%;
                padding: 8px;
                border: 1px solid #ddd;
                border-radius: 4px;
            }
        `;
        document.head.appendChild(dashboardStyles);
    }

    // Add the styles
    addDashboardStyles();

    // Add Font Awesome if not already included
    if (!document.querySelector('link[href*="fontawesome"]')) {
        const fontAwesome = document.createElement('link');
        fontAwesome.rel = 'stylesheet';
        fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
        document.head.appendChild(fontAwesome);
    }

    console.log('Faculty Dashboard initialized successfully!');
});