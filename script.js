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

    const container = document.getElementById("timeline-container");

    // Fetch education.json
    fetch('education.json')
        .then(response => response.json())
        .then(data => {
            const experiences = data.experiences;
            const allImages = []; // Store all images for navigation
            const allAchievements = [];

            experiences.forEach(exp => {
                if (exp.images) allImages.push(...exp.images);

                const timelineItem = document.createElement('div');
                timelineItem.classList.add('timeline-item');

                const timelineLine = document.createElement('div');
                timelineLine.classList.add('timeline-line');

                const timelineContent = document.createElement('div');
                timelineContent.classList.add('timeline-content');

                const timelineHeader = document.createElement('div');
                timelineHeader.classList.add('timeline-header');

                const avatar = document.createElement('img');
                avatar.src = `${exp.logo}`;
                avatar.alt = `${exp.organization} Logo`;
                avatar.classList.add('avatar');

                const headerDetails = document.createElement('div');
                headerDetails.innerHTML = `
                    <h3 class="role-title">${exp.role}</h3>
                    <p class="organization-name">${exp.organization}</p>
                    <p class="date-range">${exp.dates} · ${exp.duration}</p>
                    <p class="location">${exp.location}</p>
                `;

                timelineHeader.appendChild(avatar);
                timelineHeader.appendChild(headerDetails);

                const description = document.createElement('div');
                description.classList.add('timeline-description');
                description.innerHTML = `
                    <p>${exp.description}</p>
                    <p class="skills">📹 Skills: ${exp.skills.join(", ")}</p>
                `;

                if (exp.images) {
                    const imageGallery = document.createElement('div');
                    imageGallery.classList.add('image-gallery');

                    exp.images.forEach((img, index) => {
                        const image = document.createElement('img');
                        image.src = img;
                        image.alt = "Experience Image";
                        image.addEventListener("click", () => openImageLightbox(allImages, index));
                        imageGallery.appendChild(image);
                    });

                    description.appendChild(imageGallery);
                }

                // Create Achievement Section with Image Click Functionality
                if (exp.achievements) {
                    exp.achievements.forEach(achievement => {
                        allAchievements.push(achievement);
                        const achievementDiv = document.createElement('div');
                        achievementDiv.classList.add('achievement');

                        const achievementImage = document.createElement('img');
                        achievementImage.src = achievement.image;
                        achievementImage.alt = "Achievement Image";
                        achievementImage.addEventListener("click", () => openAchievementLightbox(achievement, allAchievements));

                        const achievementText = document.createElement('div');
                        achievementText.classList.add('achievement-text');
                        achievementText.innerHTML = `
                            <h4>${achievement.title}</h4>
                            <p>${achievement.description}</p>
                        `;

                        achievementDiv.appendChild(achievementImage);
                        achievementDiv.appendChild(achievementText);
                        description.appendChild(achievementDiv);
                    });
                }

                timelineContent.appendChild(timelineHeader);
                timelineContent.appendChild(description);

                timelineItem.appendChild(timelineLine);
                timelineItem.appendChild(timelineContent);

                container.appendChild(timelineItem);
            });
        })
        .catch(error => console.error('Error loading JSON:', error));

    // Lightbox Functionality
    function openImageLightbox(images, currentIndex) {
        const lightbox = document.createElement('div');
        lightbox.classList.add('lightbox');

        const updateLightboxImage = (index) => {
            currentIndex = index;
            lightbox.querySelector('img').src = images[currentIndex];
        };

        lightbox.innerHTML = `
            <div class="lightbox-content">
                <button class="lightbox-nav lightbox-prev">&lt;</button>
                <img src="${images[currentIndex]}" alt="Enlarged Image">
                <button class="lightbox-nav lightbox-next">&gt;</button>
                <button class="lightbox-close">&times;</button>
            </div>
        `;
        document.body.appendChild(lightbox);

        // Add navigation functionality
        lightbox.querySelector('.lightbox-prev').addEventListener('click', () => {
            if (currentIndex > 0) {
                updateLightboxImage(currentIndex - 1);
            }
        });

        lightbox.querySelector('.lightbox-next').addEventListener('click', () => {
            if (currentIndex < images.length - 1) {
                updateLightboxImage(currentIndex + 1);
            }
        });

        // Close Lightbox
        lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
            document.body.removeChild(lightbox);
        });

        // Close Lightbox on Outside Click
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                document.body.removeChild(lightbox);
            }
        });
    }

    // Lightbox for Achievement with Navigation
    function openAchievementLightbox(achievement, allAchievements) {
        const lightbox = document.createElement('div');
        lightbox.classList.add('lightbox');
        
        let currentIndex = allAchievements.indexOf(achievement);
    
        const updateLightboxContent = (index) => {
            const currentAchievement = allAchievements[index];
            lightbox.querySelector('.lightbox-image img').src = currentAchievement.image;
            lightbox.querySelector('.lightbox-text h4').textContent = currentAchievement.title;
            lightbox.querySelector('.lightbox-text p').textContent = currentAchievement.description;
            currentIndex = index;
        };
    
        lightbox.innerHTML = `
            <div class="lightbox-content achievement-lightbox">
                <button class="lightbox-close">&times;</button>
                <button class="lightbox-nav lightbox-prev">&lt;</button>
                <div class="lightbox-image">
                    <img src="${achievement.image}" alt="Achievement Image">
                </div>
                <div class="lightbox-text">
                    <h4>${achievement.title}</h4>
                    <p>${achievement.description}</p>
                </div>
                <button class="lightbox-nav lightbox-next">&gt;</button>
            </div>
        `;
        document.body.appendChild(lightbox);
    
        // Add functionality to previous button
        lightbox.querySelector('.lightbox-prev').addEventListener('click', () => {
            if (currentIndex > 0) {
                updateLightboxContent(currentIndex - 1);
            }
        });
    
        // Add functionality to next button
        lightbox.querySelector('.lightbox-next').addEventListener('click', () => {
            if (currentIndex < allAchievements.length - 1) {
                updateLightboxContent(currentIndex + 1);
            }
        });
    
        // Close lightbox functionality
        lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
            document.body.removeChild(lightbox);
        });
    
        // Close lightbox on outside click
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                document.body.removeChild(lightbox);
            }
        });
    }

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
