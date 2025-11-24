# Rush

A Chromium browser extension that allows you to control video playback speed up to 4x on any website.

## Features

- Control video playback speed from 0.25x to 4.0x
- Sleek minimalist popup interface with system theme support
- Keyboard shortcuts for instant speed changes
- Works on all websites with HTML5 video players (YouTube, Netflix, Vimeo, etc.)
- Visual on-screen notifications when using keyboard shortcuts

## Installation

1. Download or clone this extension folder
2. Open Chrome/Edge and navigate to `chrome://extensions/` (or `edge://extensions/`)
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked"
5. Select the `Rush` folder
6. The extension icon will appear in your browser toolbar

## Usage

### Using the Popup
1. Click the extension icon in your browser toolbar
2. Use the slider to adjust speed precisely
3. Or click one of the quick speed buttons (1x to 4x)

### Keyboard Shortcuts
- **Shift+>** - Speed up (+0.25x)
- **Shift+<** - Slow down (-0.25x)
- **Shift+R** - Reset to 1x
- **Shift+D** - Double speed (2x)
- **Shift+T** - Triple speed (3x)
- **Shift+M** - Max speed (4x)

When using keyboard shortcuts, a notification will appear on screen showing the current speed.

## Icons

For the extension to display properly, you need to add icon files. You can:

1. Create your own icons (16x16, 48x48, 128x128 pixels)
2. Use an online icon generator like [favicon.io](https://favicon.io)
3. Or temporarily remove the icon references from `manifest.json`

Save them as:
- `icon16.png`
- `icon48.png`
- `icon128.png`

## Troubleshooting

- **Extension not working on a page**: Some websites may have restrictions. Try refreshing the page after installing the extension.
- **No videos found**: Make sure the page has HTML5 video elements.
- **Keyboard shortcuts not working**: Make sure the page is focused and you're holding the Shift key.

## Technical Details

- **Manifest Version**: 3
- **Permissions**: activeTab, scripting
- **Compatible with**: Chrome, Edge, Brave, and other Chromium-based browsers

## Files

- `manifest.json` - Extension configuration
- `popup.html` - Popup interface
- `popup.css` - Popup styling
- `popup.js` - Popup functionality
- `content.js` - Content script that controls video playback

## License

Free to use and modify.
# Rush
