if (window.location.hostname.includes("duolingo.com")) {

  function updateFloatingButton() {
    // Only reveal the widget if looking at a profile page
    const isProfilePage = window.location.pathname.includes("/profile/");
    let existingBtn = document.getElementById("duome-floating-btn");

    if (!isProfilePage) {
      if (existingBtn) existingBtn.remove();
      return;
    }

    // Safely isolate the username from the address bar path text string
    const pathParts = window.location.pathname.split("/profile/");
    if (!pathParts || pathParts.length < 2) return;
    
    // Clean up trailing web slash marks to isolate the name text
    const username = pathParts[1].replace(/\//g, '').trim();
    if (!username) return;

    // Target full URL destination layout
    const cleanDuomeUrl = "https://duome.eu/" + username;

    if (existingBtn) {
      existingBtn.href = cleanDuomeUrl;
      existingBtn.title = "Open @" + username + " on Duome.eu";
      return;
    }

    // Build the visual container badge structure
    const floatingLink = document.createElement("a");
    floatingLink.id = "duome-floating-btn";
    floatingLink.href = cleanDuomeUrl;
    floatingLink.target = "_blank";
    floatingLink.title = "Open @" + username + " on Duome.eu";
    
    // CSS Layout properties to pin to the bottom right corner
    floatingLink.style.position = "fixed";
    floatingLink.style.bottom = "20px";
    floatingLink.style.right = "20px";
    floatingLink.style.zIndex = "99999";
    floatingLink.style.backgroundColor = "#58cc02"; 
    floatingLink.style.padding = "10px";
    floatingLink.style.borderRadius = "50%";
    floatingLink.style.boxShadow = "0 4px 10px rgba(0,0,0,0.3)";
    floatingLink.style.display = "flex";
    floatingLink.style.alignItems = "center";
    floatingLink.style.justifyContent = "center";
    floatingLink.style.transition = "transform 0.2s ease";

    floatingLink.onmouseenter = () => floatingLink.style.transform = "scale(1.1)";
    floatingLink.onmouseleave = () => floatingLink.style.transform = "scale(1)";

    const duomeIcon = document.createElement("img");
    duomeIcon.src = chrome.runtime.getURL("icon.png");
    duomeIcon.style.width = "35px";
    duomeIcon.style.height = "35px";
    duomeIcon.style.display = "block";

    floatingLink.appendChild(duomeIcon);
    document.body.appendChild(floatingLink);
  }

  // Monitor layout adjustments
  const observer = new MutationObserver(() => {
    updateFloatingButton();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  updateFloatingButton();
}
