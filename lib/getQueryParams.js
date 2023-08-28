const getQueryParams = function (url) {
    let result = {};
    //a = split url sections
    const a = url.split("/").slice(1);
    a.forEach((val) => {
        //b = split url section name and params, b[0] section name, b[1] onwards params
        const b = val.split("?");
        result[`${b[0]}`] = {};
        for (let i = 1; i < b.length; i++) {
            //c = split multiple params sections
            const c = b[i].split("&");
            for (let j = 0; j < c.length; j++) {
                const d = c[j].split("=");
                result[`${b[0]}`][`${d[0]}`] = d[1];
            }
        }
    });
    return result;
};
export default getQueryParams;
