import * as faker from 'faker'
import { Chef, cook, Cooker, Recipe, Kitchen } from '../kitch'

interface User {
	name: string
	age: number
	status: 'active' | 'disabled'
}

const emptyRecipe: Recipe<User> = {
	age: () => 0,
	name: () => '',
	status: () => 'active',
}

// Seeding Recipe
const fakerRecipe: Recipe<User> = {
	age: faker.random.number,
	name: faker.name.findName,
	status: () => (Math.random() > 0.5 ? 'active' : 'disabled'),
}

const UserKitchen: Kitchen<User> = {
	empty: () => cook(undefined, emptyRecipe),
	new: data => cook(data, emptyRecipe),
	seed: data => cook(data, fakerRecipe),
}

export default UserKitchen
