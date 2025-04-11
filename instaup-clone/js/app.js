// User Management
class UserManager {
    static getUser() {
        return JSON.parse(localStorage.getItem('user')) || null;
    }

    static setUser(userData) {
        localStorage.setItem('user', JSON.stringify(userData));
    }

    static updateUser(updates) {
        const currentUser = this.getUser();
        if (currentUser) {
            const updatedUser = { ...currentUser, ...updates };
            this.setUser(updatedUser);
            return updatedUser;
        }
        return null;
    }

    static logout() {
        localStorage.removeItem('user');
        window.location.href = '/index.html';
    }

    static isLoggedIn() {
        return !!this.getUser();
    }
}

// Coin Management
class CoinManager {
    static updateCoinBalance(amount) {
        const user = UserManager.getUser();
        if (user) {
            const newBalance = (user.coins || 0) + amount;
            UserManager.updateUser({ coins: newBalance });
            this.updateCoinDisplays(newBalance);
            return newBalance;
        }
        return 0;
    }

    static updateCoinDisplays(balance) {
        // Update coin balance displays across the page
        const coinDisplays = document.querySelectorAll('[data-coin-display]');
        coinDisplays.forEach(display => {
            display.textContent = `${balance} Coins`;
        });
    }

    static async awardCoins(amount, reason) {
        const newBalance = this.updateCoinBalance(amount);
        ToastManager.show(`Earned ${amount} coins - ${reason}!`);
        return newBalance;
    }
}

// Toast Notifications
class ToastManager {
    static show(message, type = 'success') {
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toastMessage');
        
        if (!toast || !toastMessage) {
            console.warn('Toast elements not found');
            return;
        }

        // Set toast color based on type
        toast.classList.remove('bg-green-500', 'bg-red-500', 'bg-yellow-500');
        toast.classList.add(
            type === 'success' ? 'bg-green-500' :
            type === 'error' ? 'bg-red-500' : 'bg-yellow-500'
        );

        toastMessage.textContent = message;
        toast.classList.remove('hidden');

        // Hide toast after 3 seconds
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 3000);
    }
}

// Form Validation
class FormValidator {
    static validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    static validatePassword(password) {
        // Password must be at least 8 characters long and contain at least one number
        return password.length >= 8 && /\d/.test(password);
    }

    static validateUsername(username) {
        // Username must be 3-20 characters long and contain only letters, numbers, and underscores
        const re = /^[a-zA-Z0-9_]{3,20}$/;
        return re.test(username);
    }

    static getPasswordStrength(password) {
        let strength = 0;
        
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;

        return {
            score: strength,
            label: strength === 0 ? 'Very Weak' :
                   strength === 1 ? 'Weak' :
                   strength === 2 ? 'Medium' :
                   strength === 3 ? 'Strong' : 'Very Strong'
        };
    }
}

// Daily Tasks Manager
class DailyTasksManager {
    static getLastClaimTime() {
        return localStorage.getItem('lastDailyBonusClaim');
    }

    static setLastClaimTime() {
        localStorage.setItem('lastDailyBonusClaim', new Date().toISOString());
    }

    static canClaimDaily() {
        const lastClaim = this.getLastClaimTime();
        if (!lastClaim) return true;

        const lastClaimDate = new Date(lastClaim);
        const now = new Date();
        const hoursSinceLastClaim = (now - lastClaimDate) / (1000 * 60 * 60);

        return hoursSinceLastClaim >= 24;
    }

    static async claimDailyBonus() {
        if (this.canClaimDaily()) {
            await CoinManager.awardCoins(50, 'Daily Bonus');
            this.setLastClaimTime();
            return true;
        }
        return false;
    }

    static getTimeUntilNextClaim() {
        const lastClaim = this.getLastClaimTime();
        if (!lastClaim) return 0;

        const lastClaimDate = new Date(lastClaim);
        const nextClaimDate = new Date(lastClaimDate.getTime() + (24 * 60 * 60 * 1000));
        const now = new Date();
        
        return Math.max(0, nextClaimDate - now);
    }
}

// Achievement Manager
class AchievementManager {
    static achievements = {
        firstShare: {
            id: 'firstShare',
            title: 'First Share',
            description: 'Share your first post',
            reward: 20,
            icon: 'fa-share'
        },
        watchVideos: {
            id: 'watchVideos',
            title: 'Video Enthusiast',
            description: 'Watch 10 videos',
            reward: 50,
            icon: 'fa-play',
            target: 10
        },
        inviteFriends: {
            id: 'inviteFriends',
            title: 'Social Butterfly',
            description: 'Invite 5 friends',
            reward: 100,
            icon: 'fa-user-plus',
            target: 5
        }
    };

    static getProgress() {
        return JSON.parse(localStorage.getItem('achievements')) || {};
    }

    static setProgress(progress) {
        localStorage.setItem('achievements', JSON.stringify(progress));
    }

    static async updateProgress(achievementId, progress) {
        const currentProgress = this.getProgress();
        const achievement = this.achievements[achievementId];

        if (!achievement) return;

        // Update progress
        currentProgress[achievementId] = currentProgress[achievementId] || 0;
        currentProgress[achievementId] = progress;

        // Check if achievement is completed
        if (achievement.target && progress >= achievement.target && !currentProgress[`${achievementId}_completed`]) {
            currentProgress[`${achievementId}_completed`] = true;
            await CoinManager.awardCoins(achievement.reward, `Achievement: ${achievement.title}`);
        }

        this.setProgress(currentProgress);
        return currentProgress;
    }

    static isAchievementCompleted(achievementId) {
        const progress = this.getProgress();
        return progress[`${achievementId}_completed`] || false;
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Update coin displays
    const user = UserManager.getUser();
    if (user) {
        CoinManager.updateCoinDisplays(user.coins || 0);
    }

    // Check if user should be logged in for current page
    const restrictedPages = ['earn-coins.html', 'profile.html', 'upload.html'];
    const currentPage = window.location.pathname.split('/').pop();
    
    if (restrictedPages.includes(currentPage) && !UserManager.isLoggedIn()) {
        window.location.href = '/pages/login.html';
    }

    // Initialize daily bonus timer if on earn-coins page
    if (currentPage === 'earn-coins.html') {
        const timeUntilNext = DailyTasksManager.getTimeUntilNextClaim();
        if (timeUntilNext > 0) {
            // Update timer display
            const hours = Math.floor(timeUntilNext / (1000 * 60 * 60));
            const minutes = Math.floor((timeUntilNext % (1000 * 60 * 60)) / (1000 * 60));
            const timerDisplay = document.getElementById('dailyBonusTimer');
            if (timerDisplay) {
                timerDisplay.textContent = `Next claim in: ${hours}h ${minutes}m`;
            }
        }
    }
});

// Export classes for use in other files
window.UserManager = UserManager;
window.CoinManager = CoinManager;
window.ToastManager = ToastManager;
window.FormValidator = FormValidator;
window.DailyTasksManager = DailyTasksManager;
window.AchievementManager = AchievementManager;
