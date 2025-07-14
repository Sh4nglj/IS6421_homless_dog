# Homeless Dog Adoption Website

A minimalist, responsive website for a homeless dog adoption organization. Inspired by the clean design aesthetic of teenage.engineering, this website provides a simple and effective platform for dog adoption and donation services.

## 🎯 Project Overview

This is a demonstration website created to showcase modern web development practices with a focus on:
- **Minimalist Design**: Clean, simple interface with ample whitespace
- **User Experience**: Intuitive navigation and clear call-to-actions
- **Accessibility**: Screen reader support and keyboard navigation
- **Responsive Design**: Optimized for all devices from mobile to desktop
- **Performance**: Fast loading with vanilla JavaScript (no frameworks)

## 📁 Project Structure

```
homeless-dog-website/
├── index.html              # Homepage
├── pages/
│   ├── adoption.html       # Dog adoption page with filtering
│   ├── donation.html       # Donation page (simplified)
│   ├── about.html          # About us page
│   └── application.html    # Adoption application form
├── css/
│   ├── main.css           # Main styles and layout
│   ├── responsive.css      # Mobile and tablet responsive styles
│   └── components.css      # Component-specific styles
├── js/
│   ├── main.js            # Core functionality and utilities
│   ├── dog-filter.js      # Dog filtering and display logic
│   └── donation.js        # Donation page functionality
├── data/
│   └── dogs.json          # Sample dog data
├── Docs/
│   └── Homeless Dog Adoption Website Specification.markdown
└── README.md
```

## ✨ Features

### Core Functionality (MVP)
- **Homepage**: Organization introduction, large adoption button, recent updates
- **Adoption Page**: 
  - Step-by-step adoption process explanation
  - Dog listing with filtering (size, age, breed)
  - Detailed dog profiles in modal windows
  - Direct link to adoption application
- **Donation Page**: Simplified donation interface with amount selection
- **About Page**: Organization story, team information, contact details
- **Application Form**: Comprehensive adoption application

### Technical Features
- **Vanilla JavaScript**: No frameworks, pure ES6+ code
- **CSS Grid & Flexbox**: Modern layout techniques
- **Progressive Enhancement**: Works without JavaScript
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support
- **SEO Friendly**: Semantic HTML structure
- **Cross-browser Compatible**: Tested on modern browsers

## 🚀 Getting Started

### Prerequisites
- A modern web browser
- Local web server (for AJAX requests to work properly)

### Installation

1. **Clone or download the project files**
2. **Set up a local web server** (required for JSON data loading):

   **Option A: Using Python (if installed)**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```

   **Option B: Using Node.js (if installed)**
   ```bash
   npx http-server
   ```

   **Option C: Using PHP (if installed)**
   ```bash
   php -S localhost:8000
   ```

   **Option D: Using Live Server (VS Code Extension)**
   - Install the "Live Server" extension in VS Code
   - Right-click on `index.html` and select "Open with Live Server"

3. **Open your browser** and navigate to `http://localhost:8000`

## 📱 Page Descriptions

### Homepage (`index.html`)
- **Brief organization introduction**: Simple, impactful mission statement
- **Large adoption button**: Prominent call-to-action leading to adoption page
- **Recent updates**: Card-based layout showing latest news and success stories

### Adoption Page (`pages/adoption.html`)
- **Process explanation**: 4-step visual guide to adoption
- **Dog filtering**: Filter by size, age, and breed
- **Dog grid**: Responsive card layout with hover effects
- **Dog details modal**: Detailed information popup for each dog
- **Application link**: Direct path to adoption form

### Donation Page (`pages/donation.html`)
- **Impact explanation**: Clear breakdown of how donations are used
- **Amount selection**: Preset amounts plus custom input
- **Proceed button**: Simulation of payment processor redirect
- **Thank you messaging**: Confirmation and appreciation

### About Page (`pages/about.html`)
- **Organization story**: History and mission
- **Impact statistics**: Key numbers and achievements
- **Team profiles**: Staff and volunteer information
- **Contact information**: Multiple ways to get in touch

### Application Form (`pages/application.html`)
- **Comprehensive form**: Personal info, housing, pet experience, preferences
- **Form validation**: Required fields and input validation
- **Responsive design**: Works well on all screen sizes
- **Submission simulation**: Demo of form processing

## 🎨 Design Philosophy

### Visual Design
- **Typography**: System fonts for fast loading and consistency
- **Color Palette**: Neutral grays with selective color use
- **Spacing**: Generous whitespace following 8px grid system
- **Imagery**: Placeholder system for easy content replacement

