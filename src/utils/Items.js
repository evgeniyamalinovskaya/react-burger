const Items = (itemType, arrayOfItems) => {
    const arr = [];
    arrayOfItems.forEach((item) => {
        if (item.type === itemType) {
            arr.push(item);
        }
    })
    return arr;
}
export default Items;