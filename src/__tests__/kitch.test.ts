import { cook, Recipe, RecipeLine, Kitchen } from '../kitch'

test('Handle Empty', () => {
	expect(cook({}, {})).toEqual({})
})

test('Includes Recipe', () => {
	interface TestModel {
		name: string
		id: number
		children: TestModel[]
		kill: () => void
	}

	const emptyTestRecipe: Recipe<TestModel> = {
		children: () => [],
		id: () => 1,
		kill: () => () => {
			let two = 1 + 1
		},
		name: () => '',
	}

	const TestKitch: Kitchen<TestModel> = {
		new: data => cook(data, emptyTestRecipe),
		seed: data => cook(data, emptyTestRecipe),
	}

	console.table([TestKitch.new()])

	expect(TestKitch.new()).toHaveProperty(Object.keys(emptyTestRecipe))
})
