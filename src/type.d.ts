
interface IBurgerIngredient{
    readonly _id: string;
    readonly name: string;
    readonly type: string;
    readonly proteins: number;
    readonly fat: number;
    readonly carbohydrates: number;
    readonly calories: number;
    readonly price: number;
    readonly image: string;
    readonly image_mobile: string;
    readonly __v: number;
};

interface IConstructorBurgerIngredient extends IBurgerIngredient {
    uniqueId: string;
}

interface ITruncIngredients{
    [name: string]: {
        price: number;
        name: string;
        image_mobile: string;
    };
}

// --------------
// Store

type TIngridients={
    ingredients: IBurgerIngredient[];
    trunc_ingredients: ITruncIngredients;
    isLoading: boolean;
    isFailed: boolean;
}

type TIngridientsState = {
    ingredients: TIngridients
};

type TUser = {
    user: {name: string; email: string} | null;
    loginError: string;
    isLoginLoading: boolean; 
    isLoginFailed: boolean;
    registerError: string;
    isRegisterLoading: boolean; 
    isRegisterFailed: boolean;
    userError: string;
    isUserLoading: boolean; 
    isUserFailed: boolean;
};

type TUserState = {
    user: TUser
};

type TConstructor = {
    bun: IBurgerIngredient | null;
    ingredients: IConstructorBurgerIngredient[]
};

type TConstructorState = {
    constructor: TConstructor
};

type TModal = {
    isModalOpen: boolean;
    isOrder: boolean;
};

type TModalState = {
    modal: TModal
};

type TOrder = {
    orderDetails: any; 
    isLoading: boolean; 
    isFailed: boolean;
};

type TOrderState = {
    order: TOrder
};

type TFeedState = {
    status: 'connecting' | 'connected' | 'disconnected';
    feed: IFeed | null;
    connectionError: string | null;
};

// -----------

interface IOrderData {
    name: string;
    order: {
        number: number
    };
    success: boolean
};

// interface IAction {
//     type: string;
//     payload?: any; 
// }

//User
interface IUserData{
    email: string; 
    name: string
};

interface ILoginData{
    email: string; 
    password: string;
};

interface IRegisterData {
    email: string; 
    name: string; 
    password: string;
};

//feed
interface IFeedOrder {
    ingredients: string[];
    _id: string;
    name: string;
    status: string;
    number: number;
    createdAt: string;
    updatedAt: string;
}

interface IFeed {
    success: boolean;
    orders: IFeedOrder[];
    total: number;
    totalToday: number;
}
