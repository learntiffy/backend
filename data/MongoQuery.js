const POPULATE_ORDER_1 = [
    {
        path: "user",
        select: { firstName: 1, lastName: 1, mobile: 1 }
    },
    {
        path: "address",
        populate: [
            {
                path: "area",
                select: { name: 1, pincode: 1 }
            },
            {
                path: "subArea",
                select: { name: 1 }
            },
        ]
    },
    {
        path: "items",
        select: { name: 1 }
    },
    {
        path: "feedback"
    }
];

const POPULATE_ORDER_2 = [
    {
        path: "user",
    },
    {
        path: "address",
        populate: [
            {
                path: "area",
                select: { name: 1, pincode: 1 }
            },
            {
                path: "subArea",
                select: { name: 1 }
            },
        ]
    },
    {
        path: "items",
    },
];

exports.POPULATE_ORDER_1 = POPULATE_ORDER_1;
exports.POPULATE_ORDER_2 = POPULATE_ORDER_2;