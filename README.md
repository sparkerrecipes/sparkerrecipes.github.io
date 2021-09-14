# sparkerrecipes.github.io

## How to add a recipe
0. Go to `_recipes`.
1. Click "add file" to start a new Markdown file.
2. Name the file whatever the recipe is called, something like `my-real-good-eggs.md`.
3. This is important - the top of the file should look like this
  ```
  ---
  tags: some single words that describe this meal like main side vegetarian fish whatever
  ---
  
  <your recipe goes here>
  ```
4. Write the recipe
5. At the bottom, click "Commit new file."

## How to run this on your local machine
1. Install ASDF
2. Install the ruby version from `.tool-versions`
3. `bundle install`
4. `bundle exec jekyll serve`
