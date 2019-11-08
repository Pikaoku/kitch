export type Cooker<Model> = (ingredients?: Partial<Model>) => Model

export type RecipeLine<T> = () => T

export type Recipe<Model> = { [key in keyof Model]: RecipeLine<Model[key]> }

export type Chef<Model> = (recipe: Recipe<Model>) => Model

export interface CookBook<Model> {
	[key: string]: Recipe<Model>
}

export interface SimpleCookBook<Model> {
	new: Recipe<Model>
}

export type Kitchen<Model, CB = SimpleCookBook<Model>> = {
	[key in keyof CB]: Cooker<Model>
}

export interface SeedKitchen<Model> extends Kitchen<Model> {
	seed: Cooker<Model>
}

export function sousChef<Model>(recipe: Recipe<Model>): Model {
	// TODO: investigate a way to remove these type coercions
	const dish = {} as Partial<Model>
	const keys = Object.keys(recipe) as [keyof Model]
	keys.forEach((key): Model[keyof Model] => (dish[key] = recipe[key]()))
	return dish as Model
}

export function cook<Model>(
	ingredients: Partial<Model> = {},
	recipe: Recipe<Model>,
	chef?: Chef<Model>
): Model {
	return { ...(chef || sousChef)(recipe), ...ingredients }
}

function toCooker<Model>(recipe: Recipe<Model>): Cooker<Model> {
	return (data?: Partial<Model>): Model => cook(data, recipe)
}

export function kitch<Model>(
	newRecipe: Recipe<Model>,
	cookbook: CookBook<Model> = {}
): Readonly<Kitchen<Model>> {
	const kitchen: Kitchen<Model> = { new: toCooker<Model>(newRecipe) }
	const cb = Object.entries(cookbook)
	cb.forEach(([key, recipe]) => (kitchen[key] = toCooker<Model>(recipe)))
	return kitchen
}

export const Prep = {
	empty: {
		array: () => [],
		false: () => false,
		number: () => 0,
		string: () => '',
		true: () => true,
	},
	random: {
		boolean: (): boolean => Math.random() > 0.5,
		percentage: (): number => Math.floor(Math.random() * 100) + 1,
	},
	value: {
		array: (value: any[]): (() => any[]) => () => value,
		boolean: (value: boolean) => () => value,
		number: (value: number) => () => value,
		string: (value: string) => () => value,
	},
}
