export type Cooker<Model> = (ingredients?: Partial<Model>) => Model

export type RecipeLine<T> = () => T

export type Recipe<Model> = { [key in keyof Model]: RecipeLine<Model[key]> }

export type Chef<Model> = (recipe: Recipe<Model>) => Model

export interface Kitchen<Model> {
	empty: Cooker<Model>
	new: Cooker<Model>
	seed?: Cooker<Model>
}

export const standardChef: Chef<any> = recipe =>
	Object.keys(recipe).map(key => recipe[key]())

export function cook<Model>(
	ingredients: Partial<Model> = {},
	recipe: Recipe<Model>,
	chef?: Chef<Model>
): Model {
	return { ...(chef || standardChef)(recipe), ...ingredients }
}
