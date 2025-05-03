// src/lib/stores/goals.ts
import { writable } from 'svelte/store';

function createGoalsStore() {
	let storedGoals = [];

	if (typeof window !== 'undefined') {
		try {
			storedGoals = JSON.parse(localStorage.getItem('savingsGoals') || '[]');
		} catch (e) {
			console.error('Error parsing savingsGoals from localStorage', e);
		}
	}

	const { subscribe, set, update } = writable(storedGoals);

	if (typeof window !== 'undefined') {
		subscribe((value) => {
			localStorage.setItem('savingsGoals', JSON.stringify(value));
		});
	}

	return { subscribe, set, update };
}

export const goals = createGoalsStore();
