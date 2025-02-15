export const baseUrl = 'https://norma.nomoreparties.space/api'
export const loginUrl = '/auth/login'
export const logoutUrl = '/auth/logout'
export const registerUrl = '/auth/register'
export const forgotPasswordUrl = '/password-reset'
export const resetPasswordUrl = '/password-reset/reset'
export const userDataUrl = '/auth/user'
export const refreshTokenUrl = '/auth/token'
export const ingredientsUrl = '/ingredients'
export const orderUrl = '/orders'

export const wsBaseUrl = 'wss://norma.nomoreparties.space/orders' 
export const wsFeedUrl = '/all' 

export const loginPage = '/login'
export const registerPage = '/register'
export const forgotPasswordPage = '/forgot-password'
export const resetPasswordPage = '/reset-password'
export const profilePage = '/profile'
export const ordersHistoryPage = 'orders'
export const ordersFeedPage = '/feed'
export const ingredientDetailsPage = '/ingredient'
export const homePage = '/'

export const orderStatus: { [key: string]: string } = {
    'done': 'Выполнен',
    'pending': 'В работе',
    'created': 'Создан'
}