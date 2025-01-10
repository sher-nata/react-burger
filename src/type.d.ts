
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

type TIngridients={
    ingredients: IBurgerIngredient[];
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

interface IOrderData {
    name: string;
    order: {
        number: number
    };
    success: boolean
};

interface IAction {
    type: string;
    payload?: any; 
}