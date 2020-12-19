import { render, screen } from '@testing-library/react'
import App from '../app'

test('renders save message', () => {
  render(<App />)
  const linkElement = screen.getByText(/save to reload/i)
  expect(linkElement).toBeInTheDocument()
})
