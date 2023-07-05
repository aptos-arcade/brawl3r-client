export const ellipsize = (str : string | undefined, f = 5, l = 5) => (
    str 
        ? str.length > f + l + 3
            ? str.slice(0, f) + '...' + str.slice(-l)
            : str
        : ''
);