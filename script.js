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

    const work_container = document.getElementById("work-timeline-container");
    const education_container = document.getElementById("education-timeline-container");

    // Fetch work.json
    fetch('work.json')
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
                // Create the description with conditional rendering for skills
                description.innerHTML = `
                    <p>${exp.description.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>').replace(/\n/g, '<br>')}</p>
                    ${
                        exp.skills && exp.skills.length > 0 
                        ? `<p class="skills">💎 Skills: ${exp.skills.join(", ")}</p>` 
                        : ''
                    }
                `;

                if (exp.images) {

                    console.log(experiences)
                    const imageGallery = document.createElement('div');
                    imageGallery.classList.add('image-gallery');

                    const scrollbar = document.querySelector('.scrollbar');
                    imageGallery.addEventListener('scroll', () => {
                        const scrollPercentage = imageGallery.scrollLeft / imageGallery.scrollWidth;
                        scrollbar.style.left = `${scrollPercentage * 100}%`;
                    });

                    exp.images.forEach((img, index) => {
                        const image = document.createElement('img');
                        image.src = img;
                        image.alt = `Experience Image ${index + 1}`;
                        image.addEventListener("click", () => openImageLightbox(allImages, index));
                        imageGallery.appendChild(image);
                    });

                    description.appendChild(imageGallery);
                }

                // Create Achievement Section with Image and PDF Click Functionality
                if (exp.achievements) {

                    const achievementDiv = document.createElement('div');
                    achievementDiv.classList.add('achievement');

                    exp.achievements.forEach(achievement => {

                        const achievementImage = document.createElement('img');
                        achievementImage.alt = "Achievement Image";

                        // Check if the achievement image is a PDF
                        if (achievement.image.toLowerCase().endsWith('.pdf')) {
                            console.log("Found PDF:", achievement.image);

                            // Create a canvas to render the first page of the PDF
                            const canvas = document.createElement('canvas');
                            canvas.alt = "Achievement PDF";

                            // Use pdf.js to render the PDF into the canvas
                            renderPDFPageAsImage(achievement.image, canvas, (imageUrl) => {
                                // Convert the canvas to a data URL and set it as the image source
                                achievement.image = imageUrl;
                                achievementImage.src = imageUrl;

                                // Append the image (converted from PDF) first
                                achievementDiv.appendChild(achievementImage);

                                // Append the achievement div to the description container
                                description.appendChild(achievementDiv);
                            });
                        } else {
                            // Handle regular image
                            achievementImage.src = achievement.image;

                            // Append the regular image first
                            achievementDiv.appendChild(achievementImage);

                            // Append the achievement div to the description container
                            description.appendChild(achievementDiv);
                        }

                        allAchievements.push(achievement);

                        achievementImage.addEventListener("click", () => openAchievementLightbox(achievement, exp.achievements));
                    });
                    
                }
                

                // Function to render the first page of a PDF into a canvas and convert it to an image URL
                function renderPDFPageAsImage(pdfUrl, canvas, callback) {
                    const loadingTask = pdfjsLib.getDocument(pdfUrl);  // Load the PDF
                    loadingTask.promise.then(pdf => {
                        pdf.getPage(1).then(page => {  // Render the first page
                            const viewport = page.getViewport({ scale: 1.5 });  // Adjust scale as needed
                            const context = canvas.getContext('2d');
                            canvas.width = viewport.width;
                            canvas.height = viewport.height;

                            const renderContext = {
                                canvasContext: context,
                                viewport: viewport
                            };

                            page.render(renderContext).promise.then(() => {
                                console.log("PDF rendered successfully!");

                                // Convert the canvas to a data URL and pass it to the callback
                                const imageUrl = canvas.toDataURL();
                                callback(imageUrl);
                            });
                        });
                    }).catch(error => {
                        console.error("Error loading PDF:", error);
                    });
                }

                timelineContent.appendChild(timelineHeader);
                timelineContent.appendChild(description);

                timelineItem.appendChild(timelineLine);
                timelineItem.appendChild(timelineContent);

                work_container.appendChild(timelineItem);
            });
        })
        .catch(error => console.error('Error loading JSON:', error));

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
                // Create the description with conditional rendering for skills
                description.innerHTML = `
                    <p>${exp.description.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>').replace(/\n/g, '<br>')}</p>
                    ${
                        exp.skills && exp.skills.length > 0 
                        ? `<p class="skills">💎 Skills: ${exp.skills.join(", ")}</p>` 
                        : ''
                    }
                `;

                if (exp.images) {

                    console.log(experiences)
                    const imageGallery = document.createElement('div');
                    imageGallery.classList.add('image-gallery');

                    const scrollbar = document.querySelector('.scrollbar');
                    imageGallery.addEventListener('scroll', () => {
                        const scrollPercentage = imageGallery.scrollLeft / imageGallery.scrollWidth;
                        scrollbar.style.left = `${scrollPercentage * 100}%`;
                    });

                    exp.images.forEach((img, index) => {
                        const image = document.createElement('img');
                        image.src = img;
                        image.alt = `Experience Image ${index + 1}`;
                        image.addEventListener("click", () => openImageLightbox(allImages, index));
                        imageGallery.appendChild(image);
                    });

                    description.appendChild(imageGallery);
                }

                // Create Achievement Section with Image and PDF Click Functionality
                if (exp.achievements) {

                    const achievementDiv = document.createElement('div');
                    achievementDiv.classList.add('achievement');

                    exp.achievements.forEach(achievement => {

                        const achievementImage = document.createElement('img');
                        achievementImage.alt = "Achievement Image";

                        // Check if the achievement image is a PDF
                        if (achievement.image.toLowerCase().endsWith('.pdf')) {
                            console.log("Found PDF:", achievement.image);

                            // Create a canvas to render the first page of the PDF
                            const canvas = document.createElement('canvas');
                            canvas.alt = "Achievement PDF";

                            // Use pdf.js to render the PDF into the canvas
                            renderPDFPageAsImage(achievement.image, canvas, (imageUrl) => {
                                // Convert the canvas to a data URL and set it as the image source
                                achievement.image = imageUrl;
                                achievementImage.src = imageUrl;

                                // Append the image (converted from PDF) first
                                achievementDiv.appendChild(achievementImage);

                                // Append the achievement div to the description container
                                description.appendChild(achievementDiv);
                            });
                        } else {
                            // Handle regular image
                            achievementImage.src = achievement.image;

                            // Append the regular image first
                            achievementDiv.appendChild(achievementImage);

                            // Append the achievement div to the description container
                            description.appendChild(achievementDiv);
                        }

                        allAchievements.push(achievement);

                        achievementImage.addEventListener("click", () => openAchievementLightbox(achievement, exp.achievements));
                    });
                    
                }
                

                // Function to render the first page of a PDF into a canvas and convert it to an image URL
                function renderPDFPageAsImage(pdfUrl, canvas, callback) {
                    const loadingTask = pdfjsLib.getDocument(pdfUrl);  // Load the PDF
                    loadingTask.promise.then(pdf => {
                        pdf.getPage(1).then(page => {  // Render the first page
                            const viewport = page.getViewport({ scale: 1.5 });  // Adjust scale as needed
                            const context = canvas.getContext('2d');
                            canvas.width = viewport.width;
                            canvas.height = viewport.height;

                            const renderContext = {
                                canvasContext: context,
                                viewport: viewport
                            };

                            page.render(renderContext).promise.then(() => {
                                console.log("PDF rendered successfully!");

                                // Convert the canvas to a data URL and pass it to the callback
                                const imageUrl = canvas.toDataURL();
                                callback(imageUrl);
                            });
                        });
                    }).catch(error => {
                        console.error("Error loading PDF:", error);
                    });
                }

                timelineContent.appendChild(timelineHeader);
                timelineContent.appendChild(description);

                timelineItem.appendChild(timelineLine);
                timelineItem.appendChild(timelineContent);

                education_container.appendChild(timelineItem);
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
                <div class="lightbox-media">
                    <img src="${images[currentIndex]}" alt="Enlarged Image">
                </div>
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

    // Function to open the lightbox for a particular achievement/media
    function openAchievementLightbox(achievement, allAchievements) {
        const lightbox = document.createElement('div');
        lightbox.classList.add('lightbox');

        // Determine whether the device is mobile or web
        const isMobile = window.innerWidth <= 768; // Customize the breakpoint as needed

        console.log("ismobile: ", isMobile);

        // Select the appropriate lightbox structure based on the device type
        if (isMobile) {
            lightbox.innerHTML = `
                <button class="lightbox-close">&times;</button>
                <div class="lightbox-content achievement-lightbox">
                    <button class="lightbox-nav lightbox-prev">&#10094;</button>
                    <div class="lightbox-media">
                        <!-- Media content will go here -->
                    </div>
                    <div class="lightbox-text">
                        <h4></h4>
                        <p></p>
                    </div>
                    <button class="lightbox-nav lightbox-next">&#10095;</button>
                </div>
                <div class="lightbox-bullets">
                    ${allAchievements.map((_, index) => `
                        <button class="lightbox-bullet" data-index="${index}"></button>
                    `).join('')}
                </div>
            `;
        } else {
            lightbox.innerHTML = `
                <div class="lightbox-content achievement-lightbox">
                    <button class="lightbox-close">&times;</button>
                    <button class="lightbox-nav lightbox-prev">&#10094;</button>
                    <div class="lightbox-media">
                        <!-- Media content will go here -->
                    </div>
                    <div class="lightbox-text">
                        <h4></h4>
                        <p></p>
                    </div>
                    <button class="lightbox-nav lightbox-next">&#10095;</button>
                </div>
            `;
        }

        document.body.appendChild(lightbox);

        // Add functionality for updating and navigating content
        let currentIndex = allAchievements.indexOf(achievement);
        const updateLightboxContent = (index) => {
            const currentAchievement = allAchievements[index];
            const mediaContainer = lightbox.querySelector('.lightbox-media');
            const textContainer = lightbox.querySelector('.lightbox-text');

            mediaContainer.innerHTML = '';
            if (currentAchievement.type === 'image') {
                const img = document.createElement('img');
                img.src = currentAchievement.image;
                img.alt = 'Achievement Image';
                mediaContainer.appendChild(img);
            } else if (currentAchievement.type === 'video') {
                const video = document.createElement('video');
                video.controls = true;
                const source = document.createElement('source');
                source.src = currentAchievement.video;
                source.type = 'video/mp4';
                video.appendChild(source);
                mediaContainer.appendChild(video);
            }

            textContainer.querySelector('h4').textContent = currentAchievement.title;
            textContainer.querySelector('p').textContent = currentAchievement.description;
            currentIndex = index;

            const prevButton = lightbox.querySelector('.lightbox-prev');
            const nextButton = lightbox.querySelector('.lightbox-next');

            prevButton.style.display = currentIndex === 0 ? 'none' : 'inline-block';
            nextButton.style.display = currentIndex === allAchievements.length - 1 ? 'none' : 'inline-block';

            // Update the bullet points for mobile
            if (isMobile) {
                const bullets = lightbox.querySelectorAll('.lightbox-bullet');
                bullets.forEach(bullet => bullet.classList.remove('active'));
                bullets[currentIndex].classList.add('active');
            }
        };

        // Add navigation and close functionality
        lightbox.querySelector('.lightbox-prev').addEventListener('click', () => {
            if (currentIndex > 0) updateLightboxContent(currentIndex - 1);
        });

        lightbox.querySelector('.lightbox-next').addEventListener('click', () => {
            if (currentIndex < allAchievements.length - 1) updateLightboxContent(currentIndex + 1);
        });

        // Bullet point click functionality for mobile
        if (isMobile) {
            const bullets = lightbox.querySelectorAll('.lightbox-bullet');
            bullets.forEach(bullet => {
                bullet.addEventListener('click', (e) => {
                    const index = parseInt(e.target.dataset.index, 10);
                    updateLightboxContent(index);
                });
            });
        }

        lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
            document.body.removeChild(lightbox);
            document.body.style.overflow = ''; // Restore scrolling
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                document.body.removeChild(lightbox);
                document.body.style.overflow = ''; // Restore scrolling
            }
        });

        // Prevent background scrolling
        document.body.style.overflow = 'hidden';

        // Initialize the lightbox with the current content
        updateLightboxContent(currentIndex);

        // Add swipe gesture functionality for mobile: swipe on the entire lightbox
        let startX = 0;
        let endX = 0;

        lightbox.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        lightbox.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;

            // Detect swipe direction
            if (startX - endX > 50) {
                // Swipe left (next)
                if (currentIndex < allAchievements.length - 1) {
                    updateLightboxContent(currentIndex + 1);
                }
            } else if (endX - startX > 50) {
                // Swipe right (prev)
                if (currentIndex > 0) {
                    updateLightboxContent(currentIndex - 1);
                }
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
                    projectCard.dataset.id = project.id;

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

                    console.log("Check image: ", project.images[0])

                    // Set project card HTML
                    projectCard.innerHTML = `
                        <img src="${project.images[0]}" alt="${project.title}">
                        <h3>${project.title}</h3>
                    `;

                    // Append the category element inside the project card
                    projectCard.appendChild(categoryContainer);

                    // Add event listener to each project card to open modal
                    projectCard.addEventListener("click", () => {
                        openModal(project.title, project.summary, project.id, project.category);
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
    function openModal(title, summary, id, categories) {
        console.log(id);
        modalTitle.textContent = title;
        modalSummary.textContent = summary;
        modalLink.href = "project-detail.html?project=" + id;

        // Clear previous categories in the modal
        modalCategories.innerHTML = '';

        // Add category tags in the modal
        categories.forEach(category => {
            const categoryTag = document.createElement("span");
            categoryTag.classList.add("project-category", category.trim().toLowerCase().replace(/\s+/g, '-'));
            categoryTag.textContent = category.trim();
            modalCategories.appendChild(categoryTag);
        });

        modal.style.display = "flex";  // Show the modal
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

    // Close modal when the modal link is clicked
    modalLink.addEventListener("click", (e) => {
        e.preventDefault();  // Prevent the default link behavior (page navigation)
        modal.style.display = "none";  // Hide the modal
        window.location.href = modalLink.href;  // Navigate to the project detail page
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
