export const objectMap = <T extends { [key: string]: any }, Result>(
    object: T,
    func: (value: T[keyof T], key: keyof T, index: number) => Result
) =>
    Object.fromEntries(
        Object.entries(object).map(([key, value], index) => [
            key,
            func(value, key, index),
        ])
    ) as { [key in keyof T]: Result };

export default objectMap;
