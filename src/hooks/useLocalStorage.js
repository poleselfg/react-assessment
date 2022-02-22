const useLocalStorage = () => {
    const save = (key, data) => {
        localStorage.setItem(key, JSON.stringify(data));
    }

    const get = (key) => {
        const result = localStorage.getItem(key);
        return JSON.parse(result);
    }

    const remove = (key) => {
        localStorage.removeItem(key);
    }

    return { save, get, remove };
}

export default useLocalStorage;
