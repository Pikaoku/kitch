import { cook, Recipe, RecipeLine, Kitchen, kitch, SeedKitchen } from '../kitch'

test('Handle Empty', () => {
	expect(cook({}, {})).toEqual({})
})

test('Includes Recipe', () => {
	interface TestModel {
		name: string
		id: number
		color: 'red' | 'blue' | 'green'
	}

	const emptyTestRecipe: Recipe<TestModel> = {
		color: () => 'red',
		id: () => 1,
		name: () => '',
	}

	const seedTestRecipe: Recipe<TestModel> = {
		color: () => 'blue',
		id: () => 18,
		name: () => 'literally anything',
	}

	const TestKitchen: Kitchen<TestModel> = {
		new: data => cook(data, emptyTestRecipe),
		seed: data => cook(data, emptyTestRecipe),
	}

	expect(TestKitchen.new()).toHaveProperty('children')
	expect(TestKitchen.new()).toHaveProperty('id')
	expect(TestKitchen.new()).toHaveProperty('kill')
	expect(TestKitchen.new()).toHaveProperty('name')

	const TestKitch = kitch(emptyTestRecipe, { seed: seedTestRecipe })

	TestKitch.see
})
