export const fetcher = (url) =>
    fetch(url).then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            throw {
                message: res.json(),
            };
        }
    });
