# InstaUp Clone

A modern social media growth platform that allows users to earn coins through various activities and boost their social media presence.

## Features

### User Authentication
- User registration with email verification
- Secure login system
- Profile management
- Password strength validation

### Coin Earning System
- Daily bonus (50 coins)
- Watch videos (10 coins per video)
- Share content (20 coins per share)
- Complete profile (100 coins)
- Receive likes (5 coins per like)
- Receive comments (10 coins per comment)
- Invite friends (30 coins per friend)

### Content Management
- Upload images with captions
- Add hashtags and location
- Privacy settings (Public, Followers Only, Private)
- Image preview before upload
- Drag and drop file upload

### Profile Features
- Profile picture customization
- Bio and personal information
- Activity history
- Achievement tracking
- Statistics dashboard

### Achievement System
- First Share Achievement
- Video Enthusiast (Watch 10 videos)
- Social Butterfly (Invite 5 friends)
- Progress tracking
- Coin rewards for completing achievements

## Technology Stack

- HTML5
- Tailwind CSS (via CDN)
- Vanilla JavaScript
- Font Awesome Icons
- Google Fonts
- LocalStorage for data persistence

## Project Structure

```
instaup-clone/
├── index.html          # Landing page
├── pages/
│   ├── login.html     # User login
│   ├── register.html  # User registration
│   ├── profile.html   # User profile
│   ├── upload.html    # Content upload
│   └── earn-coins.html # Coin earning hub
├── js/
│   └── app.js        # Core JavaScript functionality
└── README.md         # Project documentation
```

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/yourusername/instaup-clone.git
```

2. Navigate to the project directory:
```bash
cd instaup-clone
```

3. Open index.html in your web browser or use a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server
```

4. Access the application at `http://localhost:8000`

## Core Features Implementation

### Coin System
- Coins are earned through various activities
- Real-time balance updates
- Transaction history
- Coin spending options for boosting content

### User Authentication
- Email validation
- Password strength requirements
- Remember me functionality
- Secure session management

### Content Upload
- Image file validation
- Preview functionality
- Progress tracking
- Success/error notifications

### Profile Management
- Edit profile information
- View statistics
- Track achievements
- Monitor coin balance

## Development Guidelines

### JavaScript Classes

#### UserManager
- Handles user authentication
- Manages user data
- Session control

#### CoinManager
- Manages coin transactions
- Updates balances
- Tracks earning history

#### ToastManager
- Displays notifications
- Handles success/error messages

#### FormValidator
- Validates user inputs
- Password strength checking
- Email format validation

#### DailyTasksManager
- Manages daily bonuses
- Tracks task completion
- Handles cooldown periods

#### AchievementManager
- Tracks user achievements
- Awards completion bonuses
- Updates progress

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Tailwind CSS for the utility-first CSS framework
- Font Awesome for the icon set
- Google Fonts for typography
