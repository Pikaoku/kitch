import * as faker from 'faker'
import { cook, Cooker, Kitchen, Recipe } from '../kitch'

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

interface Kitch extends Kitchen<User> {
	empty: Cooker<User>
}

const UserKitchen: Kitch = {
	empty: () => cook(undefined, emptyRecipe),
	new: data => cook(data, emptyRecipe),
	seed: data => cook(data, fakerRecipe),
}

export default UserKitchen
