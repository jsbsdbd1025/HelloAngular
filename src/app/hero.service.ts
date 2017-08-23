import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

// import { HEROES } from './mock-heroes';

import { Hero } from './hero';

@Injectable()
export class HeroService {

	private heroesUrl = 'api/heroes';  // URL to web api

	constructor(private http: Http) { }
	// getHeroes(): Hero[] {
	// 	return HEROES;
	// }

	getHeroes(): Promise<Hero[]> {
		return this.http.get(this.heroesUrl)
			.toPromise()
			.then(response => response.json().data as Hero[])
			.catch(this.handleError);
	}

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}


	getHero(id: number): Promise<Hero> {
		return this.getHeroes()
			.then(heroes => heroes.find(hero => hero.id === id));
	}

	// getHeroes(): Promise<Hero[]> {
	// 	return Promise.resolve(HEROES);
	// }

	// See the "Take it slow" appendix
	getHeroesSlowly(): Promise<Hero[]> {
		return new Promise(resolve => {
			// Simulate server latency with 2 second delay
			setTimeout(() => resolve(this.getHeroes()), 2000);
		});
	}
}