// This file is ready for your custom JavaScript
console.log("Welcome to Sahas Abhishek's Portfolio!");
// ... existing code ...
        // Modal එක විවෘත කිරීම
        const modalLink = document.getElementById('modalLink'); // අලුත් අයිඩී එකක්

        function openModal(title, imageSrc, description, projectUrl) {
            modalTitle.innerText = title;
            modalDesc.innerText = description;
            
            // Link එක යාවත්කාලීන කිරීම
            const modalBtn = document.querySelector('.modal-info .btn');
            modalBtn.href = projectUrl;
            
            // පින්තූරය නොමැති නම් placeholder එකක් යෙදීම
            modalImg.src = imageSrc;
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
// ... existing code ...
// ... existing code ...
        // Modal එක විවෘත කිරීම
        const modal = document.getElementById('projectModal');
        const modalImg = document.getElementById('modalImg');
        const modalTitle = document.getElementById('modalTitle');
        const modalDesc = document.getElementById('modalDesc');
        const modalLink = document.getElementById('modalLink'); // අලුතින් එකතු කළා

        function openModal(title, imageSrc, description, projectUrl) {
            modalTitle.innerText = title;
            modalDesc.innerText = description;
            modalLink.href = projectUrl; // බොත්තමේ Link එක වෙනස් කිරීම
            modalImg.src = imageSrc;
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
// ... existing code ...