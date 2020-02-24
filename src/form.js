const json = {
    name: "My Form",
    depiction: "This is Wilson Form",
    header: {
        color: "blue-grey lighten-5"
    },
    data: [
        {
            type: "text-field",
            name: "name",
            defaultValue: "plz input you name"
        },
        {
            type: "checkBox",
            name: "sex",
            depiction: "sex",
            data: [
                {
                    id: 1,
                    name: "Man"
                },
                {
                    id: 2,
                    name: "Womon"
                }
            ]
        },
        {
            type: "text-field",
            name: "Hello",
            defaultValue: "Hello World"
        },
        {
            type: "ta",
            name: "ta test",
            defaultValue: "Hello World"
        }
    ],
    setting: {
        style: "dark",
        maxWidth: 1024
    }
}
export default json
