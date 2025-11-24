document.addEventListener('DOMContentLoaded', () => {
  const speedSlider = document.getElementById('speedSlider');
  const currentSpeedDisplay = document.getElementById('currentSpeed');
  const speedButtons = document.querySelectorAll('.speed-btn');

  // Get current speed when popup opens
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'getSpeed' }, (response) => {
      if (response && response.speed) {
        speedSlider.value = response.speed;
        currentSpeedDisplay.textContent = response.speed.toFixed(2);
      }
    });
  });

  // Handle slider change
  speedSlider.addEventListener('input', () => {
    const speed = parseFloat(speedSlider.value);
    currentSpeedDisplay.textContent = speed.toFixed(2);
    setSpeed(speed);
  });

  // Handle quick button clicks
  speedButtons.forEach(button => {
    button.addEventListener('click', () => {
      const speed = parseFloat(button.dataset.speed);
      speedSlider.value = speed;
      currentSpeedDisplay.textContent = speed.toFixed(2);
      setSpeed(speed);
    });
  });

  function setSpeed(speed) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: 'setSpeed',
        speed: speed
      }, (response) => {
        if (chrome.runtime.lastError) {
          console.error('Error:', chrome.runtime.lastError);
        }
      });
    });
  }
});
