const storeName = "theme";

interface Theme {
    theme: string;
}

const getTheme = (): Theme | undefined => {
    const data = localStorage.getItem(storeName);
    if (!data) return undefined;
    return JSON.parse(data);
};

const storeTheme = (data: Theme): void => {
    localStorage.setItem(storeName, JSON.stringify(data));
};

export { getTheme, storeTheme };