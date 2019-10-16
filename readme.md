# kitch

> A simple POJO creation pattern

[![NPM Version][npm-image]][npm-url]

## Install

```bash
npm i kitch
```

## What

This package provides a teeny-tiny set of utilities to create and _populate_ simple POJOs.

I found myself repeating the same type of code over and over. I wanted a quicker way to do it that was less prone to human error.

Kitch runs off the assumption that you know _how_ you want your POJOs to look... that is, you could provide a recipe for them. And that's where the name comes from: it's a recipe kitchen without the **en**noying bits!

## Usage

To use kitch you will need to create an `interface` of the POJO you want to use. You then create a `Recipe<interface>` of your interface. A recipe defines _how to create_ one of your interface. It is **not** a function, it is an object of functions. This means you can mix, mash and extend recipes easily.

When you have a Recipe, create a new `Kitchen<interface>`. This will be an object of functions that can take overwrite data and produce a new instance of `interface` by utilizing one or your `Recipes`. You can quickly create a simple `Kitchen` by calling the `kitch` function.

With a kitchen created you can create a new POJO by simply calling `.new()`. You can pass additional data to the `.new()` function to overwrite the recipe. 

## Example

To truly utilize kitch you will need an interface of your POJO.

```TS
interface User {
	name: string
	age: number
	status: 'active' | 'disabled'
}
```

Now, provide a recipe of how to create one of your POJOs. A recipe is a typesafe object of functions that can create a valid instance of your interface. You'll even get typehinting.

```TS
const emptyRecipe: Recipe<User> = {
	age: () => 0, // number
	name: () => '', // string
	status: () => 'active', // 'active' | 'disabled'
}
```

Okay, so you have a recipe. Now you need a way to make it! Is that gonna be hard? Absolutely not:

```TS
export const UserKitchen: Kitchen<User> = {
	new: data => cook(data, emptyRecipe),
}


// ...

const myNewUser: User = UserKitchen.new()
const myNewUserWithName: User = UserKitchen.new({name: 'Sean'})
const myNewUserFromForm: User = UserKitchen.new({
    name: this.state.inputs.name
    age: this.state.inputs.age,
    /* in this one we still want to include default fields like
     * status without having to enter them manually all the time!
     * The recipe and kitchen will handle that for us.
     */
})

```

And that's it. Now you can generate your new User POJOs.

And if you will never need anything other than a single `.new()` function you can generate your kitchen even quicker with a single recipe:

```TS
export const UserKitchen = kitch(emptyRecipe)
const myNewUser = UserKitchen.new()
```

Now you have a UserKitchen, and can generate as many new Users as you want.

But, we haven't really got any of the juice out of this yet. The real benefit is when you want to quickly generate POJOs with _different_ recipes. With the below example we can quickly define how to seed a random user and then quickly generate them.

```TS

const fakerRecipe: Recipe<User> = {
	age: faker.random.number,
	name: faker.name.findName,
	status: () => (Math.random() > 0.5 ? 'active' : 'disabled'),
}

export const UserKitchen: Kitchen<User> = {
	namedJohn: () => cook({ name: 'John' }, emptyRecipe),
	new: data => cook(data, emptyRecipe),
	seed: data => cook(data, fakerRecipe),
}

const mySeededUsers: User[] = [
    UserKitchen.namedJohn(),
    UserKitchen.seed(),
    UserKitchen.seed(),
    UserKitchen.seed({status: 'active'}), // Disregard the seeded value for status and set it to active
    UserKitchen.seed({status: 'disabled'}),
]
```

[npm-image]: https://img.shields.io/npm/v/kitch.svg
[npm-url]: https://npmjs.org/package/kitch
