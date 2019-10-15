import * as faker from 'faker'
import { kitch, Recipe } from '../kitch'

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

export const UserKitchen = kitch(emptyRecipe)
export const SeededUserKitchen = kitch(fakerRecipe)

// New User
// UserKitchen.new()

// New Seeder User
// SeededUserKitchen.new()

export default UserKitchen
