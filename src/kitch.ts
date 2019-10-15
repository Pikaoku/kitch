export type Cooker<Model> = (ingredients?: Partial<Model>) => Model

export type RecipeLine<T> = () => T

export type Recipe<Model> = { [key in keyof Model]: RecipeLine<Model[key]> }

export type Chef<Model> = (recipe: Recipe<Model>) => Model

export interface Kitchen<Model> {
	new: Cooker<Model>
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

export function kitch<Model>(recipe: Recipe<Model>): Kitchen<Model> {
	return {
		new: data => cook(data, recipe),
	}
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
