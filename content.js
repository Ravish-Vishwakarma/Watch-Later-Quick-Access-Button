chrome.storage.sync.get(['enabled'], (data) => {
    if (data.enabled === false) return;

    let isAddedToWatchLater = false;

    function showToast(message = "Added to Watch Later") {
        const existing = document.querySelector('#easy-watch-later-toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.id = 'easy-watch-later-toast';
        toast.textContent = message;
        toast.style.position = 'fixed';
        toast.style.bottom = '48px';
        toast.style.left = '24px';
        toast.style.background = '#323232';
        toast.style.color = 'white';
        toast.style.padding = '12px 20px';
        toast.style.borderRadius = '4px';
        toast.style.fontSize = '14px';
        toast.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
        toast.style.zIndex = '9999';
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s ease';

        document.body.appendChild(toast);
        setTimeout(() => toast.style.opacity = '1', 10);
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    }

    const insertButton = () => {
        const buttonContainer = document.querySelector('#top-level-buttons-computed');

        if (buttonContainer && !document.querySelector('#easy-watch-later-button')) {
            const newBtn = document.createElement('button');
            newBtn.id = 'easy-watch-later-button';


            newBtn.style.width = '40px';
            newBtn.style.height = '40px';
            newBtn.style.borderRadius = '50%';
            newBtn.style.background = 'rgba(50, 50, 50, 0.6)';
            newBtn.style.border = 'none';
            newBtn.style.cursor = 'pointer';
            newBtn.style.display = 'flex';
            newBtn.style.alignItems = 'center';
            newBtn.style.justifyContent = 'center';
            newBtn.style.marginLeft = '8px';
            newBtn.style.padding = '0';
            newBtn.style.backdropFilter = 'blur(4px)';


            newBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" height="28" width="28" viewBox="0 0 36 36" fill="white">
                <path d="M18,8 C12.47,8 8,12.47 8,18 C8,23.52 12.47,28 18,28 C23.52,28 28,23.52 28,18 C28,12.47 23.52,8 18,8 Z 
                         M16,19.02 V12 h2 v5.86 l5.1,2.95 -1,1.73 -6.1,-3.52 Z"></path>
            </svg>
        `;

            newBtn.onclick = () => {
                const watchLaterBtn = document.querySelector('.ytp-watch-later-button');
                if (watchLaterBtn) {
                    watchLaterBtn.click();
                    isAddedToWatchLater = !isAddedToWatchLater;

                    // Swap the icon
                    newBtn.innerHTML = isAddedToWatchLater
                        ? `
            <svg xmlns="http://www.w3.org/2000/svg" height="28" width="28" viewBox="0 0 24 24" fill="white">
                <path d="M9 16.2l-3.5-3.5-1.4 1.4L9 19 20 8l-1.4-1.4z"/>
            </svg>`
                        : `
            <svg xmlns="http://www.w3.org/2000/svg" height="28" width="28" viewBox="0 0 36 36" fill="white">
                <path d="M18,8 C12.47,8 8,12.47 8,18 C8,23.52 12.47,28 18,28 C23.52,28 28,23.52 28,18 C28,12.47 23.52,8 18,8 Z 
                         M16,19.02 V12 h2 v5.86 l5.1,2.95 -1,1.73 -6.1,-3.52 Z"/>
            </svg>`;

                    showToast(
                        isAddedToWatchLater ? "Added to Watch Later" : "Removed from Watch Later"
                    );
                } else {
                    showToast("Watch Later button not found.");
                }
            };


            buttonContainer.appendChild(newBtn);
        }
    };


    const observer = new MutationObserver(insertButton);
    observer.observe(document.body, { childList: true, subtree: true });

    insertButton();
});
