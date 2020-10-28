export function roundUp(price) {
    return ((Math.ceil(price * 100)) / 100).toFixed(2);
}

