export const pathName = () => {
    const path = window.location.pathname?.split("/")[1];
    return (
        {
            provinces: "Provinsi",
            cultures: "Budaya",
            users: "Pengguna",
        }[path] || "Data"
    );
};
export const fieldName = (val) => {
    const path = window.location.pathname?.split("/")[1];
    return (
        {
            users: { id: val._id, name: val.username },
        }[path] || { id: val._id, name: val.name }
    );
};

export function setDataPage(data1, data2, data3) {
    const path = window.location.pathname?.split("/")[1];
    return (
        {
            cultures: data1,
            provinces: data2,
            users: data3,
        }[path] || data1
    );
}

export const years = [
    {
        id: 1,
        label: 2012,
        value: 2012,
    },
    {
        id: 1,
        label: 2013,
        value: 2013,
    },
    {
        id: 2,
        label: 2019,
        value: 2019,
    },
];

export const tahun = (start, end) => {
    const year = [];
    let i = 1;

    for (let tahun = start; tahun < end; tahun++) {
        let tahunTemp = { id: i, label: tahun, value: tahun };
        year.push(tahunTemp);
        i += 1;
    }
    return year;
};
