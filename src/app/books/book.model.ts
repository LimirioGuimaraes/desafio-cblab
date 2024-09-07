export class BookModel {
  public id: string = '';
  public rate: number = 0;
  public isFavorite: boolean = false;
  public userNote: string = '';
  public tag: string = '';
  volumeInfo: any;


  constructor(public username: string) {}

  public getUserEmail(): string {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    return loggedInUser.userEmail || '';
  }

  public  getFavorites(email: string): string[] {
    const favoritesString = localStorage.getItem(`favorites_${email}`) || '[]';
    return JSON.parse(favoritesString);
  }

  public saveFavorites(email: string, favorites: string[]): void {
    localStorage.setItem(`favorites_${email}`, JSON.stringify(favorites));
  }

  public getRates(email: string): { [key: string]: number } {
    const ratesString = localStorage.getItem(`rates_${email}`) || '{}';
    try {
      return JSON.parse(ratesString) as { [key: string]: number };
    } catch (e) {
      return {};
    }
  }
    
  public setRates(email: string, rates: { [bookId: string]: number }): void {
    localStorage.setItem(`rates_${email}`, JSON.stringify(rates));
  }
  
  public updateRate(bookId: string, rating: number): void {
    const email = this.getUserEmail();
    const currentRates = this.getRates(email);
    currentRates[bookId] = rating;
    this.setRates(email, currentRates);
  }
    
}
