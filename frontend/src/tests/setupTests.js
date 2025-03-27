import { setupServer } from "msw/node"
import { rest } from "msw"
import { beforeAll, afterEach, afterAll } from "vitest"

const mockReview = {
  recipeId: "67b471140e68f45228dbfdc4",
  user: {
    username: "arvostelija77",
    name: "arvostelija",
    id: "67e2c05cd0aebef2149f7bff"
  },
  rating: 5,
  comment: "Tämä resepti on klassikko parhaimmillaan! Lihapullat ovat meheviä ja maukkaita, ja niissä on juuri sopivasti mausteita. Muusi on samettisen pehmeää ja täyteläistä – täydellinen lisuke. Kastike viimeistelee annoksen ja tekee siitä todellisen lohturuoan. Helppo valmistaa, takuuvarma herkku! Suosittelen kokeilemaan!",
  createdAt: "2025-03-26T10:08:17.968Z",
  updatedAt: "2025-03-26T10:08:17.968Z",
  id: "67e3d21148f6b1a3d5143370"
}

export const server = setupServer(
  rest.get("/api/recipes/:id/reviews", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([mockReview]))
  })
)

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())