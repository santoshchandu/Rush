// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'setSpeed') {
    setVideoSpeed(request.speed);
    sendResponse({ success: true });
  } else if (request.action === 'getSpeed') {
    const videos = document.querySelectorAll('video');
    if (videos.length > 0) {
      sendResponse({ speed: videos[0].playbackRate });
    } else {
      sendResponse({ speed: 1.0 });
    }
  }
  return true;
});

function setVideoSpeed(speed) {
  const videos = document.querySelectorAll('video');

  if (videos.length === 0) {
    console.log('No video elements found on this page');
    return;
  }

  videos.forEach(video => {
    video.playbackRate = speed;
    console.log(`Set video playback speed to ${speed}x`);
  });
}

// Add keyboard shortcuts for quick speed adjustment
document.addEventListener('keydown', (event) => {
  // Only trigger if Shift key is pressed (to avoid conflicts)
  if (event.shiftKey && !event.ctrlKey && !event.altKey && !event.metaKey) {
    const videos = document.querySelectorAll('video');
    if (videos.length === 0) return;

    let handled = false;

    // Handle > and < using event.code for better compatibility
    if (event.code === 'Period' || event.key === '>') {
      // Shift + . = >
      event.preventDefault();
      const currentSpeed = videos[0].playbackRate;
      const newSpeed = Math.min(currentSpeed + 0.25, 4.0);
      setVideoSpeed(newSpeed);
      showSpeedNotification(newSpeed);
      handled = true;
    } else if (event.code === 'Comma' || event.key === '<') {
      // Shift + , = <
      event.preventDefault();
      const current = videos[0].playbackRate;
      const decreased = Math.max(current - 0.25, 0.25);
      setVideoSpeed(decreased);
      showSpeedNotification(decreased);
      handled = true;
    } else {
      // Handle letter keys
      switch(event.key.toUpperCase()) {
        case 'R':
          event.preventDefault();
          setVideoSpeed(1.0);
          showSpeedNotification(1.0);
          handled = true;
          break;
        case 'D':
          event.preventDefault();
          setVideoSpeed(2.0);
          showSpeedNotification(2.0);
          handled = true;
          break;
        case 'T':
          event.preventDefault();
          setVideoSpeed(3.0);
          showSpeedNotification(3.0);
          handled = true;
          break;
        case 'M':
          event.preventDefault();
          setVideoSpeed(4.0);
          showSpeedNotification(4.0);
          handled = true;
          break;
      }
    }
  }
});

function showSpeedNotification(speed) {
  // Remove existing notification if any
  const existing = document.getElementById('speed-notification');
  if (existing) {
    existing.remove();
  }

  // Detect dark mode preference
  const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Create notification element
  const notification = document.createElement('div');
  notification.id = 'speed-notification';
  notification.textContent = `${speed.toFixed(2)}x`;

  const bgColor = isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(26, 26, 26, 0.9)';
  const textColor = isDarkMode ? '#1a1a1a' : '#ffffff';

  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${bgColor};
    color: ${textColor};
    padding: 12px 24px;
    border-radius: 12px;
    font-size: 18px;
    font-weight: 500;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    z-index: 999999;
    transition: opacity 0.3s;
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  `;

  document.body.appendChild(notification);

  // Remove notification after 1.5 seconds
  setTimeout(() => {
    notification.style.opacity = '0';
    setTimeout(() => notification.remove(), 300);
  }, 1500);
}
