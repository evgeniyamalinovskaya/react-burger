// сортировка массива по типу
const selectItems = (type, arr) => {
    return arr.reduce((acc, item) => {
        if (item.type === type) {
            acc.push(item);
        }
        return acc;
    }, []);
};

export default selectItems;

