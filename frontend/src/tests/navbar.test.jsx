import { render, screen } from "@testing-library/react"
import { describe, test, expect } from "vitest"
import { Provider } from "react-redux"
import { store } from "../reducers/store"
import { BrowserRouter as Router } from "react-router-dom"

import Navbar from "../components/navbar"


describe("Navbar", () => {
  test("Ei näytä Lisää resepti linkkiä jos käyttäjä ei ole kirjautunut sisään", () => {
    render(
      <Provider store={store}>
        <Router>
          <Navbar />
        </Router>
      </Provider>
    )

    expect(screen.getByText("Koti")).toBeInTheDocument()

    expect(screen.queryByText("Lisää resepti")).not.toBeInTheDocument()
  })
})