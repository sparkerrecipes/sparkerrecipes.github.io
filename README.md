# sparkerrecipes.github.io

## How to add a recipe
1. Go to `_recipes`.
1. Click "add file" to start a new Markdown file.
2. Name the file whatever the recipe is called, something like `my-real-good-eggs.md`.
3. This is important - the top of the file should look like this
  ```
  ---
  tags: some single words that describe this meal (see the list below)
  pairings:
    - "[Quick Cabbage Slaw](/recipes/quick-cabbage-slaw)"
    - Steamed rice
  ---
  
  <your recipe goes here>
  ```
   `pairings` is optional. Each one is a line of Markdown, so link to other recipes here when you can.
4. Write the recipe
5. At the bottom, click "Commit new file."

## Tags
Stick to these so the tag page stays tidy:
* Course: `main` `side` `appetizer` `soup` `salad` `breakfast` `dessert` `sauce` `cocktail` `misc`
* Cuisine: `mexican` `asian` `indian` `mediterranean`
* What's in it: `vegetarian` `seafood` `pasta`
* How it's made: `one-dish` (a full meal on its own) `instantpot` `slowcooker`
* Season: `fall`

## How to run this on your local machine
1. Install ASDF
2. Install the ruby version from `.tool-versions`
3. `bundle install`
4. `bundle exec jekyll serve`
