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
	const dish = {} as Model
	Object.keys(recipe).forEach(
		(key: string): Model => (dish[key] = recipe[key]())
	)
	return dish
}

export function cook<Model>(
	ingredients: Partial<Model> = {},
	recipe: Recipe<Model>,
	chef?: Chef<Model>
): Model {
	return { ...(chef || sousChef)(recipe), ...ingredients }
}
