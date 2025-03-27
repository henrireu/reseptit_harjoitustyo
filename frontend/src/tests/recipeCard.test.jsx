import { render, screen } from "@testing-library/react"
import { test, expect } from "vitest"
import { MemoryRouter } from "react-router-dom"
import RecipeCard from "../components/recipeCard"
import { recipe } from "./testHelper"

test("renders working recipe", () => {
  render(
    <MemoryRouter>
      <RecipeCard recipe={recipe} />
    </MemoryRouter>
  )

  expect(screen.getByText(recipe.name)).toBeInTheDocument()
  expect(screen.getByText(recipe.user.username)).toBeInTheDocument()
  
})
