class StorageService {
  // Set a value in localStorage (auto stringify)
  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error(`Error setting ${key} in localStorage`, err);
    }
  }

  // Get a value from localStorage (auto parse)
  get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : null;
    } catch (err) {
      console.error(`Error getting ${key} from localStorage`, err);
      return null;
    }
  }

  // Remove a specific key
  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (err) {
      console.error(`Error removing ${key} from localStorage`, err);
    }
  }

  // Clear all localStorage
  clear(): void {
    try {
      localStorage.clear();
    } catch (err) {
      console.error(`Error clearing localStorage`, err);
    }
  }

 
}

const storageService = new StorageService();
export default storageService;
