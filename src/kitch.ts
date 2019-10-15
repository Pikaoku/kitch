export type Cooker<Model> = (ingredients?: Partial<Model>) => Model

export type RecipeLine<T> = () => T

export type Recipe<Model> = { [key in keyof Model]: RecipeLine<Model[key]> }

export type Chef<Model> = (recipe: Recipe<Model>) => Model

export interface Kitchen<Model> {
	new: Cooker<Model>
	seed: Cooker<Model>
	readonly [key: string]: Cooker<Model>
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

export const prep = {
	empty: {
		string: () => '',
		array: () => [],
		number: () => 0,
	},
}
