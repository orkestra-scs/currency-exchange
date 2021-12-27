import { screen, fireEvent} from "@testing-library/react";
import {render} from "../../test-utils";
import LoginScreen from "./Login";
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import '@testing-library/jest-dom'

const server = setupServer(
    rest.get('http://localhost:8080/login', (req, res, ctx) => {
        return res(ctx.json('admin'))
    }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('renders Login Page', () => {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(), // deprecated
            removeListener: jest.fn(), // deprecated
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })),
    });
    render(<LoginScreen />);
    const welcome = screen.getByText(/Welcome to Currency Exchange/i);
    const username = screen.getByText(/Username/i);
    const password = screen.getByText(/Password/i);
    expect(welcome).toBeInTheDocument();
    expect(username).toBeInTheDocument();
    expect(password).toBeInTheDocument();
});


test('handleLogin', () => {

    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(), // deprecated
            removeListener: jest.fn(), // deprecated
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })),
    });

    render(<LoginScreen />)
    const username = screen.getByLabelText('Username')

    fireEvent.change(username, {target: {value: 'admin'}})
    expect(username.value).toBe('admin')

    const password = screen.getByLabelText('Password')

    fireEvent.change(password, {target: {value: 'testaaaaaaa'}})
    expect(password.value).toBe('testaaaaaaa')

    fireEvent.click(screen.getByText('Submit'))
} )