### User Experience
- **Progressive Disclosure**: Information revealed as needed
- **Clear Hierarchy**: Logical information architecture
- **Consistent Patterns**: Reusable UI components
- **Error Prevention**: Form validation and user guidance

### Technical Approach
- **Mobile-First**: Responsive design starting with mobile
- **Performance**: Optimized images, minimal JavaScript
- **Maintainability**: Clean, well-commented code
- **Scalability**: Modular CSS and JavaScript architecture

## 🛠 Customization

### Adding Dogs
Edit `data/dogs.json` to add or modify dog information:
```json
{
  "id": 9,
  "name": "new dog name",
  "age": "3 years",
  "breed": "mixed breed",
  "size": "medium",
  "ageCategory": "young",
  "description": "Short description...",
  "fullDescription": "Detailed description...",
  "image": "path/to/image.jpg",
  "weight": "50 lbs",
  "gender": "female",
  "good_with_kids": true,
  "good_with_dogs": true,
  "good_with_cats": false,
  "energy_level": "medium",
  "special_needs": "none"
}
```

### Managing Recent Updates
Edit `data/updates.json` to add or modify recent updates on the homepage:
```json
{
  "id": 6,
  "date": "february 2025",
  "title": "new update title",
  "description": "description of the update or news item",
  "type": "news",
  "priority": 1
}
```

**Update Types**: `success`, `story`, `news`, `achievement`, `event`
**Priority**: Lower numbers appear first (1 = highest priority)
**Display Limit**: Only the first 3 updates (by priority) are shown on homepage

### Styling Changes
- **Colors**: Modify CSS custom properties in `css/main.css`
- **Typography**: Update font families and sizes
- **Layout**: Adjust grid and flexbox properties
- **Components**: Edit component styles in `css/components.css`

### Content Updates
- **Text Content**: Edit HTML files directly
- **Images**: Replace placeholder images with actual photos
- **Contact Info**: Update contact details in about page
- **Organization Info**: Modify mission statements and descriptions
- **Recent Updates**: Edit `data/updates.json` for homepage news
- **Dog Profiles**: Edit `data/dogs.json` for available dogs

## 🌐 Browser Support

- **Modern Browsers**: Chrome 60+, Firefox 60+, Safari 12+, Edge 79+
- **CSS Grid**: Full support in all modern browsers
- **JavaScript ES6**: Arrow functions, const/let, template literals
- **Fetch API**: For JSON data loading (with fallback)

## 🔧 Technical Details

### CSS Architecture
- **BEM Methodology**: Block, Element, Modifier naming convention
- **Mobile-First**: Responsive breakpoints from small to large
- **CSS Grid**: Main layout system with Flexbox for components
- **Custom Properties**: CSS variables for theme consistency

### JavaScript Features
- **ES6+ Syntax**: Modern JavaScript patterns
- **Module Pattern**: Organized, reusable code structure
- **Event Delegation**: Efficient event handling
- **Accessibility**: ARIA live regions and keyboard support

### Performance Optimizations
- **Lazy Loading**: Images load as needed
- **Debounced Search**: Optimized filtering performance
- **Minimal Dependencies**: No external libraries
- **Compressed Assets**: Optimized file sizes

## 📝 Development Notes

### Demonstration Features
This is a demonstration website with the following simulated features:
- **Dog Data**: Sample dogs loaded from JSON file
- **Form Submission**: Applications show success messages but don't actually submit
- **Payment Processing**: Donation button shows confirmation but doesn't process payments
- **Image Placeholders**: Dogs show "photo coming soon" instead of actual photos

### Production Considerations
For a real implementation, you would need:
- **Backend Integration**: API for dog data, form submission, user management
- **Payment Gateway**: Stripe, PayPal, or similar service integration
- **Content Management**: Admin interface for updating dogs and content
- **Database**: Storage for applications, user data, and dog information
- **Image Management**: Upload and optimization system for dog photos
- **Email Integration**: Automated notifications for applications and confirmations

## 🤝 Contributing

To extend this project:
1. Follow the established code style and patterns
2. Test on multiple devices and browsers
3. Maintain accessibility standards
4. Update documentation for new features
5. Keep the minimalist design philosophy

## 📄 License

This project is created for educational and demonstration purposes. Feel free to use as a starting point for your own projects.

---

**Note**: This is a demonstration website. All dog profiles, contact information, and organizational details are fictional and created for showcase purposes only. 