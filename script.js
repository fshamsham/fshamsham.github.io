document.addEventListener("DOMContentLoaded", () => {
    // Define category-color mapping
    const categoryColors = {
        "Web Development": "#3498db",  // Blue
        "Web Design": "#e74c3c",       // Red
        "Applications": "#2ecc71",    // Green
        "Data Visualization": "#f39c12",  // Yellow
        "Frontend": "#9b59b6",         // Purple
        "API": "#1abc9c",              // Teal
        // Add more categories and their corresponding colors here
    };

    // Fetch projects from JSON
    fetch("projects.json")
        .then(response => response.json())
        .then(data => {
            const projectsGrid = document.querySelector(".projects-grid");

            // Check if we are on the projects page or index page
            const isProjectsPage = window.location.pathname.includes("projects.html");

            // Function to display projects
            const displayProjects = (projects) => {
                projects.forEach(project => {
                    const projectCard = document.createElement("div");
                    projectCard.className = "project-card";
                    projectCard.dataset.summary = project.summary;
                    projectCard.dataset.link = project.link;

                    // Create and append category tags
                    const categoryContainer = document.createElement("div");
                    categoryContainer.className = "category-container";
                    
                    // Loop through each category and create a tag
                    project.category.forEach(category => {
                        const categoryElement = document.createElement("div");
                        categoryElement.className = "project-category";
                        categoryElement.textContent = `${category}`;  // Use category name
                        //categoryElement.style.backgroundColor = categoryColors[category] || "#95a5a6";  // Default color if not found

                        // Append each category element to the container
                        categoryContainer.appendChild(categoryElement);
                    });

                    // Set project card HTML
                    projectCard.innerHTML = `
                        <img src="${project.image}" alt="${project.title}">
                        <h3>${project.title}</h3>
                    `;

                    // Append the category element inside the project card
                    projectCard.appendChild(categoryContainer);

                    // Add event listener to each project card to open modal
                    projectCard.addEventListener("click", () => {
                        openModal(project.title, project.summary, project.link, project.category);
                    });

                    projectsGrid.appendChild(projectCard);
                });
            };
            
            // Show only 3 projects on "index.html"
            if (!isProjectsPage) {
                displayProjects(data.projects.slice(0, 3)); // Show first 3 projects on index
            } else {
                displayProjects(data.projects); // Show all projects on projects.html
            }
        })
        .catch(err => console.error("Failed to load projects:", err));

    // Modal functionality
    const modal = document.getElementById("projectModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalSummary = document.getElementById("modalSummary");
    const modalLink = document.getElementById("modalLink");
    const modalCategories = document.getElementById("modalCategories"); // Modal category container
    const closeModal = document.querySelector(".close-btn");

    // Function to open the modal
    function openModal(title, summary, link, categories) {
        modalTitle.textContent = title;
        modalSummary.textContent = summary;
        modalLink.href = link;

        // Clear previous categories in the modal
        modalCategories.innerHTML = '';

        // Add category tags in the modal
        categories.forEach(category => {
            const categoryTag = document.createElement("span");
            categoryTag.classList.add("project-category", category.trim().toLowerCase().replace(/\s+/g, '-'));
            categoryTag.textContent = category.trim();
            modalCategories.appendChild(categoryTag);
        });

        modal.style.display = "flex";
    }

    // Close modal when clicking the close button
    closeModal.addEventListener("click", () => {
        modal.style.display = "none"; // Hide modal
    });

    // Close modal when clicking outside of modal
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none"; // Hide modal
        }
    });

    // Highlight active section in navigation on scroll
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav ul li a");

    // Function to remove active class from navigation links
    const removeActiveClass = () => {
        navLinks.forEach(link => link.classList.remove("active"));
    };

    // Function to set active link based on scroll position
    const setActiveLink = () => {
        let index = sections.length;

        while (--index && window.scrollY + 100 < sections[index].offsetTop) {}

        removeActiveClass();
        navLinks[index].classList.add("active");
    };

    // Add click event listener to nav links to set active class on click
    navLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            removeActiveClass();  // Remove active class from all links
            event.target.classList.add("active");  // Add active class to the clicked link
        });
    });

    window.addEventListener("scroll", setActiveLink);
    setActiveLink(); // Initialize active link on page load

    // Add active class to "Portfolio" link when on projects.html
    const currentPage = window.location.pathname;
    if (currentPage.includes("projects.html")) {
        // Remove active class from other links
        removeActiveClass();
        
        // Add active class to the Portfolio link
        const portfolioLink = document.querySelector('nav ul li a[href="#portfolio"]');
        if (portfolioLink) {
            portfolioLink.classList.add("active");
        }
    }
});
